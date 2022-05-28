
import org.apache.commons.lang3.StringUtils;
// import org.apache.nifi.annotation.lifecycle.OnScheduled;
// import org.apache.nifi.components.PropertyDescriptor;
// import org.apache.nifi.connectable.Connectable;
// import org.apache.nifi.connectable.Connection;
// import org.apache.nifi.controller.FlowController;
// import org.apache.nifi.controller.NodeTypeProvider;
import org.apache.nifi.controller.ProcessorNode;
// import org.apache.nifi.flowfile.FlowFile;
// import org.apache.nifi.groups.ProcessGroup;
// import org.apache.nifi.processor.AbstractProcessor;
// import org.apache.nifi.processor.ProcessContext;
// import org.apache.nifi.processor.ProcessSession;
// import org.apache.nifi.processor.ProcessorInitializationContext;
// import org.apache.nifi.processor.Relationship;
// import org.apache.nifi.processor.exception.ProcessException;
// import org.apache.nifi.processor.util.StandardValidators;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class SwitchOff extends AbstractProcessor {

    public static final PropertyDescriptor CONTROLLER_ATTRIBUTE_NAME = new PropertyDescriptor.Builder()
            .name("Long值属性名称")
            .description("指定流文件属性名称，以此属性值来拉取流文件。此属性值期望是long型的。组件每次从上游拉取队列中此属性值最小的一批流文件。")
            .required(true)
            .defaultValue("trigger.number")
            .addValidator(StandardValidators.NON_EMPTY_VALIDATOR)
            .build();

    public static final PropertyDescriptor INCLUDE_CONNECTION_STRATEGY = new PropertyDescriptor.Builder()
            .name("包含策略")
            .description("指定包含策略，在自定义属性中选择的Connection是被包含还是排除。")
            .required(true)
            .allowableValues("include", "exclude")
            .defaultValue("exclude")
            .addValidator(StandardValidators.NON_EMPTY_VALIDATOR)
            .build();

    public static final PropertyDescriptor CONNECTION_NAMES = new PropertyDescriptor.Builder()
            .name("Connection名称")
            .description("以逗号分隔的多个Connection名称，与包含策略配合使用。如果没有配置值，则默认监听该处理器后续的所有组件和Connection。")
            .required(false)
            .defaultValue("exclude")
            .addValidator(StandardValidators.NON_EMPTY_VALIDATOR)
            .build();

    public static final PropertyDescriptor MAX_FETCH_STRATEGY = new PropertyDescriptor.Builder()
            .name("Max Fetch Size Strategy")
            .description("指定每次读取最大流文件数量的策略。选择'Max Fetch Size'则依据组件属性配置来指定，选择"
                    + "'auto'则由程序自主判断每次读取上游流文件最大的数量。")
            .required(true)
            .allowableValues("auto", "Max Fetch Size")
            .defaultValue("auto")
            .addValidator(StandardValidators.NON_EMPTY_VALIDATOR)
            .build();

    public static final PropertyDescriptor MAX_FETCH_SIZE = new PropertyDescriptor.Builder()
            .name("Max Fetch Size")
            .description("每次获取的最多流文件数量")
            .required(true)
            .defaultValue("100")
            .addValidator(StandardValidators.INTEGER_VALIDATOR)
            .build();

    public static final Relationship REL_SUCCESS = new Relationship.Builder().name("success")
            .description("成功处理的FlowFIle路由到此关系").build();

    public Set<Relationship> relationships;
    public List<PropertyDescriptor> properties;

    private Map<String, ProcessorNode> downProcessorNodes;
    private Collection<ProcessorNode> selectedProcessorNodes;
    private Set<Connection> downConnectionSet;
    private Set<Connection> selectedConnectionSet;

    private FlowController flowController;

    private String longAttrName;
    private boolean useAutoMaxFetchSize;
    private int maxFetchSize;

    @Override
    protected void init(ProcessorInitializationContext context) {
        Set<Relationship> set = new HashSet<>();
        set.add(REL_SUCCESS);
        relationships = Collections.unmodifiableSet(set);

        List<PropertyDescriptor> list = new ArrayList<>();
        list.add(CONTROLLER_ATTRIBUTE_NAME);
        list.add(INCLUDE_CONNECTION_STRATEGY);
        list.add(CONNECTION_NAMES);
        list.add(MAX_FETCH_STRATEGY);
        list.add(MAX_FETCH_SIZE);
        properties = Collections.unmodifiableList(list);
    }

    @Override
    public List<PropertyDescriptor> getSupportedPropertyDescriptors() {
        return properties;
    }

    @Override
    public Set<Relationship> getRelationships() {
        return relationships;
    }

    public void setup(ProcessContext context) {
        initNodeAndConnection();
        longAttrName = context.getProperty(CONTROLLER_ATTRIBUTE_NAME).getValue();
        maxFetchSize = context.getProperty(MAX_FETCH_SIZE).asInteger();
        useAutoMaxFetchSize = "auto".equals(context.getProperty(MAX_FETCH_STRATEGY).getValue());

        String connectionNames = context.getProperty(CONNECTION_NAMES).getValue();
        if (StringUtils.isNotEmpty(connectionNames)) {
            Set<String> connectionNameList = new HashSet<>(Arrays.asList(connectionNames.split(",")));
            boolean include = "include".equals(context.getProperty(INCLUDE_CONNECTION_STRATEGY).getValue());
            for (Connection connection : downConnectionSet) {
                ProcessorNode processorNode = downProcessorNodes.get(connection.getSource().getIdentifier());
                if (connectionNameList.contains(connection.getName())) {
                    if (include) {
                        selectedConnectionSet.add(connection);
                        if (null != processorNode) {
                            selectedProcessorNodes.add(processorNode);
                        }
                    }
                } else if (!include) {
                    selectedConnectionSet.add(connection);
                    if (null != processorNode) {
                        selectedProcessorNodes.add(processorNode);
                    }
                }
            }
        } else {
            selectedConnectionSet = downConnectionSet;
            selectedProcessorNodes = downProcessorNodes.values();
        }
    }

    public void initNodeAndConnection() {
        downConnectionSet = new HashSet<>();
        downProcessorNodes = new HashMap<>(8);
        selectedConnectionSet = new HashSet<>();
        selectedProcessorNodes = new ArrayList<>();
        NodeTypeProvider nodeTypeProvider = getNodeTypeProvider();
        if (nodeTypeProvider instanceof FlowController) {
            flowController = (FlowController) nodeTypeProvider;
        }
        if (null == flowController) {
            //类初始化
            return;
        }
        ProcessGroup processGroup = flowController.getFlowManager().getProcessorNode(getIdentifier()).getProcessGroup();
        //以当前组件为头结点 有痕迹的有方向的遍历一颗树 获取当前组件下游的组件和Connection
        ProcessorNode thisNode = processGroup.getProcessor(getIdentifier());
        HashSet<String> walkThroughNodes = new HashSet<>();
        walkThroughNodes.add(getIdentifier());
        walkThrough(walkThroughNodes, thisNode.getConnections(), thisNode);

        Collection<ProcessorNode> processorNodeCollections = processGroup.getProcessors();
        processorNodeCollections.remove(thisNode);
        for (ProcessorNode processorNode : processorNodeCollections) {
            if (walkThroughNodes.contains(processorNode.getIdentifier())) {
                downProcessorNodes.put(processorNode.getIdentifier(), processorNode);
            }
        }
    }

    private void walkThrough(HashSet<String> walkThroughNodes, Set<Connection> outPutConnections, Connectable thisNode) {
        for (Connection c : outPutConnections) {
            downConnectionSet.add(c);
            Connectable targetNode = c.getDestination();
            if (walkThroughNodes.contains(targetNode.getIdentifier())) {
                //已经走过这个node
                continue;
            }
            //记录已走过当前节点
            walkThroughNodes.add(targetNode.getIdentifier());
            //递归以targetNode为出发点 开始遍历
            walkThrough(walkThroughNodes, targetNode.getConnections(), targetNode);
        }

    }

    @Override
    public void onTrigger(ProcessContext context, ProcessSession session) throws ProcessException {
        if (!workDone()) {
            return;
        }
        int maxSize = 0;
        if (useAutoMaxFetchSize) {
            ProcessGroup processGroup = flowController.getFlowManager().getProcessorNode(getIdentifier()).getProcessGroup();
            //以当前组件为头结点 有痕迹的有方向的遍历一颗树 获取当前组件下游的组件和Connection
            ProcessorNode thisNode = processGroup.getProcessor(getIdentifier());
            for (Connection connection : thisNode.getIncomingConnections()) {
                maxSize += connection.getFlowFileQueue().size().getObjectCount();
            }
        } else {
            maxSize = maxFetchSize;
        }

        List<FlowFile> flowFiles = session.get(maxSize);
        if (flowFiles.isEmpty()) {
            return;
        }
        long min = Long.MAX_VALUE;
        Map<String, List<FlowFile>> flowFileMap = new HashMap<>(16);
        for (FlowFile flowFile : flowFiles) {
            String number = flowFile.getAttribute(longAttrName);
            if (!flowFileMap.containsKey(number)) {
                flowFileMap.put(number, new ArrayList<>());
            }
            flowFileMap.get(number).add(flowFile);
            min = Math.min(min, Long.parseLong(number));
        }
        String minStr = String.valueOf(min);
        flowFileMap.each{k, ffs -> 
            if (minStr.equals(k)) {
                session.transfer(ffs, REL_SUCCESS);
            } else {
                session.transfer(ffs);
            }
        };
        session.commit();
    }

    private boolean workDone() {
        for (ProcessorNode p : selectedProcessorNodes) {
            if (p.getActiveThreadCount() > 0 || p.getTerminatedThreadCount() > 0) {
                return false;
            }
        }
        for (Connection c : selectedConnectionSet) {
            if (!c.getFlowFileQueue().isEmpty()) {
                return false;
            }
        }
        return true;
    }
}