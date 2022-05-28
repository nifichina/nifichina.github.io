# ControlRate
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***


## 描述

控制将数据传输到后续处理器的速率。如果你配置一个非常小的持续时间,那么油门的精度会变得更差。你可以通过减少产出持续时间来提高这种准确性,但会牺牲给处理器的更多任务。

## 属性配置

在下面的列表中,必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的,并且指出属性默认值（如果有默认值）,以及属性是否支持表达式语言。

| Name | Default Value | Allowable Values | Description |
|--|--|--|--|
| **Rate Control Criteria** | data rate | * data rate <br/> * flowfile count <br/> * attribute value | 指示用于控制吞吐率的标准。更改此值将重置速率计数器。 |
| **Maximum Rate** |  |  | 数据应通过此处理器的最大速率。 如果将"Rate Control Criteria"设置为"data rate",则此属性的格式应为正整数或数据大小（例如"1 MB"）。 |
| Rate Controlled Attribute |  |  | 如果将"Rate Control Criteria"设置为"attribute value",则其值代表速率值的属性名称。该属性引用的属性的值必须为正long型,否则FlowFile将被路由到失败。 如果未将"Rate Control Criteria"设置为"attribute value",则将忽略此值。更改此值将重置速率计数器。 |
| **Time Duration** | 1 min |  | 速率计算的时间基本单位。更改此值将重置速率计数器。 |
| Grouping Attribute |  |  | 默认情况下,所有FlowFiles都使用一个"throttle"。如果指定了此值,则使用该名称的属性所指定的每个值都将使用单独的限制。更改此值将重置速率计数器。 |


## 连接关系

| Name | Description |
|--|--|
| success | FlowFiles are transferred to this relationship under normal conditions |
| failure | FlowFiles will be routed to this relationship if they are missing a necessary Rate Controlled Attribute or the attribute is not in the expected format |

## 读取属性

没有指定。

## 写属性

没有指定。

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