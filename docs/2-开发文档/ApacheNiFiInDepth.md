# Apache NiFi In Depth
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***

## 简介

本高级文档旨在深入了解NiFi的实现和设计决策。假定读者已阅读足够的其他文档，已经了解NiFi的基础知识。

FlowFiles是NiFi及其基于流的设计的核心。 FlowFile是一个数据记录，由指向其内容（有效负载）的指针和支持该内容的属性组成，该记录与一个或多个`provenance events`关联。属性是用作FlowFile的元数据的键/值对，例如FlowFile文件名。内容是实际数据或文件的有效负载。来源记录了FlowFile发生了什么。这些部分中的每个部分都有其自己的存储库（repo）用于存储。

存储库的一个关键方面是不变性。 `Content Repository`中的内容和`FlowFile Repository`中的数据是不可变的。当FlowFile的属性发生更改时，将在内存中创建属性的新副本，然后将其保留在磁盘上。当更改给定FlowFile的内容时，将读取其原始内容，通过转换将其流式传输并写入新的流。然后，FlowFile的内容指针将更新到磁盘上的新位置。结果，可以将FlowFile内容存储的默认方法称为不变版本的内容存储。这样做的好处很多，包括：大大减少了典型的复杂图形处理所需的存储空间，自然重放功能，利用了OS缓存，减少了随机读取/写入性能的损失，并且易于推理。先前的修订版本是根据`nifi.properties`文件中设置的存档属性保留的，并在NiFi系统管理员指南中进行了概述。

## Repositories

NiFi使用了三个存储库。每个文件都存在于`OS/Host`的文件系统中，并提供特定的功能。为了全面了解FlowFiles以及底层系统如何使用它们，了解这些存储库非常重要。这三个存储库都是本地存储中NiFi用于保存数据的目录。

- `FlowFile Repository`库包含流中所有当前FlowFiles的元数据。

- `Content Repository`保存当前和过去FlowFiles的内容。

- `Provenance Repository`保存FlowFiles的历史记录。

![](./image/developer/1.png)

### FlowFile Repository

系统正在积极处理的FlowFiles保留在JVM内存中的哈希图中（有关更深入的了解，请参见“深入视图：内存和磁盘中的FlowFiles”）。这使得处理它们非常高效，但是由于多种原因（例如断电，内核崩溃，系统升级和维护周期），需要使用辅助机制在整个进程重新启动时提供数据持久性。 FlowFile信息库是系统中当前存在的每个FlowFiles的元数据的“预写日志”（或数据记录）。该FlowFile元数据包括与FlowFile相关联的所有属性，指向FlowFile实际内容的指针（该内容存在于内容库中）以及FlowFile的状态，例如FlowFile所属的Connection /Queue。 Ahead Log为NiFi提供了处理重启和意外系统故障所需的弹性。

FlowFile信息库充当NiFi的预写日志，因此，当FlowFiles在系统中流动时，每次更改都会记录在FlowFile信息库中，然后再作为事务性工作单元进行。这使系统可以准确地知道节点在处理一条数据时所处的步骤。如果节点在处理数据时发生故障，则可以轻松地从重新启动时中断的位置恢复（更深入地了解“系统故障对事务的影响”）。日志中FlowFiles的格式是沿途发生的一系列增量（或更改）。 NiFi通过还原FlowFile的“快照”（在对存储库进行检查点创建时创建）来恢复FlowFile，然后重播每个增量。

系统会定期自动创建快照，该快照将为每个FlowFile创建一个新快照。系统通过序列化哈希图中的每个FlowFile并将其写入文件名为“ .partial”的磁盘来计算新的基本检查点。随着检查点的进行，新的FlowFile基线将写入“ .partial”文件。完成检查点操作后，将删除旧的“快照”文件，并将“ .partial”文件重命名为“快照”。

系统检查点之间的时间间隔可以在“ nifi.properties”文件中配置（在《 NiFi系统管理员指南》中记录）。默认值为两分钟间隔。

#### Effect of System Failure on Transactions

NiFi通过在每个节点各自的FlowFile存储库中记录当时每个节点发生的情况来防止硬件和系统故障。如上所述，FlowFile Repo是NiFi的预写日志。当节点重新联机时，它将通过首先检查“快照”和“ .partial”文件来恢复其状态。节点要么接受“快照”，然后删除“ .partial”（如果存在），或者如果“快照”文件不存在，则将“ .partial”文件重命名为“ snapshot”。

如果节点在发生故障时处于写入内容的中间，则没有任何损坏，这要归功于“写时复制”（下面提到）和“不变性”（上面提到）范例。由于FlowFile事务绝不会修改原始内容（由内容指针指向），因此原始内容是安全的。当NiFi发生故障时，更改的写声明将被孤立，然后由后台垃圾回收清除。这将提供“回滚”到最后一个已知的稳定状态。

然后，节点从FlowFile恢复其状态。有关该过程的更详细的分步说明，请参阅NiFi的预写日志实现。

就事务工作单位而言，此设置使NiFi可以在逆境中非常灵活，确保即使NiFi突然被杀死，它也可以恢复运行而不会丢失任何数据。


