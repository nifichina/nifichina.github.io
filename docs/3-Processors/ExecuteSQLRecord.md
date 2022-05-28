# ExecuteSQLRecord
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com**
***

## 描述

该处理器执行SQL语句，使用特定的`Record Writer`来输出特定格式的数据。处理器使用流式处理，因此支持任意大的结果集。处理器可以使用标准调度方法将此处理器调度为在计时器或cron表达式上运行，也可以由传入的流文件触发。SQL语句来源可以来自该处理器属性SQL select query，也可以来自上一个处理器的输出流（FlowFile的内容应采用UTF-8格式）（GenerateTableFetch，ConvertJsonToSql等等生成的流内容中的SQL语句，类似于insert into。。。value  （？。。。），这个？的值是存在于流属性中的，命名约定为sql.args.N.value  sql.args.N.type ，其中N是一个正整数。 sql.args.N.type应该是指示JDBC类型的数字。FlowFile属性'executesql.row.count'指示选择了多少行。）

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

|属性名称|默认值|可选值|描述|
|----|----|----|----|
| **Database Connection Pooling Service** |  | **Controller Service API:** <br/>  DBCPService <br/> **Implementations:** <br/>DBCPConnectionPoolLookup <br/>HiveConnectionPool<br/> DBCPConnectionPool | 数据库连接池 |
| SQL Pre-Query |  |  | 用分号分隔的SQL查询列表，在执行主SQL查询之前执行。例如，在主查询之前设置会话属性。如果没有错误，这些查询的执行结果不会被输出。<br/>  **支持表达式语言** |
| SQL select query |  |  | 要执行的SQL，设置了此属性，则使用此SQL（不用流中的SQL）；不设置，则使用流中的SQL；<br/>  **支持表达式语言** |
| SQL Post-Query |  |  | 用分号分隔的SQL查询列表，在执行主SQL查询后执行。例如在主查询后设置会话属性的示例。如果没有错误，这些查询的执行结果不会被输出。<br/>  **支持表达式语言** |
| **Max Wait Time** | 0 seconds |  | 执行SQL的最大等待时间，小于1秒则系统默认此配置等于0秒，0秒即没有限制的意思，无限等待 |
| **Record Writer** |  | Controller Service API:<br/>RecordSetWriterFactory<br/>Implementations: <br/>XMLRecordSetWriter<br/>ParquetRecordSetWriter<br/>CSVRecordSetWriter<br/>FreeFormTextRecordSetWriter<br/>JsonRecordSetWriter<br/>ScriptedRecordSetWriter<br/>AvroRecordSetWriter | 指定用于将结果写入FlowFile的Controller Service。 Record Writer可以使用`Inherit Schema`来模拟推断的schema行为，即，无需在writer中显示定义schema，从列类型中推断schema的逻辑相同的逻辑提供。记录编写器可以使用Inherit Schema来模拟推断的架构行为，即不需要在编写器中定义显式架构，并且writer的这个能力都将由从列类型推断schema的同一个逻辑提供。
| **Normalize Table/Column Names** | false | ▪ true<br/> ▪ false | 是否将表名，列名中可能存在的avro格式不兼容的字符进行转换（例如逗号冒号转换为下划线，当然一般表名列名也不存在这些字符，应用较少，默认false） |
| **Use Avro Logical Types** | false | ▪true<br/> ▪ false | 是否对DECIMAL/NUMBER, DATE, TIME 和TIMESTAMP类型使用Avro Logical Types。如果选择false，这些列则转成字符串形式。如果选择true,Avro Logical Types则作为其基本类型,具体来说,DECIMAL/NUMBER转换成logical 'decimal':写成带有精度的字节,DATE转换为逻辑logical“date-millis”:值写成天数（从纪元(1970-01-01)算起的整数）,TIME转换为logical“time-millis”:值写成毫秒数（从纪元(1970-01-01)算起的整数）,TIMESTAMP转换为logical“timestamp-millis”:值写成毫秒数（从纪元(1970-01-01)算起的整数）。如果Avro记录的reader也知道这些Logical Types，那么就可以根据reader的实现类结合上下文反序列化这些值。 |
| **Compression Format** | NONE | ▪ BZIP2<br/> ▪ DEFLATE<br/> ▪ NONE<br/> ▪ SNAPPY<br/> ▪ LZO | 压缩类型，默认值NONE |
| **Default Decimal Precision** | 10 |  | 精度；当一个DECIMAL/NUMBER类型的值被写成“DECIMAL”Avro Logical 类型时，需要一个特定的“precision”来表示可用具体数字的数量。通常，精度由列数据类型定义或数据库引擎默认定义。当然，某些数据库引擎也可以返回未定义的精度(0)。<br/>  **支持表达式语言** |
| **Default Decimal Scale** | 0 |  | 当一个DECIMAL/NUMBER类型被写成“DECIMAL”Avro Logical 类型时，需要一个特定的“scale”来表示可用的小数位数。通常，scale是由列数据类型定义或数据库引擎默认定义的。但是，当返回未定义的精度(0)时，一些数据库引擎的伸缩性也可能不确定。“默认十进制”用于编写那些未定义的数字。如果一个值的小数比指定的比例多，那么该值将被四舍五入，例如，1.53在比例为0时变成2，在比例为1时变成1.5。<br/>  **支持表达式语言** |
| **Max Rows Per Flow File** | 0 |  | 单个流文件中包含的最大结果行数。这意味着允许将非常大的结果集分解为多个流文件。如果指定的值为零，则在单个流文件中返回所有行。 <br/> **支持表达式语言** |
| **Output Batch Size** | 0 |  | 提交进程会话之前要排队的输出流文件的数量。当设置为零时，会话将在处理完所有结果集行并准备好将输出流文件传输到下游关系时提交。对于大型结果集，这可能导致在处理器执行结束时传输大量流文件。如果设置了此属性，那么当指定数量的流文件准备好传输时，将提交会话，从而将流文件释放到下游关系。注意:片段。在设置此属性时，不会在FlowFiles上设置count属性。<br/>  **支持表达式语言** |
| **Fetch Size** |  |  | 一次要从结果集中获取的结果行数。这是对数据库驱动程序的提示，有可能JDBC驱动并不支持。如果指定的值为零，则忽略提示。 |

