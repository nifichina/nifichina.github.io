# Notify
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***


## 描述

在分布式缓存中存储一个信号，还可以选择与FlowFile的属性一起缓存。一旦在缓存中发现此信号，将释放在相应的Wait处理器中保存的所有流文件。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

| Name | Default Value | Allowable Values | Description |
|--|--|--|--|
| **Release Signal Identifier** |  |  | 值或根据FlowFile和属性表达式语言计算的结果，以确定释放信号缓存键 <br/>**Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| **Signal Counter Name** | default |  |值或根据FlowFile和属性表达式语言计算的结果，以确定信号计数器名称。当相应的Wait处理器需要知道不同类型事件（如成功或失败，或目标数据源名称等）的出现次数时，信号计数器名称非常有用。<br/>**Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| **Signal Counter Delta** | 1 |  | 值或根据FlowFile和属性表达式语言计算的结果，以确定信号计数器增量。指定计数器应增加多少。例如，如果在上游流中以批处理的方式处理多个信号事件，则可以使用此属性一次性通知处理的事件数。零（0）有一个特殊的含义，它将目标计数清除回0，这在与Wait的Releasable FlowFile Count =0（0）模式一起使用时特别有用，以提供“开-关”类型的流控制。一个（1）可以打开一个相应的等待处理器，而零（0）可以使它否定，就像关闭一个门一样。<br/>**Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| **Signal Buffer Count** | 1 |  | 指定在将信号通知高速缓存服务之前可以缓冲的最大传入流文件数。缓冲区越多，性能越好，因为当多个传入流文件共享同一信号标识符时，通过按信号标识符对信号进行分组，它减少了与缓存服务的交互次数。 |
| **Distributed Cache Service** |  | **Controller Service API:** <br/>AtomicDistributedMapCacheClient<br/>**Implementations:** *CouchbaseMapCacheClient<br/>RedisDistributedMapCacheClientService<br/>DistributedMapCacheClientService<br/>HBase_1_1_2_ClientMapCacheService<br/>HBase_2_ClientMapCacheService| Controller Service用于缓存释放信号，以便释放在相应的Wait处理器中排队的文件 |
| Attribute Cache Regex |  |  | 名称与该正则表达式匹配的任何属性都将存储在分布式缓存中，以复制到从相应的Wait处理器释放的任何FlowFiles中。请注意，无论此值如何，都不会缓存uuid属性。如果为空，则不会缓存任何属性。 |

## 连接关系

### 

Name    | Description                                                                                                                                    
------- | -----------------------------------------------------------------------------------------------------------------------------------------------
success | 已在缓存中成功输入释放信号的所有FlowFiles将被路由到此关系               
failure | 当无法访问缓存时，或者如果Release Signal Identifier计算的值为null或为空，则FlowFiles将被路由到该关系

## 读取属性

没有指定。

## 写属性

### 

Name     | Description                                                                                                                        
-------- | -----------------------------------------------------------------------------------------------------------------------------------
notified | 所有FlowFiles都会写入一个属性“notified”。此属性的值为true，即通知了FlowFile，否则为false。

## 状态管理

此组件不存储状态。

## 限制

此组件不受限制。

## 输入要求

此组件需要传入关系。

## 系统资源方面的考虑

没有指定。

