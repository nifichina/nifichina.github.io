# AvroRecordSetWriter
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述

 将数据以avro格式输出。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。(1.11.4版本)

|属性名称|默认值|可选值|描述|
|----|----|----|----|
|**Schema Write Strategy**|avro-embedded|▪Embed Avro Schema<br/>▪Set 'schema.name' Attribute<br/>▪Set 'avro.schema' Attribute<br/>▪HHWX Schema Reference Attributes<br/>▪HWX Content-Encoded Schema Reference<br/>▪Confluent Schema Registry Reference<br/>▪Do Not Write Schema|指明如何输出chema信息。|
|Schema Cache||Controller Service API:<br/>RecordSchemaCacheService<br/>Implementation: <br/>VolatileSchemaCache|将schema添加到的缓存，以便记录读取器可以快速查找schema。|
|**Schema Access Strategy**|inherit-record-schema|▪Use 'Schema Name' Property <br/>▪Inherit Record Schema<br/>▪Use 'Schema Text' Property |指定如何获取用于解释数据的schema信息。|
|Schema Registry||Controller Service API:<br/>SchemaRegistry<br/>Implementations: <br/>ConfluentSchemaRegistry<br/>AvroSchemaRegistry<br/>HortonworksSchemaRegistry|指定Schema策略的控制服务器|
|Schema Name|${schema.name}||如果使用了Schema Registry,指定需要查找的schema的名称<br>支持表达式语言:true|
|Schema Version|||指定要在Schema Registry中查找的schema的版本，不指定则默认取最新版本<br>支持表达式语言:true|
|Schema Branch|||定在Schema Registry属性中查找schema时要使用的分支名称。如果选择的策略不支持branch，则忽略此配置<br>支持表达式语言:true|
|Schema Text|${avro.schema}||Avro格式的schema文本<br>支持表达式语言:true|
|**Compression Format**|NONE|▪BZIP2<br/>▪DEFLATE<br/>▪NONE<br/>▪SNAPPY<br/>▪LZO|avro数据的压缩类型|
|**Cache Size**|1000||缓存schema的大小|
|**Encoder Pool Size**|32||Avro写入器需要使用编码器。编码器的创建是昂贵的，但一旦创建，它们就可以重用。此属性控制可汇集和重用的编码器的最大数量。将此值设置得太小会导致性能下降，但将其设置得更高则会导致使用更多堆。如果Avro写入器配置了`Embed Avro Schema`的模式写入策略，则忽略此属性。<br/>支持表达式语言:true|

## 状态管理

此组件不存储状态。

## 限制

无。

## 系统资源方面的考虑

无

## 深入讲解

在NIFI的Controller Service中，有一批以Reader、Writer结尾的读写器。AvroRecordSetWriter顾名思义，就是写avro格式数据的。

在属性配置里**Cache Size**很简单，配置缓存大小，缓存schema信息的。

对于**Schema Write Strategy**，有很多选项，他们都是跟AvroReader的`Schema Access Strategy`一一对应的。指定将schema信息写到输出流文件的哪个位置

1. Embed Avro Schema
   内置schema，将schema信息写到avro数据里
2. Set 'schema.name' Attribute
   将schema信息写到输出流的属性`schema.name`中
3. Set 'avro.schema' Attribute
   将schema信息写到输出流的属性`avro.schema`中
4. HWX Schema Reference Attributes
   将schema的描述信息写到流文件中的三个属性值中：`schema.identifier`, `schema.version`, `schema.protocol.version`
5. HWX Content-Encoded Schema Reference
   将schema的描述信息写到流内容中，一个byte指明`protocol version`,紧跟着8个byte指明`schema identifier`，最后是4个byte指明`schema version`.
   
   如果使用以上这两个配置，还得到官网上详情了解学习[https://github.com/hortonworks/registry](https://github.com/hortonworks/registry)

6. Confluent Schema Registry Reference
   同上，查询schema所需要的信息编码内置到了流文件内容当中，详细还需到官网了解学习[http://docs.confluent.io/current/schema-registry/docs/serializer-formatter.html](http://docs.confluent.io/current/schema-registry/docs/serializer-formatter.html)
7. Do Not Write Schema
   不写shemale信息

对于 **Schema Access Strategy** ,写avro数据也需要schema信息，此配置指明如何获取schema信息。
1. Use 'Schema Name' Property
   使用`Schema Name`配置，同时必须指定一个`Schema Registry`控制服务器。`Schema Name`用来指定schema的名称，然后提供给`Schema Registry`配置的控制服务器使用来获取schema。
2. Inherit Record Schema
   上游流文件数据内置了schema信息
3. Use 'Schema Text' Property
   这个也非常简单，手动指定一个schema。你可以直接在`Schema Text`的value里编辑schema文本，也可以在流文件属性或者变量注册表指定一个叫avro.schema的schema文本。当然，avro.schema是人为定义的，可修改。
   

## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)