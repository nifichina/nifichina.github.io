# ListDatabaseTables

***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com**
***

## 描述

生成一组流文件，每个流文件包含与数据库连接中有关表的元数据相对应的属性。一旦获取了有关表的元数据，直到经过刷新间隔（如果设置`Refresh Interval`）或手动清除状态后，才会再次获取该元数据。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

| 属性名称 | 默认值 | 可选值 | 描述 |
|--|--|--|--|
| **Database Connection Pooling Service** |  | **Controller Service API:** <br/>DBCPService <br/>**Implementations:** DBCPConnectionPool<br/>DBCPConnectionPoolLookup<br/>HiveConnectionPool | 用于获得与数据库的连接的Controller Service |
| Catalog |  |  | 从中列出数据库表的目录的名称。 该名称必须与存储在数据库中的目录名称匹配。如果未设置该属性，则目录名称将不会用于缩小表的搜索范围。如果该属性设置为空字符串，将列出没有目录的表。 |
| Schema Pattern |  |  | 用于匹配数据库中schema的模式。在模式中，“％”表示匹配0个或多个字符的任何子字符串，而“_”表示匹配任何一个字符。该模式必须与存储在数据库中的模式名称匹配。如果未设置该属性，那么将不会使用架构名称来缩小表的搜索范围。如果该属性设置为空字符串，将列出没有模式的表。 |
| Table Name Pattern |  |  | 用于匹配数据库中的表的模式。在模式中，“％”表示匹配0个或多个字符的任何子字符串，而“_”表示匹配任何一个字符。该模式必须与存储在数据库中的表名匹配。如果未设置该属性，则将检索所有表。 |
| Table Types | TABLE |  | 要包括的表类型的逗号分隔列表。例如，某些数据库支持TABLE和VIEW类型。如果未设置该属性，则将返回所有类型的表。 |
| **Include Count** | false | * true<br/>* false | 是否将表的行数包括为流文件属性。这将影响性能，因为将为检索到的列表中的每个表生成数据库查询。 |
| **Refresh Interval** | 0 sec |  | 重置处理器state之前经过的时间，从而导致列出所有当前表。在此时间间隔内，处理器可能会继续运行，但是已经列出的表将不会重新列出。但是，新的/添加的表将在处理器运行时列出。零值表示永远不会自动重置状态，用户必须手动清除state。 |

## 连接关系

| Name | Description |
|--|--|
| success | All FlowFiles that are received are routed to success |

## 读取属性

没有指定。

## 写属性

| Name | Description |
|--|--|
| db.table.name | 包含来自连接的数据库表的名称 |
| db.table.catalog | 包含表所属目录的名称（可以为null） |
| db.table.schema | 包含表所属的架构的名称（可以为null） |
| db.table.fullname | 包含标准表名（可能包括catalog，schema等） |
| db.table.type | 包含来自连接的数据库表的类型。典型的类型是“TABLE”，“VIEW”，“SYSTEM TABLE”，“GLOBAL TEMPORARY”，“LOCAL TEMPORARY”，“ALIAS”，“SYNONYM” |
| db.table.remarks | 包含来自连接的数据库表的名称 |
| db.table.count | 包含表中的行数|

## 状态管理

| Scope | Description |
|--|--|
| CLUSTER | 执行表列表后，将存储查询的时间戳。这样，处理器下次运行时就不会重新列出表。在处理器属性中指定刷新间隔将指示，当处理器检测到间隔已过去时，state将被重置，结果将重新列出表。该处理器只能在主节点上运行。 |

## 限制

此组件不受限制。

## 输入要求

此组件不允许传入关系。

## 系统资源方面的考虑

没有指定。

