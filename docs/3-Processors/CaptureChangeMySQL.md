# CaptureChangeMySQL

***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com**
***

## 描述

从MySQL数据库检索更改数据捕获（CDC）事件。 CDC事件包括INSERT，UPDATE，DELETE操作。事件按操作发生时的顺序输出为单独的流文件。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

|属性名称|默认值|可选值|描述|
|----|----|----|----|
| **MySQL Hosts** |  |  | 与MySQL集群中的节点相对应的主机名/端口项的列表。条目应使用冒号（如host1:port、host2:port…）进行逗号分隔，。。。。例如mysql.myhost.com:3306. 此处理器将尝试按顺序连接到列表中的主机。如果一个节点关闭，并且为群集启用了故障转移，那么处理器将连接到活动节点（假设在此属性中指定了其主机项）。MySQL连接的默认端口是3306。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| **MySQL Driver Class Name** | com.mysql.jdbc.Driver |  | MySQL数据库驱动程序类的类名 <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| MySQL Driver Location(s) |  |  | 包含MySQL驱动程序JAR及其依赖项（如果有的话）的文件/文件夹和/或url的逗号分隔列表。例如'/var/tmp/mysql-connector-java-5.1.38-bin.jar文件'<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Username |  |  | 访问MySQL集群的用户名 <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Password |  |  | 访问MySQL集群的密码 <br/>**Sensitive Property: true** <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Server ID |  |  | 连接到MySQL复制组的客户机实际上是一个简化的从机（服务器），服务器ID值在整个复制组中必须是唯一的（即不同于任何主或从机使用的任何其他服务器ID）。因此，CaptureChangeMySQL的每个实例在整个复制组中都必须具有唯一的服务器ID。如果未指定服务器ID，则默认为65535。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Database/Schema Name Pattern |  |  | 用于根据CDC事件列表匹配数据库（或模式，具体取决于RDBMS的术语）的正则表达式（regex）。regex必须与存储在RDBMS中的数据库名称匹配。如果未设置属性，则数据库名称将不会用于筛选CDC事件。注意：DDL事件，即使它们影响不同的数据库，也与会话用来执行DDL的数据库相关联。这意味着，如果连接到一个数据库，但对另一个数据库发出DDL，则连接的数据库将是与指定模式匹配的数据库。|
| Table Name Pattern |  |  | 用于匹配影响匹配表的CDC事件的正则表达式（regex）。regex必须与存储在数据库中的表名匹配。如果未设置属性，则不会根据表名筛选任何事件。|
| **Max Wait Time** | 30 seconds |  | 允许建立连接的最长时间，零表示实际上没有限制。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Distributed Map Cache Client |  | **Controller Service API:** <br/>DistributedMapCacheClient<br/>**Implementations:** CouchbaseMapCacheClient<br/>DistributedMapCacheClientService<br/>HBase_2_ClientMapCacheService<br/>RedisDistributedMapCacheClientService<br/>HBase_1_1_2_ClientMapCacheService| 标识用于保存处理器所需的各种表、列等信息的分布式映射缓存客户端控制器服务。如果未指定客户端，则生成的事件将不包括列类型或名称信息。|
| **Retrieve All Records** | true | * true<br/>* false | 指定是否获取所有可用的CDC事件，而不考虑当前的binlog文件名和/或位置。如果处理器状态中存在binlog文件名和位置值，则忽略此属性的值。这允许4种不同的配置：1）如果binlog数据在处理器状态下可用，则用于确定开始位置，并忽略Retrieve All Records的值。2） 如果没有binlog数据处于处理器状态，则检索设置为true的所有记录意味着从binlog历史记录的开头开始。3） 如果没有binlog数据处于处理器状态且未设置初始binlog文件名/位置，则检索设置为false的所有记录意味着从binlog历史记录的末尾开始。4） 如果没有binlog数据处于处理器状态并且设置了初始binlog文件名/位置，则检索设置为false的所有记录意味着从指定的初始binlog文件/位置开始。要重置行为，请清除处理器状态（请参阅处理器文档的状态管理部分）。 |
| **Include Begin/Commit Events** | false | * true<br/>* false | 指定是否发出与二进制日志中的开始或提交事件相对应的事件。如果下游流中需要开始/提交事件，则设置为true，否则设置为false，这将抑制这些事件的生成并可以提高流性能。|
| **Include DDL Events** | false | * true<br/>* false | 指定是否发出与数据定义语言（DDL）事件对应的事件，如ALTER TABLE、TRUNCATE TABLE，例如在二进制日志中。如果下游流中需要/需要DDL事件，则设置为true，否则设置为false，这将抑制这些事件的生成，并可以提高流性能。 |
| **State Update Interval** | 0 seconds |  | 指示使用binlog文件/位置值更新处理器状态的频率。值为零表示只有在处理器停止或关闭时才会更新该状态。如果在某个点上处理器状态不包含所需的binlog值，则发出的最后一个流文件将包含最后观察到的值，并且可以使用初始binlog文件、初始binlog位置和初始序列ID属性将处理器返回到该状态。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Initial Sequence ID |  |  | 指定要在该处理器的状态没有当前序列标识符时使用的初始序列标识符。如果处理器状态中存在序列标识符，则忽略此属性。序列标识符是单调递增的整数，记录处理器生成的流文件的顺序。它们可以与EnforceOrder处理器一起使用，以保证CDC事件的有序交付。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Initial Binlog Filename |  |  | 指定要在该处理器的状态没有当前binlog文件名时使用的初始binlog文件名。如果处理器状态中存在文件名，则忽略此属性。如果不需要以前的事件，这可以与初始Binlog位置一起用于“向前跳过”。请注意，支持NiFi表达式语言，但此属性在配置处理器时计算，因此不能使用流文件属性。支持表达式语言以启用变量注册表和/或环境属性。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Initial Binlog Position |  |  | 指定要在该处理器的状态没有当前binlog文件名时使用的binlog（由初始binlog文件名指定）的初始偏移量。如果处理器状态中存在文件名，则忽略此属性。如果不需要以前的事件，可以将其与初始Binlog文件名一起使用以“向前跳过”。请注意，支持NiFi表达式语言，但此属性在配置处理器时计算，因此不能使用流文件属性。支持表达式语言以启用变量注册表和/或环境属性。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |

## 连接关系

Name    | Description                                             
------- | --------------------------------------------------------
success | 从SQL查询结果集中成功创建的FlowFile。

## 读取属性

没有指定。

## 写属性

| Name | Description |
|--|--|
| cdc.sequence.id | 序列标识符（即严格增加的整数值），用于指定CDC事件流文件相对于其他事件流文件的顺序。 |
| cdc.event.type |一个字符串，指示发生的CDC事件的类型，包括（但不限于）“开始”，“插入”，“更新”，“删除”，“ ddl”和“提交”。 |
| mime.type | 处理器以JSON格式输出流文件内容，并将mime.type属性设置为application/json|                                         

## 状态管理

| Scope | Description |
|--|--|
| CLUSTER | 该处理器将信息（例如指向数据库中当前CDC事件的“指针”）存储在此处理器中，以便在重新启动后可以从同一位置继续。 |

## 限制

没有限制

## 输入要求

此组件不允许传入连接

## 系统资源方面的考虑

没有指定。


