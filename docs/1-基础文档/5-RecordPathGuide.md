# Apache NiFi RecordPath Guide

## Overview

Apache NiFi提供了一组非常强大的处理器，能够提取，处理，路由，转换和传递任何格式的数据。这是因为NiFi框架本身与数据无关。不管您的数据是100字节JSON消息还是100 GB的视频。这是一个非常强大的功能。除此之外还有有许多模式已迅速发展为处理不同类型的数据。

NiFi经常处理的一类数据是面向record的数据。当我们说面向record的数据时，我们经常（但并非总是）谈论诸如JSON，CSV和Avro之类的结构化数据。但是，还有许多其他类型的数据也可以表示为“records”或“messages”。NIFI提供了一组Controller Services，用于解析这些不同的数据格式并使用RecordReader API以一致的方式表示数据。只要有一个RecordReader能够产生代表该数据的Record对象，就可以将以任何数据格式写入的数据视为相同。

当我们谈论record时，这是一种抽象，它使我们能够以相同的方式处理数据，而不管其采用的格式。record由一个或多个字段组成。每个字段都有一个名称和与之关联的类型。使用record schema描述record的字段。schema指示哪些字段构成特定类型的record。字段的类型将是以下之一：

1.  String

2.  Boolean

3.  Byte

4.  Character

5.  Short

6.  Integer

7.  Long

8.  BigInt

9.  Float

10.  Double

11.  Date - 表示没有Time部分的日期

12.  Time - 表示不包含Date部分的一天中的时间

13.  Timestamp - Represents a Date and Time

14.  Embedded Record - 可以通过允许字段本身为Type Record来表示诸如JSON之类的分层数据。

15.  Choice - 字段可以是几种类型中的任何一种。

16.  Array - 数组的所有元素都具有相同的类型。

17.  Map - 所有映射键的类型均为字符串。值是同一类型。

将数据流转换为Records后，RecordWriter API允许我们将这些Records序列化回字节流，以便可以将它们传递到其他系统上。

当然，如果我们不打算对两者之间的数据做任何事情，那么读取和写入这些数据就没有多大意义。NiFi提供了多种处理器，它们提供了一些非常强大的功能，用于路由，查询和转换面向record的数据。通常，为了执行所需的功能，处理器将需要来自用户的输入，以便确定应对record中的哪些字段或对record中的哪些值进行操作。

输入NiFi RecordPath语言。 RecordPath旨在成为一种简单易用的领域特定语言（DSL），用于指定在配置处理器时我们关心或希望访问的record中的哪些字段。

## Structure of a RecordPath

NiFi中的record由（可能）许多字段组成，并且这些字段中的每个字段实际上都可以是record。这意味着可以将record视为具有层次结构或嵌套结构。我们将“inner Record”称为“outer Record”的子代。因此，内部Record的子级是最外部record的后代。同样，我们可以将外部record称为内部record的祖先。

## Child Operator

RecordPath语言的结构使我们能够轻松引用最外层Record的字段，子Record或后代Record的字段。为此，我们用斜杠字符（/）分隔子代的名称，我们将其称为子运算符。例如，假设我们有一个包含两个字段的record：name,details。此外，假设详细信息是一个字段，该字段本身就是一个Record，并且具有两个字段：identifier,address。此外，让我们考虑一下地址本身就是一个包含5个字段的record：number, street, city, state, zip。为了说明目的，此处以JSON编写的示例可能如下所示：
```json
{
	"name": "John Doe",
	"details": {
		"identifier": 100,
		"address": {
			"number": "123",
			"street": "5th Avenue",
			"city": "New York",
			"state": "NY",
			"zip": "10020"
		}
	}
}
```
我们可以使用RecordPath来引用zip字段：`/details/address/zip`。这告诉我们我们要使用“root”record的详细信息字段。然后，我们要引用子record的address字段和该record的zip字段。

## Descendant Operator

除了提供到达zip字段的显式路径之外，有时在不知道完整路径的情况下引用zip字段有时可能很有用。在这种情况下，我们可以使用后代运算符（//）代替子运算符（/）。要获得与上述相同的zip字段，我们只需使用路径`//zip`即可完成此操作。

