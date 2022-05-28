import org.apache.nifi.processor.Relationship
import org.apache.nifi.processor.Processor
import org.apache.nifi.processor.ProcessSessionFactory
import org.apache.nifi.processor.ProcessContext
import org.apache.nifi.processor.ProcessSession
import org.apache.nifi.processor.util.StandardValidators
import org.apache.nifi.processor.exception.ProcessException
import org.apache.nifi.dbcp.DBCPService
import org.apache.nifi.components.PropertyDescriptor
import org.apache.nifi.components.Validator
import org.apache.nifi.components.state.Scope
import org.apache.nifi.components.state.StateManager
import org.apache.nifi.components.state.StateMap
import org.apache.nifi.components.ValidationContext
import org.apache.nifi.components.ValidationResult
import org.apache.nifi.logging.ComponentLog
import org.apache.nifi.util.StringUtils
import org.apache.commons.io.IOUtils
import java.nio.charset.StandardCharsets
import java.lang.StringBuilder
import java.util.Collection
import java.util.List
import java.util.Set
import java.sql.SQLException
import java.sql.Connection
import java.text.SimpleDateFormat
import groovy.sql.Sql
import groovy.time.*

class AnalyzeLogMinerProcessor implements Processor {

    DBCPService dbcpService

    ComponentLog log

    final static Relationship  REL_SUCCESS = new Relationship.Builder()
            .name("success")
            .description("成功从LogMiner视图中读取出来的redo_sql语句")
            .build()

    @Override
    Set<Relationship> getRelationships() {
         return [REL_SUCCESS] as Set<Relationship> 
    }

    static final PropertyDescriptor DBCP_SERVICE = new PropertyDescriptor.Builder()
            .name("Database Connection Pooling Service")
            .description("The Controller Service that is used to obtain connection to database")
            .required(true)
            .identifiesControllerService(DBCPService.class)
            .build()
    
    static final PropertyDescriptor INIT_SCN = new PropertyDescriptor.Builder()
            .name("INIT SCN").description("初始化时，指定LogMiner分析Oracle日志的起始SCN号")
            .required(false).addValidator(StandardValidators.LONG_VALIDATOR).build()

    static final PropertyDescriptor SCN_STEP_SIZE = new PropertyDescriptor.Builder()
            .name("SCN STEP SIZE").description("指定LogMiner分析Oracle日志步长，即每次最多加载多少scn行的数据,默认值为8000，请根据实际流量合理配置此值")
            .required(true).addValidator(StandardValidators.LONG_VALIDATOR).defaultValue("8000").build()
    
    static final PropertyDescriptor SCHEMA_NAME = new PropertyDescriptor.Builder()
            .name("SCHEMA NAME").description("指定LogMiner分析Oracle日志的SEG_OWNER,即指定schema名称")
            .required(true).addValidator(Validator.VALID).build()

    static final PropertyDescriptor Max_Transaction_Length = new PropertyDescriptor.Builder()
            .name("事务最大时长").description("输入期望事务所需的最长时间(单位s)。默认600s")
            .required(true).addValidator(Validator.VALID).defaultValue("600").build()

    static final PropertyDescriptor TABLE_NAME_REGEXP = new PropertyDescriptor.Builder()
            .name("TABLE NAME Regular Expression").description("使用Oracle正则表达式指定LogMiner分析Oracle日志需要过滤的表名,要求Oracle版本在10g及以上")
            .required(false).addValidator(StandardValidators.REGULAR_EXPRESSION_VALIDATOR).build()

