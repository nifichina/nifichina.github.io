# JoltTransformJSON
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述 

使用Jolt转换json,成功的路由到'success',失败的'failure'。处理JSON的实用程序不是基于流的，因此大型JSON文档转换可能会消耗大量内存。目前支持UTF-8流文件内容和Jolt Spec。可以使用表达式语言定义Spec，其中可以在Spec语法的左侧或右侧引用属性。支持自定义转换(实现转换接口)。包含当前类路径上不存在的自定义库的模块可以通过自定义模块目录属性包含。注意:在配置处理器时，如果用户选择了默认的转换，但仍然提供了一个链Spec，那么系统不会警告该Spec是无效的，并且会产生失败的流文件。这是确定的一个已知问题。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

属性名称                             |         默认值          | 可选值                                                                                                                    | 描述                                                                                            
-------------------------------- |-----------------------:| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------
**Jolt Transformation DSL**      | jolt-transform-chain | Cardinality <br>Chain<br>Default<br>Modify -Default<br>Modify - Define<br>Modify - Overwrite<br>Remove<br>Shift<br>Sort<br>Custom  | 指定应该使用哪种Jolt转换模式                                                                              
Custom Transformation Class Name |                      |                                                                                                                        | 自定义Jolt转换工具类的全类名                                                                              
Custom Module Directory          |                      |                                                                                                                        | 文件和/或目录的路径列表，其中包含包含自定义转换的模块(不包括在NiFi的类路径中)。                                                   
Jolt Specification               |                      |                                                                                                                        | JSON数据转换Spec。如果选择了Sort转换，则忽略此值。<br>支持表达式语言:true(将使用流文件属性和变量注册表进行计算)                             
**Transform Cache Size**         |          1           |                                                                                                                        | 编译一个震荡转换可能相当昂贵。理想情况下，这只会做一次。但是，如果在转换中使用了表达式语言，我们可能需要为每个流文件进行新的转换。这个值控制我们在内存中缓存多少个转换，以避免每次编译转换。
**Include Schema**               |        false         | true<br>false                                                                                                         | 如果为true，美化输出json的格式。                                                                          

  
## 连接关系

名称      | 描述        
------- | ----------
success | 成功地转换json 
failure | 未成功地转换json

  
读取属性:

没有指定。

## 写属性

Name      | Description     
--------- | ----------------
mime.type | application/json

## 状态管理

此组件不存储状态。

## 限制

此组件不受限制。

## 输入要求

此组件需要传入连接关系。

## 系统资源方面的考虑

没有指定。

## 应用场景

该组件使用开源JOLT库来实现批量JSON转换，JOLT目前是一个不基于流式的非常高效的json转换库，JOLT有自己定义的一套DSL。使用该组件需要先了解JOLT的知识，并编写出相应的JOLT规范。这里不做具体示例，可以直接参看[JOLT教程](../extend/jolt详解.md)。

