# Wait
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***


## 描述

将传入的FlowFiles路由到“wait”关系，直到从相应的Notify处理器将匹配的释放信号存储在分布式缓存中为止。 当识别到匹配的释放信号时，等待的FlowFile被路由到“success”关系，具有从FlowFile复制的属性，这些属性从Notify处理器生成了释放信号。 然后从缓存中删除释放信号条目。如果等待的FlowFiles超过了Expireation Duration，它们将被路由到“expired”。 如果需要等待多个信号，请通过'Target Signal Count'（Target Signal Count）属性指定所需的信号数。 这对于将源FlowFile分成多个片段的处理器（例如SplitText）特别有用。 为了等待所有片段被处理，请将“original”关系连接到Wait处理器，并将'splits'关系连接到相应的通知处理器。将'${fragment.identifier}'配置到Notify和Wait的'Release Signal Identifier'，将'${fragment.count}'配置到Wait的'Target Signal Count'。 当使用“wait”关系作为循环时，建议使用优先级排序器（例如先进先出）。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

| Name | Default Value | Allowable Values | Description |
|--|--|--|--|
| **Release Signal Identifier** |  |  | 值或根据FlowFile和属性表达式语言计算的结果，以确定释放信号缓存键 <br/>**Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| **Target Signal Count** | 1 |  | 值或根据FlowFile和属性表达式语言计算的结果，以确定目标信号计数。该处理器检查信号计数是否已达到此数目。 如果指定了信号计数器名称，则该处理器检查特定的计数器，否则检查信号中的总计数。<br/> **Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| Signal Counter Name |  |  | 值或根据FlowFile和属性表达式语言计算的结果，以确定信号计数器名称。如果未指定，则此处理器检查信号中的总数。<br/>**Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| **Wait Buffer Count** | 1 |  | 指定可以缓冲以检查其是否可以向前移动的最大传入FlowFiles数。 更多的缓冲区可以提供更好的性能，因为它通过按信号标识符对FlowFiles进行分组来减少与缓存服务的交互次数。 在处理器执行时只能处理信号标识符。|
| **Releasable FlowFile Count** | 1 |  | 值或根据FlowFile和属性表达式语言计算的结果，以确定可释放的FlowFile计数。这指定当目标计数达到目标信号计数时可以释放多少个FlowFiles。零（0）具有特殊含义，只要信号计数与目标匹配，就可以释放任意数量的FlowFile。 <br/>**Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| **Expiration Duration** | 10 min |  | 指示等待的FlowFiles将被路由到“expired”关系的持续时间 |
| **Distributed Cache Service** |  | **Controller Service API:** <br/> AtomicDistributedMapCacheClient<br/> **Implementations:**CouchbaseMapCacheClient<br/>RedisDistributedMapCacheClientService<br/>DistributedMapCacheClientService<br/>HBase_1_1_2_ClientMapCacheService<br/>HBase_2_ClientMapCacheService| 控制器服务，用于检查来自相应通知处理器的释放信号 |
| **Attribute Copy Mode** | keeporiginal | * Replace if present <br/>* Keep original | 指定如何处理从FlowFiles复制到进入Notify处理器的属性 |
| **Wait Mode** | wait | * Transfer to wait relationship <br/>* Keep in the upstream connection | 指定如何处理等待通知信号的FlowFile |
| Wait Penalty Duration |  |  | 如果进行了配置，则在处理完信号标识符但不满足发布标准后，该信号标识符将受到处罚，并且具有信号标识符的FlowFiles将在指定的时间段内不再进行处理，因此该信号标识符将不会阻止其他对象被处理。这对于需要等待处理器来处理多个信号标识符，并且每个信号标识符具有多个FlowFiles，并且在信号标识符中释放FlowFiles的顺序很重要的用例很有用。可以使用优先级排序器配置FlowFile顺序。重要说明：可以处理排队信号的数量受到限制，并且等待处理器可能无法检查所有排队信号ID。请参阅其他详细信息，以获取最佳实践。 |

## 连接关系

Name    | Description                                                                                                                                    
------- | -----------------------------------------------------------------------------------------------------------------------------------------------
expired | 超过配置的有效期限的FlowFile将被路由到此关系                                  
success | 在缓存中具有匹​​配释放信号的FlowFile将被路由到此关系                                                
wait    | 缓存中没有匹配释放信号的FlowFile将被路由到此关系                                          
failure | 当无法访问缓存时，或者如果Release Signal Identifier计算的值为null或为空，则FlowFiles将被路由到该关系

## 自定义连接关系


## 读取属性

没有指定。

## 写属性

| Name | Description |
|--|--|
| wait.start.timestamp | 所有FlowFiles都将具有“wait.start.timestamp”属性，该属性设置文件首次进入此处理器时的初始时期时间戳。这用于确定FlowFile的到期时间。当FlowFile转移到失败或成功时，不会写入此属性 |
| wait.counter.`<counterName>` |如果处理器运行时存在信号，则将复制信号中的每个计数值。 |

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