    static final PropertyDescriptor EXACT_METHOD = new PropertyDescriptor.Builder()
            .name("Exact RedoLog Method").description("读取分析RedoLog的方式,CommitDataOnly表示每次从日志中只提取已经commit的数据，NoCommitDataOnly表示没有提交的数据也会被读取出来。前者会多出
            组件修补遗漏事务部分任务的资源，优点的数据不丢失。后者会占用组件环境的内存资源，且当服务器宕机等情况有概率丢失内存信息。两种方式都依赖事务最大时长")
            .required(true).addValidator(Validator.VALID).allowableValues("CommitDataOnly", "NoCommitDataOnly").defaultValue("CommitDataOnly".build()

    static final PropertyDescriptor INCLUDE_INSERT = new PropertyDescriptor.Builder()
            .name("Include Insert").description("SQL是否包含Insert语句,默认为包含")
            .required(true).addValidator(StandardValidators.BOOLEAN_VALIDATOR).allowableValues("true", "false").defaultValue("true").build()

    static final PropertyDescriptor INCLUDE_UPDATE = new PropertyDescriptor.Builder()
            .name("Include Update").description("SQL是否包含Update语句,默认为包含")
            .required(true).addValidator(StandardValidators.BOOLEAN_VALIDATOR).allowableValues("true", "false").defaultValue("true").build()

    static final PropertyDescriptor INCLUDE_DELETE = new PropertyDescriptor.Builder()
            .name("Include Delete").description("SQL是否包含Delete语句,默认为包含")
            .required(true).addValidator(StandardValidators.BOOLEAN_VALIDATOR).allowableValues("true", "false").defaultValue("true").build()

    static final PropertyDescriptor ANA_DELETE = new PropertyDescriptor.Builder()
            .name("重塑 Delete").description("SQL是否重新构造Delete语句,使Delete语句where条件只有主键唯一键，默认否即包含所有列条件")
            .required(true).addValidator(StandardValidators.BOOLEAN_VALIDATOR).allowableValues("true", "false").defaultValue("false").build()

    static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
    @Override
    void initialize(ProcessorInitializationContext context) {}

    @Override
    void onTrigger(ProcessContext context, ProcessSessionFactory sessionFactory) throws ProcessException {
        ProcessSession session = sessionFactory.createSession()
        //获取数据库连接池
        dbcpService = context.getProperty(DBCP_SERVICE).asControllerService(DBCPService)
        validateNull(dbcpService,"数据库连接池服务不可用")
        Connection conn = dbcpService.getConnection()
        validateNull(conn,"数据库连接不可用")
        Connection conn2 = dbcpService.getConnection()
        validateNull(conn2,"数据库连接不可用")
        //获取当前组件的状态存储管理器 存取SCN号
        StateManager stateManager = context.stateManager
        StateMap stateMap
        try {
            stateMap = stateManager.getState(Scope.CLUSTER)
        } catch (IOException ioe) {
            log.error("Failed to retrieve observed maximum values from the State Manager. Will not attempt " +
                    "connection until this is accomplished.", ioe)
            context.yield()
            return
        }
        long scn = getStateScn(stateMap)
        long maxViewScn
        long scnStepSize = Long.parseLong(context.getProperty(SCN_STEP_SIZE).getValue())
        String initScn = context.getProperty(INIT_SCN).getValue()
        String schemaName = context.getProperty(SCHEMA_NAME).getValue()
        Sql sql
        Sql sql2
        try {
            sql = new Sql(conn)
            sql2 = new Sql(conn2)
            //0、判断是否需要初始化State中scn
            if (scn == -1) {
                scn = initScnFun(sql, initScn)
                updateStateScn(stateManager, stateMap, scn)
                return
            }
            //1、执行添加日志SQL语句
            executeAddLogFileSql(sql)
            //2、执行启动LogMiner SQL
            executeStartLogMinerSql(sql, scn, scnStepSize)
            //3、查询视图，并输出结果
            maxViewScn = getCurrentViewMaxScn(sql)
            log.debug("最大scn:${maxViewScn}")
            if(maxViewScn == -1){
                log.debug("无法获取最大事物scn号，本次调度结束")
                return
            }
            executeSelectContentSql(context, session, sql,sql2,maxViewScn,scn+1)
            //4、结束LogMiner
            executeEndLogMinerSql(sql)
        } catch(e) {
            throw new ProcessException(e)
        }finally {
            log.debug("Close Sql")
            sql?.close() 
            sql2?.close() 
        }
        //更新state逻辑 取到此次查询扫描到的最后 scn号.
        log.debug("本次调度查询到的最大事物提交scn:${maxViewScn}")
        updateStateScn(stateManager, stateMap, maxViewScn)
    }

    @Override
    Collection<ValidationResult> validate(ValidationContext context) { return null }

    @Override
    PropertyDescriptor getPropertyDescriptor(String name) {
        switch(name) {
            case 'Database Connection Pooling Service': return DBCP_SERVICE
            case 'INIT SCN': return INIT_SCN
            case 'SCN  STEP SIZE': return SCN_STEP_SIZE
            case 'SCHEMA NAME': return SCHEMA_NAME
            case 'TABLE NAME Regular Expression': return TABLE_NAME_REGEXP
            case 'TABLE NAME Regular Expression': return Max_Transaction_Length
            default: return null
        }
    }

    @Override
    void onPropertyModified(PropertyDescriptor descriptor, String oldValue, String newValue) { }

    @Override
    List<PropertyDescriptor> getPropertyDescriptors() { return [DBCP_SERVICE,INIT_SCN,SCN_STEP_SIZE,SCHEMA_NAME,Max_Transaction_Length,TABLE_NAME_REGEXP] as List }

    @Override
    String getIdentifier() { return 'AnalyzeLogMinerProcessor-InvokeScriptedProcessor' }

    void validateNull(Object obj,String errorMsg)throws ProcessException{
        if(null == obj){
            throw new ProcessException(errorMsg)
        }
    }

    void setLogger(ComponentLog logger){
        log = logger
    }

    /**
     * 更新state状态
     *
     * @param scn          最新的scn
     * @param stateMap     当前state中的stateMap
     * @param stateManager state管理器
     */
    private void updateStateScn(StateManager stateManager, StateMap stateMap, long scn) {
        Map<String, String> newMap = new HashMap<>(1)
        newMap.put("scn", scn + "")
        log.debug("LogMiner更新State中scn值为：${scn}")
        try {
            if (stateMap.getVersion() == -1) {
                stateManager.setState(newMap, Scope.CLUSTER)
            } else {
                stateManager.replace(stateMap, newMap, Scope.CLUSTER)
            }
        } catch (IOException e) {
            log.error("更新State中scn值为${scn}失败")
            throw new ProcessException(e)
        }
    }
    /**
    * 结束LogMiner
    */
    void executeEndLogMinerSql(Sql sql){
        String endLogMinerSql = "BEGIN DBMS_LOGMNR.END_LOGMNR;END;"
        log.debug("执行${endLogMinerSql}")
        sql.call(endLogMinerSql)
    }

    /**
     * 执行查询视图，将查询视图的结果转换成FlowFile，并路由到成功
     *
     * @param session   session
     * @param sql sql
     * @param context   context
     */
    void executeSelectContentSql(ProcessContext context, ProcessSession session, Sql sql,Sql sql2,long maxScn,long minScn) {
        String noRedoSql = "/* No SQL_REDO for temporary tables */"
        String schemaName = context.getProperty(SCHEMA_NAME).getValue()
        int maxTranLength = Integer.parseInt(context.getProperty(Max_Transaction_Length).getValue())
        // 因为commit表名是没有的  所以commit条件添加表名过滤可能造成数据遗漏
        String tableNameRegularStr = context.getProperty(TABLE_NAME_REGEXP).getValue()
        StringBuilder selectRedoSql = new StringBuilder("SELECT (XIDUSN || '.' || XIDSLT || '.' || XIDSQN) AS XID,SCN,START_SCN,COMMIT_SCN,TABLE_NAME,SEG_OWNER,OPERATION,SQL_REDO,CSF FROM " +
                "v\$logmnr_contents where ( OPERATION_CODE IN (1,2,3) ").append(" AND SEG_OWNER ='").append(schemaName).append("'")
        if(!StringUtils.isBlank(tableNameRegularStr)){
            selectRedoSql.append(" AND REGEXP_LIKE(TABLE_NAME,'").append(tableNameRegularStr).append("')")
        }
        selectRedoSql.append(")  OR (OPERATION_CODE = 7 AND START_SCN = 0 ) AND SCN <=").append(maxScn).append(" AND USERNAME != 'SYS' ") 
        
        log.debug("执行${selectRedoSql.toString()}")
        StringBuilder bigSqlRedo = null
        long fixCommitScn = 0
        sql.rows(selectRedoSql.toString()).eachWithIndex { row, idx ->
            long scn = row.getProperty("SCN").longValue()
            long csf = row.getProperty("CSF").longValue()
            long startScn = row.getProperty("START_SCN").longValue()
            long commitScn = row.getProperty("COMMIT_SCN").longValue()
            String operation =  row.getProperty("OPERATION")?toString()
            if(fixCommitScn != 0 && fixCommitScn != commitScn){
                log.debug("进入修补数据逻辑")
                fixData(session,sql2,fixCommitScn,maxTranLength)
                fixCommitScn = 0
            }
            if(startScn == 0 ){
                log.debug("发现遗漏数据，事务提交SCN号：${commitScn}.当前SCN号：${scn}")
                fixCommitScn = commitScn
            }else if (csf == 1){
                // csf为1 说明SQL超过4000字节 多行存储
                if(bigSqlRedo == null){
                    bigSqlRedo = new StringBuilder()
                }
                bigSqlRedo.append(row.getProperty("SQL_REDO"))
            }else{
                // 输出数据
                String sqlRedo
                if(bigSqlRedo != null){
                    sqlRedo =bigSqlRedo.append(row.getProperty("SQL_REDO")?.toString()).toString()
                    bigSqlRedo = null
                }else {
                    sqlRedo = row.getProperty("SQL_REDO")?.toString()
                }
                if(noRedoSql != sqlRedo){
                    FlowFile ff = session.create()
                    ff = session.putAttribute(ff, "SCN",scn?.toString())
                    ff = session.putAttribute(ff, "tableName", row.getProperty("TABLE_NAME")?.toString())
                    ff = session.putAttribute(ff, "segOwner", row.getProperty("SEG_OWNER")?.toString())
                    ff = session.putAttribute(ff, "operation", operation)
                    ff = session.write(ff, {outputStream ->
                    outputStream.write(sqlRedo.getBytes(StandardCharsets.UTF_8))
                } as OutputStreamCallback)
                    session.transfer(ff, REL_SUCCESS)
                    session.commit()
                }
            }
        }
        if(fixCommitScn != 0){
            log.debug("进入修补数据逻辑")
            fixData(session,sql2,fixCommitScn,maxTranLength)
        }
    }


    /**
     * 获取当前视图最大的scn
     *
     * @param Sql sql
     * @return 返回当前视图最大scn号
     * */
    private long getCurrentViewMaxScn(Sql sql) {
        String selectMaxCommitScnSql = "SELECT Max(SCN) as MAX FROM v\$logmnr_contents"
        log.debug("执行${selectMaxCommitScnSql}")
        String maxScn = sql.firstRow(selectMaxCommitScnSql).getProperty("MAX")?.toString()
        log.debug(""+maxScn)
        if(StringUtils.isBlank(maxScn)){
            maxScn = "-1"
        }
        return Long.parseLong(maxScn)
    }
    /**
     * 启动LogMiner 按照SCN范围
     *
     * @param sql   sql
     * @param scn         scn
     * @param scnStepSize scnStepSize
     */
    void executeStartLogMinerSql(Sql sql, long scn, long scnStepSize) {
        StringBuilder startLogMinerSql = new StringBuilder(getStartLogMinerPrefix())
        startLogMinerSql.append("STARTSCN => ").append(scn + 1)
                .append(",ENDSCN =>").append(scn + scnStepSize).append(",").append(getStartLogMinerSuffix())
        log.debug("执行 ${startLogMinerSql.toString()} ")
        sql.call(startLogMinerSql.toString())
    }
     /**
     * 启动LogMiner 按照时间范围范围
     *
     * @param sql   sql
     * @param scn         scn
     * @param scnStepSize scnStepSize
     */
    void executeStartLogMinerSql(Sql sql, String startTime, String endTime) {
        StringBuilder startLogMinerSql = new StringBuilder(getStartLogMinerPrefix())
        startLogMinerSql.append("STARTTIME => '").append(startTime)
                .append("',ENDTIME =>'").append(endTime).append("',").append(getStartLogMinerSuffix())
        log.debug("执行 ${startLogMinerSql.toString()} ")
        sql.call(startLogMinerSql.toString())
    }
    /**
    * 获取开启LogMiner日志前缀
    */
    String getStartLogMinerPrefix(){
        return "BEGIN DBMS_LOGMNR.START_LOGMNR("
    }
    /**
    * 获取开启LogMiner日志后缀
    */
    String getStartLogMinerSuffix(){
        return "OPTIONS => DBMS_LOGMNR.DICT_FROM_ONLINE_CATALOG " + //线上数据字典
            //自动注册日志 自动注册日志很慢
            //"+ DBMS_LOGMNR.CONTINUOUS_MINE " +
            //SQL 去掉分号
            "+ DBMS_LOGMNR.NO_SQL_DELIMITER  " +
            //去掉rowid
            "+ DBMS_LOGMNR.NO_ROWID_IN_STMT " +
            //过滤 只取committed DML
            "+ DBMS_LOGMNR.COMMITTED_DATA_ONLY " +
            //指定sql_redo和sql_undo中的number，日期、时间格式类型按照字面值表示
            "+ DBMS_LOGMNR.STRING_LITERALS_IN_STMT " +
            //调过损坏数据
            "+ DBMS_LOGMNR.SKIP_CORRUPTION);END;"
    }

     /**
     * 当state中不存在scn时，返回初始化scn
     *
     * @param sql sql
     * @param initScn   属性配置中的初始化scn值
     * @return 返回初始化的scn
     */
    long initScnFun(Sql sql, String initScn){
        long initValue
        if (!StringUtils.isBlank(initScn)) {
            initValue = Long.parseLong(initScn)
        } else {
            initValue = getCurrentScn(sql)
        }
        log.debug("Init the State Scn value :${initValue}")
        return initValue
    }

     /**
     * 执行LogMiner add log files SQL
     *
     * @param sql sql
     **/
    void executeAddLogFileSql(Sql sql){
        StringBuilder addLogFileSql = new StringBuilder()
        //查询线上redo log组，每组取一个日志文件读取
        sql.rows("SELECT * FROM (SELECT GROUP#,MEMBER,ROW_NUMBER() OVER(PARTITION BY GROUP# ORDER BY MEMBER) AS RN FROM v\$logfile) WHERE RN <= 1").eachWithIndex { row, idx ->
                    if(idx == 0){
                        addLogFileSql.append("BEGIN DBMS_LOGMNR.ADD_LOGFILE(LOGFILENAME => \'${row.getProperty("MEMBER")}\', OPTIONS => DBMS_LOGMNR.NEW)  ;")
                    }else{
                        addLogFileSql.append(" DBMS_LOGMNR.ADD_LOGFILE(LOGFILENAME => \'${row.getProperty("MEMBER")}\', OPTIONS => DBMS_LOGMNR.ADDFILE)  ;")
                    }
                }
        addLogFileSql.append(" END; ")
        log.debug("执行${addLogFileSql.toString()}")
        sql.call(addLogFileSql.toString())
    }

    /**
     * 获取state中的scn
     *
     * @param stateMap 当前state 中的Map
     * @return 返回转换成Long的scn
     */
    long getStateScn(StateMap stateMap) {
        String scn = stateMap.get("scn")
        if (StringUtils.isBlank(scn)) {
            return -1
        }
        return Long.parseLong(scn)
    }
     /**
     * 获取当前Oracle中最大的scn号
     *
     * @param sql sql
     * @return 返回当前最大的scn号
     */
    long getCurrentScn(Sql sql){
        String selectCurrentScnSql = "select dbms_flashback.get_system_change_number as CURRENT_SCN from dual"
        log.debug("执行${selectCurrentScnSql}")
        String currentScn = sql.rows(selectCurrentScnSql).get(0)?.getProperty("CURRENT_SCN")?.toString()
        return Long.parseLong(currentScn);
    }
    /**
    * 当发现事务start scn号小于当前开始scn号，说明有遗漏数据，启动另一个LogMiner进行修补数据
    *
    * @param sql sql
    */
    String scnToTimeStamp(Sql sql,long scn){
        String selectSql = "select to_char(scn_to_timestamp(${scn}),'YYYY-MM-DD HH24:MI:SS') as STRAT_TIME from dual"
        return sql.firstRow(selectSql).getProperty("STRAT_TIME").toString()
    }
    /**
    * 
    * @param sql sql
    */
    long timeStampToScn(Sql sql,String time){
        String selectSql = "select timestamp_to_scn(to_date('${time}','YYYY-MM-DD HH24:MI:SS')) as STRAT_SCN from dual"
        return Long.parseLong(sql.firstRow(selectSql).getProperty("STRAT_SCN").toString())
    }


    /**
    * 当发现事务start scn号小于当前开始scn号，说明有遗漏数据，启动另一个LogMiner进行修补数据
    * 测试环境发现  指定STARTTIME 比指定SCN号慢了20倍  同样的范围前者240s 后者10秒
    * @param sql sql
    */
    void fixData(ProcessSession session,Sql sql,long commitScn,int maxTranLength){
        String noRedoSql = "/* No SQL_REDO for temporary tables */"
        String endTime = scnToTimeStamp(sql,commitScn)
        Date endDate =  sdf.parse(endTime)
        Date startDate
        use (groovy.time.TimeCategory) {
            startDate = endDate - maxTranLength.seconds
        }
        String startTime = sdf.format(startDate)
        long startScn = timeStampToScn(sql,startTime)-2
        // String alterTimeFoemat = "ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD HH24:MI:SS'"
        //1、执行添加日志SQL语句
        executeAddLogFileSql(sql)
        //2、执行启动LogMiner SQL
        // sql.execute(alterTimeFoemat)
        executeStartLogMinerSql(sql, startScn, commitScn-startScn)
        StringBuilder selectRedoSql = new StringBuilder("SELECT SCN,START_SCN,COMMIT_SCN,TABLE_NAME,SEG_OWNER,OPERATION,SQL_REDO,CSF FROM " +
                "v\$logmnr_contents where SEG_TYPE=2 AND OPERATION_CODE IN (1,2,3) ").append(" AND COMMIT_SCN =").append(commitScn).append(" AND USERNAME != 'SYS'")
        // 
        log.debug("执行修复数据SQL${selectRedoSql.toString()}")
        StringBuilder bigSqlRedo = null
        sql.rows(selectRedoSql.toString()).eachWithIndex { row, idx ->
            // csf为1 说明SQL超过4000字节 多行存储
            if (row.getProperty("CSF") == 1){
                if(bigSqlRedo == null){
                    bigSqlRedo = new StringBuilder()
                }
                bigSqlRedo.append(row.getProperty("SQL_REDO"))
            }else {
                String sqlRedo
                if(bigSqlRedo != null){
                    sqlRedo =bigSqlRedo.append(row.getProperty("SQL_REDO")?.toString()).toString()
                    bigSqlRedo = null
                }else {
                    sqlRedo = row.getProperty("SQL_REDO")?.toString()
                }
                if(noRedoSql != sqlRedo){
                    FlowFile ff = session.create()
                    ff = session.putAttribute(ff, "SCN",row.getProperty("SCN")?.toString())
                    ff = session.putAttribute(ff, "tableName", row.getProperty("TABLE_NAME")?.toString())
                    ff = session.putAttribute(ff, "segOwner", row.getProperty("SEG_OWNER")?.toString())
                    ff = session.putAttribute(ff, "operation", row.getProperty("OPERATION")?.toString())
                    ff = session.write(ff, {outputStream ->
                    outputStream.write(sqlRedo.getBytes(StandardCharsets.UTF_8))
                } as OutputStreamCallback)
                    session.transfer(ff, REL_SUCCESS)
                    session.commit()
                }
                
            }
        }
    }
}

processor = new AnalyzeLogMinerProcessor()