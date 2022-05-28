# ConsumeWindowsEventLog
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***


## 描述

注册Windows事件日志订阅回调，以从Windows上的事件接收FlowFiles。这些可以通过Channel和XPath进行过滤。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

| Name | Default Value | Allowable Values | Description |
|--|--|--|--|
| **Channel** | System |  | 监听的Windows事件日志通道.<br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| **XPath Query** | \* |  | XPath查询以过滤事件。 (See https://msdn.microsoft.com/en-us/library/windows/desktop/dd996910(v=vs.85).aspx for examples.) <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| **Maximum Buffer Size** | 1048576 |  | 各个事件日志XML呈现到缓冲区。这指定允许缓冲区增长到的最大大小（以字节为单位）。 （限制单个事件XML的最大大小。）|
| **Maximum queue size** | 1024 |  | 事件是异步接收的，并且在触发处理器时必须作为FlowFiles输出。这指定要排队转换为FlowFiles的最大事件数。 |
| **Inactive duration to reconnect** | 10 mins |  |如果在指定的时间段内未处理任何新的事件日志，则此处理器将尝试重新连接以从无法消耗任何其他消息的状态恢复。如果重新启动Windows事件日志服务，或者返回ERROR_EVT_QUERY_RESULT_STALE（15011），则可能发生这种情况。设置没有持续时间，例如“ 0 ms”禁用自动重新连接.<br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |


## 连接关系

Name    | Description                                   
------- | ----------------------------------------------
success | Relationship for successfully consumed events.


## 读取属性

没有指定。

## 写属性

Name      | Description                                   
--------- | ----------------------------------------------
mime.type | 将设置application/xml的MIME类型值。

## 状态管理

此组件不存储状态。

## 限制

此组件不受限制。

## 输入要求

此组件不允许传入关系。

## 系统资源方面的考虑

没有指定。