但是，子运算符和后代运算符之间有一个非常重要的区别：后代运算符可以匹配许多字段，而子运算符最多可以匹配一个字段。为了帮助理解这一点，请考虑以下record：
```json
{
	"name": "John Doe",
	"workAddress": {
		"number": "123",
		"street": "5th Avenue",
		"city": "New York",
		"state": "NY",
		"zip": "10020"
	},
	"homeAddress": {
		"number": "456",
		"street": "116th Avenue",
		"city": "New York",
		"state": "NY",
		"zip": "11697"
	}
}
```
现在，如果我们使用RecordPath `/workAddress/zip`，我们将引用值为“10020”的zip字段。 RecordPath `/homeAddress/zip`将引用值为“11697”的zip字段。但是，RecordPath `//zip`将引用这两个字段。

## Filters

通过以上示例和说明，我们可以轻松引用Record中的特定字段。但是，在实际情况下，数据很少像上面的示例那样简单。通常，我们需要过滤掉或优化我们要引用的字段。当我们引用一个Array字段并且只想引用该数组中的某些元素时，可能需要这样做。当我们引用Map字段并希望引用Map中的一个或几个特定条目时；或者仅在符合某些条件的情况下我们才想引用record。我们可以通过在方括号内为RecordPath提供条件（使用`[,]`字符）来完成此操作。我们将在下面介绍每种情况。

## Function Usage

如上文“Filters”部分所述，除了从record中检索字段外，有时我们还需要优化我们要选择的字段。或者，我们可能想返回字段的修改后版本。为此，我们依靠功能。函数的语法为`<function name> <open parenthesis> <args> <close parenthesis>`，其中`<args>`表示一个或多个用逗号分隔的参数。参数可以是字符串文字（如“hello”）或数字文字（如48），也可以是相对或绝对的RecordPath（如./name或/id）。另外，我们可以在过滤器中使用函数。例如，我们可以使用诸如`/person[isEmpty('name')]/id`之类的RecordPath来检索名称为空的任何人的id字段。可用功能列表及其相应文档可在下面的“Functions”部分中找到。

### Arrays

当我们引用数组字段时，该字段的值可能是一个包含多个元素的数组，但我们可能只需要其中的几个元素。例如，我们可能只想引用第一个元素；只引用最后一个元素；或者可能引用第一个、第二个、第三个和最后一个元素。我们可以简单地使用方括号内元素的索引来引用特定元素（索引是从0开始的）。因此，让我们考虑一下上述record的修改版本：
```json
{
	"name": "John Doe",
	"addresses": [
		"work": {
			"number": "123",
			"street": "5th Avenue",
			"city": "New York",
			"state": "NY",
			"zip": "10020"
		},
		"home": {
			"number": "456",
			"street": "116th Avenue",
			"city": "New York",
			"state": "NY",
			"zip": "11697"
		}
	]
}
```
我们现在可以使用RecordPath `/addresses[0]`引用addresses数组中的第一个元素。我们可以使用RecordPath `/addresses[1]`访问第二个元素。不过，有时我们不知道数组中会有多少个元素。所以我们可以使用负索引从数组的末尾倒数。例如，我们可以将最后一个元素作为`/addresses[-1]`访问，也可以将倒数第二个元素作为`/addresses[-2]`访问。如果要引用多个元素，可以使用逗号分隔的元素列表，例如`/addresses[0，1，2，3]`。或者，要访问元素0到8，我们可以使用范围运算符（`..`），如`/addresses[0..8]`。我们还可以混合使用这些元素，并使用语法`/addresses[0..-1]`或甚至`/addresses[0，1，4，6..-1]`引用所有元素。当然，并不是这里引用的所有索引都与上面的record匹配，因为addresses数组只有2个元素。不匹配的索引将被跳过。

## Maps

与数组字段类似，映射字段实际上可能由几个不同的值组成。RecordPath使我们能够根据键选择一组值。我们通过在方括号内使用带引号的字符串来实现这一点。作为一个例子，让我们从上面重新访问我们的原始record：

