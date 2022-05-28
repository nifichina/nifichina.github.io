# ListFile

***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com**
***

## 描述

从本地文件系统检索文件列表。对于列出的每个文件，创建一个代表该文件的FlowFile，以便可以与**FetchFile**一起获取它。该处理器应该仅在群集中的主节点上运行。如果主节点发生更改，则新的主节点将在上一个节点离开的位置接管，而不会复制所有数据(不会重复)。与**GetFile**不同，此处理器不会从本地文件系统中删除任何数据。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值(如果有默认值)，以及属性是否支持表达式语言。

| 属性名称 | 默认值 | 可选值 | 描述 |
|--|--|--|--|
| **Input Directory** |  |  | 输入目录，从中提取文件 <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| **Listing Strategy** | timestamps | ▪Tracking Timestamps<br/>▪Tracking Entities  | 指定如何确定新的或者更新的实体。   |
| **Recurse Subdirectories** | true | ▪true<br/>▪false | 指示是否递归列出目录的子目录中的文件 |
| **Input Directory Location** | Local | ▪Local<br/>▪Remote  | 指定`Input Directory`的位置。这用于确定state应存储在本地还是跨集群存储。 |
| **File Filter** | [^\.].* |  | 仅选择名称与给定正则表达式匹配的文件|
| Path Filter |  |  | 如果`Recurse Subdirectories`为true，则仅扫描其路径与给定正则表达式匹配的子目录 |
| **Include File Attributes** | true | ▪true<br/>▪false | 是否包括文件属性信息(例如文件的上次修改时间和所有者)作为FlowFile属性。根据所使用的文件系统，收集此信息可能会很昂贵，因此应考虑禁用该配置。对于远程文件共享尤其如此。 |
| **Minimum File Age** | 0 sec |  | 文件必须被获取的最小时间段；小于此时间长度(根据上次修改日期)的任何文件将被忽略|
| Maximum File Age |  |  | 文件必须被获取的最大时间段；任何超过此时间(根据上次修改日期)的文件将被忽略|
| **Minimum File Size** | 0 B |  | 文件必须达到的最小大小|
| Maximum File Size |  |  | 可以获取的文件的最大大小|
| **Ignore Hidden Files** | true | ▪true<br/>▪false | 指示是否应忽略隐藏文件 |
| **Target System Timestamp Precision** | auto-detect | ▪Auto Detect<br/>▪Milliseconds<br/>▪Seconds<br/>▪Minutes | 在目标系统上指定时间戳精度。由于此处理器使用实体的时间戳来确定应列出的实体，因此使用正确的时间戳精度至关重要。 |
| Entity Tracking State Cache |  | **Controller Service API:** <br/>DistributedMapCacheClient <br/>**Implementations:** <br/>DistributedMapCacheClientService<br/>HBase_2_ClientMapCacheService<br/>RedisDistributedMapCacheClientService<br/>HBase_1_1_2_ClientMapCacheService| **由'Tracking Entities'策略使用**。列出的实体存储在指定的高速缓存存储器中，以便该处理器可以在NiFi重新启动时或在主节点发生更改的情况下恢复列出。 'Tracking Entities'策略要求在最后一个'Tracking Time Window'内跟踪所有列出的实体的信息。为了支持大量实体，该策略使用DistributedMapCache而不是state。缓存键格式为'ListedEntities::{processorId}(::{nodeId})'.。如果它跟踪每个节点列出的实体，则将添加可选的':: {nodeId}'部分以单独管理状态。例如。群集范围的缓存键='ListedEntities::8dda2321-0164-1000-50fa-3042fe7d6a7b'，每个节点缓存键='ListedEntities::8dda2321-0164-1000-50fa-3042fe7d6a7b::nifi-node3' 。存储的缓存内容是已压缩的JSON字符串。更改目标列表配置时，缓存键将被删除。 |
| Entity Tracking Time Window | 3 hours |  |**由'Tracking Entities'策略使用**。指定此处理器应跟踪已列出实体的时间。 'Tracking Entities'策略可以选择时间戳在指定时间范围内的任何实体。例如，如果设置为 '30 minutes'，则在此处理器运行时，最近30分钟内具有时间戳的任何实体都将成为列表目标。如果满足以下条件之一，则列出的实体被认为是新的或者更新的，并输出FlowFile：<br/>1.在已经列出的实体中不存在； <br/>2.时间戳比缓存的实体新； <br/>3.大小不同于缓存的实体。<br/>如果缓存的实体的时间戳早于指定的时间窗口，则该实体将从缓存的已列出实体中删除。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Entity Tracking Initial Listing Target | all | ▪Tracking Time Window<br/>▪All Available  | 指定应如何处理初始列表。由'Tracking Entities'策略使用。 |
| Entity Tracking Node Identifier | ${hostname()} |  | 配置的值将附加到高速缓存键，以便当跟踪状态的范围为LOCAL时，可以按NiFi节点跟踪列表状态，而不是集群范围的状态。由'Tracking Entities'策略使用。 <br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| **Track Performance** | false | ▪true<br/>▪false | 处理器是否应跟踪磁盘访问操作的性能。如果为true，将记录对磁盘的所有访问，包括正在访问的文件，获取的信息以及花费的时间。然后定期将其记录在调试级别。尽管将限制数据量，但是此选项可能仍会消耗大量堆(由'Maximum Number of Files to Track' 属性控制)，但是如果性能下降这个属性会帮助我们降低故障排除的难度，这将非常有用。|
| **Maximum Number of Files to Track** | 100000 |  | 如果'Track Performance' 属性设置为true，则此属性指示应保留其性能指标的最大文件数。较小的此属性值将导致较少的堆利用率，而较大的值可提供有关磁盘访问操作如何执行的更准确的见解。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Max Disk Operation Time | 10 secs |  | 预计任何单个磁盘操作将花费的最长时间。如果任何磁盘操作花费的时间超过此时间量，则将为每个超过此时间量的操作生成警告公告。<br/>**Supports Expression Language: true (will be evaluated using variable registry only)** |
| Max Directory Listing Time | 3 mins |  | 列出任何单个目录所需的最长时间。如果"输入目录"属性指定的目录列表或任何子目录的列表(如果"递归"设置为true)花费的时间超过此时间，则将为每个目录列表生成警告公告超过了这段时间。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |

## 连接关系

| Name | Description |
|--|--|
| success | 接收到的所有FlowFiles都会成功路由 |

## 读取属性

没有指定。

## 写属性

| Name | Description |
|--|--|
| filename | 从文件系统读取的文件的名称。 |
| path | 与`Input Directory`属性相比，该路径设置为文件系统上文件目录的相对路径。例如，如果输入目录设置为/tmp，则从/tmp拾取的文件的path属性将设置为"/"。如果`Recurse Subdirectories`属性设置为true，并且从/tmp/abc/1/2/3拾取了文件，则path属性将设置为"abc/1/2/3/"。 |
| absolute.path | absolute.path设置为文件系统上文件目录的绝对路径。例如，如果`Input Directory`属性设置为/tmp，则从/tmp拾取的文件会将path属性设置为"/tmp/"。如果`Recurse Subdirectories`属性设置为true，并且从/tmp/abc/1/2/3拾取了文件，则path属性将设置为"/tmp/abc/1/2/3/"。 |
| file.owner | 在文件系统中拥有文件的用户 |
| file.group | 拥有文件系统中文件的组 |
| file.size | 文件系统中文件中的字节数 |
| file.permissions | 文件系统中文件的权限。所有者的格式为3个字符，组为3个字符，其他用户为3个字符。例如rw-rw-r-- |
| file.lastModifiedTime | 文件系统中文件的最后时间戳格式为'yyyy-MM-dd'T'HH:mm:ssZ' |
| file.lastAccessTime | 上次访问文件系统中文件的时间的时间戳格式为'yyyy-MM-dd'T'HH:mm:ssZ'|
| file.creationTime | 文件系统中文件的创建时间格式为'yyyy-MM-dd'T'HH:mm:ssZ' ||                                                                                                                                                                                                                                                                                                           
## 状态管理

| Scope | Description |
|--|--|
| LOCAL, CLUSTER | 在执行文件列表后，将存储最新文件的时间戳。这允许处理器在下次运行处理器时仅列出在此日期之后添加或修改的文件。状态存储在本地范围还是群集范围取决于`<Input Directory Location>`属性的值。|

## 限制

此组件不受限制。

## 输入要求

此组件不允许传入关系。

## 系统资源方面的考虑

没有指定。

## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)