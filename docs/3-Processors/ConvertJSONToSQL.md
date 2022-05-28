# ConvertJSONToSQL
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com**
***

## 描述

将JSON格式的FlowFile转换为UPDATE，INSERT或DELETE SQL语句。预期传入的FlowFile是平面的(key-value)JSON消息，这意味着它包含一个JSON元素，并且每个字段都映射到一个简单类型。如果字段映射到JSON对象，则该JSON对象将被解释为Text。如果输入是JSON元素数组，则该数组中的每个元素都作为单独的FlowFile输出到"sql"关系。成功转换后，原始FlowFile被路由到"original"关系，而SQL被路由到"sql"关系。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

| 属性名称 | 默认值 | 可选值 | 描述 |
|--|--|--|--|
| **JDBC Connection Pool** |  | Controller Service API:<br/>DBCPService<br/>Implementations: <br/>DBCPConnectionPool<br/>DBCPConnectionPoolLookup<br/>HiveConnectionPool | 指定要用于将JSON消息转换为SQL语句的JDBC连接池。为了确定适当的数据库列类型，连接池是必需的。 |
| **Statement Type** |  | ▪UPDATE<br/>▪INSERT<br/>▪DELETE | 指定要生成的SQL语句的类型 |
| **Table Name** |  |  | 语句应更新的表的名称<br/>支持表达式语言：true |
| Catalog Name |  |  | 语句应更新的目录的名称。这可能不适用于你要更新的数据库。在这种情况下，请将该字段留空<br/>支持表达式语言：true |
| Schema Name |  |  | 该表所属的模式的名称。这可能不适用于你要更新的数据库。在这种情况下，请将该字段留空<br/>支持表达式语言：true |
| Translate Field Names | true | ▪true<br/>▪false | 如果为true，则处理器将尝试将JSON字段名称转换为指定表的适当列名称。如果为false，则JSON字段名称必须与列名称完全匹配，否则该列将不会更新 |
| Unmatched Field Behavior | Ignore Unmatched Fields | ▪Ignore Unmatched Fields<br/>▪Fail | 如果传入的JSON元素的字段里有一个未能映射到数据库表的任何列，则此属性指定如何处理这种情况 |
| Unmatched Column Behavior | Fail on Unmatched Columns | ▪Ignore on Unmatched Columns<br/>▪Warn on Unmatched Columns<br/>▪Fail on Unmatched Columns | 如果传入的JSON元素没有任何字段能与数据库表所有列的字段映射，则此属性指定如何处理这种情况 |
| Update Keys |  |  | 逗号分隔的列名列表，可唯一标识数据库中UPDATE语句的行。如果语句类型为UPDATE且未设置此属性，则使用表的主键。在这种情况下，如果不存在主键，并且如果`Unmatched Column Behavior`设置为`Fail on Unmatched Columns`，则到SQL的转换将失败。如果语句类型为INSERT，则忽略此属性<br/>支持表达式语言：true |
| Quote Column Identifiers | false | ▪true<br/>▪false | 启用此选项将导致所有列名都被用(引号括起来)，从而允许你在表中使用保留字作为列名。 |
| Quote Table Identifiers | false | ▪true<br/>▪false | 启用此选项将导致表名被引用以支持在表名中使用特殊字符 |
| **SQL Parameter Attribute Prefix** | sql |  | 要附加到传出流文件属性的字符串，例如`<sql>.args.1.value`，其中`<sql>`被替换为指定的值 |
| **Table Schema Cache Size** | 100 |  | 指定应缓存多少个schema |

## 连接关系

| 名称 | 描述 |
|--|--|
| sql | 当FlowFile的内容已成功转换为SQL语句时，会将其路由到此关系 |
| failure | 如果无法将FlowFile转换为SQL，则将其路由到该关系。常见原因包括无效的JSON内容或缺少必填字段的JSON内容（如果使用INSERT语句类型）。 |
| original | 当FlowFile转换为SQL时，原始JSON FlowFile被路由到该关系 |

## 读取属性

没有指定。

## 写属性

