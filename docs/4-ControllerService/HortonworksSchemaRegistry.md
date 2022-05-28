# HortonworksSchemaRegistry
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述

 该控制服务器提供与Hortonworks Schema Registry交互的服务，详细的请到官网深入了解[https://github.com/hortonworks/registry](https://github.com/hortonworks/registry)

## 属性配置
在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。(1.11.4版本)

|属性名称|默认值|可选值|描述|
|----|----|----|----|
|**Schema Registry URLs**|http://localhost:8081||逗号分隔的URL<br/>支持表达式语言：true|
|**Cache Size**|1000||缓存schema的个数|
|**Cache Expiration**|1 hour||缓存过期时间|
|SSL Context Service||Controller Service API:<br/>SSLContextService<br/>Implementations:<br/>StandardRestrictedSSLContextService<br/>StandardSSLContextService|指定SSL服务|
|Kerberos Credentials Service||Controller Service API:<br/>KerberosCredentialsService<br/>Implementation:<br/>KeytabCredentialsService|Kerberos认证服务|



## 状态管理

此组件不存储状态。

## 限制

无。

## 系统资源方面的考虑

无




