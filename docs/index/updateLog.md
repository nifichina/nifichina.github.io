[首页](../README.md) [赞赏支持](./donate.md) [QQ群](./qq.md) [微信公众号](./wechat.md) [更新日志](./updateLog.md) [新手常见问题](./newQuestions.md)
# 更新日志

**2022-05-17**

* 新增[表达式语言指南](../1-基础文档/4-ExpressionLanguageGuide.md)
* 更新[系统管理员指南](../1-基础文档/6-AdminGuide.md)

**2020-08-06**

* 新增[ConsumeWindowsEventLog](../processors/ConsumeWindowsEventLog.md)
* 新增[ControlRate](../processors/ControlRate.md)
* 新增[CountText](../processors/CountText.md)
* 新增[Notify](../processors/Notify.md)
* 新增[Wait](../processors/Wait.md)

**2020-05-25**

* 新增[ConvertCharacterSet](../processors/ConvertCharacterSet.md)
* 新增[ConvertJSONToSQL](../processors/ConvertJSONToSQL.md)
* 新增[ConvertJSONToSQL](../processors/ConvertJSONToSQL.md)
* 新增[ExecuteSQLRecord](../processors/ExecuteSQLRecord.md)
* 新增[ListDatabaseTables](../processors/ListDatabaseTables.md)
* 新增[ListFile](../processors/ListFile.md)
* 新增[ListFTP](../processors/ListFTP.md)
* 新增[ExecuteScript脚本使用教程](../code/ExecuteScript.md)
* 新增[多线程基础知识总结](../extend/多线程基础知识总结.md)

**2020-05-21**

* 新增[TailFile](../processors/TailFile.md)
* 新增[ExecuteScript](../processors/ExecuteScript.md)
* 新增[探索 Apache NIFI 集群的高可用](../code/NIFI高可用.md)


**2020-05-18**

* [The 4 V’s of Big Data](../extend/大数据的4v.md)

**2020-05-18**

* 新增[AttributeRollingWindow](../processors/AttributeRollingWindow.md)
* 新增[CompareFuzzyHash](../processors/CompareFuzzyHash.md)
* 新增[Apache NIFI入门(读完即入门)](../code/NIFI入门.md)
* 新增[了解NiFi最大线程池和处理器并发任务设置](../code/理解maxThread设置.md)
* 新增[深入理解NIFI Connection](../code/理解connection.md)

**2020-05-12**

* 新增[自定义Processor组件](../code/自定义Processor.md)

**2020-05-10**

* 新增[AvroReader](../controllerservice/AvroReader.md)
* 新增[AvroRecordSetWriter](../controllerservice/AvroRecordSetWriter.md)
* 新增[AvroSchemaRegistry](../controllerservice/AvroSchemaRegistry.md)
* 新增[ConfluentSchemaRegistry](../controllerservice/ConfluentSchemaRegistry.md)
* 新增[HortonworksSchemaRegistry](../controllerservice/HortonworksSchemaRegistry.md)
* 新增[VolatileSchemaCache](../controllerservice/VolatileSchemaCache.md)

**2020-04-26**

* 新增[系统管理员指南](../general/AdminGuide.md)
* 新增[NIFI开启HTTPS](../code/NIFI开启HTTPS.md)

**2020-04-23**

* 增加[NIFI启动源码分析](../code/NIFI启动源码.md)
* 增加[JettyServer.java源码分析](../code/JettyServer.md)

**2020-04-17**

* 增加[编译NIFI源码](../code/编译NIFI源码.md)
* 增加[NIFI自定义开发规范](../code/NIFI自定义开发规范.md) 这是一个NIFI Maven子项目，用于自定义开发，减少对源码结构的侵入，方便NIFI升级 

**2020-04-09**

* 增加[PrometheusReportingTask](../reportingtask/PrometheusReportingTask.md)

**2020-03-22**

* 增加[自定义开发NIFI表达式语言](../code/ExpressionLanguage.md)

**2019-12-05**

* 增加了一个JOLT嵌套数组的实际案例[jolt教程](../extend/jolt详解.md)
* 新增[PutEmail](../processors/PutEmail.md)

**2019-12-04**

* 新增[Processor代码中的一些方法](../code/Processor方法.md)

**2019-12-03**

* 新增[nifi注解](../code/nifi注解.md)
* 新增[新手常见问题](./newQuestions.md)页面

**2019-12-02**

* 新增[JoltTransformJSON](../processors/JoltTransformJSON.md)文档
* 新增[JoltTransformRecord](../processors/JoltTransformRecord.md)文档
* 更改目录结构，涉及与nifi相关联系的知识统一放到**NIFI扩展知识菜单**,非NIFI源码解读统一放到**其他源码菜单**

**2019-11-30**

* 新增NIFI扩展系列:[JOLT 详解](../extend/jolt详解.md),对使用JoltTransformJSON 还有疑惑的同学的解药
* 由上面翻译过来的英文简易版JOLT教程[Json Jolt Tutorial](../extend/joltdoc.md)

