# DetectDuplicate
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述

为每个传入的流文件缓存从流文件属性计算出来的值，并确定这个值是否重复。如果是，则将流文件添加一个`original.identifier`(值在`<FlowFile description>`属性中指定)属性后路由到`duplicate`。如果不重复，则处理器将流文件路由到`non-duplicate`。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

| Name | Default Value | Allowable Values | Description |
|--|--|--|--|
| **Cache Entry Identifier** | ${hash.value} |  | 流文件属性或属性表达式语言，然后根据流文件进行计算，以确定用于标识重复项的值(缓存的正是此值) <br/>**Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| **FlowFile Description** |  |  | 当一个流文件的标识被添加到缓存中时，该值将与它一起存储，以便后面如果发现重复的流文件，这个描述信息将被添加到重复流文件的属性中(`original.flowfile.description`)<br/>**Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| Age Off Duration |  |  | 缓存流文件过期的时间间隔 |
| **Distributed Cache Service** |  | **Controller Service API:** <br/>DistributedMapCacheClient<br/>**Implementations:** ▪CouchbaseMapCacheClient<br/>▪DistributedMapCacheClientService<br/>▪HBase_2_ClientMapCacheService<br/>▪RedisDistributedMapCacheClientService<br/>▪HBase_1_1_2_ClientMapCacheService| 用于缓存唯一标识符的控制器服务，用于确定重复项 |
| Cache The Entry Identifier | true | ▪true<br/>▪false |如果为true，则会导致处理器检查流文件是否重复时存储流文件的唯一标识到缓存中。如果为false，处理器将只检查是否重复，而不缓存流文件标识，这可能需要另一个处理器向分布式缓存添加流文件的唯一标识。 |                                                             

## 连接关系

| Name | Description |
|--|--|
| duplicate | 如果检测到流文件是重复的，它将被路由到此关系 |
| non-duplicate | 如果在缓存中找不到FlowFile的缓存条目标识符，它将被路由到该关系 |
| failure | 如果无法与缓存通信，则FlowFile将受到处罚并路由到该关系 |


## 读取属性

没有指定。

## 写属性

### 

| Name | Description |
|--|--|
| original.flowfile.description | All FlowFiles routed to the duplicate relationship will have an attribute added named original.flowfile.description. The value of this attribute is determined by the attributes of the original copy of the data and by the FlowFile Description property. |

## 状态管理

此组件不存储状态。

## 限制

此组件不受限制。

## 输入要求

此组件需要传入关系。

## 系统资源方面的考虑

没有指定。

## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)