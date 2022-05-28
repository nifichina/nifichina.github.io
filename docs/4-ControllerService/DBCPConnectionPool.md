# DBCPConnectionPool 
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述

提供数据库连接池服务。可以从池中请求连接，使用后返回连接。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

| Name | Default Value | Allowable Values | Description |
|--|--|--|--|
| **Database Connection URL** |  |  | 用于连接数据库的数据库连接URL。可能包含数据库系统名称，主机，端口，数据库名称和一些参数。数据库连接URL的确切语法由DBMS指定。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| **Database Driver Class Name** |  |  | 数据库驱动程序类名称 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| Database Driver Location(s) |  |  | 包含驱动程序JAR及其依赖项（如果有）的文件/文件夹和/或URL的逗号分隔列表。例如“/var/tmp/mariadb-java-client-1.1.7.jar” <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| Kerberos Credentials Service |  | **Controller Service API:** <br/> KerberosCredentialsService <br/> **Implementation:** <br/>KeytabCredentialsService | 指定应用于Kerberos身份验证的Kerberos凭据控制器服务 |
| Database User |  |  | Database user name <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| Password |  |  | The password for the database user <br/> **Sensitive Property: true** <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| **Max Wait Time** | 500 millis |  | 池在失败之前将等待（如果没有可用连接时）返回连接的最大时间，或者无限期等待-1。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| **Max Total Connections** | 8 |  | 可以同时从该池分配的活动连接的最大数量，或者为无限制的负数。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| Validation query |  |  | 验证查询，用于在返回连接之前对其进行验证。如果连接无效，它将被丢弃并返回新的有效连接。注意！！使用验证可能会降低性能。<br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| Minimum Idle Connections | 0 |  | 可以在池中保持空闲（不创建额外连接）的最小连接数，或者为零（不创建任何连接）。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| Max Idle Connections | 8 |  | 池中可以保持空闲（不释放多余连接）的最大连接数，或者为无限制的最大连接数。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| Max Connection Lifetime | -1 |  | 连接的最大生存时间（以毫秒为单位）。超过此时间后，连接将无法进行下一次激活，钝化或验证测试。零或更少的值表示连接具有无限的寿命。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| Time Between Eviction Runs | -1 |  | 空闲连接退出线程的两次运行之间要休眠的毫秒数。当为非肯定时，将不运行任何空闲的连接退出线程。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| Minimum Evictable Idle Time | 30 mins |  | 在有资格被驱逐之前，连接在池中可能处于空闲状态的最短时间。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| Soft Minimum Evictable Idle Time | -1 |  | 在空闲连接驱逐者有资格将其驱逐之前，连接可能在池中处于空闲状态的最短时间，另外还要有至少最少数量的空闲连接保留在池中的额外条件。如果此选项的非软版本设置为正值，则首先由空闲连接退出者检查它：当退出者访问空闲连接时，首先将空闲时间与之进行比较（不考虑空闲连接的数量） （在池中），然后针对此软选项（包括最小空闲连接限制）。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |

## 动态属性：

| Name | Value | Description |
|--|--|--|
| JDBC property name | JDBC属性值|指定要在JDBC连接上设置的属性名称和值。如果使用表达式语言，则将在启用控制器服务后执行评估。注意，在这些属性的表达式语言构造中没有可用的流文件输入（例如，属性）。<br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |

## 状态管理

此组件不存储状态。

## 限制

此组件不受限制。

## 系统资源方面的考虑

没有指定。

## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)