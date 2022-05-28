# ListFTP

***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com**
***

## 描述

扫描FTP服务器上文件的列表。对于在远程服务器上找到的每个文件，将创建一个新的FlowFile，并将filename属性设置为远程服务器上文件的名称。然后可以将其与FetchFTP结合使用，以获取那些文件。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值(如果有默认值)，以及属性是否支持表达式语言。

| Name | Default Value | Allowable Values | Description |
|--|--|--|--|
| **Listing Strategy** | timestamps | ▪Tracking Timestamps<br/>▪Tracking Entities | 指定如何确定新的或者更新的实体。 |
| **Hostname** |  |  | 远程系统的完全限定主机名或IP地址<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| **Port** | 21 |  | 要连接到远程主机上的端口以从中获取数据<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| **Username** |  |  | Username<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Password |  |  | Password<br/>**Sensitive Property: true** <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Remote Path | . |  | 远程系统上从中提取或推送文件的路径<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Distributed Cache Service |  | **Controller Service API:** <br/>DistributedMapCacheClient<br/>**Implementations:** <br/>CouchbaseMapCacheClient<br/>DistributedMapCacheClientService<br/>HBase_2_ClientMapCacheService<br/>RedisDistributedMapCacheClientService<br/>HBase_1_1_2_ClientMapCacheService<br/> | 注意：此属性仅用于在0.5.0版引入状态管理之前的旧NiFi版本。缓存服务中存储的值将迁移到第一次启动此处理器时的状态。指定的控制器服务用于维护有关从远程服务器提取的内容的状态，以便如果新节点开始提取数据，它不会复制已完成的所有工作。如果未指定，则信息不会在集群中共享。不需要为NiFi的独立实例设置此属性，但如果NiFi在集群中运行，则应该配置此属性。 |
| **Search Recursively** | false | ▪true<br/>▪false | 如果为true，将从任意嵌套的子目录中提取文件；否则，将不遍历子目录 |
| **Follow symlink** | false | ▪true<br/>▪false | 如果为true，则将拉取偶数个符号文件和嵌套的符号子目录；否则，将不读取符号文件，也不会遍历符号链接子目录 |
| File Filter Regex |  |  | 提供用于筛选文件名的Java正则表达式；如果提供了筛选器，则只获取名称与该正则表达式匹配的文件 |
| Path Filter Regex |  |  | 当递归搜索为true时，将只扫描其路径与给定正则表达式匹配的子目录 |
| **Ignore Dotted Files** | true | ▪true<br/>▪false | 如果为true，则将忽略名称以点（“.”）开头的文件 |
| **Remote Poll Batch Size** | 5000 |  | 该值指定在执行文件列表时要在远程系统上的给定目录中找到多少文件路径。通常不需要修改此值，但当针对具有大量文件的远程系统进行轮询时，此值可能非常重要。将此值设置得太高可能导致性能非常差，而将其设置得太低可能导致流速度比正常值慢。 |
| **Connection Timeout** | 30 sec |  | 创建连接时在超时之前等待的时间量 |
| **Data Timeout** | 30 sec |  | 在本地和远程系统之间传输文件时，此值指定在不在系统之间传输任何数据的情况下允许经过多长时间 |
| Connection Mode | Passive | ▪Active<br/>▪Passive | FTP连接方式 |
| Transfer Mode | Binary | ▪Binary<br/>▪ASCII | FTP传输模式 |
| Proxy Configuration Service |  | **Controller Service API:**<br/>ProxyConfigurationService <br/>**Implementation:**<br/>StandardProxyConfigurationService | 指定代理网络请求的代理配置控制器服务。如果已设置，它将取代为每个组件配置的代理设置。支持的代理：HTTP+AuthN、SOCKS |
| Proxy Type | DIRECT | ▪DIRECT<br/>▪HTTP<br/>▪SOCKS | 用于文件传输的代理类型 |
| Proxy Host |  |  | 代理服务器的完全限定主机名或IP地址 <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Proxy Port |  |  | 代理服务器的端口 <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Http Proxy Username |  |  | Http代理用户名 <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Http Proxy Password |  |  | Http代理密码 <br/>**Sensitive Property: true** <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Internal Buffer Size | 16KB |  | 设置缓冲数据流的内部缓冲区大小 |
| **Target System Timestamp Precision** | auto-detect | ▪Auto Detect<br/>▪Milliseconds<br/>▪Seconds<br/>▪Minutes | 在目标系统上指定时间戳精度。由于此处理器使用实体的时间戳来确定应列出的实体，因此使用正确的时间戳精度至关重要。 |
| Entity Tracking State Cache |  | **Controller Service API:** <br/>DistributedMapCacheClient <br/>**Implementations:** <br/>DistributedMapCacheClientService<br/>HBase_2_ClientMapCacheService<br/>RedisDistributedMapCacheClientService<br/>HBase_1_1_2_ClientMapCacheService | **由'Tracking Entities'策略使用**。列出的实体存储在指定的高速缓存存储器中，以便该处理器可以在NiFi重新启动时或在主节点发生更改的情况下恢复列出。 'Tracking Entities'策略要求在最后一个'Tracking Time Window'内跟踪所有列出的实体的信息。为了支持大量实体，该策略使用DistributedMapCache而不是state。缓存键格式为'ListedEntities::{processorId}(::{nodeId})'.。如果它跟踪每个节点列出的实体，则将添加可选的':: {nodeId}'部分以单独管理状态。例如。群集范围的缓存键='ListedEntities::8dda2321-0164-1000-50fa-3042fe7d6a7b'，每个节点缓存键='ListedEntities::8dda2321-0164-1000-50fa-3042fe7d6a7b::nifi-node3' 。存储的缓存内容是已压缩的JSON字符串。更改目标列表配置时，缓存键将被删除。 |
| Entity Tracking Time Window | 3 hours |  | **由'Tracking Entities'策略使用**。指定此处理器应跟踪已列出实体的时间。 'Tracking Entities'策略可以选择时间戳在指定时间范围内的任何实体。例如，如果设置为 '30 minutes'，则在此处理器运行时，最近30分钟内具有时间戳的任何实体都将成为列表目标。如果满足以下条件之一，则列出的实体被认为是新的或者更新的，并输出FlowFile：<br/>1.在已经列出的实体中不存在； <br/>2.时间戳比缓存的实体新； <br/>3.大小不同于缓存的实体。<br/>如果缓存的实体的时间戳早于指定的时间窗口，则该实体将从缓存的已列出实体中删除。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Entity Tracking Initial Listing Target | all | ▪Tracking Time Window<br/>▪All Available | 指定应如何处理初始列表。由'Tracking Entities'策略使用。 |
| Entity Tracking Node Identifier | ${hostname()} |  | 配置的值将附加到高速缓存键，以便当跟踪状态的范围为LOCAL时，可以按NiFi节点跟踪列表状态，而不是集群范围的状态。由'Tracking Entities'策略使用。 <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |

### Relationships: 

| Name | Description |
|--|--|
| success | 接收到的所有流文件都将路由到成功 |

## 读取属性

没有指定。

## 写属性

| Name | Description |
|--|--|
| ftp.remote.host | FTP服务器的主机名 |
| ftp.remote.port | 在FTP服务器上连接到的端口 |
| ftp.listing.user | 执行FTP列表的用户的用户名 |
| file.owner | 源文件的数字所有者id |
| file.group | 源文件的数字组id |
| file.permissions | 源文件的读/写/执行权限 |
| file.size | 源文件中的字节数 |
| file.lastModifiedTime | 上次文件系统中的文件修改的时间戳，格式为 'yyyy-MM-dd'T'HH:mm:ssZ' |
| filename | FTP服务器上的文件名 |
| path | 从中提取文件的FTP服务器上目录的完全限定名 |

## 状态管理

| Scope | Description |
|--|--|
| CLUSTER |在执行文件列表后，将存储最新文件的时间戳。这允许处理器在下次运行处理器时仅列出在此日期之后添加或修改的文件。状态存储在整个群集中，因此该处理器只能在主节点上运行，并且如果选择了新的主节点，则新节点将不会复制以前的主节点列出的数据。|

## 限制

此组件不受限制。

## 输入要求

此组件不允许传入关系。

## 系统资源方面的考虑

没有指定。

