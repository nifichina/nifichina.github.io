# CountText
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***


## 描述

计算传入文本的各种指标。请求的结果将记录为属性。不会修改流文件内容。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

| Name | Default Value | Allowable Values | Description |
|--|--|--|--|
| **Count Lines** | true | * true  * false | 如果启用，将计算传入文本中的行数。 |
| **Count Non-Empty Lines** | false | * true  * false | 如果启用，将计算传入文本中包含非空格字符的行数。 |
| **Count Words** | false | * true  * false | 如果启用，将计算传入文本中存在的单词（由空格限制的字母数字字符组）的数量。通用逻辑定界符[_-。]不会限制单词，除非“在符号上分割单词”为true。 |
| **Count Characters** | false | * true  * false | 如果启用，将计算传入文本中出现的字符数（包括空格和符号，但不包括换行符和回车符）。 |
| **Split Words on Symbols** | false | * true  * false | 如果启用，字数统计将识别由通用逻辑定界符[_-分隔的字符串。 ]作为独立词（例如，符号上的拆分词= 4个词）。 |
| **Character Encoding** | UTF-8 | * ISO-8859-1 <br/> * UTF-8 <br/>  * UTF-16 <br/>  * UTF-16LE <br/>  * UTF-16BE <br/>  * US-ASCII | 指定要使用的字符编码。 |
| **Call Immediate Adjustment** | false | * true <br/>  * false | 如果为true，则将立即更新计数器，而无需考虑ProcessSession是提交还是回退；否则，仅在以及何时提交ProcessSession时，计数器才会递增。 |      

## 连接关系:

| Name | Description |
|--|--|
| success | 流文件包含原始内容，并添加了一个或多个包含相应计数的属性 |
| failure | 如果由于某种原因无法计算流文件文本，则原始文件将被路由到该目标，而其他任何内容都将不被路由 |

## 读取属性

没有指定。

## 写属性

Name                     | Description                                                                                              
------------------------ | ---------------------------------------------------------------------------------------------------------
text.line.count          | FlowFile内容中存在的文本行数                                              
text.line.nonempty.count | 原始FlowFile中存在的文本行数（至少有一个非空白字符）
text.word.count          | 原始FlowFile中存在的单词数                                               
text.character.count     | 原始FlowFile中存在的字符数（指定的字符编码）   

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