```json
{
	"name": "John Doe",
	"details": {
		"identifier": 100,
		"address": {
			"number": "123",
			"street": "5th Avenue",
			"city": "New York",
			"state": "NY",
			"zip": "10020"
		}
	}
}
```

现在，让我们假设与这个Record相关联的Schema指示address字段不是Record而是Map。在这种情况下，如果我们试图使用RecordPath`/details/address/zip`引用zip，那么RecordPath将不匹配，因为address字段不是record，因此没有任何名为zip的子record。相反，它是一个Map，具有String类型的键和值。不幸的是，当查看JSON时，这可能看起来有点混乱，因为JSON没有真正的类型系统。但是，当我们将JSON转换为Record对象以便对数据进行操作时，这种区别可能很重要。

在上述情况下，我们仍然可以使用RecordPath访问zip字段。现在我们必须使用稍微不同的语法：`/details/address['zip']`。这告诉RecordPath我们要访问最高级别的details字段。然后我们要访问它的address字段。因为address字段是一个Map，所以我们可以使用方括号来表示要指定一个映射键，然后用引号指定键。

此外，我们可以使用逗号分隔的列表选择多个映射键：`/details/address['city'，'state'，'zip']`。如果需要，我们还可以使用通配符(*)：`/details/address[*]`选择所有字段。映射字段不包含任何排序，因此无法通过数字索引引用键。

## Predicates

到目前为止，我们已经讨论了两种不同类型的过滤器。每种方法都允许我们从允许多个值的字段中选择一个或多个元素。但是，通常我们需要应用一个过滤器，允许我们限制选择哪些record字段。例如，如果我们想选择zip字段，但只为值不是纽约的address字段选择呢？上面的例子并没有给我们提供任何方法来做到这一点。

