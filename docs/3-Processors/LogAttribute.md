# LogAttribute
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***


## 描述

该处理器流属性输出到日志中。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

属性名称                                       |  默认值  | 可选值                                   | 描述                                                                                             
------------------------------------------ |--------:| ------------------------------------- | -----------------------------------------------------------------------------------------------
**Log Level**                              | info  | ▪trace<br/> ▪debug<br/> ▪info▪warn<br/> ▪error | 将属性输出到日志的级别                                                                                    
**Log Payload**                            | false | ▪true<br/> ▪false                        | 如果为true，将记录流文件的有效负载及其属性;否则，只记录属性。                                                              
Attributes to Log                          |       |                                       | 以逗号分隔的要记录的属性列表。如果没有指定，所有属性都将被记录，除非修改“Attributes to Log by Regular Expression”。这两个性质之间有一个AND关系。 
Attributes to Log by Regular Expression    |  .*   |                                       | 指示要记录的属性的正则表达式。如果没有指定，所有属性都将被记录，除非“Attributes to Log”被修改。这两个性质之间有一个AND关系。                      
Attributes to Ignore                       |       |                                       | 要忽略的属性的逗号分隔列表。如果没有指定，则不会忽略任何属性，除非修改“Attributes to Ignore by Regular Expression”。这两个属性之间有一个OR关系。
Attributes to Ignore by Regular Expression |       |                                       | 指示要忽略的属性的正则表达式。如果没有指定，则不会忽略任何属性，除非修改“Attributes to Ignore”。这两个属性之间有一个OR关系。                     
Log prefix                                 |       |                                       | 日志前缀<br>支持表达式语言:true                                                                             
**Character Set**                          | UTF-8 |                                       | 编码<br>支持表达式语言:true(只使用变量注册表进行计算)                                                                

## 连接关系

|名称|描述|
|----|----|
|sucess|所有的流文件都被路由到这个关系|

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

## 应用场景

用于输出流中的某些属性到日志中。

## 示例说明

1：将某属性输出到日志当中

![](../image/processors/LogAttribute/config.png)

输出结果

![](../image/processors/LogAttribute/result.png)

## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)