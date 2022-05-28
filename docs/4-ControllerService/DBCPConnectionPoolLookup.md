# DBCPConnectionPoolLookup
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述

提供一个DBCPService，该组件可用于动态选择另一个DBCPService。此服务要求在请求连接时传入名为“database.name”的属性，如果缺少该属性，则将引发异常。 “database.name”的值将用于选择已使用该名称注册的DBCPService。这将允许定义和注册多个DBCPService，然后在运行时通过使用适当的'database.name'属性标记流文件来动态选择它们。


## 动态属性：

| Name | Value | Description |
|--|--|--|
| The name to register DBCPService | The DBCPService | 如果“database.name”属性包含动态属性的名称，则将选择DBCPService（在值中注册）。  **Supports Expression Language: false** |

### 

## 连接关系


## 自定义连接关系


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


## 示例说明


## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)