| 名称 | 描述 |
|--|--|
| mime.type | 将路由到"sql"的FlowFile的mime.type设置为"text/plain"。 |
|  |
| `<sql>.table` | 将路由到'sql'的FlowFile的`<sql>.table`属性设置为由SQL语句更新的表的名称。此属性的前缀（例如"sql"）由"SQL Parameter Attribute Prefix"属性确定。 |
| `<sql>.catalog` | 如果为此数据库设置了目录名称，请指定SQL语句将更新的目录名称。如果未使用目录，则不会添加此属性。此属性的前缀（例如，"sql"）由"SQL Parameter Attribute Prefix"属性确定。 |
| fragment.identifier | 对于相同的传入FlowFile，所有路由到'sql'关系的FlowFiles（如果传入的FlowFile是JSON数组，则对于相同的传入FlowFile将输出多个）将具有fragment.identifier属性的值。然后可以将其用于关联结果。 |
| fragment.count | 为相同的传入FlowFile生成的SQL FlowFiles的数量。可以将它与fragment.identifier属性结合使用，以便知道多少个FlowFiles属于同一个传入FlowFile。 |
| fragment.index | 此FlowFile在全部来自同一传入FlowFile的传出FlowFiles列表中的位置。可以将其与fragment.identifier和fragment.count属性结合使用，以了解哪些FlowFiles源自相同的传入FlowFile，以及按照什么顺序生成SQL FlowFiles |
| `<sql>.args.N.type` | 对输出SQL语句进行参数设置，以避免SQL注入攻击。要使用的参数的类型存储在名为`<sql>.args.1.type`，`<sql>.args.2.type`，`<sql>.args.3.type`等的属性中。该类型是代表JDBC Type常量的数字。通常，此功能仅对读取和解释的软件有用，但已添加，以便诸如PutSQL之类的处理器可以理解如何解释值。此属性的前缀（例如"sql"）由"SQL Parameter Attribute Prefix"属性确定。 |
| `<sql>.args.N.value` | 对输出SQL语句进行参数设置，以避免SQL注入攻击。要使用的参数的值存储在名为sql.args.1.value，sql.args.2.value，sql.args.3.value等的属性中。这些属性中的每一个都有一个对应的`<sql>.args.N.type`属性，该属性指示将值插入数据库时​​应如何解释。此属性的前缀（例如"sql"）由"SQL Parameter Attribute Prefix"属性确定。 |

## 状态管理

该组件不存储状态。

## 限制

此组件不受限制。

## 输入要求

此组件需要传入关系。

## 系统资源方面的考虑

没有指定。

## 深入讲解

1. 此组件接收json，json格式是key-value的平面结构，可以是单个json,也可以是一个json数组，当输入流是一个json数组的时候，输出的数组内的元素对应的多个流文件(多条SQL)
2. `Unmatched Field Behavior`指的是传入的JSON元素的字段里**有一个**未能映射到数据库表的任何列时，程序应该如何处理。而`Unmatched Column Behavior`指的是传入的JSON元素**一个字段也没能**与数据库表的列映射匹配，程序应该如何处理。
3. `Update Keys`是当`Statement Type`为Update的时候使用，指定唯一键，如果没有指定，会默认使用表的主键，但此时如果表的主键不存在，并且`Unmatched Column Behavior`设置为`Fail on Unmatched Columns`，则到SQL的转换将失败。如果语句类型为INSERT，则忽略此属性。
4. 可能让我们比较迷茫的是`Unmatched Field Behavior`和`Unmatched Column Behavior`，我们如果纠结这两个配置的描述就会很难受，我们只关注两个单词'Field'和'Column'就可以分清楚了。'Column'我们知道，(目标)表的列嘛，就是说如果你手里的数据中的列没有与我目标表的column对应会怎么样。而'Field'针对的是Record，是具体的数据，就是说如果你目标表里列没有与我Record中的Field相对应会怎么样。具体的关系我描述一下：首先Record中会携带schema元数据信息(或推断出schema信息)，信息里会有若干个Field。我们在生成SQL的时候，会从目标数据库查询指定表的元数据信息(放缓存里)，而数据库里设置成非null的且非自增长的没有设置默认值的则认为是required字段。然后针对insert、delete大体有三个步骤，第一步是遍历required字段，看record里是否都有这几个字段，如果没有就用到`Unmatched Column Behavior`，如果我们配置了'ignore'了，就继续执行。第二步是对这几个Field的遍历 -> 查询是否在指定表的元数据里有对应的列信息，当遇到没有的情况时,就是`Unmatched Field Behavior`，如果我们配置了'ignore'了，就继续执行。如果存在，我们就放到一个集合set里存起来。第二步遍历结束后，第三步我们再判断这个集合set有没有值，如果是空的，就直接报`"None of the fields in the record map to the columns defined by the " + tableName + " table"`SQLDataException异常了。update的话稍微有些不一样，第一步就检测`Update Keys`，如果没有对应值就默认使用目标表的主键，如果都没有值就报`"Table '" + tableName + "' does not have a Primary Key and no Update Keys were specified"`异常了，然后紧接着检测record里是否有这些字段，没有就要`Unmatched Column Behavior`。第二步跟上面一样，就是对这几个Field的遍历 -> 查询是否在指定表的元数据里有对应的列信息，当遇到没有的情况时,就是`Unmatched Field Behavior`，如果我们配置了'ignore'了，就继续执行。最后upset的检查就是融合了insert和update。

## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)