# AvroSchemaRegistry
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述

 该控制服务器提供一个注册和访问schema的服务，可以简单的理解为key-value。key是schema的名称,value是符合Avro Schema格式的文本

## 属性配置
在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。(1.11.4版本)

|属性名称|默认值|可选值|描述|
|----|----|----|----|
|Validate Field Names|true|▪true<br/>▪false<br/>|是否根据Avro命名规则验证Avro模式中的字段名。如果设置为true，所有字段名必须是有效的Avro名称，它必须以[A-Za-z_]开头，然后只包含[A-Za-z0-9_]。如果设置为false，则不会对字段名执行验证。|

## 状态管理

此组件不存储状态。

## 限制

无。

## 系统资源方面的考虑

无

## 深入讲解

内部实现就是一个ConcurrentHashMap，把schema存起来，根据key把schema取出来。

## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)