RecordPath为用户提供了指定谓词的能力。谓词只是一个过滤器，它可以应用于一个字段，以确定该字段是否应包含在结果中。与其他过滤器一样，谓词在方括号内指定。谓词的语法是`<Relative RecordPath><Operator><Expression>`。`Relative RecordPath`的工作方式与其他RecordPath相同，但必须以`.`（参考当前字段）或`..`(引用当前字段的父字段）开头而不是斜杠，并引用与谓词应用的字段相关的字段。操作必须是以下之一：

1.  Equals (`=`)

2.  Not Equal (`!=`)

3.  Greater Than (`>`)

4.  Greater Than or Equal To (`>=`)

5.  Less Than (`<`)

6.  Less Than or Equal To (`<=`)

表达式可以是文字值，例如50或Hello，也可以是另一个RecordPath。为了说明这一点，让我们以下面的record为例：
```json
{
	"name": "John Doe",
	"workAddress": {
		"number": "123",
		"street": "5th Avenue",
		"city": "New York",
		"state": "NY",
		"zip": "10020"
	},
	"homeAddress": {
		"number": "456",
		"street": "Grand St",
		"city": "Jersey City",
		"state": "NJ",
		"zip": "07304"
	},
	"details": {
		"position": "Dataflow Engineer",
		"preferredState": "NY"
	}
}
```
现在我们可以使用谓词来仅选择state不是New York的字段。 例如，我们可以使用`/*[./state！='NY']`. 如果state不具有“NY”值，则它将选择任何具有state字段的record字段。请注意，将不返回详细details Record，因为它没有名为state的字段。因此，在此示例中，RecordPath将仅选择homeAddress字段。一旦选择了该字段，就可以继续我们的RecordPath。如上所述，我们可以选择zip字段：`/*[./state！='NY']/zip`。此RecordPath将导致仅从homeAddress字段中选择zip字段。

我们还可以将一个字段中的值与另一字段中的值进行比较。例如，我们可以使用RecordPath `/*[./state = /details/preferredState]`选择处于该人的首选状态的地址。在此示例中，此RecordPath将检索workAddress字段，因为其状态字段与preferredState字段的值匹配。

另外，我们可以通过使用父运算符（..）：`/*/city[../state ='NJ']`来写一个RecordPath来引用状态为“NJ”的任何record的“city”字段。

## Functions

在上面的“Function Usage”部分，我们描述了如何以及为什么在RecordPath中使用函数。在这里，我们将描述可用的不同功能，它们的功能以及它们的工作方式。函数可以分为两类：`Standalone Functions`(可以是RecordPath的“root”，例如`substringAfter(/name,'')`)和`Filter Functions`(它们可以用作过滤器，例如`/name[ contains('John')]`。`Standalone Functions`也可以在过滤器中使用，但不返回布尔值（true或false），因此本身不能是整个过滤器。例如，我们可以使用诸如`/name[ substringAfter(., ' ') = 'Doe']`之类的路径，但是我们不能简单地使用`/name[ substringAfter(., ' ') ]`，因为这样做实际上没有任何意义，因为过滤器必须为布尔值。

除非另有说明，否则下面的所有示例均将根据以下record进行操作：

```json
{
	"name": "John Doe",
	"workAddress": {
		"number": "123",
		"street": "5th Avenue",
		"city": "New York",
		"state": "NY",
		"zip": "10020"
	},
	"homeAddress": {
		"number": "456",
		"street": "Grand St",
		"city": "Jersey City",
		"state": "NJ",
		"zip": "07304"
	},
	"details": {
		"position": "Dataflow Engineer",
		"preferredState": "NY",
		"employer": "",
		"vehicle": null,
		"phrase": "   "
	}
}

```

## Standalone Functions

### substring

substring函数返回String值的一部分。该函数需要3个参数：值的一部分，从0开始的索引（包括），从0开始的结束索引（不包括）。起始索引和结束索引可以为0以指示字符串的第一个字符，可以为正整数以指示字符串的第n个索引，也可以为负整数。如果该值为负整数，例如-n，则表示结尾的第n个字符。值-1表示字符串中的最后一个字符。因此，例如，`substring( 'hello world', 0, -1 )`表示采用字符串hello，并从最后一个字符返回字符0，因此返回值将为hello world。

col 1                            | col 2         
-------------------------------- | --------------
RecordPath                       | Return value  
`substring( /name, 0, -1 )`      | John Doe      
`substring( /name, 0, -5 )`      | John          
`substring( /name, 1000, 1005 )` | `<empty string>`
`substring( /name, 0, 1005)`     | John Doe      
`substring( /name, -50, -1)`     | `<empty string>`

### substringAfter

返回String值的一部分，该值出现在其他值的第一次出现之后。

col 1                            | col 2       
-------------------------------- | ------------
RecordPath                       | Return value
`substringAfter( /name, ' ' )`   | Doe         
`substringAfter( /name, 'o' )`   | hn Doe      
`substringAfter( /name, '' )`    | John Doe    
`substringAfter( /name, 'xyz' )` | John Doe    

### substringAfterLast

返回在其他值的最后一次出现之后出现的String值的一部分。

col 1                                | col 2       
------------------------------------ | ------------
RecordPath                           | Return value
`substringAfterLast( /name, ' ' )`   | Doe         
`substringAfterLast( /name, 'o' )`   | e           
`substringAfterLast( /name, '' )`    | John Doe    
`substringAfterLast( /name, 'xyz' )` | John Doe    

### substringBefore

返回String值的出现在其他值的第一次出现之前的部分。

col 1                             | col 2       
--------------------------------- | ------------
RecordPath                        | Return value
`substringBefore( /name, ' ' )`   | John        
`substringBefore( /name, 'o' )`   | J           
`substringBefore( /name, '' )`    | John Doe    
`substringBefore( /name, 'xyz' )` | John Doe    

### substringBeforeLast

返回在其他值的最后一次出现之前出现的String值的一部分。

col 1                                 | col 2       
------------------------------------- | ------------
RecordPath                            | Return value
`substringBeforeLast( /name, ' ' )`   | John        
`substringBeforeLast( /name, 'o' )`   | John D      
`substringBeforeLast( /name, '' )`    | John Doe    
`substringBeforeLast( /name, 'xyz' )` | John Doe    

### replace

用另一个字符串替换所有出现的字符串。

col 1                                        | col 2        
-------------------------------------------- | -------------
RecordPath                                   | Return value 
`replace( /name, 'o', 'x' )`                 | Jxhn Dxe     
`replace( /name, 'o', 'xyz' )`               | Jxyzhn Dxyze 
`replace( /name, 'xyz', 'zyx' )`             | John Doe     
`replace( /name, 'Doe', /workAddress/city )` | John New York

### replaceRegex

根据字符串值的内容评估正则表达式，并将任何匹配项替换为另一个值。此函数需要3个参数：要针对其运行正则表达式的字符串，要运行的正则表达式，
和替换的值。替换值可以选择使用反向引用，例如`$1`和`${named_group}`。

col 1                                                | col 2        
---------------------------------------------------- | -------------
RecordPath                                           | Return value 
`replaceRegex( /name, 'o', 'x' )`                    | Jxhn Dxe     
`replaceRegex( /name, 'o', 'xyz' )`                  | Jxyzhn Dxyze 
`replaceRegex( /name, 'xyz', 'zyx' )`                | John Doe     
`replaceRegex( /name, '\s+.*', /workAddress/city )`  | John New York
`replaceRegex(/name, '([JD])', '$1x')`               | Jxohn Dxoe   
`replaceRegex(/name, '(?<hello>[JD])', '${hello}x')` | Jxohn Dxoe   

### concat

将所有参数串联在一起。

col 1                                               | col 2                        
--------------------------------------------------- | -----------------------------
RecordPath                                          | Return value                 
`concat( /name, ' lives in ',  /homeAddress/city )` | John Doe lives in Jersey City

### fieldName

通常，当为record中的特定字段指定路径时，返回的是该字段的值。它有时对于获取字段名称而不是值很有用。为此，我们可以使用fieldName函数。

col 1                                            | col 2                          
------------------------------------------------ | -------------------------------
RecordPath                                       | Return value                   
`fieldName(//city/..)`                           | `workAddress` and `homeAddress`
`//city[not(startsWith(fieldName(..), 'work'))]` | Jersey City                    

在上面的示例中，第一个RecordPath返回两个单独的字段名称：“workAddress”和“homeAddress”。相反，第二个RecordPath返回“city”字段的值，并使用fieldName函数作为谓词。第二个RecordPath查找一个“city”字段，其父级没有以“work”开头的名称。这意味着它将返回父项为“homeAddress”的“city”字段的值，而不返回父项为“ workAddress”的“city”字段的值。

### toDate

将字符串转换为日期。例如，给定一个schema，例如：
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" },
    { "name": "eventDate", "type" : "string"}
  ]
}
```

以及诸如以下的record：
```json
{
  "name" : "My Event",
  "eventDate" : "2017-10-20T00:00:00Z"
}
```

以下RecordPath会将eventDate字段解析为Date：

`toDate( /eventDate, "yyyy-MM-dd’T’HH:mm:ss’Z'")`

`toDate( /eventDate, "yyyy-MM-dd’T’HH:mm:ss’Z'", "GMT+8:00")`

### toString

如果输入类型为“bytes”，则使用给定的字符集将值转换为字符串。例如，给定一个schema，例如：
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" },
    { "name": "bytes", "type" : "bytes"}
  ]
}
```
以及诸如以下的record：
```json
{
  "name" : "My Event",
  "bytes" : "Hello World!"
}
```

