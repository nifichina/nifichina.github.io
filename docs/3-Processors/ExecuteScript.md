# ExecuteScript
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述

脚本处理器。脚本负责处理传入的流文件以及任何脚本创建的流文件(例如，转移到成功或删除)。如果处理不完整或不正确，会话将回滚。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。


| 属性名称 | 默认值 | 可选值 | 描述 |
|--|--|--|--|
| **Script Engine** | Clojure | ▪Clojure<br/>▪ECMAScript<br/>▪Groovy<br/>▪lua<br/>▪python<br/>▪ruby | 脚本执行引擎 |
| Script File |  |  | 脚本文件的目录地址，`Script File`和`Script Body`只能使用一个。<br/>支持表达式语言:true |
| Script Body |  |  | 脚本内容。`Script File`和`Script Body`只能使用一个。<br/>支持表达式语言:true |
| Module Directory |  |  | 以逗号分隔的第三方库。<br/>支持表达式语言:true |


## 动态属性

该处理器允许用户指定属性的名称和值。

|属性名称|属性值|描述|
|----|----|----|
|要更新的脚本引擎属性|要将其设置为的值|用动态属性的值指定的值更新由动态属性的键指定的脚本引擎属性。<br>支持表达式语言:true|

## 连接关系

|名称|描述|
|----|----|
|failure|处理失败的流文件|
|sucess|成功处理的流文件|

## 读取属性

没有指定。

## 写属性

没有指定。

## 状态管理

|Scope|Description|
|----|----|
|LOCAL, CLUSTER|脚本可以使用状态管理API存储和检索状态。|

## 限制

|Required Permission|Explanation|
|----|----|
|execute code|提供操作符执行任意代码的能力，假设NiFi具有所有权限。|

## 输入要求

没有指定。

## 系统资源方面的考虑

没有指定。


## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)