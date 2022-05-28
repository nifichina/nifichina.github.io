# TailFile
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 描述

"Tails"一个文件或文件列表，在文件写入文件时从文件中摄取数据。该文件应为文本文件(text)。只有在遇到新行（回车符或新行字符）时才会接收数据。如果要Tail的文件是定期“rolled over(滚动)”的（日志文件通常是这样），则可以使用可选的`Rolling Filename Pattern`从已滚动的文件中检索数据，即使回滚发生在NiFi未运行时（前提是数据在NiFi重新启动时仍然存在）。通常建议将运行计划设置为几秒，而不是使用默认值0秒运行，否则此处理器将消耗大量资源。此处理器不支持接收“rolled over”时已压缩的文件。

## 属性配置

在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。

| Name | Default Value | Allowable Values | Description |
|--|--|--|--|
| **Tailing mode** | Single file | ▪Single file<br/>▪Multiple files | 使用模式: single file只会tail一个文件, multiple file将tail一个文件列表. 在multiple file模式下，需要配置`Base directory`。 |
| **File(s) to Tail** |  |  | 在`Single file`模式下，这里配置文件的**全路径名称**。如果使用`multiple file`模式，这里配置正则表达式，在`Base directory`中匹配查找要tail的文件。如果`Recursive lookup`设置为true，则正则表达式将用于匹配从`Base directory`开始的路径递归查找。<br/>支持表达式语言:true |
| Rolling Filename Pattern |  |  | 如果要tail的文件像日志文件一样“rolled over”，则此配置将用于标识**已滚动**的文件，如果NiFi重新启动，并且文件已滚动，则它也能够从停止的位置开始。此模式支持通配符*和？，它还支持标记${filename}以根据文件名（不带扩展名）指定模式，默认认为已滚动的文件与要tail的文件位于同一目录中。所有文件都将使用相同的glob模式。 |
| Base directory |  |  | 用于查找需要tail的文件的基本目录。使用`multiple file`模式时，此属性是必需的。<br/>支持表达式语言:true |
| **Initial Start Position** | Beginning of File|▪Beginning of File<br/>▪Beginning of Time<br/>▪Beginning of File<br/>▪Current Time | 当处理器首次开始tail数据时，此属性指定处理器应在何处开始读取数据。从文件中提取数据后，处理器将从上一次接收数据的最位置继续tail数据。 |
| **State Location** | Local | ▪Local<br/>▪Remote | 指定状态位于本地或群集的位置，以便可以适当地存储状态，保证数据不被重复tail |
| **Recursive lookup** | false | ▪true<br/>▪false | 使用`multiple file`模式时，此属性定义是否必须在基目录中递归列出文件。 |
| Lookup frequency | 10 minutes |  | 仅用于`multiple file`模式。它指定处理器在再次列出需要tail的文件之前将等待的最短时间。 |
| Maximum age | 24 hours |  | 仅用于`multiple file`模式。它指定了文件在最后一次修改后到现在的这段时间小于此配置时间段。如果将新消息以较低的频率添加，则不应将其设置得太低以避免重复数据。如果自文件最后一次修改以来经过的时间大于此配置时间段，则不会tail文件。 |        

## 连接关系

| Name | Description |
|--|--|
| success | 所有FlowFiles都路由到此关系。 |

## 读取属性

没有指定。

## 写属性

| Name | Description |
|--|--|
| tailfile.original.path |流文件来自的原始文件的路径。 |

## 状态管理

| Scope | Description |
|--|--|
| LOCAL, CLUSTER | 存储有关在tail过的文件的位置的状态，以便在重新启动时不必重复tail数据。状态存储在本地还是群集中取决于`State Location`属性。 |

## 限制

| Required Permission | Explanation |
|--|--|
| read filesystem | 使操作员能够读取NiFi有权访问的任何文件。 |

## 输入要求

不允许传入流文件

## 系统资源方面的考虑

没有指定。

## 详细说明

### Modes

该处理器用于根据多种模式tail一个文件或多个文件。选择的模式取决于文件的日志记录模式。如果存在滚动模式，则滚动文件必须是纯文本文件（当前不支持压缩）。

* **Single file**: 处理器将使用`File(s) to Tail`属性中指定的路径tail文件。
* **Multiple files**: 处理器将在`Base directory`中查找文件。它将根据“`Recursive lookup`属性以递归方式查找文件，并将匹配`File(s) to Tail`属性中的正则表达式。

### Rolling filename pattern

如果使用了`Rolling filename pattern'`属性，则当处理器检测到要tail的文件已滚动时，处理器将在滚动了的文件中查找那些可能错过的消息。为此，处理器将使用该配置在与要tail的文件所在的相同的目录中查找文件。

当多个要tail的文件位于同一目录中时，为了使此属性在`Multiple files`模式下可用，可以使用${filename}标记将要tail的文件的名称（不带扩展名）

比如：
```
/my/path/directory/my-app.log.1  
/my/path/directory/my-app.log  
/my/path/directory/application.log.1  
/my/path/directory/application.log
```
'rolling filename pattern'就是 _${filename}.log.*_ 。

### Descriptions for different modes and strategies

`Single file`模式假定要tail的文件始终具有相同的名称，即使存在滚动模式也是如此。
```
/my/path/directory/my-app.log.2
/my/path/directory/my-app.log.1
/my/path/directory/my-app.log
```
并且新的日志消息总是附加在`my-app.log`文件中。

如果递归设置为true。正则表达式必须包含基本目录和文件尾部之间的可能中间目录。

```
/my/path/directory1/my-app1.log
/my/path/directory2/my-app2.log
/my/path/directory3/my-app3.log
```
- Base directory: /my/path
- Files to tail: directory[1-3]/my-app[1-3].log
- Recursivity: true

如果处理器配置为`Multiple files`模式，则

- Lookup frequency: 指定处理器在再次列出文件时将等待的最短时间。
- Maximum age：如果自文件修改以来经过的时间大于此时间段，则不会tail文件。例如，如果文件是24小时前修改的，并且此属性设置为12小时，则不会tail文件。但是，如果将此属性设置为36小时，则文件将被tail。

为了获得高性能，有必要注意'Lookup frequency'和'Maximum age'属性以及触发处理器的频率。建议保持Maximum age'>'Lookup frequency'>处理器调度频率，以避免丢失数据。还建议不要将'Maximum Age'设置得太低，因为如果在此文件被认为'too old'之后在文件中附加了消息，则可能会再次读取文件中的所有消息(这个被认为too old的文件程序有可能在它有新内容增加后把它当成是新的文件来tail)，从而导致数据重复。

如果处理器配置为`Multiple files`模式，则'Rolling filename pattern'属性必须足够具体，以确保仅列出滚动文件，而不会列出同一目录中的其他已经tail过的文件。