**2019-10-20**

* 更新日志单独做出页面
* 已有的模板demo.xml文件  由百度云盘下载改为直接使用GitHub 浏览器点击下载
* 编辑管理员指南文档格式(还未修订)

**2019-11-19**

* 修复[扩展开发Controller Service的项目结构规范](../extend/ControllerServiceArchive.md)跳转[NIFI nar包加载机制源码解读](../code/nifi-nar-classloader.md)404问题(感谢匿名同学的细心发现)
* 修改[入门文档](./general/GettingStarted.md)的一些语句错误


**2019-11-16**

* 更新[CalculateRecordStats](../processors/CalculateRecordStats.md)组件 统计个数
* [新建评论页面](./comment.md)
* [Oracle LogMiner官方文档学习及部分翻译](../extend/Oracle12cLogMiner分析Redo日志文件.md)

**2019-10-30**

 Processor更新
* 部分Processor文档增加模板，后期没新加组件文档都会带有示例说明的模板
* [Base64EncodeContent](../processors/Base64EncodeContent.md):对base64和base64之间的内容进行编码或解码
 NIFI 源码系列
* NIFI 源码系列 新增 理解内容存储库归档
 Oracle
* [oracle 12C的新特性-CDB和PDB](../extend/oracle12C的新特性-CDB和PDB.md)
  
 mysql
* [Java Mysql连接池配置和案例分析--超时异常和处理](../extend/Java-Mysql连接池配置和案例分析--超时异常和处理.md)

 http
* [聊聊HTTPS和SS、TLS协议](../extend/聊聊HTTPS和SS、TLS协议.md)
  
**2019-09-30**

(由于之前已知没有写更新日志，所有截止9.30所有更新全部写到这里)

 Processor更新
* [AttributesToCSV](../processors/AttributesToCSV.md) ：流属性转CSV
* [AttributesToJSON](../processors/AttributesToJSON.md)：流属性转JSON
* [ConvertJSONToAvro](../processors/ConvertJSONToAvro.md)：将 JSON数据转成AVRO格式
* [CryptographicHashAttribute](../processors/CryptographicHashAttribute.md)：哈希流属性
* [DistributeLoad](../processors/DistributeLoad.md)：数据分发
* [EvaluateJsonPath](../processors/EvaluateJsonPath.md)：提取json内容到流属性
* [ExecuteGroovyScript](../processors/ExecuteGroovyScript.md)：执行Groovy脚本
* [ExecuteSQL](../processors/ExecuteSQL.md)：执行SQL
* [ExtractText](../processors/ExtractText.md)：提取text内容到流属性
* [FlattenJson](../processors/FlattenJson.md)：“压平”多层json
* [GenerateFlowFile](../processors/GenerateFlowFile.md)：生成流
* [GenerateTableFetch](../processors/GenerateTableFetch.md)：生成SQL，增量，全量
* [HandleHttpRequest_HandleHttpResponse](../processors/HandleHttpRequest_HandleHttpResponse.md)：web api
* [InvokeHTTP](../processors/InvokeHTTP.md)：执行HTTP请求
* [LogAttribute](../processors/LogAttribute.md)：日志打印流属性
* [LogMessage](../processors/LogMessage.md)：：日志打印信息
* [PutHiveStreaming](../processors/PutHiveStreaming.md)：写hive
* [ReplaceText](../processors/ReplaceText.md)：替换text
* [RouteOnAttribute](../processors/RouteOnAttribute.md):根据属性路由流
* [RouteOnContent](../processors/RouteOnContent.md)：根据流内容路由流
* [SplitAvro](../processors/SplitAvro.md)：切分avro数据
* [SplitJson](../processors/SplitJson.md)：切分json数组
* [UpdateAttribute](../processors/UpdateAttribute.md)：更改流属性

 General
* [概览](../general/overview.md)
* [入门](../general/GettingStarted.md)
* [用户指南](..//general/UserGuide)

 NIFI 源码系列
* [NIFI-NAR包概述](../code/nifi-nar.md)
* [nifi nar包加载机制源码解读](../code/nifi-nar-classloader.md)
* [nifi.sh 脚本解读](../code/nifi-sh.md)
* [nifi-env.sh 脚本解读](../code/nifi-env-sh.md)
* [nifi.sh start 解读](../code/nifi-sh-start.md)
* [RunNiFi.java 源码解读](../code/RunNiFi.md)
* [NiFi.java 源码解读](../code/NiFi.md)
* [Nar包下的MANIFEST.MF](../code/UnpackNar.md)

 NIFI 扩展开发系列
* [ControllerService扩展开发的项目结构](../extend/ControllerServiceArchive.md)
* [JSONJOLT介绍及语法详解-shift篇](../extend/JsonJoltShift.md)
* [通过配置优化NiFi性能](../extend/通过配置优化NiFi性能.md)
* [NIFI Linux系统配置的最佳实践](../extend/NIFI&#32;Linux系统配置的最佳实践.md)
