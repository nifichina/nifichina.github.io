# AvroReader
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述

 该控制服务器解析Avro数据，并将每个Avro记录作为单独的Record对象返回。 Avro数据可能内置schema数据，或者可以通过`Schema Access Strateg`属性提供的方法获取schema。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。(1.11.4版本)

|属性名称|默认值|可选值|描述|
|----|----|----|----|
|**Schema Access Strategy**|embedded-avro-schema|▪Use 'Schema Name' Property<br/>▪Use 'Schema Text' Property<br/>▪HWX Schema Reference Attributes<br/>▪HWX Content-Encoded Schema Reference<br/>▪Confluent Content-Encoded Schema Reference<br/>▪Use Embedded Avro Schema|指定如何获取用于解释数据的schema信息。|
|Schema Registry||Controller Service API:<br/>SchemaRegistry<br/>Implementations: <br/>ConfluentSchemaRegistry<br/>AvroSchemaRegistry<br/>HortonworksSchemaRegistry|指定Schema策略的控制服务器|
|Schema Name|${schema.name}||如果使用了Schema Registry,指定需要查找的schema的名称<br/>支持表达式语言:true|
|Schema Version|||指定要在Schema Registry中查找的schema的版本，不指定则默认取最新版本<br/>支持表达式语言:true|
|Schema Branch|||定在Schema Registry属性中查找schema时要使用的分支名称。如果选择的策略不支持branch，则忽略此配置<br/>支持表达式语言:true|
|Schema Text|${avro.schema}||Avro格式的schema文本<br/>支持表达式语言:true|
|**Cache Size**|1000||缓存schema的大小|


## 状态管理

此组件不存储状态。

## 限制

无。

## 系统资源方面的考虑

无

## 深入讲解

在NIFI的Controller Service中，有一批以Reader、Writer结尾的读写器。AvroReader顾名思义，就是读取avro格式数据的。

在属性配置里我们看到只有两个是必填的。而**Cache Size**很简单，配置缓存大小，缓存schema信息的。

对于**Schema Access Strategy**，有很多选项，我们一个一个来说。

1. Use Embedded Avro Schema
   这是最常用的选项了，avro数据内置了schema信息，我们不需要额外的配置schema信息了。在NIFI的组件里比如ExecuteSQL AvroWriter等等都会设置把schema内置到avro数据里。
2. Use 'Schema Text' Property
   这个也非常简单，手动指定一个schema。你可以直接在`Schema Text`的value里编辑schema文本，也可以在流文件属性或者变量注册表指定一个叫avro.schema的schema文本。当然，avro.schema是人为定义的，可修改。

   除了以上两个之外其他的选项，都必须配置`Schema Registry`才能使用。

3. Use 'Schema Name' Property
   使用`Schema Name`属性，选择这个选项，那么无疑程序会使用到`Schema Name`这个属性，同时必须指定一个`Schema Registry`控制服务器。`Schema Name`用来指定schema的名称，然后提供给`Schema Registry`配置的控制服务器使用。简单来说就是：选择`Schema Name`，就得配置一个`Schema Registry`，然后默认情况下程序会使用表达式语言读取一个叫schema.name的值，把这个值传给`Schema Registry`，让他去对应的地方查一个schema回来。当然，具体的控制服务器还可能使用到`Schema Version` `Schema Branch`这些值。

4. HWX Schema Reference Attributes
   HWX是hortonworks的缩写，选择这个配置，程序会默认读取流文件中的三个属性值：`schema.identifier`, `schema.version`, `schema.protocol.version`,然后用这三个值到`Schema Registry`指定的服务上获取schema

5. HWX Content-Encoded Schema Reference
   选择这个配置，流文件内容中会内置使用`Schema Registry`指定的服务上获取schema所需要的信息，一个byte指明`protocol version`,紧跟着8个byte指明`schema identifier`，最后是4个byte指明`schema version`.

   如果使用以上这两个配置，还得到官网上详情了解学习[https://github.com/hortonworks/registry](https://github.com/hortonworks/registry)

6. Confluent Content-Encoded Schema Reference
   同上，查询schema所需要的信息编码内置到了流文件内容当中，详细还需到官网了解学习[http://docs.confluent.io/current/schema-registry/docs/serializer-formatter.html](http://docs.confluent.io/current/schema-registry/docs/serializer-formatter.html)
   
   

## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)