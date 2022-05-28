# 概览(Apache NiFi Overview)
***
编辑人(全网同名)：__**酷酷的诚**__  邮箱：**zhangchengk@foxmail.com** 
***


## NIFI是什么
简单的说，NiFi就是为了解决不同系统间数据自动流通问题而建立的。虽然dataflow这个术语在各种场景都有被使用，但我们在这里使用它来表示不同系统间的自动化的可管理的信息流。自企业拥有多个系统开始，一些系统会有数据生成，一些系统要消费数据，而不同系统之间数据的流通问题就出现了。这些问题出现的相应的解决方案已经被广泛的研究和讨论，其中企业集成[eip](#eip)就是一个全面且易于使用的方案。

**dataflow要面临的一些挑战包括：**

- **Systems fail**

  网络故障，磁盘故障，软件崩溃，人为事故。

- **Data access exceeds capacity to consume**

  有时，给定的数据源可能会超过处理链或交付链的某些部分的处理能力，而只需要一个环节出现问题，整个流程都会受到影响。

- **Boundary conditions are mere suggestions**

    总是会得到太大、太小、太快、太慢、损坏、错误或格式错误的数据。

- **What is noise one day becomes signal the next**

    现实业务或需求变更快，设计新的数据处理流程或者修改已有的流程必必须要迅速。

- **Systems evolve at different rates**

    给定的系统所使用的协议或数据格式可能随时改变，而且常常跟周围其他系统无关。dataflow的存在就是为了连接这种大规模分布的，松散的，甚至根本不是设计用来一起工作的组件系统。

- *Compliance and security**

    法律，法规和政策发生变化。企业对企业协议的变化。系统到系统和系统到用户的交互必须是安全的，可信的，负责任的。

- **Continuous improvement occurs in production**

    通常不可能在测试环境中完全模拟生产环境。

多年来，数据流一直是架构中不可避免的问题之一。现在有许多活跃的、快速发展的技术，使得dataflow对想要成功的特定企业更加重要，比如soa,API，iot,bigData。此外，合规性，隐私性和安全性所需的严格程度也在不断提高。尽管不停的出现这些新概念新技术，但dataflow面临的困难和挑战依旧，其中主要的区别还是复杂的范围，需要适应的需求变化的速度以及大规模边缘情况的普遍化。NiFi旨在帮助解决这些现代数据流挑战。

## NIFI的核心概念
NiFi的基本设计概念与基于流程的编程[fbp](#fbp)的主要思想密切相关。以下是一些主要的NiFi概念以及它们如何映射到FBP：

|NiFi术语|FBP Term|描述|
|----|----|----|
|FlowFile|Information Packet|FlowFile表示在系统中移动的每个对象，对于每个FlowFile，NIFI都会记录它一个属性键值对和0个或多个字节内容(FlowFile有attribute和content)。|
|FlowFile Processor|Black Box|实际上是处理器起主要作用。在[eip](#eip)术语中，处理器就是不同系统间的数据路由，数据转换或者数据中介的组合。处理器可以访问给定FlowFile的属性及其内容。处理器可以对给定工作单元中的零或多个流文件进行操作，并提交该工作或回滚该工作。|
|Connection|Bounded Buffer|Connections用来连接处理器。它们充当队列并允许各种进程以不同的速率进行交互。这些队列可以动态地对进行优先级排序，并且可以在负载上设置上限，从而启用背压。|
|Flow Controller|Scheduler|流控制器维护流程如何连接，并管理和分配所有流程使用的线程。流控制器充当代理，促进处理器之间流文件的交换。|
|Process Group|subnet|进程组里是一组特定的流程和连接，可以通过输入端口接收数据并通过输出端口发送数据，这样我们在进程组里简单地组合组件，就可以得到一个全新功能的组件(Process Group)。|



此设计模型也类似于[seda](#seda)，带来了很多好处，有助于NiFi成为非常有效的、构建功能强大且可扩展的数据流的平台。其中一些好处包括：

- 有助于处理器有向图的可视化创建和管理

- 本质上是异步的，允许非常高的吞吐量和足够的自然缓冲

- 提供高并发的模型，开发人员不必担心并发的复杂性

- 促进内聚和松散耦合组件的开发，然后可以在其他环境中重复使用并方便单元测试

- 资源受限的连接(流程中可配置connections)使得背压和压力释放等关键功能非常自然和直观

- 错误处理变得像基本逻辑一样自然，而不是粗粒度的全部捕获(catch-all)

- 数据进入和退出系统的点，以及它是如何流动的，都是容易理解和跟踪的。

## NiFi架构

![](./image/general/zero-master-node.png)

NiFi在操作系统上的JVM内执行。JVM上NiFi的主要组件如下：

- **Web Server**

    web服务器的目的是承载NiFi基于http的命令和控制API。

- **Flow Controller**

    是整个操作的核心，为将要运行的组件提供线程，管理调度。

- **Extensions**

    有各种类型的NIFI扩展，这些扩展在其他文档中进行了描述。这里的关键点是NIFI扩展在JVM中操作和执行。

- **FlowFile Repository**

    对于给定一个流中正在活动的FlowFile,FlowFile Repository就是NIFI保持跟踪这个FlowFIle状态的地方。FlowFile Repository的实现是可插拔的（多种选择，可配置，甚至可以自己实现），默认实现是使用Write-Ahead Log技术(简单普及下，WAL的核心思想是：在数据写入库之前，先写入到日志.再将日志记录变更到存储器中。)写到指定磁盘目录。

- **Content Repository**

    Content Repository是给定FlowFile的实际内容字节存储的地方。Content Repository的实现是可插拔的。默认方法是一种相当简单的机制，它将数据块存储在文件系统中。可以指定多个文件系统存储位置，以便获得不同的物理分区以减少任何单个卷上的争用。(所以环境最佳实践时可配置多个目录，挂载不同磁盘，提高IO)

- **Provenance Repository**

    Provenance Repository是存储所有事件数据的地方。Provenance Repository的实现是可插拔的，默认实现是使用一个或多个物理磁盘卷。在每个位置内的事件数据都是被索引并可搜索的。

NiFi也能够在集群内运行。

![](./image/general/zero-master-cluster.png)

从NiFi 1.0版本开始，NIFI集群采用了Zero-Master Clustering模式。NiFi群集中的每个节点对数据执行相同的任务，但每个节点都在不同的数据集上运行。Apache ZooKeeper选择单个节点作为集群协调器，ZooKeeper自动处理故障转移。所有集群节点都会向集群协调器发送心跳报告和状态信息。集群协调器负责断开和连接节点。此外，每个集群都有一个主节点，主节点也是由ZooKeeper选举产生。我们可以通过任何节点的用户界面（UI）与NiFi群集进行交互，并且我们所做的任何更改都将复制到集群中的所有节点上。

## NIFI的特性及性能预期

NIFI的设计目的是充分利用其运行的底层主机系统的能力。这种资源的最大化在CPU和磁盘方面尤其明显。有关其他详细信息，请参阅“Administration Guide”中的最佳实践和配置提示文档。

- **For IO**

    不同系统不同配置可预期的吞吐量或延迟会有很大差异，具体取决于系统的配置方式。鉴于大多数NiFi子系统都有可插拔的实现方法，所以性能取决于实现。但是，对于一些具体和广泛适用的地方，请考虑使用现成的默认实现。这些实现都是持久的，有保证的让数据流传递，并且是使用本地磁盘来实现。因此，保守点说，假设在典型服务器中的普通磁盘或RAID卷上的每秒读/写速率大约为50 MB，那么，对于大型数据流，NIFI应该能够有效地达到每秒100 MB或更多的吞吐量。这是因为预期添加到NiFi的每个物理分区和content repository都会出现线性增长，瓶颈将出现在FlowFile repository和Provenance repository的某个点上。我们计划提供一个基准测试和性能测试模板，然后允许用户能够轻松测试他们的系统并确定瓶颈在哪里，以及他们可能成为瓶颈的原因。此模板还应使系统管理员可以轻松进行更改并验证其影响。(期待这个测试功能的出现)

- **For CPU**

    Flow Controller充当引擎的角色，指示特定处理器何时可以被分配线程去执行。编写处理器以在执行任务后立即释放线程。可以为Flow Controller提供一个配置值，该值指示它维护的各种线程池的可用线程。理想的线程数取决于主机系统内核数量，系统中是否正在运行其他服务，以及流程中要处理的流的性质。对于典型的IO大流量，合理的做法是让多线程可用。

- **For RAM**

    NiFi在JVM中运行，因此限制于JVM提供的内存。JVM垃圾回收（GC）成为限制实际堆总大小以及优化应用程序的运行的一个非常重要的因素。NIFI作业在定期读取相同内容时可能会占用大量I/O。可以配置足够大的磁盘以优化性能。

## NIFI关键特性高度概览

**Flow Management**

- **Guaranteed Delivery**

    NIFI的核心理念是，即使在非常高的规模下，也必须保证交付。这是通过有效地使用专门构建的Write-Ahead Log和content repository来实现的。它们一起被设计成具备允许非常高的事务速率、有效的负载分布、写时复制和能发挥传统磁盘读/写的优势。

- **Data Buffering w/ Back Pressure and Pressure Release**

    NIFI支持缓冲所有排队的数据，以及在这些队列达到指定限制时提供背压的能力，或在数据达到指定期限（其值已失效）时老化数据的能力。

- **Prioritized Queuing**

    NiFi允许设置一个或多个优先级方案，用于如何从队列中检索数据。默认情况是先进先出，但有时应该首先提取最新的数据(后进先出)、最大的数据先出或其他定制方案。

- **Flow Specific QoS (latency v throughput, loss tolerance, etc.)**

    可能在数据流的某些节点上数据至关重要，不容丢失，并且在 某些时刻这些数据需要在几秒钟就处理完毕传向下一节点才会有意义。对于这些 方面NIFI也可以做细粒度的配置。

**Ease of Use**

- **Visual Command and Control**

    数据流的处理逻辑和过程可能会非常复杂。能够可视化这些流程并以可视的方式来表达它们可以极大地帮助用户降低数据流的复杂度，并确定哪些地方需要简化。NiFi可以实现数据流的可视化建立，而且是实时的。并不是“设计、部署”，它更像泥塑。如果对数据流进行了更改，更改就会立即生效，并且这些更改是细粒度的和组件隔离的。用户不需要为了进行某些特定修改而停止整个流程或流程组。

- **Flow Templates**

    FlowFIle往往是高度模式化的，虽然通常有许多不同的方法来解决问题，但能够共享这些最佳实践却大有帮助。流程模板允许设计人员构建和发布他们的流程设计，并让其他人从中受益和复用。

- **Data Provenance**

    在对象流经系统时，甚至在扇入、扇出、转换等过程，NIFI会自动记录、索引并提供可用的源数据。这些信息在支持法规遵从性、故障排除、优化以及其他方案中变得极其关键。

- **Recovery / Recording a rolling buffer of fine-grained history**

    NiFi的content repository旨在充当历史数据的滚动缓冲区。数据仅在content repository老化或需要空间时才会被删除。content repository与data provenance能力相结合，为在对象的生命周期中的特定点（甚至可以跨越几代）实现可以查看内容，内容下载和重放等功能提供了非常有用的基础。

**Security**

- **System to System**

    数据流越安全越好。对于数据流中每个节点NiFi都是通过使用加密协议（如双向SSL）来安全地交换数据。此外，NiFi的流程能够加密和解密内容，并在发送方/接收方任何一侧使用共享密钥或其他机制来保证数据的安全。

- **User to System**

    NiFi支持双向SSL身份验证，并提供可插拔授权方式，以便能够正确控制用户的访问权限和特定级别（只读，数据流管理，admin）。如果用户在流程中输入敏感属性（如密码），则会立即在服务器端加密，保证敏感信息不会再次暴露在客户端(前端UI)中(比如用户A在流程中输入了MySQL的用户密码，填写完毕后任何人即使是用户A也看不到明文密码)。

- **Multi-tenant Authorization**

    NIFI数据流的权限级别适用于每个组件，并且允许管理员用户拥有细粒度的控制访问级别。这意味着每个NiFi集群都能够处理一个或多个组织的需求。与隔离拓扑相比，多租户授权支持数据流管理的自助服务，允许每个团队或组织在完全了解流的其余部分的情况下管理流，而无法访问流。

**Extensible Architecture**

- **Extension**

    NiFi的核心是可扩展，因此它是一个可以以可预测和可重复的方式去执行和交互的数据流流程平台。可扩展的包括：processors, Controller Services, Reporting Tasks, Prioritizers, 和 Customer User Interfaces。

- **Classloader Isolation**

    对于任何基于组件的系统，涉及依赖的问题时常发生。NiFi通过提供自定义类加载器([在下面的NIFI源码会有进一步讲解](../code/nifi-nar-classloader))来解决这个问题，确保每个扩展包都暴露在一组非常有限的依赖中。因此，构建扩展包的时候不必担心它们是否可能与另一个扩展包冲突。这些扩展包的概念称为“NiFi Archives”，在Developer’s Guide中有更详细的讨论。

- **Site-to-Site Communication Protocol**

    NiFi实例之间的首选通信协议是NiFi站点到站点（S2S）协议。S2S轻松，高效，安全地将数据从一个NiFi实例传输到另一个实例。NiFi客户端库可以轻松构建并捆绑到其他应用程序或设备中，通过S2S协议与NiFi进行通信。S2S中支持以socket的协议和HTTP（S）协议作为底层传输协议，使得可以将代理服务器嵌入到S2S协议的通信中。

**Flexible Scaling Model**

- **Scale-out (Clustering)**

    NiFi的设计是可集群，可横向扩展的。如果配置单个节点并将其配置为每秒处理数百MB数据，那么可以相应的将集群配置为每秒处理GB级数据。但这也带来了NiFi与其获取数据的系统之间的负载平衡和故障转移的挑战。采用基于异步排队的协议（如消息服务，Kafka等）可以提供帮助解决这些问题。使用NiFi的s2s功能也非常有效，因为它是一种协议，允许NiFi和客户端（包括另一个NiFi群集）相互通信，共享有关加载的信息，以及交换特定授权的数据端口。

- **Scale-up & down**

    NiFi还可以非常灵活地扩展和缩小。从NiFi框架的角度来看，在增加吞吐量方面，可以在配置时增加“调度”选项卡下处理器上的并发任务数。这允许更多线程同时执行，从而提供更高的吞吐量。另一方面，您可以完美地将NiFi缩小到适合在边缘设备上运行，因为硬件资源有限，所需的占用空间很小，这种情况可以使用MINIFI，我们可以在此处找到更多详细信息：[https://cwiki.apache.org/confluence/display/NIFI/MiNiFi](https://cwiki.apache.org/confluence/display/NIFI/MiNiFi)

## 参考

<span id="eip"></span>[eip] Gregor Hohpe. Enterprise Integration Patterns [online]. Retrieved: 27 Dec 2014, from: http://www.enterpriseintegrationpatterns.com

<span id="soa"></span>[soa] Wikipedia. Service Oriented Architecture [online]. Retrieved: 27 Dec 2014, from: http://en.wikipedia.org/wiki/Service-oriented_architecture

<span id="api"></span>[api] Eric Savitz. Welcome to the API Economy [online]. Forbes.com. Retrieved: 27 Dec 2014, from: http://www.forbes.com/sites/ciocentral/2012/08/29/welcome-to-the-api-economy

<span id="api2"></span>[api2] Adam Duvander. The rise of the API economy and consumer-led ecosystems [online]. thenextweb.com. Retrieved: 27 Dec 2014, from: http://thenextweb.com/dd/2014/03/28/api-economy

<span id="iot"></span>[iot] Wikipedia. Internet of Things [online]. Retrieved: 27 Dec 2014, from: http://en.wikipedia.org/wiki/Internet_of_Things

<span id="bigdata"></span>[bigdata] Wikipedia. Big Data [online]. Retrieved: 27 Dec 2014, from: http://en.wikipedia.org/wiki/Big_data

<span id="fbp"></span>[fbp] Wikipedia. Flow Based Programming [online]. Retrieved: 28 Dec 2014, from: http://en.wikipedia.org/wiki/Flow-based_programming#Concepts

<span id="seda"></span>[seda] Matt Welsh. Berkeley. SEDA: An Architecture for Well-Conditioned, Scalable Internet Services [online]. Retrieved: 18 Jan 2018, from: http://www.mdw.la/papers/seda-sosp01.pdf