# PutDatabaseRecord
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***


## 描述

PutDatabaseRecord处理器使用指定的RecordReader从传入的流文件中读取（可能是多个，说数组也成）记录。这些记录将转换为SQL语句，并作为一个批次执行。如果发生任何错误，则将流文件路由到failure或retry，如果执行成功，则将传入的流文件路由到success。处理器执行的SQL语句类型通过`Statement Type`属性指定，该属性接受一些硬编码的值，例如INSERT，UPDATE和DELETE，使用“Use statement.type Attribute”可以使处理器获取流文件属性中的语句类型。

说明：如果语句类型为UPDATE，正常的不应该修改主键的值。如果记录中修改主键的值，那么有可能找不到数据进行修改或者修改破坏了一些数据(说白了，代码时按照根据主键值为条件进行update的)

当然，隐藏的功能是statement.type的值时‘SQL’的时候，可以从record中的某个字段读取值，此值应该是一个可以执行的SQL语句，该处理器就执行这个SQL就可以了。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

| Name | Default Value | Allowable Values | Description |
|--|--|--|--|
| **Record Reader** |  | **Controller Service API:** <br/> RecordReaderFactory <br/> **Implementations:** JsonPathReader<br/>XMLReader<br/>ScriptedReader<br/>CSVReader<br/>Syslog5424Reader<br/>GrokReader<br/>AvroReader<br/>JsonTreeReader<br/>ParquetReader<br/>SyslogReader | 指定用于解析传入数据和确定数据模式的Controller Service。 |
| Database Type | Generic |  Generic <br/>  Oracle <br/>  Oracle 12+ <br/> MSSQL 2012+ <br/> MSSQL 2008 <br/> MySQL <br/> PostgreSQL  | 数据库的类型/风格，用于生成特定于数据库的代码。在许多情况下，通用类型就足够了，但是某些数据库（例如Oracle）需要自定义SQL子句。 |
| **Statement Type** |  |  UPDATE <br/> INSERT <br/> UPSERT <br/> DELETE <br/> Use statement.type Attribute  | 指定要生成的SQL语句的类型。请参考数据库文档以获取每个操作行为的描述。请注意，某些数据库类型可能不支持某些语句类型。如果选择了“Use statement.type Attribute”，则该值取自FlowFile中的statement.type属性。 “Use statement.type Attribute”选项是唯一允许使用“SQL”语句类型的选项。如果指定了“SQL”，则“Field ContainingSQL”属性指定的字段的值应为目标数据库上的有效SQL语句，并将按原样执行。 |
| **Database Connection Pooling Service** |  | **Controller Service API:** <br/> DBCPService <br/> **Implementations:** <br/>DBCPConnectionPool<br/>HiveConnectionPool<br/>DBCPConnectionPoolLookup | Controller Service，用于获得与数据库的连接以发送记录。 |
| Catalog Name |  |  | 语句应更新的目录的名称。这可能不适用于你要更新的数据库。在这种情况下，请将该字段留空<br/> **Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| Schema Name |  |  | 表所属的schema的名称。这可能不适用于你要更新的数据库。在这种情况下，请将该字段留空<br/> **Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| **Table Name** |  |  | 语句应影响的表的名称。<br/> **Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| Translate Field Names | true |  true <br/> false | 如果为true，则处理器将尝试将字段名称转换为指定表的适当列名称。如果为false，则字段名称必须与列名称完全匹配，否则该列将不会更新 |
| Unmatched Field Behavior | Ignore Unmatched Fields | Ignore Unmatched Fields <br/> Fail on Unmatched Fields  | 如果传入记录的字段未映射到数据库表的任何列，则此属性指定如何处理这种情况 |
| Unmatched Column Behavior | Fail on Unmatched Columns |  Ignore Unmatched Columns<br/> Warn on Unmatched Columns <br/> Fail on Unmatched Columns  | 如果传入的记录没有数据库表所有列的字段映射，则此属性指定如何处理这种情况 |
| Update Keys |  |  | 列名的逗号分隔列表，可唯一标识数据库中UPDATE语句的行。如果语句类型为UPDATE且未设置此属性，则使用表的主键。在这种情况下，如果不存在主键，并且如果“不匹配的列行为”设置为“失败”，则到SQL的转换将失败。如果语句类型为INSERT，则忽略此属性 <br/> **Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| Field ContainingSQL |  |  | 如果语句类型为“SQL”（在statement.type属性中设置），则此字段指示记录中的哪个字段包含要执行的SQL语句。该字段的值必须是单个SQL语句。如果语句类型不是“SQL”，则忽略此字段。<br/> **Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |
| **Allow MultipleSQL Statements** | false |  true <br/>  false | 如果语句类型为“SQL”（在statement.type属性中设置），则此字段指示是否用分号分隔字段值并分别执行每个语句。如果有任何语句导致错误，则将回滚整个语句集。如果语句类型不是“SQL”，则忽略此字段。 |
| Quote Column Identifiers | false |  true <br/>  false | 启用此选项将导致所有列名都被引用，从而允许你将保留字用作表中的列名。|
| Quote Table Identifiers | false | true |<br/> false |启用此选项将导致表名被引用以支持在表名中使用特殊字符。 |
| **Max Wait Time** | 0 seconds |  | 运行的SQL语句所允许的最长时间，零表示没有限制。少于1秒的最长时间将等于零。 <br/> **Supports Expression Language: true (will be evaluated using variable registry only)** |
| **Rollback On Failure** | false | true <br/>false | 指定如何处理错误。默认情况下（false），如果在处理FlowFile时发生错误，则FlowFile将根据错误类型路由到“failure”或“retry”关系，处理器可以继续使用下一个FlowFile。相反，你可能想回滚当前已处理的FlowFile，并立即停止进一步的处理。在这种情况下，你可以通过启用此“回滚失败”属性来实现。如果启用，失败的FlowFiles将保留在输入关系中，而不会受到惩罚，并会反复处理，直到成功处理或通过其他方式将其删除。重要的是要设置足够的“有效期限”，以免重试太频繁。|
| **Table Schema Cache Size** | 100 |  | 指定应缓存多少个表模式 |
| Maximum Batch Size | 0 |  | 指定INSERT和UPDATE语句的最大批处理大小。该参数对“语句类型”中指定的其他语句无效。零表示批量不受限制。 <br/> **Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)** |