以下RecordPath会将bytes字段解析为String：

`toString(/bytes, "UTF-8")`

### toBytes

使用给定的字符集将String转换为byte[]。例如，给定一个schema，例如：
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" },
    { "name": "s", "type" : "string"}
  ]
}
```
以及诸如以下的record：
```json
{
  "name" : "My Event",
  "s" : "Hello World!"
}
```
以下RecordPath将使用UTF-16编码将String字段转换为字节数组：
`toBytes( /s, "UTF-16")`

### format

使用给定的时区（可选，默认时区为GMT）将Date转换为给定格式的字符串。

此函数的第一个参数必须为Date或Number，第二个参数必须为Java SimpleDateFormat后面的格式字符串，第三个参数（可选）必须为缩写形式（例如“PST”）的格式字符串，全名（例如“America/Los_Angeles”）或自定义ID（例如“GMT-8：00”），例如，给定以下schema：
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" },
    { "name": "eventDate", "type" : { "type" : "long", "logicalType" : "timestamp-millis" } }
  ]
}
```
以及诸如以下的record：
```json
{
  "name" : "My Event",
  "eventDate" : 1508457600000
}
```

以下RecordPath表达式会将日期格式设置为字符串：

col 1                                                      | col 2                    
---------------------------------------------------------- | -------------------------
RecordPath                                                 | Return value             
`format( /eventDate, "yyyy-MM-dd’T’HH:mm:ss’Z'")`          | 2017-10-20T00:00:00Z     
`format( /eventDate, "yyyy-MM-dd")`                        | 2017-10-20               
`format( /eventDate, "yyyy-MM-dd HH:mm:ss Z", "GMT+8:00")` | 2017-10-20 08:00:00 +0800
`format( /eventDate, "yyyy-MM-dd", "GMT+8:00")`            | 2017-10-20               

