# ConfluentSchemaRegistry
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述

 该控制服务器提供与Confluent Schema注册中心交互的服务，以便那些存储在Confluent Schema注册中心的schema可以在NiFi中使用。Confluent Schema注册表有一个schema的“subject”的概念，这是模式名称的术语。当通过这个注册表按名称查找模式时，它将在Confluent Schema注册表中找到与该主题相关的模式。

## 属性配置
在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。(1.11.4版本)

|属性名称|默认值|可选值|描述|
|----|----|----|----|
|**Schema Registry URLs**|http://localhost:8081||逗号分隔的URL<br/>支持表达式语言：true|
|SSL Context Service||Controller Service API:<br/>SSLContextService<br/>Implementations:<br/>StandardRestrictedSSLContextService<br/>StandardSSLContextService|指定SSL服务|
|**Communications Timeout**|30 secs||访问Confluent Schema注册中心等待时间|
|**Cache Size**|1000||缓存schema的个数|
|**Cache Expiration**|1 hour||缓存过期时间|

## 状态管理

此组件不存储状态。

## 限制

无。

## 系统资源方面的考虑

无

## 深入讲解

详细还需到官网了解学习[http://docs.confluent.io/current/schema-registry/docs/serializer-formatter.html](http://docs.confluent.io/current/schema-registry/docs/serializer-formatter.html)