## 连接关系

| Name | Description |
|--|--|
| retry | 如果无法更新数据库，但再次尝试操作可能会成功将FlowFile路由到此关系 |
| success |从SQL查询结果集中成功创建了FlowFile。 |
| failure | 如果无法更新数据库，并且无法重试该操作（例如无效查询或违反完整性约束），也会将FlowFile路由到此关系 |

## 读取属性

| Name | Description |
|--|--|
| statement.type | 如果为“语句类型”属性选择了“使用statement.type属性”，则此属性的值将用于确定要生成和执行的语句类型（INSERT，UPDATE，DELETE，SQL等）。 |

## 写属性

### 

| Name | Description |
|--|--|
| putdatabaserecord.error | 如果在处理过程中发生错误，则流文件将被路由至失败或重试，并且将使用错误原因填充该属性。 |

## 状态管理

此组件不存储状态。

## 限制

此组件不受限制。

## 输入要求

此组件需要传入关系。

## 系统资源方面的考虑

没有指定。

## 应用场景

在PutDatabaseRecord之前，我们想要写入数据到数据库，往往需要使用ConvertJsonToSql+PutSQL组合，尤其是当数据格式不是json的时候还需要先将数据转换为json，而使用ConvertJsonToSql属于一遍连接了目标库，一边要在内存解析一次数据，转成了参数化的SQL，并且参数也是放到FlowFile的属性中,平白无故的这个FlowFile也就更吃内存了。PutDatabaseRecord的好处就是我们可以将任何NIFI支持的Record写入指定目的，在内存解析一次数据就可以了。当然了，前后两种方式写数据到数据库的基本原理都是一样的，只是PutDatabaseRecord的效率更好一些。

最早，PutDatabaseRecord支持将特定的Record集合转成Insert，Update，Delete语句，我们只要选择**Statement Type**即可。然后为了更灵活，增加了`Use statement.type Attribute`选项，我们可以在上游的FlowFile中指定`statement.type`属性，这期间又暗地里加了“statement.type=SQL”的功能，当**Statement Type**的值时“SQL”的时候，我们要配合`Field ContainingSQL`配置进行工作。`Field ContainingSQL`指的是上游来的FlowFile中的一个字段，这个字段值是一个可执行的SQL。

可能让我们比较迷茫的是`Unmatched Field Behavior`和`Unmatched Column Behavior`，我们如果纠结这两个配置的描述就会很难受，我们只关注两个单词'Field'和'Column'就可以分清楚了。'Column'我们知道，(目标)表的列嘛，就是说如果你手里的数据中的列没有与我目标表的column对应会怎么样。而'Field'针对的是Record，是具体的数据，就是说如果你目标表里列没有与我Record中的Field相对应会怎么样。具体的关系我描述一下：首先Record中会携带schema元数据信息(或推断出schema信息)，信息里会有若干个Field。我们在生成SQL的时候，会从目标数据库查询指定表的元数据信息(放缓存里)，而数据库里设置成非null的且非自增长的没有设置默认值的则认为是required字段。然后针对insert、delete大体有三个步骤，第一步是遍历required字段，看record里是否都有这几个字段，如果没有就用到`Unmatched Column Behavior`，如果我们配置了'ignore'了，就继续执行。第二步是对这几个Field的遍历 -> 查询是否在指定表的元数据里有对应的列信息，当遇到没有的情况时,就是`Unmatched Field Behavior`，如果我们配置了'ignore'了，就继续执行。如果存在，我们就放到一个集合set里存起来。第二步遍历结束后，第三步我们再判断这个集合set有没有值，如果是空的，就直接报`"None of the fields in the record map to the columns defined by the " + tableName + " table"`SQLDataException异常了。update的话稍微有些不一样，第一步就检测`Update Keys`，如果没有对应值就默认使用目标表的主键，如果都没有值就报`"Table '" + tableName + "' does not have a Primary Key and no Update Keys were specified"`异常了，然后紧接着检测record里是否有这些字段，没有就要`Unmatched Column Behavior`。第二步跟上面一样，就是对这几个Field的遍历 -> 查询是否在指定表的元数据里有对应的列信息，当遇到没有的情况时,就是`Unmatched Field Behavior`，如果我们配置了'ignore'了，就继续执行。最后upset的检查就是融合了insert和update。

然后得说一下这个`Translate Field Names`，这个功能点其实非常好，其实就是将列名转大写替换下划线(Record中的列和指定表的列都做此转换，指定表的列信息会做成一个Map映射，转换的列名：列元数据信息)
```java
private static String normalizeColumnName(final String colName, final boolean translateColumnNames) {
        return colName == null ? null : (translateColumnNames ? colName.toUpperCase().replace("_", "") : colName);
    }
```
将fieldName转大写替换下划线，然后跟指定表的同样转换过后的列元数据信息映射进行匹配，记录下Field的那个索引值，然后组SQL设置参数的时候根据索引值找到record中对应的value就行了。这个功能其实就是帮助我们更好的对Record列和目标表列进行匹配。而SQL中的列名其实用的还是从指定表查询出来的列元数据信息。


## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)