在将字段声明为String的情况下，必须在格式化之前调用toDate函数。例如，给定一个schema，例如：
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" },
    { "name": "eventDate", "type" : "string"}
  ]
}
```
以及诸如以下的record：
```json
{
  "name" : "My Event",
  "eventDate" : "2017-10-20T00:00:00Z"
}
```

以下RecordPath将重新格式化日期字符串：

col 1                                                                   | col 2       
----------------------------------------------------------------------- | ------------
RecordPath                                                              | Return value
`format( toDate(/eventDate, "yyyy-MM-dd’T’HH:mm:ss’Z'"), 'yyyy-MM-dd')` | 2017-10-20  

### trim

从字符串的开头和结尾删除空格。
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" }
  ]
}
```
以及诸如以下的record：
```json
{
  "name" : "    John Smith    "
}
```

以下RecordPath表达式将删除多余的空白：

col 1         | col 2       
------------- | ------------
RecordPath    | Return value
`trim(/name)` | John Smith  

### toUpperCase

将整个字符串改为大写
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "fullName", "type": "string" }
  ]
}
```
以及诸如以下的record：
```json
{
  "fullName" : "john smith"
}
```

以下RecordPath表达式将删除多余的空白：

col 1                | col 2       
-------------------- | ------------
RecordPath           | Return value
`toUpperCase(/name)` | JOHN SMITH  

### toLowerCase

Changes the entire string to lower case.

```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "message", "type": "string" }
  ]
}
```

以及诸如以下的record：

```json
{
  "name" : "hEllO wORLd"
}
```

以下RecordPath表达式将删除多余的空白：

col 1            | col 2       
---------------- | ------------
RecordPath       | Return value
`trim(/message)` | hello world 

### base64Encode

使用Base64编码，使用UTF-8字符集转换字符串或byte[]。例如，给定一个schema，例如：
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" }
  ]
}
```

以及诸如以下的record：

```json
{
  "name" : "John"
}
```

以下RecordPath表达式将使用Base64对字符串进行编码：

col 1                 | col 2       
--------------------- | ------------
RecordPath            | Return value
`base64Encode(/name)` | Sm9obg==    

### base64Decode

解码Base64编码的字符串或byte[]。例如，给定一个schema，例如：
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" }
  ]
}
```

以及诸如以下的record：

```json
{
  "name" : "Sm9obg=="
}
```

以下RecordPath表达式将使用Base64对字符串进行解码：

col 1                 | col 2       
--------------------- | ------------
RecordPath            | Return value
`base64Decode(/name)` | John        

### hash

使用哈希算法转换字符串。例如，给定一个schema，例如：
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" }
  ]
}
```

以及诸如以下的record：

```json
{
  "name" : "John"
}
```

下面的RecordPath表达式将使用以下`[SHA-384，SHA-224，SHA-256，MD2，SHA，SHA-512，MD5]`算法之一散列字符串。

col 1                | col 2                           
-------------------- | --------------------------------
RecordPath           | Return value                    
`hash(/name, 'MD5')` | 527bd5b5d689e2c32ae974c6229ff785

### padLeft

在输入字符串前面加上字符，直到它达到所需的长度。

```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" }
  ]
}
```

以及诸如以下的record：

```json
{
  "name" : "john smith"
}
```

以下RecordPath表达式将在输入字符串前面加上“@”字符：

col 1                     | col 2          
------------------------- | ---------------
RecordPath                | Return value   
`padLeft(/name, 15, '@')` | @@@@@john smith

### padRight

向输入字符串追加字符，直到达到所需长度。
```json
{
  "type": "record",
  "name": "events",
  "fields": [
    { "name": "name", "type": "string" }
  ]
}
```

以及诸如以下的record：

```json
{
  "name" : "john smith"
}
```

以下RecordPath表达式将在输入字符串后附加“@”字符：

col 1                      | col 2          
-------------------------- | ---------------
RecordPath                 | Return value   
`padRight(/name, 15, '@')` | john smith@@@@@


## Filter Functions

### contains

如果字符串值包含提供的子字符串，则返回“true”；否则返回“false”

col 1                                                              | col 2               
------------------------------------------------------------------ | --------------------
RecordPath                                                         | Return value        
`/name[contains(., 'o')]`                                          | John Doe            
`/name[contains(., 'x')]`                                          | `<returns no results>`
`/name[contains( ../workAddress/state, /details/preferredState )]` | John Doe            

### matchesRegex

根据字符串值的内容计算正则表达式，如果正则表达式与字符串值完全匹配，则返回“true”，否则返回“false”。

col 1                                | col 2               
------------------------------------ | --------------------
RecordPath                           | Return value        
`/name[matchesRegex(., 'John Doe')]` | John Doe            
`/name[matchesRegex(., 'John')]`     | `<returns no results>`
`/name[matchesRegex(., '.* Doe' )]`  | John Doe            

### startsWith

如果字符串值以提供的子字符串开头，则返回“true”；否则返回“false”

col 1                         | col 2               
----------------------------- | --------------------
RecordPath                    | Return value        
`/name[startsWith(., 'J')]`   | John Doe            
`/name[startsWith(., 'x')]`   | `<returns no results>`
`/name[startsWith(., 'xyz')]` | `<returns no results>`
`/name[startsWith(., '')]`    | John Doe            

### endsWith

如果字符串值以提供的子字符串结尾，则返回“true”；否则返回“false”

col 1                       | col 2               
--------------------------- | --------------------
RecordPath                  | Return value        
`/name[endsWith(., 'e')]`   | John Doe            
`/name[endsWith(., 'x')]`   | `<returns no results>`
`/name[endsWith(., 'xyz')]` | `<returns no results>`
`/name[endsWith(., '')]`    | John Doe            

### not

反转传递给“not”函数的函数或表达式的值。

col 1                          | col 2               
------------------------------ | --------------------
RecordPath                     | Return value        
`/name[not(endsWith(., 'x'))]` | John Doe            
`/name[not(contains(., 'x'))]` | John Doe            
`/name[not(endsWith(., 'e'))]` | `<returns no results>`

### isEmpty

如果提供的值为null或为空字符串，则返回“true”。

col 1                               | col 2               
----------------------------------- | --------------------
RecordPath                          | Return value        
`/name[isEmpty(/details/employer)]` | John Doe            
`/name[isEmpty(/details/vehicle)]`  | John Doe            
`/name[isEmpty(/details/phase)]`    | `<returns no results>`
`/name[isEmpty(.)]`                 | `<returns no results>`

### isBlank

如果提供的值为null或是空字符串或仅由空格（空格、制表符、回车符和换行符）组成的字符串，则返回“true”。

col 1                               | col 2               
----------------------------------- | --------------------
RecordPath                          | Return value        
`/name[isBlank(/details/employer)]` | John Doe            
`/name[isBlank(/details/vehicle)]`  | John Doe            
`/name[isBlank(/details/phase)]`    | John Doe            
`/name[isBlank(.)]`                 | `<returns no results>`

## 公众号

关注公众号 得到第一手文章/文档更新推送。

![](../image/wechat.jpg)