# 系统管理员指南(1.15.3)
***
编辑人:__**酷酷的诚**__  邮箱:**zhangchengk@foxmail.com** 
***

## 系统要求(System Requirements)

Apache NiFi可以运行在像笔记本电脑这样简单的设备上，同时它也可以在多个企业级服务器上以集群的方式运行。NiFi所需的硬件数量和内存大小与要处理的数据量相关。在NiFi处理数据时，数据是存储在磁盘上的(默认配置如此)，因此，NiFi需要为其各种`存储库(repository)`分配足够的磁盘空间，尤其是`内容存储库(content repository)`，`流文件存储库(flowfile repository)`和`源文件存储库(provenance repository)`(有关这些存储库的更多信息，请参阅[系统属性(System Properties)](#系统属性(System%20Properties))部分)。

NiFi具有以下最低系统要求:

- 需要Java8或更Java11
- 支持的操作系统:
    - Linux
    - Unix
    - Windows
    - macOS

- 支持的Web浏览器:
    * Microsoft Edge: Current & ((Current - 1)
    * Mozilla FireFox: Current &(Current - 1)
    * Google Chrome: Current &(Current - 1)
    * Safari: Current &(Current - 1)

>**注意** 在持续且极高的吞吐量下，可能需要调整`CodeCache(JVM)`设置以避免突然的性能损失。有关更多信息，请参阅[Bootstrap属性(Bootstrap Properties)](#Bootstrap属性(Bootstrap%20Properties))部分。

## 如何安装和启动NiFi

- Linux/Unix/macOS
    - 解压NiFi到所需的安装目录
    - 按照需要，配置`conf`目录下的文件 
        - 至少，我们建议你修改`nifi.properties`文件并为`nifi.sensitive.props.key`设置一个密码值(请参阅下面的[系统属性(System Properties)](#系统属性(System%20Properties))
    - `bin`目录中，输入执行以下命令`./nifi.sh <command>`:
        - start:在后台启动NiFi
        - stop:停止在后台运行的NiFi
        - status:提供NiFi的当前状态
        - run:在前台运行NiFi并等待`Ctrl-C`命令来关闭NiFi
        - install:把NiFi安装为服务，然后可以通过以下命令控制NiFi
          - `service NiFi start`
          - `service NiFi stop`
          - `service NiFi status`

- Windows
    - 解压NiFi到所需的安装目录
    - 按照需要配置`conf`目录下的文件
        - 至少，我们建议你修改`nifi.properties`文件并为`nifi.sensitive.props.key`设置一个密码值(请参阅下面的[系统属性(System Properties)](#系统属性(System%20Properties)))
    - 进入`bin`目录
    - 双击`run-nifi.bat`，这会在前台运行NiFi并等待`Ctrl-C`命令来关闭NiFi
    - 要查看NiFi的当前状态，请双击`status-nifi.bat`

首次启动NiFi时，会创建以下文件和目录:
- `content_repository` 目录
- `database_repository` 目录
- `flowfile_repository` 目录
- `provenance_repository` 目录
- `work` 目录
- `logs` 目录
- 在`conf`目录中，将创建`flow.xml.gz`文件

>For security purposes, when no security configuration is provided NiFi will now bind to 127.0.0.1 by default and the UI will only be accessible through this loopback interface. HTTPS properties should be configured to access NiFi from other interfaces. See the Security Configuration for guidance on how to do this.

>Panda诚解读：上方官方文档有误，故拷贝原文而不翻译，此处予以纠正。参照`NIFI-8516 Enabled HTTPS and Single User Authentication in default configuration`，现在的NiFi默认自动生成了证书以HTTPS模式启动，并使用`single user`的用户登陆和权限验证机制，默认绑定到127.0.0.1:8443，你只能从这个地址(https://127.0.0.1:8443)去访问，一般上局域网内你将`nifi.web.https.host`这个值置空(或者使用`0.0.0.0`)就可以通过服务器或虚机的IP地址来访问了，个别的使用云环境或者使用了容器技术的无法访问NiFi的，就得考虑配置`nifi.web.proxy.host`才能进一步通过具体的IP:Port来访问NiFi的界面。比如我测试起了一个docker镜像运行NiFi，如果我没有像如图配置proxy
>![](./image/general/https_proxy.png)
>就会报类似如下的错误
>![](./image/general/https_proxy_error.png)

有关配置NiFi存储库和配置文件的更多信息，请参阅本指南的[系统属性(System Properties)](#系统属性(System%20Properties))部分。

## 端口配置(Port Configuration)

### NiFi

下表列出了NiFi使用的默认端口以及`nifi.properties`文件中的对应属性。

功能                               | 属性                                    | 默认值    
-------------------------------- | ------------------------------------- | -------
HTTPS Port*                      | `nifi.web.https.port`                 | `8443` 
Remote Input Socket Port*        | `nifi.remote.input.socket.port`       | `10443`
Cluster Node Protocol Port*      | `nifi.cluster.node.protocol.port`     | `11443`
Cluster Node Load Balancing Port | `nifi.cluster.node.load.balance.port` | `6342` 
Web HTTP Forwarding Port         | `nifi.web.http.port.forwarding`       | `none`

>标有星号(*)的端口的属性值在`nifi.properties`中默认是空的。当使用[TLS Toolkit](./7-ToolkitGuide)生成安全的NiFi实例时，表中显示的值是这些端口在`nifi.properties`的默认值。注意，[TLS Toolkit](./7-ToolkitGuide)使用的HTTPS端口默认是`9443`，而不是8443。

### 嵌入式Zookeeper(Embedded ZooKeeper)

下表列出了[嵌入式ZooKeeper服务器(Embedded ZooKeeper Server)](#嵌入式ZooKeeper服务器(Embedded%20ZooKeeper%20Server))使用的默认端口以及`zookeeper.properties`文件中的相应属性。

功能                                                | 属性           | 默认值   
-------------------------------------------------- | ------------ | ------
Zookeeper Server Quorum and Leader Election Ports  | `server.1`   | `none` 
Zookeeper Client Port(弃用：从NiFi 1.10.x开始，不再在单独的行上指定客户端端口)                             | `clientPort` | `2181`


>Zookeeper服务器端口的注释示例包含在`zookeeper.properties`文件中，格式为`server.N=nifi-nodeN-hostname:2888:3888;2181`。

## 配置最佳实践(Configuration Best Practices)

如果你在Linux上运行，请考虑这些最佳实践。典型的Linux默认设置不一定能够满足像NiFi这样的IO密集型应用程序的需求。对于这些最佳实践，对于不同的Linux发行版，实际情况可能会有所不同，可以参考下面的介绍，但是请参考特定Linux发行版的文档。

**最大文件句柄(Maximum File Handles)**

NiFi在任何时候都可能会打开非常大量的文件句柄。通过编辑`/etc/security/limits.conf`来增加限制，添加类似的内容

> ```
> * hard nofile 50000
> * soft nofile 50000
> ```

**最大派生进程数(Maximum Forked Processes)**

NiFi可以配置生成大量的线程。要增加Linux允许的数量，请编辑`/etc/security/limits.conf`

> ```
> *  hard  nproc  10000
> *  soft  nproc  10000
> ```

你的发行版Linux可能需要编辑`/etc/security/limits.d/90-nproc.conf`

> ```
> * soft nproc 10000
> ```

**增加可用的TCP套接字端口数(Increase the number of TCP socket ports available)**

如果你的流程将在短时间内建立并拆除大量套接字，则如下配置尤其重要。

> ```
> sudo sysctl -w net.ipv4.ip_local_port_range ="10000 65000"
> ```

**设置套接字在关闭时保持TIMED_WAIT状态的时间(Set how long sockets stay in a TIMED_WAIT state when closed)**

考虑到你希望能够快速设置和拆卸新套接字，你不希望你的套接字停留太长时间。最好多阅读一下并调整类似的东西

kernel 2.6
> ```
> sudo sysctl -w net.ipv4.netfilter.ip_conntrack_tcp_timeout_time_wait ="1"
> ```

kernel 3.0
> ```
> sudo sysctl -w net.netfilter.nf_conntrack_tcp_timeout_time_wait="1"
> ```
**告诉Linux你永远不希望NiFi发生swap(Tell Linux you never want NiFi to swap)**

对于某些应用程序来说，swapping非常棒，但对于像NiFi这样一直想要运行的程序来说并不好。要告诉Linux你想关掉swapping，你可以编辑`/etc/sysctl.conf`来添加以下行

> ```
> vm.swappiness = 0
> ```

对于各种NiFi repos的分区，请关闭诸如`atime`之类的选项。这样做会导致吞吐量得到惊人的提高。编辑`/etc/fstab`文件，对于感兴趣的分区，添加`noatime`选项。

## 推荐病毒扫描排除(Recommended Antivirus Exclusions)

防病毒软件可能需要很长时间才能扫描完大型目录及其中的大量文件。此外，如果防病毒软件在扫描过程中锁定了文件或目录，则这些资源将无法用于NiFi进程，从而导致这些资源在NiFi实例/群集中的延迟或不可用。为防止出现这些性能和可靠性问题，强烈建议将防病毒软件配置为跳过对以下NiFi目录的扫描：

* `content_repository`
* `flowfile_repository`
* `logs`
* `provenance_repository`
* `state`

## 安全配置(Security Configuration)

出于安全目的NiFi提供了多种不同的配置选项。最重要的是`nifi.properties`文件中`security properties(安全属性)`标题下的属性。为了安全运行，必须设置以下属性:
                                                         
| Property Name | Description
|----|-----
|`nifi.security.keystore` | 包含服务器私钥的密钥库的文件名。
|`nifi.security.keystoreType` | 密钥库的类型，必须为`PKCS12`或`JKS`。JKS是首选类型，BCFKS和PKCS12文件将通过BouncyCastle提供程序加载。
|`nifi.security.keystorePasswd` | 密钥库的密码。
|`nifi.security.keyPasswd` | 密钥库中证书的密码。如果未设置，将使用`nifi.security.keystorePasswd`的值。
|`nifi.security.truststore` | 信任库的文件名，将用于授权那些连接到NiFi的用户。没有Truststore的安全实例将拒绝所有传入连接。
|`nifi.security.truststoreType` | 信任库的类型。必须为`PKCS12`或`JKS`。 JKS是首选类型，BCFKS和PKCS12文件将通过BouncyCastle提供程序加载。
|`nifi.security.truststorePasswd` | 信任库的密码。


一旦配置了上述属性，我们就可以通过HTTPS而不是HTTP来访问用户界面。这是通过设置`nifi.web.https.host`和`nifi.web.https.port`属性来实现的。`nifi.web.https.host`属性指示服务器应在哪个主机名上运行。如果希望可以从所有网络接口访问HTTPS的NiFi，则应使用`0.0.0.0`值。为了允许管理员将应用程序配置为仅在特定的网络接口上运行，可以指定`nifi.web.http.network.interface*`或`nifi.web.https.network.interface*`属性。
>启用HTTPS时重要的是取消设置`nifi.web.http.port`属性。NiFi仅支持在HTTP**或**HTTPS上运行，而不是同时两种都支持。

当没有配置需要单向SSL(例如LDAP，OpenId Connect等)的替代认证机制时，NiFi的Web服务器将要求那些来访问NiFi用户界面的用户去使用基于证书的客户端身份验证。启用一个身份验证机制会将Web服务器配置为基于WANT证书的客户端身份验证。这将允许它支持具有证书的用户，而没有证书的用户可以使用凭证登录。有关详细信息，请参阅[用户认证(User Authentication)](#用户认证(User%20Authentication))
>Panda诚解读：此处描述有异议，新版本提供了默认的用户认证机制(single user)，而不是基于证书的认证了。

现在用户界面已经受到保护，接下来我们也可以轻松保护`Site-to-Site`的连接和内部集群通信，这是通过分别设置`nifi.remote.input.secure`和`nifi.cluster.protocol.is.secure`属性为`true`来实现的。这些通信总是需要双向SSL，因为节点将使用其配置的`keystore/truststore`进行验证。

NiFi的web SSL上下文的自动刷新可以使用以下属性进行启用:

| Property Name | Description
|----|-----
|`nifi.security.autoreload.enabled` | 指定如果检测到密钥存储库和信任存储库的更新，是否应自动重新加载SSL上下文。缺省值为false。
|`nifi.security.autoreload.interval` | 指定检查密钥存储库和信任存储库更新的时间间隔。仅当`nifi.security.autoreload.enabled`设置为true时适用。缺省值是10秒。

一旦将`nifi.security.autoreload.enabled`属性设置为true，任何对配置的密钥存储库和信任存储库的有效更改都将导致NiFi的SSL上下文被重新加载，从而允许客户端获取这些更改。这是为了允许在密钥库中更新过期的证书，并在信任库中添加新的受信任的证书，而不需要重启NiFi服务器。

>对任何`nifi.security.keystore*`或者`nifi.security.truststore* `的更改都不会被自动刷新逻辑获取，它假定密码和存储路径保持不变。

### TLS生成工具包(TLS Generation Toolkit)

为了便于NiFi的安全设置，你可以使用`tls-toolkit`命令行使程序自动生成所需的`keystores`， `truststore`和相关配置文件。这对于保护多个NiFi节点特别有用，这可能是一个单调乏味且容易出错的过程。有关更多信息，请参阅[NiFi工具包指南中](./7-ToolkitGuide)的[TLS工具包](./7-ToolkitGuide#TLS%20Toolkit)部分。相关主题包括:

- [通配符证书(Wildcard Certificates)](./7-ToolkitGuide#通配符证书(Wildcard%20Certificates))
- [操作模式:独立和客户端/服务器](./7-ToolkitGuide#操作模式(Operation%20Modes))
- [使用现有的Intermediate CA](./7-ToolkitGuide#使用现有的Intermediate%20CA(Using%20An%20Existing%20Intermediate%20Certificate%20Authority%20))
- [额外的证书命令](./7-ToolkitGuide#额外的证书命令(Additional%20Certificate%20Commands))

### TLS密码套件(TLS Cipher Suites)

Java运行时环境提供了指定服务器在接受客户端连接时使用的自定义TLS加密套件的能力。请[点击这里](https://java.com/en/configure_crypto.html)了解更多信息。要在NiFi web服务中使用此特性，可以设置以下NiFi属性:

| Property Name | Description
|----|-----
|`nifi.web.https.ciphersuites.include` | 一组可供传入的客户端连接使用的密码。替换系统默认值(如果设置)。
|`nifi.web.https.ciphersuites.exclude` | 一组不能被传入的客户端连接使用的密码。过滤可用的密码(如果设置)。

每个属性应该采用逗号分隔的常见密码名列表的形式，如[这里](https://docs.oracle.com/javase/8/docs/technotes/guides/security/StandardNames.html#ciphersuites)所指定的。也可以指定正则表达式(例如`^.*GCM_SHA256$`)。

语义匹配使用以下Jetty api:

- [SslContextFactory.setIncludeCipherSuites()](https://www.eclipse.org/jetty/javadoc/jetty-9/org/eclipse/jetty/util/ssl/SslContextFactory.html#setIncludeCipherSuites(java.lang.String...))
- [SslContextFactory.setExcludeCipherSuites()](https://www.eclipse.org/jetty/javadoc/jetty-9/org/eclipse/jetty/util/ssl/SslContextFactory.html#setExcludeCipherSuites(java.lang.String...))


## 用户认证(User Authentication)

NiFi支持通过`客户端证书`，`用户名/密码`，`Apache Knox`或[OpenId Connect](http://openid.net/connect)进行用户身份验证。

用户名/密码的验证是由`Login Identity Provider`执行的，`Login Identity Provider`是一种可插拔的机制。在`nifi.properties`文件中配置要使用的`Login Identity Provider`。目前的NiFi在`Login Identity Provider`提供了带有用户名/密码登陆的认证选项：[Single User](#单用户(Single%20User))，[轻量级目录访问协议(LDAP)](#轻量级目录访问协议(LDAP))和[Kerberos](#Kerberos)。

`nifi.login.identity.provider.configuration.file`属性指定`Login Identity Provider`的配置文件。默认情况下，此属性设置为`./conf/login-identity-providers.xml`。

`nifi.security.user.login.identity.provider`属性指示应使用哪个已配置的`Login Identity Provider`。默认情况下，配置为`single-user-provider`，使用的是自动生成的用户名密码。

在`OpenId Connect`身份验证期间，NiFi会在返回NiFi之前将用户重定向到提供商的登录页面。然后，NiFi将调用第三方提供商以获取用户身份。

在`Apache Knox`身份验证期间，NiFi将重定向用户以使用`Apache Knox`登录，然后再返回NiFi。NiFi将在身份验证期间验证`Apache Knox`令牌。

>NiFi只能配置为`用户名/密码`，`OpenId Connect`或`Apache Knox`中的一个。它不支持同时运行多个。如果没有配置这些，则NiFi将需要`客户端证书`来通过HTTPS对用户进行身份验证。

除非将`nifi.security.allow.anonymous.authentication`设置为`true`，否则用户不能使用安全的NiFi实例进行匿名认证。如果设置为true了，NiFi还必须配置一个支持授权匿名用户的授权器，目前，NiFi没有发布过这样的授权器，但未来会努力解决这些问题的([NiFi-2730](https://issues.apache.org/jira/browse/NiFi-2730))。

在设置`nifi.security.allow.anonymous.authentication`时需要考虑三个场景。当用户直接调用端点而没有尝试身份验证时，`nifi.security.allow.anonymous.authentication`将控制请求是被身份验证通过还是被拒绝。另外两种情况是请求被代理时，可以是由NiFi节点(例如NiFi集群中的节点)代理，也可能是由代理匿名用户请求的独立代理。在这些代理场景中，`nifi.security.allow.anonymous.authentication`将控制请求是被身份验证通过还是被拒绝。在所有这三个场景中，如果请求经过身份验证，它随后将基于所请求的资源接受正常授权。

>NiFi不通过HTTP执行用户身份验证。使用HTTP，所有用户都将被授予所有角色，拥有所有权限。

### 单用户(Single User)

默认的`Single User Login Identity Provider`支持自动生成用户名和密码。

生成的用户名将是由36个字符组成的随机UUID。生成的密码将是一个由32个字符组成的随机字符串，并`bcrypt`哈希。

`nifi.properties`中的默认配置是启用了单用户身份验证:

```
nifi.security.user.login.identity.provider=single-user-provider
```

默认的`login-identity-providers.xml`包含一个空白的`provider`:

```xml
<provider>
   <identifier>single-user-provider</identifier>
   <class>org.apache.nifi.authentication.single.user.SingleUserLoginIdentityProvider</class>
   <property name="Username"/>
   <property name="Password"/>
</provider>
```

使用下面的命令可以修改用户名密码

```powershell
$ ./bin/nifi.sh set-single-user-credentials <username> <password>
```

### 轻量级目录访问协议(LDAP)

以下是配置`Login Identity Provider`的示例和说明，该`Login Identity Provider`与`Directory Server`集成以对用户进行身份验证。

在`nifi.properties`中设置以下内容以启用`LDAP username/password`身份验证:

```
nifi.security.user.login.identity.provider=ldap-provider
```

修改`login-identity-providers.xml`以启用`ldap-provider`。以下是文件中提供的示例:

```xml
<provider>
    <identifier>ldap-provider</identifier>
    <class>org.apache.nifi.ldap.LdapProvider</class>
    <property name="Authentication Strategy">START_TLS</property>
    <property name="Manager DN"></property>
    <property name="Manager Password"></property>
    <property name="TLS - Keystore"></property>
    <property name="TLS - Keystore Password"></property>
    <property name="TLS - Keystore Type"></property>
    <property name="TLS - Truststore"></property>
    <property name="TLS - Truststore Password"></property>
    <property name="TLS - Truststore Type"></property>
    <property name="TLS - Client Auth"></property>
    <property name="TLS - Protocol"></property>
    <property name="TLS - Shutdown Gracefully"></property>
    <property name="Referral Strategy">FOLLOW</property>
    <property name="Connect Timeout">10 secs</property>
    <property name="Read Timeout">10 secs</property>
    <property name="Url"></property>
    <property name="User Search Base"></property>
    <property name="User Search Filter"></property>
    <property name="Identity Strategy">USE_DN</property>
    <property name="Authentication Expiration">12 hours</property>
</provider>
```

`ldap-provider`具有以下属性:

属性名称                        | 描述                                                                                                                
--------------------------- | ------------------------------------------------------------------------------------------------------------------
`Authentication Expiration` | 用户身份验证有效期的持续时间。如果用户从未注销，则需要在此持续时间之后重新登录。                                                                          
`Authentication Strategy`   | 如何验证与LDAP服务器的连接。可能的值是`ANONYMOUS`，`SIMPLE`，`LDAPS`，或`START_TLS`。                                                   
`Manager DN`                | 用于绑定到LDAP服务器以搜索用户的管理器的DN。                                                                                         
`Manager Password`          | 用于绑定到LDAP服务器以搜索用户的管理器的密码。                                                                                         
`TLS - Keystore`            | 使用LDAPS或START_TLS连接到LDAP时使用的密钥库的路径。                                                                               
`TLS - Keystore Password`   | 使用LDAPS或START_TLS连接到LDAP时使用的密钥库的密码。                                                                               
`TLS - Keystore Type`       | 使用LDAPS或START_TLS(即`JKS`或`PKCS12`)连接到LDAP时使用的密钥库的类型。                                                              
`TLS - Truststore`          | 使用LDAPS或START_TLS连接到LDAP时使用的Truststore的路径。                                                                        
`TLS - Truststore Password` | 使用LDAPS或START_TLS连接到LDAP时使用的Truststore的密码。                                                                        
`TLS - Truststore Type`     | 使用LDAPS或START_TLS(即`JKS`或`PKCS12`)连接到LDAP时使用的Truststore的类型。                                                       
`TLS - Client Auth`         | 使用LDAPS或START_TLS连接到LDAP时的客户端身份验证策略。可能的值是`REQUIRED`，`WANT`，`NONE`。                                                
`TLS - Protocol`            | 使用LDAPS或START_TLS连接到LDAP时使用的协议。(即`TLS`，`TLSv1.1`，`TLSv1.2`，等等)。                                                   
`TLS - Shutdown Gracefully` | 指定在关闭目标上下文之前是否应正常关闭TLS。默认为false。                                                                                  
`Referral Strategy`         | 处理推荐的策略。可能的值是`FOLLOW`，`IGNORE`，`THROW`。                                                                           
`Connect Timeout`           | 连接超时的持续时间。(即`10 secs`)。                                                                                           
`Read Timeout`              | 读取超时的持续时间。(即`10 secs`)。                                                                                           
`Url`                       | 以空格分隔的LDAP服务器的URL列表(即`ldap://<hostname>:<port>`)。                                                                 
`User Search Base`          | 用于搜索用户的基本DN(即`CN=Users，DC=example，DC=com`)。                                                                       
`User Search Filter`        | 过滤搜索用户`User Search Base`。(即`sAMAccountName={0}`)。用户指定的名称将插入"{0}"。                                                 
`Identity Strategy`         | 识别用户的策略。可能的值是`USE_DN`和`USE_USERNAME`。缺少此属性的默认功能是USE_DN，以保持向后兼容性。`USE_DN`将尽可能使用用户条目的完整DN。`USE_USERNAME`将使用用户登录的用户名。

>要使`nifi.properties`和`login-identity-providers.xml`的更改生效，需要重新启动NiFi。如果NiFi是集群的，所有节点上的配置文件必须相同。

### Kerberos

以下是配置与`Kerberos Key Distribution Center (KDC)`集成以验证用户身份的`Login Identity Provider`的示例和说明。

在`nifi.properties`中设置以下内容以启用`Kerberos username/password`身份验证：

```
nifi.security.user.login.identity.provider=kerberos-provider
```

修改`login-identity-providers.xml`以启用`kerberos-provider`。以下是文件中提供的示例:

```xml
<provider>
    <identifier>kerberos-provider</identifier>
    <class>org.apache.nifi.kerberos.KerberosProvider</class>
    <property name="Default Realm">nifi.APACHE.ORG</property>
    <property name="Authentication Expiration">12 hours</property>
</provider>
```

`kerberos-provider`具有以下属性:

| Property Name | Description 
|----|----
|`Default Realm` | 当用户输入不完整的用户主体时要提供的默认域 (i.e. nifi.APACHE.ORG).
|`Authentication Expiration` | 用户认证的有效时间。如果用户从未登出，则将要求他们在这段时间后重新登录。

如果要通过Kerberos进行单点登录访问请参见[Kerberos服务(Kerberos Service)](#Kerberos服务(Kerberos%20Service))。

>对于`nifi.properties`和`login-identity-providers.xml`的更改要生效，需要重新启动NiFi。NiFi集群时，所有节点的配置文件必须一致。

### OpenId Connect

要通过OpenId Connect启用身份验证，必须在`nifi.properties`中配置以下属性。

| Property Name | Description
|----|----
|`nifi.security.user.oidc.discovery.url` | The discovery URL for the desired OpenId Connect Provider (link:http://openid.net/specs/openid-connect-discovery-1_0.html[http://openid.net/specs/openid-connect-discovery-1_0.html^]).
|`nifi.security.user.oidc.connect.timeout` | Connect timeout when communicating with the OpenId Connect Provider.
|`nifi.security.user.oidc.read.timeout` | Read timeout when communicating with the OpenId Connect Provider.
|`nifi.security.user.oidc.client.id` | The client id for NiFi after registration with the OpenId Connect Provider.
|`nifi.security.user.oidc.client.secret` | The client secret for NiFi after registration with the OpenId Connect Provider.
|`nifi.security.user.oidc.preferred.jwsalgorithm` | The preferred algorithm for validating identity tokens. If this value is blank， it will default to `RS256` which is required to be supported
by the OpenId Connect Provider according to the specification. If this value is `HS256`， `HS384`， or `HS512`， NiFi will attempt to validate HMAC protected tokens using the specified client secret.
If this value is `none`， NiFi will attempt to validate unsecured/plain tokens. Other values for this algorithm will attempt to parse as an RSA or EC algorithm to be used in conjunction with the
JSON Web Key (JWK) provided through the jwks_uri in the metadata found at the discovery URL.
|`nifi.security.user.oidc.additional.scopes` | Comma separated scopes that are sent to OpenId Connect Provider in addition to `openid` and `email`.
|`nifi.security.user.oidc.claim.identifying.user` | Claim that identifies the user to be logged in; default is `email`. May need to be requested via the `nifi.security.user.oidc.additional.scopes` before usage.
|`nifi.security.user.oidc.fallback.claims.identifying.user` | Comma separated possible fallback claims used to identify the user in case `nifi.security.user.oidc.claim.identifying.user` claim is not present for the login user.

### SAML

要通过SAML启用身份验证，必须在`nifi.properties`中配置以下属性。

| Property Name | Description
|----|----
|`nifi.security.user.saml.idp.metadata.url` | The URL for obtaining the identity provider's metadata. The metadata can be retrieved from the identity provider via `http://` or `https://`， or a local file can be referenced using `file://` .
|`nifi.security.user.saml.sp.entity.id`| The entity id of the service provider (i.e. NiFi). This value will be used as the `Issuer` for SAML authentication requests and should be a valid URI. In some cases the service provider entity id must be registered ahead of time with the identity provider.
|`nifi.security.user.saml.identity.attribute.name`| The name of a SAML assertion attribute containing the user'sidentity. This property is optional and if not specified， or if the attribute is not found， then the NameID of the Subject will be used.
|`nifi.security.user.saml.group.attribute.name`| The name of a SAML assertion attribute containing group names the user belongs to. This property is optional， but if populated the groups will be passed along to the authorization process.
|`nifi.security.user.saml.metadata.signing.enabled`| Enables signing of the generated service provider metadata.
|`nifi.security.user.saml.request.signing.enabled`| Controls the value of `AuthnRequestsSigned` in the generated service provider metadata from `NiFi-api/access/saml/metadata`. This indicates that the service provider (i.e. NiFi) should not sign authentication requests sent to the identity provider， but the requests may still need to be signed if the identity provider indicates `WantAuthnRequestSigned=true`.
|`nifi.security.user.saml.want.assertions.signed`| Controls the value of `WantAssertionsSigned` in the generated service provider metadata from `NiFi-api/access/saml/metadata`. This indicates that the identity provider should sign assertions， but some identity providers may provide their own configuration for controlling whether assertions are signed.
|`nifi.security.user.saml.signature.algorithm`| The algorithm to use when signing SAML messages. Reference the link:https://git.shibboleth.net/view/?p=java-xmltooling.git;a=blob;f=src/main/java/org/opensaml/xml/signature/SignatureConstants.java[Open SAML Signature Constants] for a list of valid values. If not specified， a default of SHA-256 will be used.
|`nifi.security.user.saml.signature.digest.algorithm`| The digest algorithm to use when signing SAML messages. Reference the link:https://git.shibboleth.net/view/?p=java-xmltooling.git;a=blob;f=src/main/java/org/opensaml/xml/signature/SignatureConstants.java[Open SAML Signature Constants] for a list of valid values. If not specified， a default of SHA-256 will be used.
|`nifi.security.user.saml.message.logging.enabled`| Enables logging of SAML messages for debugging purposes.
|`nifi.security.user.saml.authentication.expiration`| The expiration of the NiFi JWT that will be produced from a successful SAML authentication response.
|`nifi.security.user.saml.single.logout.enabled`| Enables SAML SingleLogout which causes a logout from NiFi to logout of the identity provider. By default， a logout of NiFi will only remove the NiFi JWT.
|`nifi.security.user.saml.http.client.truststore.strategy`| The truststore strategy when the IDP metadata URL begins with https. A value of `JDK` indicates to use the JDK's default truststore. A value of`NiFi`indicates to use the truststore specified by `nifi.security.truststore`.
|`nifi.security.user.saml.http.client.connect.timeout`| The connection timeout when communicating with the SAML IDP.
|`nifi.security.user.saml.http.client.read.timeout`| The read timeout when communicating with the SAML IDP.
                                 
### Apache Knox

要通过Apache Knox启用身份验证，必须在`nifi.properties`中配置以下属性。

属性名称                                 | 描述                                                          
------------------------------------ | ------------------------------------------------------------
`nifi.security.user.knox.audiences`  | 可选的。逗号分隔列出的允许的受众群体。如果设置，则令牌中的受众必须出现在此列表中。可以在Knox中配置令牌中填充的受众。
`nifi.security.user.knox.url`        | Apache Knox登录页面的URL。                                        
`nifi.security.user.knox.publicKey`  | Apache Knox公钥的路径，用于验证HTTP Cookie中的身份验证令牌的签名。                
`nifi.security.user.knox.cookieName` | 成功登录后Apache Knox将生成的HTTP Cookie的名称。                         

### JSON Web Tokens

在登录后NiFi使用`JSON Web token`提供身份验证访问。生成的`JSON Web Token`包括`经过身份验证的用户标识`，以及配置的`Login Identity Provider`的发行人和过期时间。

NiFi使用生成的RSA密钥对，密钥大小为4096位，支持JSON Web签名的PS512算法。系统使用配置的`local State Provider`存储`RSA Public Key`，并将`RSA Private Key`保存在内存中。这种方法不需要持久化私钥就支持在`Login Identity Provider`中配置带过期时间的签名验证。

`JSON Web Token`支持包括注销时使用`JSON Web Token标识符`的撤销。系统根据`Login Identity Provider`配置拒绝过期的令牌的访问，而撤销令牌会在过期前使其失效。系统使用配置的`local State Provider`存储已撤销的标识符，并在过期后执行定时命令删除已撤销的标识符。

在NiFi中可以进行以下属性来控制`JSON Web Token`签名。

| Property Name | Description
|`nifi.security.user.jws.key.rotation.period` | JSON Web签名密钥旋转周期定义了系统多长时间生成一个新的RSA密钥对，表示为`ISO 8601`持续时间。默认值为1小时:' PT1H '

>Panda诚解读：关于更多关于NIFI`JSON Web token`的解读，访问公众号`NIFI系列文章`中查阅文章，![](./image/general/nifi_jwt.png)，篇幅很长这里就不展开了。

## 多租户授权(Multi-Tenant Authorization)

将NiFi配置为安全运行并具有身份认证机制后，必须配置谁有权访问系统以及他们的访问级别。你可以使用多租户授权来执行此操作。多租户授权使多组用户（租户）可以使用不同的授权级别来命令，控制和观察数据流的不同部分。当通过身份验证的用户尝试查看或修改NiFi资源时，系统会检查该用户是否具有执行该操作的权限。这些权限由可以在系统范围或单个组件中应用的`策略(Policy)`定义。

### 授权器(Authorizer Configuration)

`authorizer`在NiFi初始化授权的时候，授予用户管理用户和策略的权限。

使用`nifi.properties`文件中的两个属性配置授权器:

- `nifi.authorizer.configuration.file`属性指定定义授权器的配置文件。默认情况下，将选择位于conf目录中的`authorizers.xml`文件。
- `nifi.security.user.authorizer`属性指示`authorizers.xml`文件中要使用的哪个已配置的授权器。

### Authorizers.xml设置

The authorizers.xml file is used to define and configure available authorizers. The default authorizer is the StandardManagedAuthorizer. The managed authorizer is comprised of a UserGroupProvider and a AccessPolicyProvider. The users, group, and access policies will be loaded and optionally configured through these providers. The managed authorizer will make all access decisions based on these provided users, groups, and access policies.

>Panda诚解读：上述官方文档描述有误，故在此进行纠正：默认`authorizers.xml`文件用于定义和配置可用的授权器。默认的授权器是`SingleUserAuthorizer`(已经不是`StandardManagedAuthorizer`了)。
>授权器下NiFi定义了一个托管授权器(managed authorizer)，一个托管授权器由UserGroupProvider(管理users和group)和AccessPolicyProvider(管理Policy)组成，托管授权器将根据这些Provider提供的`users`，`group`，和`access policies`做出所有访问决定。托管授权器的原理是我们自定义开发NiFi授权模块的必要知识。

在启动过程中，将进行检查以确保不存在两个具有相同identity/name的users/groups。不管配置的实现如何，都会执行此检查，这是必需的，因为这是在访问决策期间识别和授权users/groups的方式。

#### FileUserGroupProvider

StandardManagedAuthorizer默认的UserGroupProvider是FileUserGroupProvider，但是，你可以开发其他UserGroupProvider作为扩展。 FileUserGroupProvider具有以下属性：

- 用户文件(Users File) - FileUserGroupProvider存储用户和租户的文件。默认情况下，使用`conf`目录中的`users.xml`文件。
- 旧版授权用户文件(Legacy Authorized Users File) - authorized-users.xml的完整路径，该路径将自动用于将用户和租户加载到用户文件中。
- 初始用户身份(Initial User Identity) - 用户和系统的标识，用于添加到用户文件(Users File)中。每个属性的名称必须是唯一的，例如:"Initial User Identity A"，"Initial User Identity B"，"Initial User Identity C"或者"Initial User Identity 1"，"Initial User Identity 2"，"Initial User Identity 3"。

#### LdapUserGroupProvider

UserGroupProvider的另一个选项是LdapUserGroupProvider。默认情况下，此选项已注释掉，但可以配置代替FileUserGroupProvider。这将从目录服务器同步用户和租户，并以只读形式在NiFi UI中显示它们。

LdapUserGroupProvider具有以下属性:

| Property Name | Description
|----|----
|`Authentication Strategy` | How the connection to the LDAP server is authenticated. Possible values are `ANONYMOUS`， `SIMPLE`， `LDAPS`， or `START_TLS`.
|`Manager DN` | The DN of the manager that is used to bind to the LDAP server to search for users.
|`Manager Password` | The password of the manager that is used to bind to the LDAP server to search for users.
|`TLS - Keystore` | Path to the Keystore that is used when connecting to LDAP using LDAPS or START_TLS.
|`TLS - Keystore Password` | Password for the Keystore that is used when connecting to LDAP using LDAPS or START_TLS.
|`TLS - Keystore Type` | Type of the Keystore that is used when connecting to LDAP using LDAPS or START_TLS (i.e. `JKS` or `PKCS12`).
|`TLS - Truststore` | Path to the Truststore that is used when connecting to LDAP using LDAPS or START_TLS.
|`TLS - Truststore Password` | Password for the Truststore that is used when connecting to LDAP using LDAPS or START_TLS.
|`TLS - Truststore Type` | Type of the Truststore that is used when connecting to LDAP using LDAPS or START_TLS (i.e. `JKS` or `PKCS12`).
|`TLS - Client Auth` | Client authentication policy when connecting to LDAP using LDAPS or START_TLS. Possible values are `REQUIRED`， `WANT`， `NONE`.
|`TLS - Protocol` | Protocol to use when connecting to LDAP using LDAPS or START_TLS. (i.e. `TLS`， `TLSv1.1`， `TLSv1.2`， etc).
|`TLS - Shutdown Gracefully` | Specifies whether the TLS should be shut down gracefully before the target context is closed. Defaults to false.
|`Referral Strategy` | Strategy for handling referrals. Possible values are `FOLLOW`， `IGNORE`， `THROW`.
|`Connect Timeout` | Duration of connect timeout. (i.e. `10 secs`).
|`Read Timeout` | Duration of read timeout. (i.e. `10 secs`).
|`Url` | Space-separated list of URLs of the LDAP servers (i.e. `ldap://<hostname>:<port>`).
|`Page Size` | Sets the page size when retrieving users and groups. If not specified， no paging is performed.
|`Group Membership - Enforce Case Sensitivity` | Sets whether group membership decisions are case sensitive. When a user or group is inferred (by not specifying or user or group search base or user identity attribute or group name attribute) case sensitivity is enforced since the value to use for the user identity or group name would be ambiguous. Defaults to false.
|`Sync Interval` | Duration of time between syncing users and groups. (i.e. `30 mins`). Minimum allowable value is `10 secs`.
|`User Search Base` | Base DN for searching for users (i.e. `ou=users，o=NiFi`). Required to search users.
|`User Object Class` | Object class for identifying users (i.e. `person`). Required if searching users.
|`User Search Scope` | Search scope for searching users (`ONE_LEVEL`， `OBJECT`， or `SUBTREE`). Required if searching users.
|`User Search Filter` | Filter for searching for users against the `User Search Base` (i.e. `(memberof=cn=team1，ou=groups，o=NiFi)`). Optional.
|`User Identity Attribute` | Attribute to use to extract user identity (i.e. `cn`). Optional. If not set， the entire DN is used.
|`User Group Name Attribute` | Attribute to use to define group membership (i.e. `memberof`). Optional. If not set group membership will not be calculated through the users. Will rely on group membership being defined through `Group Member Attribute` if set. The value of this property is the name of the attribute in the user ldap entry that associates them with a group. The value of that user attribute could be a dn or group name for instance. What value is expected is configured in the `User Group Name Attribute - Referenced Group Attribute`.
|`User Group Name Attribute - Referenced Group Attribute` | If blank， the value of the attribute defined in `User Group Name Attribute` is expected to be the full dn of the group. If not blank， this property will define the attribute of the group ldap entry that the value of the attribute defined in `User Group Name Attribute` is referencing (i.e. `name`). Use of this property requires that `Group Search Base` is also configured.
|`Group Search Base` | Base DN for searching for groups (i.e. `ou=groups，o=NiFi`). Required to search groups.
|`Group Object Class` | Object class for identifying groups (i.e. `groupOfNames`). Required if searching groups.
|`Group Search Scope` | Search scope for searching groups (`ONE_LEVEL`， `OBJECT`， or `SUBTREE`). Required if searching groups.
|`Group Search Filter` | Filter for searching for groups against the `Group Search Base`. Optional.
|`Group Name Attribute` | Attribute to use to extract group name (i.e. `cn`). Optional. If not set， the entire DN is used.
|`Group Member Attribute` | Attribute to use to define group membership (i.e. `member`). Optional. If not set group membership will not be calculated through the groups. Will rely on group membership being defined through `User Group Name Attribute` if set. The value of this property is the name of the attribute in the group ldap entry that associates them with a user. The value of that group attribute could be a dn or memberUid for instance. What value is expected is configured in the `Group Member Attribute - Referenced User Attribute`. (i.e. `member: cn=User 1，ou=users，o=NiFi` vs. `memberUid: user1`)
|`Group Member Attribute - Referenced User Attribute` | If blank， the value of the attribute defined in `Group Member Attribute` is expected to be the full dn of the user. If not blank， this property will define the attribute of the user ldap entry that the value of the attribute defined in `Group Member Attribute` is referencing (i.e. `uid`). Use of this property requires that `User Search Base` is also configured. (i.e. `member: cn=User 1，ou=users，o=NiFi` vs. `memberUid: user1`)

>`nifi.properties`中指定的`identity mapping rules`也将应用于user identities。Group名称不会被映射替换。

#### ShellUserGroupProvider

ShellUserGroupProvider使用Shell命令从类似Unix的系统中获取用户和租户户详细信息。该提供程序使用诸如Linux上的getent和MacOS上的dscl之类的命令执行各种Shell管道。可以将受支持的系统配置为从外部来源（例如LDAP或NIS）检索用户和租户。在这些情况下，shell命令将返回这些外部用户和租户。这为管理员提供了另一种集成用户和租户目录服务的机制。 ShellUserGroupProvider具有以下属性：

| Property Name | Description
|----|----
|`Initial Refresh Delay` | Duration of initial delay before first user and group refresh. (i.e. `10 secs`).  Default is `5 mins`.
|`Refresh Delay` | Duration of delay between each user and group refresh. (i.e. `10 secs`).  Default is `5 mins`.
|`Exclude Groups` | Regular expression used to exclude groups.  Default is ''， which means no groups are excluded.
|`Exclude Users` | Regular expression used to exclude users.  Default is ''， which means no users are excluded.

与LdapUserGroupProvider一样，ShellUserGroupProvider在`authorizers.xml`文件中被注释掉。有关用法示例，请参阅该注释。

#### AzureGraphUserGroupProvider

The AzureGraphUserGroupProvider fetches users and groups from Azure Active Directory (AAD) using the Microsoft Graph API.

A subset of groups are fetched based on filter conditions (`Group Filter Prefix`, `Group Filter Suffix`, `Group Filter Substring`, and `Group Filter List Inclusion`) 
evaluated against the displayName property of the Azure AD group. Member users are then loaded from these groups. At least one filter condition should be specified.

This provider requires an Azure app registration with:

- Microsoft Graph Group.Read.All and User.Read.All API permissions with admin consent
- A client secret or application password
- ID token claims for upn and/or email

See [here](https://docs.microsoft.com/en-us/graph/auth-v2-service) and [here](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-daemon-app-registration) for more information on how to create a valid app registration.

The AzureGraphUserGroupProvider has the following properties:

Property Name |Description                                                           
----------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`Refresh Delay`               | Duration of delay between each user and group refresh. Default is `5 mins`.                                                                                                                                                                                                        
`Authority Endpoint`          | The endpoint of the Azure AD login. This can be found in the Azure portal under Azure Active Directory → App registrations → [application name] → Endpoints. For example, the global authority endpoint is [https://login.microsoftonline.com](https://login.microsoftonline.com/).
`Directory ID`                | Tenant ID or Directory ID of the Azure AD tenant. This can be found in the Azure portal under Azure Active Directory → App registrations → [application name] → Directory (tenant) ID.                                                                                             
`Application ID`              | Client ID or Application ID of the Azure app registration. This can be found in the Azure portal under Azure Active Directory → App registrations → [application name] → Overview → Application (client) ID.                                                                       
`Client Secret`               | A client secret from the Azure app registration. Secrets can be created in the Azure portal under Azure Active Directory → App registrations → [application name] → Certificates & secrets → Client secrets → [+] New client secret.                                               
`Group Filter Prefix`         | Prefix filter for Azure AD groups. Matches against the group displayName to retrieve only groups with names starting with the provided prefix.                                                                                                                                     
`Group Filter Suffix`         | Suffix filter for Azure AD groups. Matches against the group displayName to retrieve only groups with names ending with the provided suffix.                                                                                                                                       
`Group Filter Substring`      | Substring filter for Azure AD groups. Matches against the group displayName to retrieve only groups with names containing the provided substring.                                                                                                                                  
`Group Filter List Inclusion` | Comma-separated list of Azure AD groups. If no string-based matching filter (i.e., prefix, suffix, and substring) is specified, set this property to avoid fetching all groups and users in the Azure AD tenant.                                                                   
`Page Size`                   | Page size to use with the Microsoft Graph API. Set to 0 to disable paging API calls. Default: 50, Max: 999.                                                                                                                                                                        
`Claim for Username`          | The property of the user directory object mapped to the NiFi user name field. Default is 'upn'. 'email' is another option when `nifi.security.user.oidc.fallback.claims.identifying.user` is set to 'upn'.                                                                         

Like LdapUserGroupProvider and ShellUserGroupProvider, the AzureGraphUserGroupProvider configuration is commented out in the `authorizers.xml`file. Refer to the comment for a starter configuration.

#### CompositeUserGroupProvider

UAnother option for the UserGroupProvider are composite implementations. This means that multiple sources/implementations can be configured and composed. For instance, an admin can configure users/groups to be loaded from a file and a directory server. There are two composite implementations, one that supports multiple UserGroupProviders and one that supports multiple UserGroupProviders and a single configurable UserGroupProvider.

The CompositeUserGroupProvider will provide support for retrieving users and groups from multiple sources. The CompositeUserGroupProvider has the following property:

| Property Name | Description
|----|----
|`User Group Provider [unique key]` | The identifier of user group providers to load from. The name of each property must be unique， for example: "User Group Provider A"， "User Group Provider B"， "User Group Provider C" or "User Group Provider 1"， "User Group Provider 2"， "User Group Provider 3"

>Any identity mapping rules specified in nifi.properties are not applied in this implementation. This behavior would need to be applied by the base implementation.

The CompositeConfigurableUserGroupProvider will provide support for retrieving users and groups from multiple sources. Additionally, a single configurable user group provider is required. Users from the configurable user group provider are configurable, however users loaded from one of the User Group Provider [unique key] will not be. The CompositeConfigurableUserGroupProvider has the following properties:

| Property Name | Description
|----|----
|`Configurable User Group Provider` | A configurable user group provider.
|`User Group Provider [unique key]` | The identifier of user group providers to load from. The name of each property must be unique， for example: "User Group Provider A"， "User Group Provider B"， "User Group Provider C" or "User Group Provider 1"， "User Group Provider 2"， "User Group Provider 3"
                                                                            

#### FileAccessPolicyProvider

StandardManagedAuthorizer默认的AccessPolicyProvider是FileAccessPolicyProvider，但是，你可以开发其他AccessPolicyProvider作为扩展。 FileAccessPolicyProvider具有以下属性：

| Property Name | Description
|----|----
|`User Group Provider` | The identifier for an User Group Provider defined above that will be used to access users and groups for use in the managed access policies.
|`Authorizations File` | The file where the FileAccessPolicyProvider will store policies.
|`Initial Admin Identity` | The identity of an initial admin user that will be granted access to the UI and given the ability to create additional users， groups， and policies. The value of this property could be a DN when using certificates or LDAP， or a Kerberos principal. This property will only be used when there are no other policies defined. If this property is specified then a Legacy Authorized Users File can not be specified.
|`Legacy Authorized Users File` | The full path to an existing _authorized-users.xml_ that will be automatically converted to the new authorizations model. If this property is specified then an Initial Admin Identity can not be specified， and this property will only be used when there are no other users， groups， and policies defined.
|`Node Identity` | The identity of a NiFi cluster node. When clustered， a property for each node should be defined， so that every node knows about every other node. If not clustered these properties can be ignored. The name of each property must be unique， for example for a three node cluster: "Node Identity A"， "Node Identity B"， "Node Identity C" or "Node Identity 1"， "Node Identity 2"， "Node Identity 3"
|`Node Group` | The name of a group containing NiFi cluster nodes. The typical use for this is when nodes are dynamically added/removed from the cluster.


>The identities configured in the Initial Admin Identity, the Node Identity properties, or discovered in a Legacy Authorized Users File must be available in the configured User Group Provider.

>Any users in the legacy users file must be found in the configured User Group Provider.

>Any identity mapping rules specified in nifi.properties will also be applied to the node identities, so the values should be the unmapped identities (i.e. full DN from a certificate). This identity must be found in the configured User Group Provider.

#### StandardManagedAuthorizer

The default authorizer is the StandardManagedAuthorizer, however, you can develop additional authorizers as extensions. The StandardManagedAuthorizer has the following property:

| Property Name | Description
|----|----
|`Access Policy Provider` | The identifier for an Access Policy Provider defined above.

#### FileAuthorizer

FileAuthorizer已被上述更精细的StandardManagedAuthorizer方法取代。但是，由于向后兼容的原因，它仍然可用。 FileAuthorizer具有以下属性：

| Property Name | Description
|----|----
|`Authorizations File` | The file where the FileAuthorizer stores policies.  By default， the _authorizations.xml_ in the `conf` directory is chosen.
|`Users File` | The file where the FileAuthorizer stores users and groups.  By default， the _users.xml_ in the `conf` directory is chosen.
|`Initial Admin Identity` | The identity of an initial admin user that is granted access to the UI and given the ability to create additional users， groups， and policies. This property is only used when there are no other users， groups， and policies defined.
|`Legacy Authorized Users File` | The full path to an existing _authorized-users.xml_ that is automatically converted to the multi-tenant authorization model.  This property is only used when there  are no other users， groups， and policies defined.
|`Node Identity` | The identity of a NiFi cluster node. When clustered， a property for each node should be defined， so that every node knows about every other node. If not clustered， these properties can be ignored.

>Any identity mapping rules specified in nifi.properties will also be applied to the initial admin identity, so the value should be the unmapped identity.

>Any identity mapping rules specified in nifi.properties will also be applied to the node identities, so the values should be the unmapped identities (i.e. full DN from a certificate).

#### 初始化管理员(新NiFi实例)

如果你是第一次设置安全的NiFi实例，则必须在`authorizers.xml`文件中手动指定`Initial Admin Identity`。此初始管理员用户被授予对UI的访问权限，并且可以创建其他用户，租户和策略。此属性的值可以是DN(使用证书或LDAP时)或Kerberos主体。如果你是NiFi管理员，请将自己添加为`Initial Admin Identity`。

编辑并保存`authorizers.xml`文件后，重新启动NiFi。重新启动期间，`Initial Admin Identity`这个用户和系统管理员级别的策略将添加到`users.xml`和`authorizations.xml`文件中。一旦NiFi启动，`Initial Admin Identity`用户就可以访问UI并开始管理用户，租户和策略。

>对于全新的安全流程，提供`Initial Admin Identity`使该用户可以访问UI并管理用户，租户和策略。但是，如果该用户要开始修改流，则需要为root进程组授予自己的策略。系统无法自动执行此操作，因为在新流程中，根流程组的UUID在生成`flow.xml.gz`之前不是永久的。如果NiFi实例是从现有`flow.xml.gz`的升级或从不安全到安全的1.x实例的升级，则将自动为`Initial Admin Identity`用户授予修改流程的权限。

一些常见用例如下所述。

##### 基于文件(LDAP身份验证)

以下是使用John Smith名称的LDAP条目示例:

```xml
<authorizers>
    <userGroupProvider>
        <identifier>file-user-group-provider</identifier>
        <class>org.apache.nifi.authorization.FileUserGroupProvider</class>
        <property name="Users File">./conf/users.xml</property>
        <property name="Legacy Authorized Users File"></property>
        <property name="Initial User Identity 1">cn=John Smith，ou=people，dc=example，dc=com</property>
    </userGroupProvider>
    <accessPolicyProvider>
        <identifier>file-access-policy-provider</identifier>
        <class>org.apache.nifi.authorization.FileAccessPolicyProvider</class>
        <property name="User Group Provider">file-user-group-provider</property>
        <property name="Authorizations File">./conf/authorizations.xml</property>
        <property name="Initial Admin Identity">cn=John Smith，ou=people，dc=example，dc=com</property>
        <property name="Legacy Authorized Users File"></property>
        <property name="Node Identity 1"></property>
    </accessPolicyProvider>
    <authorizer>
        <identifier>managed-authorizer</identifier>
        <class>org.apache.nifi.authorization.StandardManagedAuthorizer</class>
        <property name="Access Policy Provider">file-access-policy-provider</property>
    </authorizer>
</authorizers>
```

##### 基于文件(Kerberos身份验证)

以下是使用名称John Smith和realm的示例Kerberos条目`NIFI.APACHE.ORG`:

```xml
<authorizers>
    <userGroupProvider>
        <identifier>file-user-group-provider</identifier>
        <class>org.apache.nifi.authorization.FileUserGroupProvider</class>
        <property name="Users File">./conf/users.xml</property>
        <property name="Legacy Authorized Users File"></property>
        <property name="Initial User Identity 1">johnsmith@nifi.APACHE.ORG</property>
    </userGroupProvider>
    <accessPolicyProvider>
        <identifier>file-access-policy-provider</identifier>
        <class>org.apache.nifi.authorization.FileAccessPolicyProvider</class>
        <property name="User Group Provider">file-user-group-provider</property>
        <property name="Authorizations File">./conf/authorizations.xml</property>
        <property name="Initial Admin Identity">johnsmith@nifi.APACHE.ORG</property>
        <property name="Legacy Authorized Users File"></property>
        <property name="Node Identity 1"></property>
    </accessPolicyProvider>
    <authorizer>
        <identifier>managed-authorizer</identifier>
        <class>org.apache.nifi.authorization.StandardManagedAuthorizer</class>
        <property name="Access Policy Provider">file-access-policy-provider</property>
    </authorizer>
</authorizers>
```

##### 基于LDAP的用户/组引用用户DN

以下是从LDAP加载用户和租户的示例。组成员资格将通过每个组的成员属性来驱动。授权仍将使用基于文件的访问策略:

```
dn: cn=User 1，ou=users，o=NiFi
objectClass: organizationalPerson
objectClass: person
objectClass: inetOrgPerson
objectClass: top
cn: User 1
sn: User1
uid: user1

dn: cn=User 2，ou=users，o=NiFi
objectClass: organizationalPerson
objectClass: person
objectClass: inetOrgPerson
objectClass: top
cn: User 2
sn: User2
uid: user2

dn: cn=admins，ou=groups，o=NiFi
objectClass: groupOfNames
objectClass: top
cn: admins
member: cn=User 1，ou=users，o=NiFi
member: cn=User 2，ou=users，o=NiFi

<authorizers>
    <userGroupProvider>
        <identifier>ldap-user-group-provider</identifier>
        <class>org.apache.nifi.ldap.tenants.LdapUserGroupProvider</class>
        <property name="Authentication Strategy">ANONYMOUS</property>

        <property name="Manager DN"></property>
        <property name="Manager Password"></property>

        <property name="TLS - Keystore"></property>
        <property name="TLS - Keystore Password"></property>
        <property name="TLS - Keystore Type"></property>
        <property name="TLS - Truststore"></property>
        <property name="TLS - Truststore Password"></property>
        <property name="TLS - Truststore Type"></property>
        <property name="TLS - Client Auth"></property>
        <property name="TLS - Protocol"></property>
        <property name="TLS - Shutdown Gracefully"></property>

        <property name="Referral Strategy">FOLLOW</property>
        <property name="Connect Timeout">10 secs</property>
        <property name="Read Timeout">10 secs</property>

        <property name="Url">ldap://localhost:10389</property>
        <property name="Page Size"></property>
        <property name="Sync Interval">30 mins</property>

        <property name="User Search Base">ou=users，o=NiFi</property>
        <property name="User Object Class">person</property>
        <property name="User Search Scope">ONE_LEVEL</property>
        <property name="User Search Filter"></property>
        <property name="User Identity Attribute">cn</property>
        <property name="User Group Name Attribute"></property>
        <property name="User Group Name Attribute - Referenced Group Attribute"></property>

        <property name="Group Search Base">ou=groups，o=NiFi</property>
        <property name="Group Object Class">groupOfNames</property>
        <property name="Group Search Scope">ONE_LEVEL</property>
        <property name="Group Search Filter"></property>
        <property name="Group Name Attribute">cn</property>
        <property name="Group Member Attribute">member</property>
        <property name="Group Member Attribute - Referenced User Attribute"></property>
    </userGroupProvider>
    <accessPolicyProvider>
        <identifier>file-access-policy-provider</identifier>
        <class>org.apache.nifi.authorization.FileAccessPolicyProvider</class>
        <property name="User Group Provider">ldap-user-group-provider</property>
        <property name="Authorizations File">./conf/authorizations.xml</property>
        <property name="Initial Admin Identity">John Smith</property>
        <property name="Legacy Authorized Users File"></property>

        <property name="Node Identity 1"></property>
    </accessPolicyProvider>
    <authorizer>
        <identifier>managed-authorizer</identifier>
        <class>org.apache.nifi.authorization.StandardManagedAuthorizer</class>
        <property name="Access Policy Provider">file-access-policy-provider</property>
    </authorizer>
</authorizers>
```

根据`User Identity Attribute`，`Initial Admin Identity`将从John Smith的条目的cn中加载。

##### LDAP-based Users/Groups Referencing User Attribute

Here is an example loading users and groups from LDAP. Group membership will be driven through the member uid attribute of each group. Authorization will still use file-based access policies:
```
dn: uid=User 1，ou=Users，dc=local
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: shadowAccount
uid: user1
cn: User 1

dn: uid=User 2，ou=Users，dc=local
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: shadowAccount
uid: user2
cn: User 2

dn: cn=Managers，ou=Groups，dc=local
objectClass: posixGroup
cn: Managers
memberUid: user1
memberUid: user2

<authorizers>
    <userGroupProvider>
        <identifier>ldap-user-group-provider</identifier>
        <class>org.apache.nifi.ldap.tenants.LdapUserGroupProvider</class>
        <property name="Authentication Strategy">ANONYMOUS</property>

        <property name="Manager DN"></property>
        <property name="Manager Password"></property>

        <property name="TLS - Keystore"></property>
        <property name="TLS - Keystore Password"></property>
        <property name="TLS - Keystore Type"></property>
        <property name="TLS - Truststore"></property>
        <property name="TLS - Truststore Password"></property>
        <property name="TLS - Truststore Type"></property>
        <property name="TLS - Client Auth"></property>
        <property name="TLS - Protocol"></property>
        <property name="TLS - Shutdown Gracefully"></property>

        <property name="Referral Strategy">FOLLOW</property>
        <property name="Connect Timeout">10 secs</property>
        <property name="Read Timeout">10 secs</property>

        <property name="Url">ldap://localhost:10389</property>
        <property name="Page Size"></property>
        <property name="Sync Interval">30 mins</property>

        <property name="User Search Base">ou=Users，dc=local</property>
        <property name="User Object Class">posixAccount</property>
        <property name="User Search Scope">ONE_LEVEL</property>
        <property name="User Search Filter"></property>
        <property name="User Identity Attribute">cn</property>
        <property name="User Group Name Attribute"></property>
        <property name="User Group Name Attribute - Referenced Group Attribute"></property>

        <property name="Group Search Base">ou=Groups，dc=local</property>
        <property name="Group Object Class">posixGroup</property>
        <property name="Group Search Scope">ONE_LEVEL</property>
        <property name="Group Search Filter"></property>
        <property name="Group Name Attribute">cn</property>
        <property name="Group Member Attribute">memberUid</property>
        <property name="Group Member Attribute - Referenced User Attribute">uid</property>
    </userGroupProvider>
    <accessPolicyProvider>
        <identifier>file-access-policy-provider</identifier>
        <class>org.apache.nifi.authorization.FileAccessPolicyProvider</class>
        <property name="User Group Provider">ldap-user-group-provider</property>
        <property name="Authorizations File">./conf/authorizations.xml</property>
        <property name="Initial Admin Identity">John Smith</property>
        <property name="Legacy Authorized Users File"></property>

        <property name="Node Identity 1"></property>
    </accessPolicyProvider>
    <authorizer>
        <identifier>managed-authorizer</identifier>
        <class>org.apache.nifi.authorization.StandardManagedAuthorizer</class>
        <property name="Access Policy Provider">file-access-policy-provider</property>
    </authorizer>
</authorizers>
```

##### Composite - File and LDAP-based Users/Groups

Here is an example composite implementation loading users and groups from LDAP and a local file. Group membership will be driven through the member attribute of each group. The users from LDAP will be read only while the users loaded from the file will be configurable in UI.
```
dn: cn=User 1，ou=users，o=NiFi
objectClass: organizationalPerson
objectClass: person
objectClass: inetOrgPerson
objectClass: top
cn: User 1
sn: User1
uid: user1

dn: cn=User 2，ou=users，o=NiFi
objectClass: organizationalPerson
objectClass: person
objectClass: inetOrgPerson
objectClass: top
cn: User 2
sn: User2
uid: user2

dn: cn=admins，ou=groups，o=NiFi
objectClass: groupOfNames
objectClass: top
cn: admins
member: cn=User 1，ou=users，o=NiFi
member: cn=User 2，ou=users，o=NiFi

<authorizers>
    <userGroupProvider>
        <identifier>file-user-group-provider</identifier>
        <class>org.apache.nifi.authorization.FileUserGroupProvider</class>
        <property name="Users File">./conf/users.xml</property>
        <property name="Legacy Authorized Users File"></property>

        <property name="Initial User Identity 1">cn=NiFi-node1，ou=servers，dc=example，dc=com</property>
        <property name="Initial User Identity 2">cn=NiFi-node2，ou=servers，dc=example，dc=com</property>
    </userGroupProvider>
    <userGroupProvider>
        <identifier>ldap-user-group-provider</identifier>
        <class>org.apache.nifi.ldap.tenants.LdapUserGroupProvider</class>
        <property name="Authentication Strategy">ANONYMOUS</property>

        <property name="Manager DN"></property>
        <property name="Manager Password"></property>

        <property name="TLS - Keystore"></property>
        <property name="TLS - Keystore Password"></property>
        <property name="TLS - Keystore Type"></property>
        <property name="TLS - Truststore"></property>
        <property name="TLS - Truststore Password"></property>
        <property name="TLS - Truststore Type"></property>
        <property name="TLS - Client Auth"></property>
        <property name="TLS - Protocol"></property>
        <property name="TLS - Shutdown Gracefully"></property>

        <property name="Referral Strategy">FOLLOW</property>
        <property name="Connect Timeout">10 secs</property>
        <property name="Read Timeout">10 secs</property>

        <property name="Url">ldap://localhost:10389</property>
        <property name="Page Size"></property>
        <property name="Sync Interval">30 mins</property>

        <property name="User Search Base">ou=users，o=NiFi</property>
        <property name="User Object Class">person</property>
        <property name="User Search Scope">ONE_LEVEL</property>
        <property name="User Search Filter"></property>
        <property name="User Identity Attribute">cn</property>
        <property name="User Group Name Attribute"></property>
        <property name="User Group Name Attribute - Referenced Group Attribute"></property>

        <property name="Group Search Base">ou=groups，o=NiFi</property>
        <property name="Group Object Class">groupOfNames</property>
        <property name="Group Search Scope">ONE_LEVEL</property>
        <property name="Group Search Filter"></property>
        <property name="Group Name Attribute">cn</property>
        <property name="Group Member Attribute">member</property>
        <property name="Group Member Attribute - Referenced User Attribute"></property>
    </userGroupProvider>
    <userGroupProvider>
        <identifier>composite-user-group-provider</identifier>
        <class>org.apache.nifi.authorization.CompositeConfigurableUserGroupProvider</class>
        <property name="Configurable User Group Provider">file-user-group-provider</property>
        <property name="User Group Provider 1">ldap-user-group-provider</property>
    </userGroupProvider>
    <accessPolicyProvider>
        <identifier>file-access-policy-provider</identifier>
        <class>org.apache.nifi.authorization.FileAccessPolicyProvider</class>
        <property name="User Group Provider">composite-user-group-provider</property>
        <property name="Authorizations File">./conf/authorizations.xml</property>
        <property name="Initial Admin Identity">John Smith</property>
        <property name="Legacy Authorized Users File"></property>

        <property name="Node Identity 1">cn=NiFi-node1，ou=servers，dc=example，dc=com</property>
        <property name="Node Identity 2">cn=NiFi-node2，ou=servers，dc=example，dc=com</property>
    </accessPolicyProvider>
    <authorizer>
        <identifier>managed-authorizer</identifier>
        <class>org.apache.nifi.authorization.StandardManagedAuthorizer</class>
        <property name="Access Policy Provider">file-access-policy-provider</property>
    </authorizer>
</authorizers>
```

In this example, the users and groups are loaded from LDAP but the servers are managed in a local file. The Initial Admin Identity value came from an attribute in a LDAP entry based on the User Identity Attribute. The Node Identity values are established in the local file using the Initial User Identity properties.

#### 旧版授权用户(NiFi实例升级)

If you are upgrading from a 0.x NiFi instance, you can convert your previously configured users and roles to the multi-tenant authorization model. In the authorizers.xml file, specify the location of your existing authorized-users.xml file in the Legacy Authorized Users File property.

Here is an example entry:

```xml
<authorizers>
    <userGroupProvider>
        <identifier>file-user-group-provider</identifier>
        <class>org.apache.nifi.authorization.FileUserGroupProvider</class>
        <property name="Users File">./conf/users.xml</property>
        <property name="Legacy Authorized Users File">/Users/johnsmith/config_files/authorized-users.xml</property>

        <property name="Initial User Identity 1"></property>
    </userGroupProvider>
    <accessPolicyProvider>
        <identifier>file-access-policy-provider</identifier>
        <class>org.apache.nifi.authorization.FileAccessPolicyProvider</class>
        <property name="User Group Provider">file-user-group-provider</property>
        <property name="Authorizations File">./conf/authorizations.xml</property>
        <property name="Initial Admin Identity"></property>
        <property name="Legacy Authorized Users File">/Users/johnsmith/config_files/authorized-users.xml</property>

        <property name="Node Identity 1"></property>
    </accessPolicyProvider>
    <authorizer>
        <identifier>managed-authorizer</identifier>
        <class>org.apache.nifi.authorization.StandardManagedAuthorizer</class>
        <property name="Access Policy Provider">file-access-policy-provider</property>
    </authorizer>
</authorizers>
```

After you have edited and saved the authorizers.xml file, restart NiFi. Users and roles from the authorized-users.xml file are converted and added as identities and policies in the users.xml and authorizations.xml files. Once the application starts, users who previously had a legacy Administrator role can access the UI and begin managing users, groups, and policies.

The following tables summarize the global and component policies assigned to each legacy role if the NiFi instance has an existing flow.xml.gz:

##### 全局访问政策

|                                   | Admin | DFM | Monitor | Provenance | NiFi | Proxy
|----|----|-----|----|----|----|----
|view the UI                        |*      |*    |*        |            |      |
|access the controller - view       |*      |*    |*        |            |*     |
|access the controller - modify     |       |*    |         |            |      |
|access parameter contexts - view   |       |     |         |            |      |
|access parameter contexts - modify |       |     |         |            |      |
|query provenance                   |       |     |         |*           |      |
|access restricted components       |       |*    |         |            |      |
|access all policies - view         |*      |     |         |            |      |
|access all policies - modify       |*      |     |         |            |      |
|access users/user groups - view    |*      |     |         |            |      |
|access users/user groups - modify  |*      |     |         |            |      |
|retrieve site-to-site details      |       |     |         |            |*     |
|view system diagnostics            |       |*    |*        |            |      |
|proxy user requests                |       |     |         |            |      |*
|access counters                    |       |     |         |            |      |


#### Root进程组上的组件访问策略

|                                  | Admin | DFM | Monitor | Provenance | NiFi | Proxy
|----|----|-----|----|----|----|----
|view the component                |*      |*    |*        |            |      |
|modify the component              |       |*    |         |            |      |
|view the data                     |       |*    |         |*           |      |*
|modify the data                   |       |*    |         |            |      |*
|view provenance                   |       |     |         |*           |      |
     

有关表中各个策略的详细信息，请参阅[访问策略(Access Policies)](#访问策略(Access%20Policies))。

>如果属性`Initial Admin Identity`和`Legacy Authorized Users File`属性都存在值，则NiFi无法重新启动。你只能指定其中一个值来初始化授权。

>不要手动编辑`authorizations.xml`文件。仅在初始设置期间以及之后使用NiFi UI创建授权。

#### 集群节点标识(Cluster Node Identities)

如果在集群环境中运行NiFi，则必须为每个节点指定标识。在启动期间创建节点通信所需的授权策略。

例如，如果要为每个节点设置具有以下DN的2节点集群:

```
cn=NiFi-1，ou=people，dc=example，dc=com
cn=NiFi-2，ou=people，dc=example，dc=com
```

```xml
<authorizers>
    <userGroupProvider>
        <identifier>file-user-group-provider</identifier>
        <class>org.apache.nifi.authorization.FileUserGroupProvider</class>
        <property name="Users File">./conf/users.xml</property>
        <property name="Legacy Authorized Users File"></property>

        <property name="Initial User Identity 1">johnsmith@nifi.APACHE.ORG</property>
        <property name="Initial User Identity 2">cn=NiFi-1，ou=people，dc=example，dc=com</property>
        <property name="Initial User Identity 3">cn=NiFi-2，ou=people，dc=example，dc=com</property>
    </userGroupProvider>
    <accessPolicyProvider>
        <identifier>file-access-policy-provider</identifier>
        <class>org.apache.nifi.authorization.FileAccessPolicyProvider</class>
        <property name="User Group Provider">file-user-group-provider</property>
        <property name="Authorizations File">./conf/authorizations.xml</property>
        <property name="Initial Admin Identity">johnsmith@nifi.APACHE.ORG</property>
        <property name="Legacy Authorized Users File"></property>

        <property name="Node Identity 1">cn=NiFi-1，ou=people，dc=example，dc=com</property>
        <property name="Node Identity 2">cn=NiFi-2，ou=people，dc=example，dc=com</property>
    </accessPolicyProvider>
    <authorizer>
        <identifier>managed-authorizer</identifier>
        <class>org.apache.nifi.authorization.StandardManagedAuthorizer</class>
        <property name="Access Policy Provider">file-access-policy-provider</property>
    </authorizer>
</authorizers>
```

>在集群中，所有节点必须具有相同的`authorizations.xml`和`users.xml`。唯一的例外是，在加入集群之前，如果节点的`authorizations.xml`和`user.xml`文件为空。这种情况下，节点将在启动期间从集群继承它们。

现在已经创建了初始授权，可以在NiFi UI中创建和管理其他用户，租户和授权策略。

### 配置用户和访问策略(Configuring Users & Access Policies)

根据配置的UserGroupProvider和AccessPolicyProvider的功能，可以在UI中配置用户，租户和策略。

本节假定用户，租户和策略可在UI中配置，并描述:

- 如何创建用户和租户
- 访问策略如何用于定义授权
- 如何查看在用户上设置的策略
- 如何通过遍历特定示例来配置访问策略
>以下说明假定User1是具有管理员权限的用户，例如`Initial Admin Identity`用户或转换后的旧管理员用户(请参阅[Authorizers.xml设置](#Authorizers.xml设置))。

#### 创建用户和租户(Creating Users and Groups)

在UI中，从全局菜单中选择`Users`。这将打开一个用于创建和管理用户和租户的对话框。

![](./image/general/nifi-users-dialog.png)

单击`Add`图标(![添加用户图标](https://nifichina.gitee.io/image/general/iconAddUser.png))。要创建用户，请输入与为保护你的NiFi实例而选择的身份验证方法相关的`Identity`信息。单击确定。

![](./image/general/user-creation-dialog.png)

要创建租户，请选择"Group"单选按钮，输入组的名称，然后选择要包括在组中的用户。单击确定。

![](./image/general/group-creation-dialog.png)

#### 访问策略(Access Policies)

你可以使用"access policies"管理用户和租户查看或修改NiFi资源的能力。可以将两种类型的访问策略应用于资源:

* View - 如果为资源创建了视图策略，则只有添加到该策略的用户或组才能看到该资源的详细信息。

* Modify - 如果资源具有修改策略，则只有添加到该策略的用户或组才能更改该资源的配置。

你可以在全局和组件级别创建和应用访问策略。

##### 全局访问政策

全局访问策略管理以下系统级授权:

|Policy |Privilege |Global Menu Selection |Resource Descriptor
|----|----|----|-----
|view the UI|允许用户查看UI|N/A|`/flow`
|access the controller|允许用户查看/修改控制器，包括报告任务，控制器服务，参数上下文和集群中的节点|Controller Settings|`/controller`
|access parameter contexts|允许用户查看/修改参数上下文。除非被覆盖，否则对参数上下文的访问将从“access the controller”策略继承。|Parameter Contexts|`/parameter-contexts`
|query provenance|允许用户提交Provenance Search和请求血缘关系|Data Provenance|`/provenance`
|access restricted components|假设其他权限就足够了，允许用户创建/修改受限组件。受限组件可以指示需要哪些特定权限。可以授予特定限制的权限，也可以不受限制地授予权限。如果无论限制如何都授予许可，则用户可以创建/修改所有受限制的组件。|N/A|`/restricted-components`
|access all policies|允许用户查看/修改所有组件的策略|Policies|`/policies`
|access users/user groups|允许用户查看/修改用户和用户组|Users|`/tenants`
|retrieve site-to-site details|允许其他NiFi实例检索站点到站点详细信息|N/A|`/site-to-site`
|view system diagnostics|允许用户查看系统诊断|Summary|`/system`
|proxy user requests|允许代理计算机代表他人发送请求|N/A|`/proxy`
|access counters|允许用户查看/修改计数器|Counters|`/counters`
  

##### 组���级访问策略

组件级访问策略管理以下组件级别授权:

|Policy |Privilege |Resource Descriptor & Action
|----|----|----
|view the component|允许用户查看组件配置详细信息|`resource="/<component-type>/<component-UUID>" action="R"`
|modify the component|允许用户修改组件配置详细信息|`resource="/<component-type>/<component-UUID>" action="W"`
|operate the component|允许用户通过更改组件运行状态（启动/停止/启用/禁用），远程端口传输状态或终止处理器线程来操作组件|`resource="/operation/<component-type>/<component-UUID>" action="W"`
|view provenance|允许用户查看此组件生成的provenance events|`resource="/provenance-data/<component-type>/<component-UUID>" action="R"`
|view the data|允许用户在出站连接中和通过provenance events查看流文件队列中该组件的元数据和内容|`resource="/data/<component-type>/<component-UUID>" action="R"`
|modify the data|允许用户清空出站连接中的流文件队列，并通过provenance events提交重播|`resource="/data/<component-type>/<component-UUID>" action="W"`
|view the policies|允许用户查看可以查看/修改组件的用户列表|`resource="/policies/<component-type>/<component-UUID>" action="R"`
|modify the policies|允许用户修改可以查看/修改组件的用户列表|`resource="/policies/<component-type>/<component-UUID>" action="W"`
|receive data via site-to-site|允许端口从NiFi实例接收数据|`resource="/data-transfer/input-ports/<port-UUID>" action="W"`
|send data via site-to-site|允许端口从NiFi实例发送数据|`resource="/data-transfer/output-ports/<port-UUID>" action="W"`

![](./image/general/i.png)你可以将访问策略应用于除连接之外的所有组件类型。连接授权由连接的源和目标组件上的各个访问策略以及包含组件的进程组的访问策略推断。在下面的[创建连接](#创建连接)和[编辑连接](#编辑连接)示例中将对此进行更详细的讨论。

![](./image/general/i.png)为了访问连接的列表队列或删除队列，用户需要在组件上"view the data"和"modify the data"策略的权限。在集群环境中，所有节点也必须添加到这些策略中，因为可以通过集群中的任何节点复制用户请求。

##### 访问策略继承

管理员无需为数据流中的每个组件手动创建策略。为了减少管理员在授权管理上花费的时间，策略将从父资源继承到子资源。例如，如果授予用户查看和修改进程组的权限，则该用户还可以查看和修改进程组中的组件。策略继承使管理员可以一次分配策略，并在整个数据流中应用策略。

你可以覆盖继承的策略(如下面的[移动处理器](#移动处理器)示例中所述)。覆盖策略会删除继承的策略，从父项到子项断开继承链，并创建替换策略以根据需要添加用户。可以通过删除替换策略来恢复继承的策略及其用户。

![](./image/general/i.png)"View the policies"和"modify the policies"组件级访问策略是此继承行为的一个例外。将用户添加到任一策略后，它们将添加到当前管理员列表中。他们不会覆盖更高级别的管理员。因此，仅显示特定于组件的管理员以查看"View the policies"和"modify the policies"访问策略。

![](./image/general/i.png)你无法修改继承策略上的users/groups。只能在父策略或覆盖策略中添加或删除用户和租户。

#### 查看用户策略

在UI中，从全局菜单中选择"Users"。这将打开NiFi用户对话框。

![](./image/general/user-policies.png)

选择"View User Policies"图标(![用户政策图标](https://nifichina.gitee.io/image/general/iconUserPolicies.png))。

![](./image/general/user-policies-detail.png)

用户策略窗口显示已为所选用户设置的全局和组件级策略。选择"Go To"图标(![转到图标](https://nifichina.gitee.io/image/general/iconGoTo.png)以导航到画布中的该组件。

#### 访问策略配置示例

了解如何创建和应用访问策略的最有效方法是介绍一些常见示例。以下方案假定User1是管理员，而User2是新添加的用户，仅具有对UI的访问权限。

让我们从画布上的两个处理器开始作为我们的起点:GenerateFlowFile和LogAttribute。

![](./image/general/access-policy-config-start.png)

User1可以向数据流添加组件，并能够移动，编辑和连接所有处理器。User1可以看到根进程组和处理器的详细信息和属性。

![](./image/general/user1-full-access.png)

User1希望保持其对数据流及其组件的当前权限。

User2无法将组件添加到数据流或移动，编辑或连接组件。User2将隐藏根进程组和处理器的详细信息和属性。

![](./image/general/user2-restricted-access.png)

##### 移动处理器

为了允许User2在数据流中移动GenerateFlowFile处理器而仅移动该处理器，User1执行以下步骤:

1.  选择GenerateFlowFile处理器以使其突出显示。

2.  从操作选项板中选择访问策略图标(![访问政策图标](https://nifichina.gitee.io/image/general/iconAccessPolicies.png))，然后打开访问策略对话框。

3.  从策略下拉列表中选择修改组件。处理器(子)上当前存在的修改组件策略是从User1具有权限的根进程组(父)继承的修改组件策略。

    ![](./image/general/processor-modify-policy.png)

4.  在策略继承消息中选择"覆盖"链接。创建替换策略时，你可以选择使用继承策略的副本或空策略覆盖。选择"覆盖"按钮以创建副本。

    ![](./image/general/override_policy_copy_empty.png)

5.  在创建的替换策略上，选择添加用户图标(![添加用户图标](https://nifichina.gitee.io/image/general/iconAddUser.png))。在用户标识字段中查找或输入User2，然后选择确定。通过这些更改，User1可以在画布上移动两个处理器。User2现在可以移动GenerateFlowFile处理器，但无法移动LogAttribute处理器。

    ![](./image/general/processor-replacement-modify-policy.png)

    ![](./image/general/user2-moved-processor.png)

##### 编辑处理器

在上面的移动处理器示例中，User2被添加到GenerateFlowFile的修改组件策略中。如果无法查看处理器属性，User2将无法修改处理器的配置。为了编辑组件，用户必须同时处于查看组件和修改组件策略。为实现此目的，User1执行以下步骤:

1.  选择GenerateFlowFile处理器。

2.  从操作选项板中选择访问策略图标(![访问政策图标](https://nifichina.gitee.io/image/general/iconAccessPolicies.png))，然后打开访问策略对话框。

3.  从策略下拉列表中选择查看组件。组件当前存在于处理器(子)上的策略视图是查看组件策略继承自User1具有权限的根进程组(父组件) 。

    ![](./image/general/processor-view-policy.png))

4.  在策略继承消息中选择覆盖链接，保留复制策略的默认值并选择覆盖按钮。

5.  在创建的覆盖策略上，选择"添加用户"图标(![添加用户图标](https://nifichina.gitee.io/image/general/iconAddUser.png))。在用户标识字段中查找或输入User2，然后选择确定。通过这些更改，User1可以在画布上查看和编辑处理器。User2现在可以查看和编辑GenerateFlowFile处理器。

    ![](./image/general/processor-replacement-view-policy.png)

    ![](./image/general/user2-edit-processor.png)

##### 创建连接

通过前面两个示例中讨论的配置访问策略，User1能够将GenerateFlowFile连接到LogAttribute:

![](./image/general/user1-create-connection.png)

User2无法建立连接::

![](./image/general/user2-no-connection.png)

这是因为:

* User2对进程组没有修改权限。

* 即使User2具有查看和修改对源组件(GenerateFlowFile)的访问权限，User2也没有对目标组件(LogAttribute)的访问策略。

允许User2将GenerateFlowFile连接到LogAttribute，如User1:

1.  选择根进程组。操作选项板将更新根进程组的详细信息。

2.  从操作选项板中选择访问策略图标(![访问政策图标](https://nifichina.gitee.io/image/general/iconAccessPolicies.png))，然后打开访问策略对话框。

3.  从策略下拉列表中选择修改组件。 
   ![](./image/general/process-group-modify-policy.png)

4.  选择添加用户图标(![添加用户图标](https://nifichina.gitee.io/image/general/iconAddUser.png))。找到或输入User2并选择确定。

![](./image/general/process-group-modify-policy-add-user2.png)

通过将User2添加到进程组上的修改组件策略，User2将通过策略继承添加到LogAttribute处理器上的修改组件策略。要确认这一点，请突出显示LogAttribute处理器，然后从Operate面板中选择Access Policies图标(![访问政策图标](https://nifichina.gitee.io/image/general/iconAccessPolicies.png)):

![](./image/general/processor-inherited-modify-policy.png)

通过这些更改，User2现在可以将GenerateFlowFile处理器连接到LogAttribute处理器。

![](./image/general/user2-can-connect.png)

![](./image/general/user2-connected-processors.png)

##### 编辑连接

假设User1或User2将ReplaceText处理器添加到根进程组:

![](./image/general/replacetext-processor-added.png)

User1可以选择并更改现有连接(在GenerateFlowFile和LogAttribute之间)，现在将GenerateFlowFile连接到ReplaceText:

![](./image/general/user1-edit-connection.png)

用户2无法执行此操作。

![](./image/general/user2-no-edit-connection.png)

允许User2将GenerateFlowFile连接到ReplaceText，如User1:

1.  选择根进程组。操作选项板将更新根进程组的详细信息。

2.  选择访问策略图标(![访问政策图标](https://nifichina.gitee.io/image/general/iconAccessPolicies.png))。

3.  从策略下拉列表中选择查看组件。 ![](./image/general/process-group-view-policy.png)

4.  选择添加用户图标(![添加用户图标](https://nifichina.gitee.io/image/general/iconAddUser.png))。找到或输入User2并选择确定。

![](./image/general/process-group-view-policy-add-user2.png)

要添加到进程组的视图和修改策略，User2现在可以将GenerateFlowFile处理器连接到ReplaceText处理器。

![](./image/general/user2-edit-connection.png)

## 加密配置

本节概述了NiFi加密和解密数据的功能。EncryptContent处理器允许加密和解密数据，这些数据既包含在NiFi内部，也包含在外部系统(如`openssl`其他数据源和消费者)中。

### 密钥派生函数

密钥导出函数(KDF)是将人类可读信息(通常是密码或其他秘密信息)转换为适合于数据保护的加密密钥的机制。有关详细信息，请阅读[关键导出函数](https://en.wikipedia.org/wiki/Key_derivation_function)的[Wikipedia条目](https://en.wikipedia.org/wiki/Key_derivation_function)。目前，KDF由`CipherProvider`实现提取并返回`Cipher`用于加密或解密的完全初始化的对象。由于使用了a `CipherProviderFactory`，KDF目前无法自定义。未来的增强功能包括在初始化时向KDF提供自定义成本参数的能力。作为解决方法，`CipherProvider`可以在构造函数中使用自定义成本参数初始化实例，但目前不支持`CipherProviderFactory`。以下是NiFi目前支持的KDF(主要`EncryptContent`用于基于密码的加密处理器(PBE))和相关说明:

* NiFi Legacy KDF
    * NiFi用于PBE的内部密钥推导的原始KDF，这是在密码和8或16字节随机盐的串联上的MD5摘要的1000次迭代(盐长度取决于所选择的密码块大小)。

    * **从NiFi 0.5.0开始**，该KDF已 **弃用，** 并且仅应用于向后兼容以解密先前由传统版本的NiFi加密的数据。

* OpenSSL PKCS＃5 v1.5 EVP_BytesToKey
    * 该KDF在v0.4.0中添加。

    * 此KDF用于与使用OpenSSL的默认PBE加密的数据兼容，称为`EVP_BytesToKey`。这是MD5在密码和8字节随机ASCII盐的串联上的单次迭代。OpenSSL建议使用`PBKDF2`密钥派生，但不公开命令行工具所需的库方法，因此该KDF仍然是命令行加密的事实上的默认值。

* Bcrypt
    * 该KDF在v0.5.0中添加。

    * [Bcrypt](https://en.wikipedia.org/wiki/Bcrypt)是一种基于[Blowfish](https://en.wikipedia.org/wiki/Blowfish_(cipher))密码的自适应函数。强烈建议使用此KDF，因为它会自动合并一个随机的16字节盐，可配置的成本参数(或"工作因素")，并且可以通过要求访问"大"来使用[GPGPU](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units)(在内核之间共享内存)来抵御暴力攻击。密钥推导期间的内存块。它对[FPGA](https://en.wikipedia.org/wiki/Field-programmable_gate_array)暴力攻击的抵抗力较弱，门阵列可以访问各个嵌入式RAM块。

    * 由于Bcrypt派生密钥的长度始终为184位，因此将完整输出提供给`SHA-512`摘要并截断为所需的密钥长度。这为格式化输入提供了雪崩效应的好处。

    * 建议的最小工作因数是12(2 12个密钥派生轮次)(截至2016年2 月 1 日的商品硬件)，应增加到合法系统遇到有害延迟的阈值(参见下面的时间表或用于`BcryptCipherProviderGroovyTest#testDefaultConstructorShouldProvideStrongWorkFactor()`计算安全性)最小值)。

    * 盐格式是`$2a$10$ABCDEFGHIJKLMNOPQRSTUV`。盐被划分，`$`三个部分如下:
        * `2a` - 格式的版本。[这里](http://blog.ircmaxell.com/2012/12/seven-ways-to-screw-up-bcrypt.html)可以找到广泛的解释。NiFi目前`2a`用于内部产生的所有盐。

        * `10` - 工作因素。这实际上是log 2值，因此在这种情况下总迭代次数将是2 10。

        * `ABCDEFGHIJKLMNOPQRSTUV` - 22个字符，Base64编码，未填充，原盐值。这解码为密钥派生中使用的16字节盐。

* Scrypt
    * 该KDF在v0.5.0中添加。

    * [Scrypt](https://en.wikipedia.org/wiki/Scrypt)是为响应而设计的自适应功能`bcrypt`。建议使用此KDF，因为它需要相对大量的内存用于每个派生，从而抵抗硬件暴力攻击。

    * 建议的最低成本是`N`= 2 14，`r`= 8，`p`= 1(截至2016年2 月 1日的商品硬件)，应增加到合法系统遇到有害延迟的阈值(参见下面的时间表或用于`ScryptCipherProviderGroovyTest#testDefaultConstructorShouldProvideStrongParameters()`计算安全性)最小值)。

    * 盐格式是`$s0$e0101$ABCDEFGHIJKLMNOPQRSTUV`。盐被划分，`$`三个部分如下:
        * `s0` - 格式的版本。NiFi目前`s0`用于内部产生的所有盐。

        * `e0101` - 成本参数。这实际上是一个十六进制编码`N`，`r`，`p`使用偏移。这可以使用`Scrypt#encodeParams()`和形成/解析`Scrypt#parseParameters()`。
            * 一些外部库以形式编码`N`，`r`并`p`单独编码`$400$1$1$`。可以使用实用方法`ScryptCipherProvider#translateSalt()`将外部表单转换为内部表单。

        * `ABCDEFGHIJKLMNOPQRSTUV` - 12-44字符，Base64编码，未填充，原盐值。这解码为密钥派生中使用的8-32字节的盐。

* PBKDF2
    * 该KDF在v0.5.0中添加。

    * [基于密码的密钥推导功能2](https://en.wikipedia.org/wiki/PBKDF2)是一种自适应推导功能，它使用内部伪随机函数(PRF)并通过密码和盐(至少16字节)多次迭代。

    * PRF建议为`HMAC/SHA-256`或`HMAC/SHA-512`。HMAC加密散列函数的使用减轻了长度扩展攻击。

    * 建议的最小迭代次数为160，000(截至2016年2月1日的商品硬件)。这个数字应该每两年增加一倍(见下面的时间表或`PBKDF2CipherProviderGroovyTest#testDefaultConstructorShouldProvideStrongIterationCount()`用来计算安全最小值)。

    * 这个KDF不是内存很难(可以用商用硬件进行大规模并行化)，但仍然建议[NIST SP 800-132(PDF)](http://csrc.nist.gov/publications/nistpubs/800-132/nist-sp800-132.pdf)和许多密码学家(当使用适当的迭代计数和HMAC加密散列函数时)。

* None
    * 该KDF在v0.5.0中添加。

    * 该KDF不对输入执行操作，并且是用于指示向密码提供原始密钥的标记。密钥必须以十六进制编码提供，并且对于关联的密码/算法具有有效长度。

其他资源

* [最佳scrypt成本参数和关系的解释](http://stackoverflow.com/a/30308723/70465)

* [NIST特刊800-132](http://csrc.nist.gov/publications/nistpubs/800-132/nist-sp800-132.pdf)

* [OWASP密码存储工作因子计算](https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet#Work_Factor)

* [PBKDF2轮次计算](http://security.stackexchange.com/a/3993/16485)

* [Scrypt为KDF vs密码存储漏洞](http://blog.ircmaxell.com/2014/03/why-i-dont-recommend-scrypt.html)

* [Scrypt vs. Bcrypt(截至2010年)](http://security.stackexchange.com/a/26253/16485)

* [Bcrypt vs PBKDF2](http://security.stackexchange.com/a/6415/16485)

* [为Bcrypt选择工作因素](http://wildlyinaccurate.com/bcrypt-choosing-a-work-factor/)

* [Spring Security Bcrypt](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/crypto/bcrypt/BCrypt.html)

* [OpenSSL EVP BytesToKey PKCS＃1v1.5](https://www.openssl.org/docs/man1.1.0/crypto/EVP_BytesToKey.html)

* [OpenSSL PBKDF2 KDF](https://wiki.openssl.org/index.php/Manual:PKCS5_PBKDF2_HMAC(3))

* [OpenSSL KDF缺陷描述](http://security.stackexchange.com/a/29139/16485)

### 盐和IV编码

最初，`EncryptContent`处理器有一种从用户提供的密码导出加密密钥的方法。现在`NiFiLegacy`有效地将其称为模式`MD5 digest， 1000 iterations`。在v0.4.0中，添加了另一种导出密钥的方法，`OpenSSL PKCS#5 v1.5 EVP_BytesToKey`以便与使用`openssl`命令行工具在NiFi外部加密的内容兼容。这两个[密钥派生函数](#密钥派生函数)(KDF)都具有硬编码的摘要函数和迭代计数，并且salt格式也是硬编码的。使用v0.5.0，引入了具有可变迭代计数，工作因子和盐格式的附加KDF。另外，_原始密钥加密_还介绍了。这需要将任意盐和初始化矢量(IV)编码到密码流中的能力，以便由NiFi或后续系统恢复以解密这些消息。

对于现有的KDF，salt格式没有改变。

#### NiFi Legacy

输入的前8或16个字节是salt。盐长度基于所选算法的密码块长度确定。如果无法确定密码块大小(例如使用流密码`RC4`)，则使用默认值8字节。在解密时，盐被读入并与密码组合以导出加密密钥和IV。

![](./image/general/NiFi-legacy-salt.png)

#### OpenSSL PKCS＃5 v1.5 EVP_BytesToKey

OpenSSL允许使用salted或unsalted密钥派生。_\*无保留密钥派生是一种安全风险，不建议使用。*_如果存在salt，则输入的前8个字节为ASCII字符串"Salted __"(`0x53 61 6C 74 65 64 5F 5F`)，接下来的8个字节为ASCII编码的salt。在解密时，盐被读入并与密码组合以导出加密密钥和IV。如果没有salt标头，则整个输入被认为是密文。

![](./image/general/openssl-salt.png)

对于新的KDF，每个都允许非确定性IV，IV必须与密文一起存储。这不是一个漏洞，因为IV不需要保密，而只是对于使用相同密钥加密的消息是唯一的，以减少加密攻击的成功。对于这些KDF，输出包括盐，然后是盐分隔符，UTF-8字符串"NiFiSALT"(`0x4E 69 46 69 53 41 4C 54`)然后是IV，接着是IV分隔符，UTF-8字符串"NiFiIV"(`0x4E 69 46 69 49 56`)，然后是密文。

#### Bcrypt，Scrypt，PBKDF2

![](./image/general/bcrypt-salt.png)

![](./image/general/scrypt-salt.png)

![](./image/general/pbkdf2-salt.png)

EncryptContent处理器允许加密和解密数据，这些数据既包含在NiFi内部，也包含在外部系统(如`openssl`其他数据源和消费者)中。


### Java密码术扩展(JCE)有限强度管辖政策

由于美国的出口法规，默认JVM [对其](http://docs.oracle.com/javase/7/docs/technotes/guides/security/SunProviders.html#importlimits)可用[的加密操作的强度施加了限制](http://docs.oracle.com/javase/7/docs/technotes/guides/security/SunProviders.html#importlimits)。例如，AES操作`128 bit keys`默认限制为。虽然`AES-128`在加密方面是安全的，但这可能会产生意想不到的后果，特别是在基于密码的加密(PBE)上。

PBE是从_用户提供的秘密材料_(通常是密码)导出用于加密或解密的加密密钥的过程。不是人类记住(随机出现的)32或64个字符的十六进制字符串，而是使用密码或密码。

由于基础密钥长度检查，NiFi提供的许多PBE算法对密码长度施加了严格的限制。下表列出了具有有限加密强度的JVM上的最大密码长度。


算法                                   | 最大密码长度
------------------------------------ | ------
`PBEWITHMD5AND128BITAES-CBC-OPENSSL` | 16    
`PBEWITHMD5AND192BITAES-CBC-OPENSSL` | 16    
`PBEWITHMD5AND256BITAES-CBC-OPENSSL` | 16    
`PBEWITHMD5ANDDES`                   | 16    
`PBEWITHMD5ANDRC2`                   | 16    
`PBEWITHSHA1ANDRC2`                  | 16    
`PBEWITHSHA1ANDDES`                  | 16    
`PBEWITHSHAAND128BITAES-CBC-BC`      | 7     
`PBEWITHSHAAND192BITAES-CBC-BC`      | 7     
`PBEWITHSHAAND256BITAES-CBC-BC`      | 7     
`PBEWITHSHAAND40BITRC2-CBC`          | 7     
`PBEWITHSHAAND128BITRC2-CBC`         | 7     
`PBEWITHSHAAND40BITRC4`              | 7     
`PBEWITHSHAAND128BITRC4`             | 7     
`PBEWITHSHA256AND128BITAES-CBC-BC`   | 7     
`PBEWITHSHA256AND192BITAES-CBC-BC`   | 7     
`PBEWITHSHA256AND256BITAES-CBC-BC`   | 7     
`PBEWITHSHAAND2-KEYTRIPLEDES-CBC`    | 7     
`PBEWITHSHAAND3-KEYTRIPLEDES-CBC`    | 7     
`PBEWITHSHAANDTWOFISH-CBC`           | 7     

### 允许不安全的加密模式

默认情况下，处理器设置中的`Allow Insecure Cryptographic Modes`属性`EncryptContent`设置为`not-allowed`。这意味着如果提供的密码少于`10`字符，则会发生验证错误。10个字符是保守估计，不考虑完整熵计算，模式等。

![](./image/general/allow-weak-crypto.png)

在具有有限强度加密的JVM上，一些PBE算法将最大密码长度限制为7，在这种情况下，将无法提供"安全"密码。建议为JVM安装JCE Unlimited Strength Jurisdiction Policy文件以缓解此问题。

* [Java 8的JCE Unlimited Strength Jurisdiction策略文件](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html)

如果在无法安装无限强度策略的系统上，建议切换到支持更长密码的算法(参见上表)。

![](./image/general/iii.png) _允许弱加密_
如果它是不可能安装无限强度管辖的政策，该`Allow Weak Crypto`设置可以改变`allowed`，但是**这是_不_推荐的**。更改此设置明确承认使用弱加密配置的固有风险。

最好是请求上游/下游系统切换到[密钥加密](https://cwiki.apache.org/confluence/display/NiFi/Encryption+Information)或使用[NiFi支持](https://cwiki.apache.org/confluence/display/NiFi/Key+Derivation+Function+Explanations)的"强" [密钥导出功能(KDF)](https://cwiki.apache.org/confluence/display/NiFi/Key+Derivation+Function+Explanations)。

## 配置文件中的加密密码

为了便于安全设置NiFi，你可以使用`encrypt-config`命令行实用程序加密NiFi在启动时在内存中解密的原始配置值。这种可扩展的保护方案透明地允许NiFi在操作中使用原始值，同时保护它们静止。将来，将集成硬件安全模块(HSM)和外部安全存储机制，但目前，AES加密提供程序是默认实现。

这是行为的改变; 在1.0之前，所有配置值都以明文形式存储在文件系统上。建议使用POSIX文件权限来限制对这些文件的未授权访问。

如果未执行管理员操作，则配置值保持未加密状态。

有关更多信息，请参阅[NiFi工具包指南](./ToolkitGuide)中的[加密配置工具](./ToolkitGuide#encrypt_config_tool)部分。

## NiFi Toolkit Administrative Tools

除了`tls-toolkit`和之外`encrypt-config`，NiFi Toolkit还包含命令行实用程序，供管理员在独立和集群环境中支持NiFi维护。这些工具包括：

* CLI - 该`cli`工具使管理员能够与NiFi和NiFi Registry实例进行交互，以自动执行诸如部署版本化流程以及管理流程组和集群节点等任务。

* 文件管理器(File Manager) - 该`file-manager`工具使管理员能够从备份中备份，安装或恢复NiFi安装。

* 流量分析器(Flow Analyzer) - 该`flow-analyzer`工具生成一个报告，帮助管理员了解可以存储在给定流量的背压中的最大数据量。

* 节点管理器(Node Manager ) - 该`node-manager`工具使管理员能够对节点执行状态检查，以及从集群连接，断开连接或删除节点的功能。

* 通知(Notify) - 该`notify`工具使管理员能够将公告发送到NiFi UI。

* S2S - 该`s2s`工具使管理员能够通过站点到站点将数据发送到NiFi流中或从中发送出来。

有关每个实用程序的详细信息，请参阅[NiFi工具包指南](./ToolkitGuide)。

## 集群配置

本节简要概述了NiFi集群以及如何设置基本集群的说明。在未来，我们希望提供涵盖NiFi集群架构的补充文档。

![](./image/general/zero-master-cluster-http-access.png)

### 零主集群

NiFi采用Zero-Master Clustering范例。集群中的每个节点都对数据执行相同的任务，但每个节点都在不同的数据集上运行。其中一个节点自动选择(通过Apache ZooKeeper)作为集群协调器。然后，集群中的所有节点都会向此节点发送心跳/状态信息，并且此节点负责断开在一段时间内未报告任何心跳状态的节点。此外，当新节点选择加入集群时，新节点必须首先连接到当前选定的集群协调器，以获取最新的流。如果集群协调器确定允许该节点加入(基于其配置的防火墙文件)，则将当前流提供给该节点，并且该节点能够加入集群，假设节点的流副本与集群协调器提供的副本匹配。如果节点的流配置版本与集群协调器的版本不同，则该节点将不会加入集群。

### 为什么集群？

NiFi管理员或DataFlow管理器(DFM)可能会发现在单个服务器上使用一个NiFi实例不足以处理他们拥有的数据量。因此，一种解决方案是在多个NiFi服务器上运行相同的数据流。但是，这会产生管理问题，因为每次DFM想要更改或更新数据流时，他们必须在每个服务器上进行这些更改，然后单独监视每个服务器。通过集群NiFi服务器，可以增加处理能力以及单个接口，通过该接口可以更改数据流并监控数据流。集群允许DFM仅进行一次更改，然后将更改复制到集群的所有节点。通过单一接口，DFM还可以监视所有节点的健康状况和状态。

### 术语

NiFi Clustering是独一无二的，有自己的术语。在设置集群之前了解以下术语非常重要：

**NiFi集群协调器(****NiFi Cluster Coordinator****)**：NiFi集群协调器是NiFi集群中的节点，负责执行任务以管理集群中允许的节点，并为新加入的节点提供最新的流量。当DataFlow Manager管理集群中的数据流时，他们可以通过集群中任何节点的用户界面执行此操作。然后，所做的任何更改都将复制到集群中的所有节点。

**节点(****Nodes****)**：每个集群由一个或多个节点组成。节点执行实际的数据处理。

**主节点(****Primary Node****)**：每个集群都有一个主节点。在此节点上，可以运行"隔离处理器"(见下文)。ZooKeeper用于自动选择主节点。如果该节点由于任何原因断开与集群的连接，将自动选择新的主节点。用户可以通过查看用户界面的"集群管理"页面来确定当前选择哪个节点作为主节点。

![](./image/general/primary-node-cluster-mgt.png)

**孤立的处理器**：在NiFi集群中，相同的数据流在所有节点上运行。因此，流中的每个组件都在每个节点上运行。但是，可能存在DFM不希望每个处理器在每个节点上运行的情况。最常见的情况是使用的处理器使用不能很好扩展的协议与外部服务进行通信。例如，GetSFTP处理器从远程目录中提取。如果GetSFTP处理器在集群中的每个节点上运行并同时尝试从同一个远程目录中提取，则可能存在竞争条件。因此，DFM可以将主节点上的GetSFTP配置为独立运行，这意味着它仅在该节点上运行。通过适当的数据流配置，它可以提取数据并在集群中的其余节点之间对其进行负载平衡。请注意，虽然存在此功能，但仅使用独立的NiFi实例来提取数据并将其提供给集群也很常见。它仅取决于可用资源以及管理员决定配置集群的方式。

**心跳**：节点通过"心跳"将其健康状况和状态传达给当前选定的集群协调器，这使协调器知道它们仍然连接到集群并正常工作。默认情况下，节点每5秒发出一次心跳，如果集群协调器在40秒内没有从节点收到心跳，则由于"缺乏心跳"而断开节点。5秒设置可在_nifi.properties_文件中配置(请参阅[集群公共属性](#集群公共属性))部分了解更多信息)。集群协调器断开节点的原因是协调器需要确保集群中的每个节点都处于同步状态，并且如果没有定期听到节点，协调器无法确定它是否仍与其余节点同步集群。如果在40秒后节点发送新的心跳，协调器将自动请求节点重新加入集群，以包括重新验证节点的流。一旦接收到心跳，由于心跳不足导致的断开连接和重新连接都会报告给用户界面中的DFM。

### 集群内的通信

如上所述，节点通过心跳与集群协调器通信。当选择集群协调器时，它会使用其连接信息更新Apache ZooKeeper中众所周知的ZNode，以便节点了解发送心跳的位置。如果其中一个节点发生故障，则集群中的其他节点将不会自动获取丢失节点的负载。DFM可以配置故障转移意外事件的数据流; 但是，这取决于数据流设计，并不会自动发生。

当DFM对数据流进行更改时，接收更改流的请求的节点会将这些更改传递给所有节点，并等待每个节点响应，表明它已对其本地流进行了更改。

### 管理节点

#### 断开节点

DFM可以手动断开节点与集群的连接。节点也可能由于其他原因而断开连接，例如由于缺乏心跳。当节点断开连接时，集群协调器将在用户界面上显示公告。在解决断开连接节点的问题之前，DFM将无法对数据流进行任何更改。DFM或管理员需要对节点的问题进行故障排除，并在对数据流进行任何新的更改之前解决该问题。但是，值得注意的是，仅仅因为节点断开连接并不意味着它不起作用。这可能由于某些原因而发生，例如，当节点由于网络问题而无法与集群协调器通信时。

要手动断开节点，请从节点的行中选择"断开连接"图标(![断开图标](https://nifichina.gitee.io/image/general/iconDisconnect.png))。

![](./image/general/disconnected-node-cluster-mgt.png)

断开连接的节点可以连接(![连接图标](https://nifichina.gitee.io/image/general/iconConnect.png))，卸载(![卸载图标](https://nifichina.gitee.io/image/general/iconOffload.png))或删除(![删除图标](https://nifichina.gitee.io/image/general/iconDelete.png))。

![](./image/general/i.png)并非所有处于"已断开连接"状态的节点都可以卸载。如果节点断开连接且无法访问，则节点无法接收卸载请求以启动卸载。此外，由于防火墙规则，可能会中断或阻止卸载。

#### 卸载节点

保留在断开连接的节点上的流文件可以通过卸载重新平衡到集群中的其他活动节点。在Cluster Management对话框中，为Disconnected节点选择"Offload"图标(![卸载图标](https://nifichina.gitee.io/image/general/iconOffload.png))。这将停止所有处理器，终止所有处理器，停止在所有远程进程组上传输，并将流文件重新平衡到集群中的其他连接节点。

![](./image/general/offloading-node-cluster-mgt.png)

由于遇到错误(内存不足，没有网络连接等)而保持"卸载"状态的节点可以通过重新启动节点上的NiFi重新连接到集群。卸载的节点可以重新连接到集群(通过选择连接或重新启动节点上的NiFi)或从集群中删除。

![](./image/general/offloaded-node-cluster-mgt.png)

#### 删除节点

在某些情况下，DFM可能希望继续对流进行更改，即使节点未连接到集群也是如此。在这种情况下，DFM可以选择完全从集群中删除节点。在Cluster Management对话框中，为Disconnected或Offloaded节点选择"Delete"图标(![删除图标](https://nifichina.gitee.io/image/general/iconDelete.png))。删除后，在重新启动节点之前，节点无法重新加入集群。

#### 退役节点

停用节点并将其从集群中删除的步骤如下：

1.  断开节点。

2.  断开连接完成后，卸载节点。

3.  卸载完成后，删除该节点。

4.  删除请求完成后，停止/删除主机上的NiFi服务。

NiFi CLI节点命令

作为UI的替代方案，以下NiFi CLI命令可用于检索单个节点，检索节点列表以及连接/断开/卸载/删除(connecting/disconnecting/offloading/deleting )  节点：

* `NiFi get-node`

* `NiFi get-nodes`

* `NiFi connect-node`

* `NiFi disconnect-node`

* `NiFi offload-node`

* `NiFi delete-node`

有关更多信息，请参阅[NiFi工具包指南中](./ToolkitGuide)的[NiFi CLI]((./ToolkitGuide#NiFi_CLI)部分。

### Flow Election

当集群首次启动时，NiFi必须确定哪个节点具有流的"正确"版本。这是通过对每个节点具有的流进行投票来完成的。当节点尝试连接到集群时，它会将其本地流的副本提供给集群协调器。如果尚未选择流"正确"流，则将节点的流与每个其他节点的流进行比较。如果另一个Node的流与此流匹配，则为此流投票。如果还没有其他节点报告相同的流，则此流将以一票投票的方式添加到可能选择的流池中。经过一段时间后(通过设置`nifi.cluster.flow.election.max.wait.time`属性配置)或一些节点有投票(通过设置`nifi.cluster.flow.election.max.candidates`属性)，流被选为流的"正确"副本。然后，具有不兼容流的所有节点将与集群断开连接，而具有兼容流的节点将继承集群的流。选举是根据"民众投票"进行的，但需要注意的是，除非所有流量都是空的，否则获胜者永远不会是"空流"。这允许管理员删除节点的_flow.xml.gz_文件并重新启动节点，因为知道节点的流将不会被投票为"正确"流，除非找不到其他流。


### 基本集群设置

本节介绍由三个NiFi实例组成的简单三节点非安全集群的设置。

对于每个实例，都需要更新 _nifi.properties_ 文件中的某些属性。特别是，应根据你的情况评估Web和集群属性并进行相应调整。所有属性都在本指南的 [系统属性(System Properties)](#系统属性(System%20Properties))部分中描述; 但是，在本节中，我们将重点关注必须为简单集群设置的最小属性。

对于所有三个实例，可以使用默认设置保留[集群公共属性](集群公共属性)。但请注意，如果更改这些设置，则必须在集群中的每个实例上设置相同的设置。

对于每个节点，要配置的最小属性如下:

* 在Web Properties部分下，设置要在其上运行节点的HTTP或HTTPS端口。另外，请考虑是否需要设置HTTP或HTTPS主机属性。集群中的所有节点都应使用相同的协议设置。

* 在State Management 将`nifi.state.management.provider.cluster`属性设置为"集群状态提供程序"的标识符。确保已在_state-management.xml_文件中配置了集群状态提供程序。有关更多信息，请参阅[配置状态提供程序](http://nifi.apache.org/docs/NiFi-docs/html/administration-guide.html#state_providers)

* 在Cluster Node Properties下，设置以下内容:
    * `nifi.cluster.is.node`- 将此设置为 _true_。

    * `nifi.cluster.node.address` - 将其设置为节点的标准主机名。如果留空，则默认为`localhost`。

    * `nifi.cluster.node.protocol.port` - 将其设置为高于1024的开放端口(任何低端都需要root)。

    * `nifi.cluster.node.protocol.threads` - 应该用于与集群中的其他节点通信的线程数。此属性默认为`10`。线程池用于将请求复制到所有节点，并且线程池的线程数永远不会少于此数量。它将根据需要增长到`nifi.cluster.node.protocol.max.threads` 属性设置的最大值。

    * `nifi.cluster.node.protocol.max.threads` - 应该用于与集群中其他节点通信的最大线程数。此属性默认为`50`。线程池用于对所有节点的复制请求，并且线程池将具有由`nifi.cluster.node.protocol.threads`属性配置的"核心"大小 。但是，如有必要，线程池会将活动线程数增加到此属性设置的限制。

    * `nifi.zookeeper.connect.string` - 连接到Apache ZooKeeper所需的连接字符串。这是一个以逗号分隔的hostname:port对列表。例如，`localhost:2181，localhost:2182，localhost:2183`。这应该包含ZooKeeper仲裁中所有ZooKeeper实例的列表。

    * `nifi.zookeeper.root.node` - 应在ZooKeeper中使用的根ZNode。ZooKeeper提供了一个类似目录的结构来存储数据。此结构中的每个"目录"称为ZNode。这表示应该用于存储数据的根ZNode或"目录"。默认值为`/root`。这对于正确设置很重要，因为NiFi实例尝试加入的集群取决于它连接到哪个ZooKeeper实例以及指定的ZooKeeper根节点。

    * `nifi.cluster.flow.election.max.wait.time` - 指定在选择Flow作为"正确"流之前等待的时间量。如果已投票的节点数等于`nifi.cluster.flow.election.max.candidates` 属性指定的数量，则集群将不会等待这么长时间。默认值为`5 mins`。请注意，一旦投票第一次投票，时间就会开始。

    * `nifi.cluster.flow.election.max.candidates` - 指定集群中所需的节点数，以便提前选择流。这允许集群中的节点避免在开始处理之前等待很长时间，如果我们至少达到集群中的此数量的节点。

现在，可以启动集群。实例启动的顺序无关紧要。导航到其中一个节点的URL，用户界面应类似于以下内容:

![](./image/general/ncm.png)

### 故障排除

如果遇到问题并且你的集群无法按照描述运行，请调查 节点上的_NiFi-app.log_和_NiFi-user.log_文件。如果需要，可以通过编辑`conf/logback.xml`文件将日志记录级别更改为DEBUG 。具体来说，设置`level="DEBUG"`以下行(而不是`"INFO"`):

```xml
<logger name="org.apache.nifi.web.api.config" level="INFO" additivity="false">        <appender-ref ref="USER_FILE"/>    </logger>
```

## State管理

NiFi为处理器，报告任务，控制器服务和框架本身提供了一种机制来保持状态。例如，这允许处理器在重新启动NiFi后从其停止的位置恢复。此外，它允许处理器存储某些信息，以便处理器可以从集群中的所有不同节点访问该信息。这允许一个节点拾取另一个节点停止的位置，或者在集群中的所有节点之间进行协调。

### 配置状态提供程序

当组件决定存储或检索状态时，它通过提供"Scope(Local或者Cluster)"来实现。然后，基于此Scope以及配置的状态提供程序确定用于存储和检索此状态的机制。 _nifi.properties_ 文件包含有关配置：

**属性**| **描述**
-----|-----
`nifi.state.management.configuration.file` | 第一个是指定外部XML文件的属性，该文件用于配置本地或集群范围的状态提供程序(StateProvider)。此XML文件可能包含多个提供程序的配置
`nifi.state.management.provider.local`     | 提供此XML文件中配置的本地State Provider标识符的属性                          
`nifi.state.management.provider.cluster`   | 同样，该属性提供在此XML文件中配置的集群范围的State Provider的标识符。                                 

此XML文件由顶级`state-management`元素组成，该元素具有一个或多个`local-provider`零个或多个`cluster-provider` 元素。然后，这些元素中的每一个都包含一个`id`元素，用于指定可在 _nifi.properties_ 文件中引用的标识符， 以及一个`class`元素，该元素指定要用于实例化State Provider的完全限定类名。最后，这些元素中的每一个可以具有零个或多个`property`元素。每个`property`元素都有一个属性，`name`即`property`State Provider支持的名称。property元素的文本内容是属性的值。

在 _state-management.xml_ 文件(或配置的任何文件)中配置了这些状态提供程序后，这些提供程序可能会被其标识符引用。

默认情况下，本地状态提供程序配置为将`WriteAheadLocalStateProvider`数据持久保存到 `$NiFi_HOME/state/local`目录。默认的集群状态提供程序配置为 `ZooKeeperStateProvider`。默认的基于ZooKeeper的提供程序必须先`Connect String`填充其属性，然后才能使用它。如果多个NiFi实例将使用相同的ZooKeeper实例，则建议`Root Node`更改属性的值。例如，可以将值设置为 `/NiFi/<team name>/production`。A `Connect String`采用逗号分隔的`<host>:<port>`元组的形式，例如 `my-zk-server1:2181，my-zk-server2:2181，my-zk-server3:2181`。如果没有为任何主机指定端口，`2181`则假定为ZooKeeper默认值 。

向ZooKeeper添加数据时，Access Control有两个选项:`Open`和`CreatorOnly`。如果该`Access Control`属性设置为`Open`，则允许任何人登录ZooKeeper并拥有查看，更改，删除或管理数据的完全权限。如果`CreatorOnly`已指定，则仅允许创建数据的用户读取，更改，删除或管理数据。为了使用该`CreatorOnly`选项，NiFi必须提供某种形式的身份验证。有关 如何配置身份验证的详细信息，请参阅下面的[ZooKeeper访问控制](#ZooKeeper访问控制)部分。

如果NiFi配置为在独立模式下运行，则`cluster-provider`无需在 _state-management.xml_ 文件中填充该元素，如果填充它们，实际上将忽略该元素。但是，`local-provider`元素必须始终存在并填充。此外，如果NiFi在集群中运行，则每个节点还必须具有该`cluster-provider`元素并且已正确配置。否则，NiFi将无法启动。

虽然没有很多属性需要为这些提供程序配置，但它们被外部化为单独的 _state-management.xml_ 文件，而不是通过 _nifi.properties_ 文件进行配置，因为不同的实现可能需要不同的属性，并且它更容易维护和理解基于XML的文件中的配置，而不是将Provider的属性与所有其他NiFi框架特定的属性混合在一起。

应注意，如果处理器和其他组件使用集群作用域保存状态，则如果实例是独立实例(不在集群中)或与集群断开连接，则将使用本地状态提供程序。这也意味着如果将独立实例迁移为集群，则该状态将不再可用，因为该组件将开始使用集群状态提供程序而不是本地状态提供程序。

### 嵌入式ZooKeeper服务器(Embedded ZooKeeper Server)

如上所述，集群范围状态的默认状态提供程序是`ZooKeeperStateProvider`。在撰写本文时，这是唯一存在用于处理集群范围状态的状态提供程序。这意味着NiFi依赖于ZooKeeper以表现为集群。但是，在许多环境中，部署了NiFi，而没有维护现有的ZooKeeper集合。为了避免强迫管理员维护单独的ZooKeeper实例的负担，NiFi提供了启动嵌入式ZooKeeper服务器的选项。

**属性**                                                | **描述**
-----|-----              
`nifi.state.management.embedded.zookeeper.start`      | 指定此NiFi实例是否应运行嵌入式ZooKeeper服务器                                                      
`nifi.state.management.embedded.zookeeper.properties` | 如果`nifi.state.management.embedded.zookeeper.start`设置为，则提供要使用的ZooKeeper属性的属性文件`true`

这可以通过设置来实现`nifi.state.management.embedded.zookeeper.start`财产 _nifi.properties_ 到`true`应该运行嵌入式的ZooKeeper服务器的节点上。通常，建议在3或5个节点上运行ZooKeeper。在少于3个节点上运行可在遇到故障时提供较低的耐用性。在超过5个节点上运行通常会产生比必要更多的网络流量。此外，在4个节点上运行ZooKeeper提供的优势不比在3个节点上运行，ZooKeeper要求大多数节点处于活动状态才能运行。但是，由管理员决定最适合NiFi特定部署的节点数。

如果`nifi.state.management.embedded.zookeeper.start`属性设置为`true`，则  _nifi.properties_  中的`nifi.state.management.embedded.zookeeper.properties`属性也变得相关。这指定要使用的ZooKeeper属性文件。此属性文件至少需要填充ZooKeeper服务器列表。服务器被指定为的形式属性，以。每个服务器都配置为`<hostname>:<quorum port> `[:`<leader election port>`]。例如，。此节点列表应该是NiFi集群中具有属性设置的相同节点`server.1``server.2``server.n``myhost:2888:3888``nifi.state.management.embedded.zookeeper.start``true`。另请注意，由于ZooKeeper将侦听这些端口，因此可能需要将防火墙配置为打开这些端口以用于传入流量，至少在集群中的节点之间。此外，必须在防火墙中打开侦听客户端连接的端口。默认值为，`2181`但可以通过_zookeeper.properties_文件中的_clientPort_属性进行配置。

使用嵌入式ZooKeeper时，。/ _conf / zookeeper.properties_文件具有名为的属性`dataDir`。默认情况下，此值设置为`./state/zookeeper`。如果多个NiFi节点正在运行嵌入式ZooKeeper，则告诉服务器它是哪一个非常重要。这是通过创建名为_myid_的文件 并将其放在ZooKeeper的数据目录中来完成的。此文件的内容应该是特定于服务器的索引`server.<number>`。因此，对于其中一个ZooKeeper服务器，我们将通过执行以下命令来完成此任务:

```
cd $NiFi_HOMEmkdir statemkdir state/zookeeperecho 1 > state/zookeeper/myid
```

对于将运行ZooKeeper的下一个NiFi节点，我们可以通过执行以下命令来实现此目的:

```
cd $NiFi_HOMEmkdir statemkdir state/zookeeperecho 2 > state/zookeeper/myid
```

等等。

有关用于管理ZooKeeper的属性的更多信息，请参阅 [ZooKeeper管理员指南](https://zookeeper.apache.org/doc/current/zookeeperAdmin.html)。

有关保护嵌入式ZooKeeper服务器的信息，请参阅下面的[ZooKeeper安全](#ZooKeeper安全)部分。

### ZooKeeper访问控制
ZooKeeper通过访问控制列表(ACL)机制为其数据提供访问控制。当数据写入ZooKeeper时，NiFi将提供一个ACL，指示允许任何用户拥有对数据的完全权限，或者提供一个ACL，指示只允许创建数据的用户访问数据。使用哪个ACL取决于该`Access Control`属性的值`ZooKeeperStateProvider`(有关详细信息，请参阅[配置状态提供程序](#配置状态提供程序)部分)。

为了使用指示只允许Creator访问数据的ACL，我们需要告诉ZooKeeper创建者是谁。有两种机制可以实现这一目标。第一种机制是使用Kerberos提供身份验证。有关更多信息，请参阅[Kerberizing NiFi的ZooKeeper客户端](#Kerberizing NiFi的ZooKeeper客户端)。

第二个选项是使用用户名和密码。这是通过为其指定值`Username`和`Password`属性值来配置的`ZooKeeperStateProvider`(有关详细信息，请参阅" [配置状态提供程序"](#配置状态提供程序)部分)。不过，要记住的重要一点是ZooKeeper会以纯文本传递密码。这意味着不应使用用户名和密码，除非ZooKeeper在localhost上作为单实例集群运行，或者与ZooKeeper的通信仅在加密通信(例如VPN或SSL连接)上发生。ZooKeeper将在3.5.0版本中为SSL连接提供支持。

### ZooKeeper安全

当NiFi与ZooKeeper通信时，默认情况下，所有通信都是不安全的，登录ZooKeeper的任何人都可以查看和操作存储在ZooKeeper中的所有NiFi状态。为了防止这种情况，我们可以使用Kerberos来管理身份验证。目前，ZooKeeper不支持通过SSL加密。正在积极开发对ZooKeeper中的SSL的支持，预计将在3.5.0发行版中提供。

为了保护通信安全，我们需要确保客户端和服务器都支持相同的配置。下面提供了配置NiFi ZooKeeper客户端和嵌入式ZooKeeper服务器以使用Kerberos的说明。

如果你的环境中尚未设置Kerberos，则可以在[Red Hat客户门户](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Managing_Smart_Cards/Configuring_a_Kerberos_5_Server.html)上找到有关安装和设置Kerberos服务器的信息 [:配置Kerberos 5服务器](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Managing_Smart_Cards/Configuring_a_Kerberos_5_Server.html)。本指南假定Kerberos已经安装在运行NiFi的环境中。

请注意，以下用于在NiFi节点中对嵌入式ZooKeeper服务器进行kerberizing并对ZooKeeper NiFi客户端进行kerberizing的过程将要求安装Kerberos客户端库。这是通过以下方式在基于Fedora的Linux发行版中完成的:

```
yum install krb5-workstation
```

完成后，需要为组织的Kerberos环境正确配置_/etc/krb5.conf_。

#### Kerberizing嵌入式ZooKeeper服务器

所述_的krb5.conf_上具有嵌入的动物园管理员服务器系统文件应该是相同的，其中krb5kdc服务运行在系统上的一个。使用嵌入式ZooKeeper服务器时，我们可能会选择使用Kerberos来保护服务器。配置为启动嵌入式ZooKeeper并使用Kerberos的所有节点都应遵循以下步骤。使用嵌入式ZooKeeper服务器时，我们可能会选择使用Kerberos来保护服务器。配置为启动嵌入式ZooKeeper并使用Kerberos的所有节点都应遵循以下步骤。

为了使用Kerberos，我们首先需要为ZooKeeper服务器生成Kerberos Principal。在运行krb5kdc服务的服务器上运行以下命令。这是通过kadmin工具完成的:

```
kadmin: addprinc "zookeeper/myHost.example.com@EXAMPLE.COM"
```

在这里，我们`zookeeper/myHost.example.com`使用领域创建一个主要的Principal `EXAMPLE.COM`。我们需要使用名称为的Principal `<service name>/<instance name>`。在这种情况下，服务是`zookeeper`，实例名称是`myHost.example.com`(我们的主机的完全限定名称)。

接下来，我们需要为此Principal创建一个KeyTab，此命令在具有嵌入式zookeeper服务器的NiFi实例的服务器上运行:

```
kadmin: xst -k zookeeper-server.keytab zookeeper/myHost.example.com@EXAMPLE.COM
```

这将在当前目录中创建一个名为的文件`zookeeper-server.keytab`。我们现在可以将该文件复制到`$NiFi_HOME/conf/`目录中。我们应该确保只允许运行NiFi的用户读取该文件。

我们需要重复每个NiFi的情况下，上述步骤将运行嵌入式的ZooKeeper服务器，请务必更换`myHost.example.com`同`myHost2.example.com`，或任何完全合格的主机名的ZooKeeper服务器将运行。

现在我们已经为每个将运行NiFi的服务器提供了KeyTab，我们需要配置NiFi的嵌入式ZooKeeper服务器才能使用此配置。ZooKeeper使用Java身份验证和授权服务(JAAS)，因此我们需要创建一个与JAAS兼容的文件在`$NiFi_HOME/conf/`目录中，创建一个名为_zookeeper-jaas.conf的_文件(如果客户端已配置为进行身份验证，则此文件已存在通过Kerberos。没关系，只需添加到文件中)。我们将添加到此文件，以下代码段:

```
Server {  com.sun.security.auth.module.Krb5LoginModule required  useKeyTab=true  keyTab="./conf/zookeeper-server.keytab"  storeKey=true  useTicketCache=false  principal="zookeeper/myHost.example.com@EXAMPLE.COM";};
```

请务必`principal`使用适当的Principal 替换上面的值，包括服务器的完全限定域名。

接下来，我们需要告诉NiFi使用它作为我们的JAAS配置。这是通过设置JVM系统属性来完成的，因此我们将编辑_conf / bootstrap.conf_文件。如果客户端已配置为使用Kerberos，则不需要这样做，如上所述。否则，我们将以下行添加到_bootstrap.conf_文件中:

```
java.arg.15=-Djava.security.auth.login.config=./conf/zookeeper-jaas.conf
```

![](./image/general/i.png)文件中的这一附加行不必是15号，只需将其添加到_bootstrap.conf_文件中即可。使用适合你的配置的任何数字。

我们希望通过运行以下命令来初始化我们的Kerberos票证:

```
kinit –kt zookeeper-server.keytab "zookeeper/myHost.example.com@EXAMPLE.COM"
```

同样，请务必使用适当的值替换Principal，包括你的领域和完全限定的主机名。

最后，我们需要告诉Kerberos服务器使用SASL身份验证提供程序。为此，我们编辑_$ NiFi_HOME / conf / zookeeper.properties_文件并添加以下行:

```
authProvider.1=org.apache.zookeeper.server.auth.SASLAuthenticationProviderkerberos.removeHostFromPrincipal=truekerberos.removeRealmFromPrincipal=truejaasLoginRenew=3600000requireClientAuthScheme=sasl
```

的`kerberos.removeHostFromPrincipal`和`kerberos.removeRealmFromPrincipal`特性被用来标识进行比较来施加在Z序节点的ACL之前归一化所述用户主要名称。默认情况下，全部本金用来然而设置`kerberos.removeHostFromPrincipal`和`kerberos.removeRealmFromPrincipal`属性为true，将指示动物园管理员删除的主机和登录用户的身份进行比较的境界。在NiFi节点(在同一集群内)使用具有不同主机/域值的主体的情况下，可以配置这些kerberos属性以确保节点的标识将被标准化并且节点将具有适当的访问Zookeeper中的共享Znodes。

最后一行是可选的，但指定客户端必须使用Kerberos与我们的ZooKeeper实例进行通信。

现在，我们可以启动NiFi，嵌入式ZooKeeper服务器将使用Kerberos作为身份验证机制。

Kerberizing NiFi的ZooKeeper客户端

![](./image/general/i.png)运行嵌入式zookeeper服务器的NiFi节点也需要遵循以下过程，因为它们也将同时充当客户端。

使用ZooKeeper验证用户的首选机制是使用Kerberos。为了使用Kerberos进行身份验证，我们必须配置一些系统属性，以便ZooKeeper客户端知道用户是谁以及KeyTab文件所在的位置。配置为使用`ZooKeeperStateProvider`和使用Kerberos 存储集群范围状态的所有节点都应遵循以下步骤。

首先，我们必须创建在与ZooKeeper通信时使用的Principal。这通常通过`kadmin`工具完成:

```
kadmin: addprinc "NiFi@EXAMPLE.COM"
```

Kerberos Principal由三部分组成:主要部分，实例和领域。在这里，我们正在创建一个具有主要`NiFi`，无实例和领域的Principal `EXAMPLE.COM`。主要(`NiFi`在本例中)是在通过Kerberos进行身份验证时用于标识用户的标识符。

在我们创建了Principal后，我们需要为Principal创建一个KeyTab:

```
kadmin: xst -k nifi.keytab NiFi@EXAMPLE.COM
```

可以将此密钥表文件复制到具有嵌入式zookeeper服务器的其他NiFi节点。

这将在名为_nifi.keytab_的当前目录中创建一个文件。我们现在可以将该文件复制到`$NiFi_HOME/conf/`目录中。我们应该确保只允许运行NiFi的用户读取该文件。

接下来，我们需要配置NiFi以使用此KeyTab进行身份验证。由于ZooKeeper使用Java身份验证和授权服务(JAAS)，因此我们需要创建一个与JAAS兼容的文件。在`$NiFi_HOME/conf/`目录中，创建一个名为_zookeeper-jaas.conf_的文件，并在其中添加以下代码段:

```
Client {  com.sun.security.auth.module.Krb5LoginModule required  useKeyTab=true  keyTab="./conf/nifi.keytab"  storeKey=true  useTicketCache=false  principal="NiFi@EXAMPLE.COM";};
```

然后我们需要告诉NiFi使用它作为我们的JAAS配置。这是通过设置JVM系统属性来完成的，因此我们将编辑_conf / bootstrap.conf_文件。我们在此文件中的任何位置添加以下行，以告知NiFi JVM使用此配置:

```
java.arg.15=-Djava.security.auth.login.config=./conf/zookeeper-jaas.conf
```

最后，我们需要更新_nifi.properties，_以确保NiFi知道为它将在Zookeeper中创建的用于集群管理的Znodes应用SASL特定的ACL。要启用此功能，请在_$ NiFi_HOME / conf / nifi.properties_文件中编辑以下属性，如下所示:

```
nifi.zookeeper.auth.type=saslnifi.zookeeper.kerberos.removeHostFromPrincipal=truenifi.zookeeper.kerberos.removeRealmFromPrincipal=true
```

![](./image/general/i.png)该`kerberos.removeHostFromPrincipal`和`kerberos.removeRealmFromPrincipal`应与什么是在动物园管理员的配置设置是一致的。

我们可以通过运行以下命令来初始化我们的Kerberos票证:

```
kinit -kt nifi.keytab NiFi@EXAMPLE.COM
```

现在，当我们启动NiFi时，它将使用Kerberos `NiFi`在与ZooKeeper通信时作为用户进行身份验证。

Kerberos配置疑难解答

使用Kerberos时，导入使用完全限定的域名而不使用_localhost_。请确保在以下位置使用每个服务器的完全限定主机名:

* _的conf / zookeeper.properties_文件应该使用的FQDN `server.1`，`server.2`...，`server.N`值。

* `Connect String`ZooKeeperStateProvider 的属性

* 在_/ etc / hosts中_的文件也应FQDN解析为是一个IP地址**不是** `127.0.0.1`。

如果不这样做，可能会导致类似以下错误:
```
2016-01-08 16:08:57，888 ERROR [pool-26-thread-1-SendThread(localhost:2181)] o.a.zookeeper.client.ZooKeeperSaslClient An error:(java.security.PrivilegedActionException: javax.security.sasl.SaslException: GSS initiate failed [Caused by GSSException: No valid credentials provided(Mechanism level: Server not found in Kerberos database(7) - LOOKING_UP_SERVER)]) occurred when evaluating Zookeeper Quorum Member's  received SASL token. Zookeeper Client will go to AUTH_FAILED state.
```

如果在使用Kerberos进行通信或身份验证时出现问题，则本 [故障排除指南](http://docs.oracle.com/javase/7/docs/technotes/guides/security/jgss/tutorials/Troubleshooting.html)可能很有用。

上述故障排除指南中最重要的注意事项之一是为Kerberos启用调试输出的机制。这是通过设置`sun.security.krb5.debug`环境变量来完成的。在NiFi中，这可以通过在_$ NiFi_HOME / conf / bootstrap.conf_文件中添加以下行来实现:

```
java.arg.16=-Dsun.security.krb5.debug=true
```

这将导致调试输出写入NiFi Bootstrap日志文件。默认情况下，它位于_$ NiFi_HOME / logs / NiFi-bootstrap.log中_。此输出可能相当冗长，但为解决Kerberos故障提供了极有价值的信息。

### ZooKeeper Migrator

你可以使用该`zk-migrator`工具执行以下任务:

* 将ZooKeeper信息从一个ZooKeeper集群移动到另一个集群

* 迁移ZooKeeper节点所有权

例如，你可能希望在以下情况下使用ZooKeeper Migrator:

* 从NiFi 0.x升级到使用嵌入式ZooKeeper的NiFi 1.x.

* 从NiFi 0.x或1.x中的嵌入式ZooKeeper迁移到外部ZooKeeper

* 使用外部ZooKeeper从NiFi 0.x升级到NiFi 1.x，使用相同的外部ZooKeeper

* 从外部ZooKeeper迁移到NiFi 1.x中的嵌入式ZooKeeper

有关更多信息，请参阅[NiFi工具包指南中](http://nifi.apache.org/docs/NiFi-docs/html/toolkit-guide.html)的[Zookeeper Migrator](http://nifi.apache.org/docs/NiFi-docs/html/toolkit-guide.html#zookeeper_migrator)部分。

## Bootstrap属性(Bootstrap Properties)

`conf`目录中的 _bootstrap.conf_  文件允许用户配置应如何启动NiFi。例如可以设置Java堆的大小，要运行的Java命令以及Java系统属性等等。

只有重启NiFi，对此文件的更改才会生效。

**属性**                             | **描述**
-----|----------                                                    
java                             | 指定要运行的java命令。默认情况下，它的值只是简单java，但可以将其更改为绝对路径或引用环境变量，例如$JAVA_HOME/bin/java                                                                                                                                    
run.as                           | 指定运行NiFi的用户名。例如，如果NiFi应作为NiFi用户运行，则将此值设置为NiFi将导致NiFi Process作为NiFi用户运行。在Windows上忽略此属性。对于Linux，指定的用户需要sudo权限。                                                                                             
lib.dir                          | 用于NiFi 的 _lib_ 目录。默认情况下，默认设置为 ./lib                                                                                                                                                                               
conf.dir                         | 用于NiFi 的 _conf_ 目录。默认情况下，默认设置为 ./conf                                                                                                                                                                             
graceful.shutdown.seconds        | 当NiFi要关闭时，Bootstrap将等待这个秒数，以便能够干净的关闭进程。过了这段时间，如果NiFi仍在运行，则Bootstrap将kill该进程。                                                                                                                       
java.arg.N                       | 启动进程时，可以将任意数量的JVM参数传递给NiFi JVM。这些参数是通过向以 _bootstrap.conf_ 中以添加java.arg.开头的属性来定义的。属性名的其余部分不相关，只是为了区分属性名，将被忽略。默认值包括最小和最大Java堆的属性，要使用的垃圾收集器等。                                                                    
notification.services.file       | 当NiFi启动或停止时，或当Bootstrap检测到NiFi已经死亡时，Bootstrap能够向相关方发送通知。这是通过指定可以使用哪些通知服务的XML文件来配置的。有关此文件的更多信息，请参阅[通知服务](#通知服务)部分。
notification.max.attempts        | 如果配置了此属性为n，当通知服务但无法执行其功能，它将再次尝试n次。此属性配置最大尝试次数。默认值为5。                                                                                                                                                             
nifi.start.notification.services | 此属性是以逗号分隔的通知服务标识符列表，这些标识符对应于notification.services.file属性中定义的Notification Services 。具有指定标识符的服务将用于在启动NiFi时通知其配置的收件人。                                                                                            
nifi.stop.notification.services  | 此属性是以逗号分隔的通知服务标识符列表，这些标识符对应于notification.services.file属性中定义的Notification Services 。每当NiFi停止时，具有指定标识符的服务将用于通知其配置的收件人。                                                                                          
nifi.died.notification.services  | 此属性是以逗号分隔的通知服务标识符列表，这些标识符对应于notification.services.file属性中定义的Notification Services 。如果引导程序确定NiFi意外死亡，则具有指定标识符的服务将用于通知其配置的收件人。                                                                                  

## 通知服务

当NiFi引导程序启动或停止NiFi，或检测到它已意外死亡时，它能够通知已配置的收件人。目前，提供的唯一机制是发送电子邮件或HTTP POST通知。通知服务配置文件是一个XML文件，其中配置了通知功能。

XML文件的默认位置是 _conf/bootstrap-notification-services.xml_，但可以�� _conf/bootstrap.conf_ 文件中更改此值。

XML文件的语法如下:

```xml
<services>
    <!-- any number of service elements can be defined. -->
    <service>
        <id>some-identifier</id>
        <!-- The fully-qualified class name of the Notification Service. -->
        <class>org.apache.nifi.bootstrap.notification.email.EmailNotificationService</class>

        <!-- Any number of properties can be set using this syntax.
             The properties available depend on the Notification Service. -->
        <property name="Property Name 1">Property Value</property>
        <property name="Another Property Name">Property Value 2</property>
    </service>
</services>
```

一旦配置了所需的服务，就可以在_bootstrap.conf_文件中引用它们。

### 电子邮件通知服务

第一个通知程序是发送电子邮件，实现是`org.apache.nifi.bootstrap.notification.email.EmailNotificationService`。它具有以下属性:


**属性**                 | **需要** | **描述**
-----|-----|-----                                   
`SMTP Hostname`        | true   | 用于发送电子邮件通知的SMTP服务器的主机名                          
`SMTP Port`            | true   | 用于SMTP通信的端口                                     
`SMTP Username`        | true   | SMTP帐户的用户名                                      
`SMTP Password`        |        | SMTP帐户的密码                                       
`SMTP Auth`            |        | 指示是否应使用身份验证的标志                                  
`SMTP TLS`             |        | 指示是否应启用TLS的标志                                   
`SMTP Socket Factory`  |        | `javax.net.ssl.SSLSocketFactory`                
`SMTP X-Mailer Header` |        | X-Mailer用于传出电子邮件的标题中                            
`Content Type`         |        | Mime类型用于解释电子邮件的内容，例如`text/plain`或`text/html`    
`From`                 | true   | 指定用作发件人的电子邮件地址。否则，"友好名称"可用作"发件人"地址，但该值必须用双引号括起来。
`To`                   |        | 收件人要包含在电子邮件的"收件人"行中                             
`CC`                   |        | 收件人包含在电子邮件的CC-Line中                             
`BCC`                  |        | 收件人包含在电子邮件的BCC-Line中                            

除了上面所述的属性标记为需要，的至少一种`To`，`CC`或`BCC`属性必须被设置。

配置电子邮件服务的完整示例如下所示:

```xml
     <service>
        <id>email-notification</id>
        <class>org.apache.nifi.bootstrap.notification.email.EmailNotificationService</class>
        <property name="SMTP Hostname">smtp.gmail.com</property>
        <property name="SMTP Port">587</property>
        <property name="SMTP Username">username@gmail.com</property>
        <property name="SMTP Password">super-secret-password</property>
        <property name="SMTP TLS">true</property>
        <property name="From">"NiFi Service Notifier"</property>
        <property name="To">username@gmail.com</property>
     </service>
```

### HTTP通知服务

第二个通告程序是发送HTTP POST请求，实现是`org.apache.nifi.bootstrap.notification.http.HttpNotificationService`。它具有以下属性:

**属性**                | **必填** | **描述**
-----|-----|-----               
`URL`                 | true   | 发送通知的URL。支持表达式语言。                             
`Connection timeout`  |        | 连接远程服务的最长等待时间。支持表达式语言。默认为`10s`。               
`Write timeout`       |        | 远程服务读取发送请求的最长等待时间。支持表达式语言。默认为`10s`。           
`Truststore Filename` |        | Truststore的完全限定文件名                            
`Truststore Type`     |        | 信任库的类型。无论是`JKS`或`PKCS12`                      
`Truststore Password` |        | Truststore的密码                                 
`Keystore Filename`   |        | Keystore的完全限定文件名                              
`Keystore Type`       |        | 密钥库的密码                                        
`Keystore Password`   |        | 密钥的密码。如果未指定，但指定了密钥库文件名，密码和类型，则将假定密钥库密码与密钥密码相同。
`SSL Protocol`        |        | 用于此SSL上下文的算法。这可以是`SSL`或`TLS`。                 

除上述属性外，还可以添加动态属性。它们将作为标头添加到HTTP请求中。支持表达式语言。

通知消息位于POST请求的正文中。通知的类型位于标题"notification.type"中，主题使用标题"notification.subject"。

配置HTTP服务的完整示例如下所示:

```xml
     <service>
        <id>http-notification</id>
        <class>org.apache.nifi.bootstrap.notification.http.HttpNotificationService</class>
        <property name="URL">https://testServer.com:8080/</property>
        <property name="Truststore Filename">localhost-ts.jks</property>
        <property name="Truststore Type">JKS</property>
        <property name="Truststore Password">localtest<property>
        <property name="Keystore Filename">localhost-ts.jks</property>
        <property name="Keystore Type">JKS</property>
        <property name="Keystore Password">localtest</property>
        <property name="notification.timestamp">${now()}</property>
     </service>
```

## 代理配置

在代理后面运行Apache NiFi时，在部署期间需要注意几个关键项。

* NiFi由许多Web应用程序(Web UI，Web API，文档，自定义UI，数据查看器等)组成，因此需要为**根路径**配置映射。这样，所有上下文路径都相应地传递。例如，如果仅`/NiFi`映射了上下文路径，则UpdateAttribute的自定义UI将不起作用，因为它可用于`/update-attribute-ui-<version>`。

* NiFi的REST API将为图表上的每个组件生成URI。由于请求是通过代理发出的，因此需要覆盖生成的URI的某些元素。如果不覆盖，用户将能够在画布上查看数据流，但无法修改现有组件。请求将尝试直接回拨给NiFi，而不是通过代理。当代理生成对NiFi实例的HTTP请求时，可以通过添加以下HTTP标头来覆盖URI的元素:

```
X-ProxyScheme - the scheme to use to connect to the proxy
X-ProxyHost - the host of the proxy
X-ProxyPort - the port the proxy is listening on
X-ProxyContextPath - the path configured to map to the NiFi instance
```

* 如果NiFi安全运行，则需要授权任何代理来代理用户请求。这些可以通过全局菜单在NiFi UI中配置。一旦这些权限到位，代理就可以开始代理用户请求。必须在HTTP标头中中继最终用户标识。例如，如果最终用户向代理发送了请求，则代理必须对用户进行身份验证。在此之后，代理可以将请求发送到NiFi。在此请求中，应添加HTTP标头，如下所示。

```
X-ProxiedEntitiesChain:<end-user-identity>
```

如果代理配置为发送到另一个代理，则来自第二个代理的对NiFi的请求应包含如下标头。

```
X-ProxiedEntitiesChain:<end-user-identity> <proxy-1-identity>
```

设置所需属性的示例Apache代理配置可能如下所示。完整的代理配置超出了本文档的范围。有关部署环境和用例的指导，请参阅代理文档。

```xml
...
<Location "/my-NiFi">
    ...
	SSLEngine On
	SSLCertificateFile /path/to/proxy/certificate.crt
	SSLCertificateKeyFile /path/to/proxy/key.key
	SSLCACertificateFile /path/to/ca/certificate.crt
	SSLVerifyClient require
	RequestHeader add X-ProxyScheme "https"
	RequestHeader add X-ProxyHost "proxy-host"
	RequestHeader add X-ProxyPort "443"
	RequestHeader add X-ProxyContextPath "/my-NiFi"
	RequestHeader add X-ProxiedEntitiesChain "<%{SSL_CLIENT_S_DN}>"
	ProxyPass https://NiFi-host:8443
	ProxyPassReverse https://NiFi-host:8443
	...
</Location>
...
```

* 必须更新其他NiFi代理配置，以允许预期的主机和上下文路径HTTP标头。
    * 默认情况下，如果NiFi安全运行，它将仅接受具有与其绑定的主机[:port]匹配的主机头的HTTP请求。如果NiFi接受指向不同主机[:port]的请求，则需要配置预期值。在代理服务器后面运行或在容器化环境中运行时可能需要这样做。这是使用属性(例如)在 _nifi.properties_ 中以逗号分隔的列表配置的。接受IPv6地址。有关其他详细信息，请参阅RFC 5952第[4](https://tools.ietf.org/html/rfc5952#section-4)节和第[6](https://tools.ietf.org/html/rfc5952#section-6)节。`nifi.web.proxy.host``localhost:18443， proxyhost:443`

    * 如果该值`nifi.web.proxy.context.path`在 _nifi.properties_ 中的属性中 列入白名单，则NiFi将仅接受带有X-ProxyContextPath，X-Forwarded-Context或X-Forwarded-Prefix标头的HTTP请求。此属性接受以逗号分隔的预期值列表。如果传入请求具有白名单中不存在的X-ProxyContextPath，X-Forwarded-Context或X-Forwarded-Prefix标头值，则会显示"发生意外错误"页面，并且将显示错误写入_NiFi-app.log_。

* 需要在代理服务器和NiFi集群上进行其他配置，以使NiFi站点到站点在反向代理后面工作。有关详细信息，请参阅[反向代理的站点到站点路由属性](#反向代理的站点到站点路由属性)。
    * 为了通过反向代理通过站点到站点协议传输数据，代理和站点到站点客户端NiFi用户都需要具有以下策略，"检索站点到站点的详细信息"，"通过站点接收数据"到-site'用于输入端口，'通过站点到站点发送数据'用于输出端口。

## Kerberos服务(Kerberos Service)

可以将NiFi配置为使用Kerberos SPNEGO(或"Kerberos服务")进行身份验证。在这种情况下，用户将点击REST端点`/access/kerberos`，服务器将使用`401`状态代码和质询响应标头进行响应`WWW-Authenticate: Negotiate`。这将与浏览器通信以使用GSS-API并加载用户的Kerberos票证，并在后续请求中将其作为Base64编码的标头值提供。它将是形式`Authorization: Negotiate YII…​`。NiFi将尝试使用KDC验证此票证。如果成功，则为用户的_主体_将作为标识返回，并且流将遵循登录/凭证认证，因为将在响应中发出JWT以防止在每个后续请求上进行Kerberos身份验证的不必要开销。如果无法验证故障单，它将返回相应的错误响应代码。然后，如果`KerberosLoginIdentityProvider`已配置，则用户将能够将其Kerberos凭据提供给登录表单。有关详细信息，请参阅[Kerberos](#Kerberos)登录标识提供程序。

NiFi只会通过HTTPS连接响应Kerberos SPNEGO协商，因为不安全的请求永远不会被验证。

必须在  _nifi.properties_  中设置以下属性才能启用Kerberos服务身份验证。


**属性**              | **必需** | **描述**   
-----|-----|-----         
`Service Principal` | true   | NiFi用于与KDC通信的服务主体 
`Keytab Location`   | true   | 包含服务主体的keytab的文件路径

有关完整文档，请参阅[Kerberos属性](#Kerberos属性)。

### 注意事项

* Kerberos在许多地方都是区分大小写的，并且错误消息(或缺少错误消息)可能没有充分解释。检查配置文件中服务主体的区分大小写。公约是`HTTP/fully.qualified.domain@REALM`。

* 在处理SPNEGO谈判时，浏览器有不同程度的限制。有些会向请求它的任何域提供本地Kerberos票证，而其他域会将受信任域列入白名单。请参阅[Spring Security Kerberos - 参考文档:附录E.](http://docs.spring.io/autorepo/docs/spring-security-kerberos/1.0.2.BUILD-SNAPSHOT/reference/htmlsingle/#browserspnegoconfig)为常见浏览器[配置SPNEGO协商](http://docs.spring.io/autorepo/docs/spring-security-kerberos/1.0.2.BUILD-SNAPSHOT/reference/htmlsingle/#browserspnegoconfig)的浏览器。

* 某些浏览器(传统IE)不支持最近的加密算法(如AES)，并且仅限于传统算法(DES)。生成keytabs时应注意这一点。

* 必须配置KDC并为NiFi定义服务主体并导出密钥表。有关Kerberos服务器配置和管理的综合说明超出了本文档的范围(请参阅[MIT Kerberos管理员指南](http://web.mit.edu/kerberos/krb5-current/doc/admin/index.html))，但示例如下:

在服务器上添加服务主体`nifi.nifi.apache.org`并从KDC导出keytab:

```
root@kdc:/etc/krb5kdc# kadmin.local
Authenticating as principal admin/admin@nifi.APACHE.ORG with password.
kadmin.local:  listprincs
K/M@nifi.APACHE.ORG
admin/admin@nifi.APACHE.ORG
...
kadmin.local:  addprinc -randkey HTTP/nifi.nifi.apache.org
WARNING: no policy specified for HTTP/nifi.nifi.apache.org@nifi.APACHE.ORG; defaulting to no policy
Principal "HTTP/nifi.nifi.apache.org@nifi.APACHE.ORG" created.
kadmin.local:  ktadd -k /http-nifi.keytab HTTP/nifi.nifi.apache.org
Entry for principal HTTP/nifi.nifi.apache.org with kvno 2， encryption type des3-cbc-sha1 added to keytab WRFILE:/http-nifi.keytab.
Entry for principal HTTP/nifi.nifi.apache.org with kvno 2， encryption type des-cbc-crc added to keytab WRFILE:/http-nifi.keytab.
kadmin.local:  listprincs
HTTP/nifi.nifi.apache.org@nifi.APACHE.ORG
K/M@nifi.APACHE.ORG
admin/admin@nifi.APACHE.ORG
...
kadmin.local: q
root@kdc:~# ll /http*
-rw------- 1 root root 162 Mar 14 21:43 /http-nifi.keytab
root@kdc:~#
```

## 系统属性(System Properties)

`conf`目录中的 _nifi.properties_ 文件是用于控制NiFi运行方式的主要配置文件。本节概述了此文件中的属性，并包含有关如何以便于升级的方式对其进行配置的一些注意事项。**更改此文件后，重新启动NiFi以使更改生效。**
              
![](./image/general/i.png)此文件的内容相对稳定，但会不时更改。升级时查看此文件始终是个好主意，并注意任何更改。考虑使用星号(*)配置下面的项目，以便更容易升级。有关详细信息，请参阅本节末尾有关升级的完整讨论。请注意，时间段和数据大小的值必须包括度量单位，例如"10 secs"或"10 MB"，而不仅仅是"10"。

### 核心属性

_nifi.properties_ 文件的第一部分是核心属性。这些属性适用于核心框架。

**属性**                                              | **描述**
-----|-----
`nifi.flow.configuration.file`\*                    | 流配置文件的位置(即包含当前在NiFi图上显示的内容的文件)。默认值为`./conf/flow.xml.gz`。
`nifi.flow.configuration.archive.enabled`\*         | 指定NiFi是否在更新流时自动创建流的备份副本。默认值为`true`。
`nifi.flow.configuration.archive.dir`\*             | 存档目录的位置，其中保存了 _flow.xml_ 的备份副本。默认值为`./conf/archive`。NiFi根据归档文件的生命周期，总大小和文件数删除旧的存档文件，以限制磁盘使用。分别使用`nifi.flow.configuration.archive.max.time`，`max.storage`和`max.count`属性指定生命周期，总大小和文件数。如果未指定归档的这些限制，则NiFi使用默认条件，即`30 days`max.time和`500 MB`max.storage。此清理机制仅考虑自动创建的归档 _flow.xml_ 文件。如果此存档目录中有其他文件或目录，NiFi将忽略它们。自动创建的存档具有带ISO 8601格式时间戳前缀的文件名，后跟`<original-filename>`。即`<year><month><day>T<hour><minute><second>+<timezone offset>_<original filename>`。例如，`20160706T160719+0900_flow.xml.gz`。NiFi在清理存档目录时会检查文件名。如果你想在此目录中保留特定存档而不必担心NiFi删除它，你可以通过使用不同的文件名模式复制它。
`nifi.flow.configuration.archive.max.time`\*        | 归档的_flow.xml_文件的生命周期。如果指定了此属性，NiFi将在更新 _flow.xml_ 时删除过期的归档文件。到期时间取决于当前系统时间和已归档 _flow.xml_ 的上次修改时间戳。如果在 _nifi.properties_ 中未指定存档限制，则NiFi将删除早于`30 days`的存档。                                                                                                                                                                                                                                                                                                                                                                                           
`nifi.flow.configuration.archive.max.storage`\*     | 存档的 _flow.xml_ 文件允许的总数据大小。如果指定了此属性，NiFi将删除最早的归档文件，直到总归档文件大小小于此配置值。如果在 _nifi.properties_ 中未指定存档限制，则NiFi会使用`500 MB`此限制。                                                                                                                                                                                                                                                                                                                                                                                                                               
`nifi.flow.configuration.archive.max.count`\*       | 允许的归档文件数。如果指定了此属性，NiFi将删除最旧的存档文件，以便只保留N个最新存档。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
`nifi.flowcontroller.autoResumeState`               | 指示重新启动时NiFi上的组件是否应返回重启之前的状态。默认值为`true`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
`nifi.flowcontroller.graceful.shutdown.period`      | 表示关机时间。默认值为`10 secs`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
`nifi.flowservice.writedelay.interval`              | 当对 _flow.xml_ 进行许多更改时，此属性指定在写出更改之前等待的时间，以便批量写入。默认值为`500 ms`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
`nifi.administrative.yield.duration`                | 如果一个组件允许一个意外的异常被转义，那么它就被认为是一个bug。因此，框架将暂停(或在管理上放弃)组件这段时间。这样做是为了使组件不会因为已知在现有状态下存在的问题而消耗大量的系统资源。默认值为`30 secs`。                                                                                                                                                                                                                                                                                                                                                                                                                                              
`nifi.bored.yield.duration`                         | 当一个组件没有工作要做(即无聊)时，这是它在检查是否有新数据要工作之前等待的时间。这样，它不会过多地检查新工作而耗尽CPU资源。设置此属性时，请注意它可能会为不经常工作的组件添加额外的延迟，因为一旦进入这种无聊状态，他们将等待这段时间后再检查更多工作。默认值为`10 ms`。                                                                                                                                                                                                                                                                                                                                                                                                 
`nifi.queue.backpressure.count`                     | 在两个组件之间绘制新连接时，这是该连接的背压对象阈值的默认值。默认值为`10000`，且值必须为整数。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
`nifi.queue.backpressure.size`                      | 在两个组件之间绘制新连接时，这是该连接的背压数据大小阈值的默认值。默认值为`1 GB`，值必须是包含度量单位的数据大小。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
`nifi.authorizer.configuration.file`\*              | 这是指定如何定义授权程序的文件的位置。默认值为`./conf/authorizers.xml`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
`nifi.login.identity.provider.configuration.file`\* | 这是指定如何执行用户名/密码身份验证的文件的位置。仅在`nifi.security.user.login.identity.provider`配置了提供者标识符时才考虑此文件。默认值为`./conf/login-identity-providers.xml`。                                                                                                                                                                                                                                                                                                                                                                                                              
`nifi.templates.directory`\*                        | 这是保存流模板的目录的位置(仅用于向后兼容)。模板存储在 _flow.xml.gz_ 中，从NiFi 1.0开始。模板目录可用于在NiFi启动时自动(批量)将模板导入到 _flow.xml.gz_ 中。默认值为`./conf/templates`。                                                                                                                                                                                                                                                                                                                                                                                                                        
`nifi.ui.banner.text`                               | 这是横幅文本，可配置为显示在用户界面的顶部。默认为空白。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
`nifi.ui.autorefresh.interval`                      | 用户界面自动刷新的时间间隔。默认值为`30 secs`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
`nifi.nar.library.directory`                        | nar库的位置。默认值是`./lib`，可保持原样。**注意**：可以使用`nifi.nar.library.directory.`带有唯一后缀的前缀和单独的路径作为值来指定其他库目录。例如，要提供两个额外的库位置，用户还可以使用以下键指定其他属性：`nifi.nar.library.directory.lib1=/nars/lib1``nifi.nar.library.directory.lib2=/nars/lib2`  提供三个总位置，包括 `nifi.nar.library.directory`。                                                                                                                                                                                                                                                                    
`nifi.nar.working.directory`                        | nar工作目录的位置。默认值是`./work/nar`，可保持原样。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
`nifi.documentation.working.directory`              | 文档工作目录。默认值是`./work/docs/components`，可保持原样。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
`nifi.processor.scheduling.timeout`                 | 在调用其他生命周期操作(例如，stop)之前，等待处理器的生命周期操作(@OnScheduled和@OnUnscheduled)完成的时间。默认值是1分钟。                                                                                                                                                                                                                                                                                                                                                                                                                                                     

### State管理

"属性"文件的"状态管理"部分提供了一种机制，用于配置组件的本地和集群范围机制以保持状态。有关如何使用它的更多信息，请参见[状态管理](#State管理)部分。

**属性**                                                | **描述** 
-----|-----|
`nifi.state.management.configuration.file`            | 包含本地和集群范围的状态提供程序的配置的XML文件。默认值为`./conf/state-management.xml`。                                          
`nifi.state.management.provider.local`                | 要使用的本地状态提供程序的ID。此值必须与 _state-management.xml_ 文件中某个`local-provider`元素的`id`值匹配。                           
`nifi.state.management.provider.cluster`              | 要使用的集群状态提供程序的ID。此值必须与 _state-management.xml_ 文件中某个`cluster-provider`元素的`id`值匹配。如果不是集群，则忽略此值，但集群中的节点需要此值。
`nifi.state.management.embedded.zookeeper.start`      | 指定此NiFi实例是否应启动嵌入式ZooKeeper服务器。它与ZooKeeperStateProvider一起使用。                                             
`nifi.state.management.embedded.zookeeper.properties` | 指定一个属性文件，其中包含已启动的嵌入式ZooKeeper服务器的配置(如果该`nifi.state.management.embedded.zookeeper.start`属性设置为`true`)     

### H2设置

H2设置部分定义了H2数据库的设置，该数据库跟踪用户访问和流控制器历史记录。

**属性**                      | **描述**                        
-----|-----|
`nifi.database.directory`\* | H2数据库目录的位置。默认值为`./database_repository`。                                                          
`nifi.h2.url.append`        | 此属性指定要添加到H2数据库的连接字符串的其他参数。应使用默认值，不应更改。它是：`;LOCK_TIMEOUT=25000;WRITE_DELAY=0;AUTO_SERVER=FALSE`。

### FlowFile存储库

FlowFile存储库跟踪系统中每个FlowFile的属性和当前状态。默认情况下，此存储库安装在与所有其他存储库相同的根安装目录中; 但是，如果可以的话，建议配置在单独的磁盘挂载上。

**属性**                                         | **描述**
---------------------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`nifi.flowfile.repository.implementation`      | FlowFile Repository实现。默认值为`org.apache.nifi.controller.repository.WriteAheadFlowFileRepository`应该谨慎更改。要将流文件存储在内存而不是磁盘上(在电源/机器故障或重新启动NiFi时接受数据丢失)，请将此属性设置为`org.apache.nifi.controller.repository.VolatileFlowFileRepository`。                                                                                                                                                                                                                   
`nifi.flowfile.repository.wal.implementation`  | 如果存储库实现配置为使用`WriteAheadFlowFileRepository`，则可以使用此属性指定应使用Write-Ahead Log的哪个实现。默认值为`org.apache.nifi.wali.SequentialAccessWriteAheadLog`。此版本的预写日志是在Apache NiFi的1.6.0版本中添加的，并且是为了解决旧实现中存在的问题而开发的。在断电或操作系统崩溃的情况下，旧的实现很容易错误地恢复FlowFiles。在断电或操作系统崩溃后，这可能会导致在重新启动时将错误的属性或内容分配给FlowFile。但是，如果需要，仍然可以选择选择使用先前的实现并接受该风险(例如，如果新实现会出现一些意外错误)。为此，请将此属性的值设置为`org.wali.MinimalLockingWriteAheadLog`。如果更改了此属性的值，则在重新启动时，NiFi仍将恢复使用先前配置的存储库写入的记录，并删除先前配置的实现所写的文件。
`nifi.flowfile.repository.directory`\*         | FlowFile存储库的位置。默认值为`./flowfile_repository`。                                                                                                                                                                                                                                                                                                                                                                                                    
`nifi.flowfile.repository.partitions`          | 分区数量。默认值为`256`。                                                                                                                                                                                                                                                                                                                                                                                                                                
`nifi.flowfile.repository.checkpoint.interval` | FlowFile存储库检查点间隔时间。默认值为`2 mins`。                                                                                                                                                                                                                                                                                                                                                                                                                 
`nifi.flowfile.repository.always.sync`         | 如果设置为`true`，则对存储库的任何更改都将同步到磁盘，这意味着NiFi将要求操作系统不要缓存信息。这非常昂贵并且可以显着降低NiFi性能。但是，如果是`false`，如果突然断电或操作系统崩溃，可能会有数据丢失的可能性。默认值为`false`。                                                                                                                                                                                                                                                                                                                  

### 交换管理(Swap Management)

NiFi将FlowFile信息保存在内存(JVM)中，但在传入数据激增期间，FlowFile流文件信息可能开始占用大量JVM空间，从而影响系统性能。为了抵消这种影响，NiFi临时将流文件信息交换到磁盘，直到更多的JVM空间再次可用。这些属性决定了这个过程是如何发生的。

**属性**                             | **描述**
---------------------------------- | -----------------------------------------------------------------------------------
`nifi.swap.manager.implementation` | Swap Manager实现。默认值是`org.apache.nifi.controller.FileSystemSwapManager`且不应更改。
`nifi.queue.swap.threshold`        | NiFi开始将FlowFile信息交换到磁盘的队列阈值。默认值为`20000`。                                         
`nifi.swap.in.period`              | 交换期间。默认值为`5 sec`。                                                                
`nifi.swap.in.threads`             | 用于交换的线程数。默认值为`1`。                                                                
`nifi.swap.out.period`             | 换出期间。默认值为`5 sec`。                                                                
`nifi.swap.out.threads`            | 用于交换的线程数。默认值为`4`。                                                                

### 内容存储库 (Content Repository)

内容存储库保存系统中所有FlowFiles的内容。默认情况下，它与所有其他存储库安装在同一根安装目录中; 但是，管理员可能希望把它配置到单独的磁盘挂载(如果可以的话)。如果没有别的，最好是内容存储库与FlowFile存储库目录不在同一个挂载下。在处理大量数据的数据流中，内容存储库可能会填满磁盘，而FlowFile存储库(如果也在该磁盘上)可能会损坏。要避免这种情况，请在不同的挂载下配置这些存储库。

**属性**                                   | **描述**
---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`nifi.content.repository.implementation` | 内容存储库实现。默认值为`org.apache.nifi.controller.repository.FileSystemRepository`且应该谨慎更改。要将流文件内容存储在内存而不是磁盘上(在电源/机器发生故障时存在数据丢失的风险)，请将此属性设置为`org.apache.nifi.controller.repository.VolatileContentRepository`。

### 文件系统内容存储库属性 (File System Content Repository Properties)

**属性**                                                 | **描述**       
------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------              
`nifi.content.repository.implementation`               | 内容存储库实现。默认值为`org.apache.nifi.controller.repository.FileSystemRepository`且应该谨慎更改。要将流文件内容存储在内存而不是磁盘上(在电源/机器发生故障时存在数据丢失的风险)，请将此属性设置为`org.apache.nifi.controller.repository.VolatileContentRepository`。                                                                                                                                                     
`nifi.content.claim.max.appendable.size`               | 一个内容标识的最大大小。默认值为`1 MB`。                                                                                                                                                                                                                                                                                                                                   
`nifi.content.claim.max.flow.files`                    | 要分配给一个内容标识的最大FlowFiles数。默认值为`100`。                                                                                                                                                                                                                                                                                                                      
`nifi.content.repository.directory.default`\*          | 内容存储库的位置。默认值为`./content_repository`。  **注意**：可以使用`nifi.content.repository.directory.`带有唯一后缀的前缀和单独的路径作为值来指定多个内容存储库。  例如，要提供两个额外的位置作为内容存储库的一部分，用户还可以使用以下键指定其他属性：`nifi.content.repository.directory.content1=/repos/content1`  `nifi.content.repository.directory.content2=/repos/content2`  提供三个总位置，包括 `nifi.content.repository.directory.default`。
`nifi.content.repository.archive.max.retention.period` | 如果启用了归档(请参见下文`nifi.content.repository.archive.enabled`)，则此属性指定保留归档数据的最长时间。默认值为`12 hours`。                                                                                                                                                                                                                                                               
`nifi.content.repository.archive.max.usage.percentage` | 如果启用了归档(请参阅下文`nifi.content.repository.archive.enabled`)，则此属性必须具有一个值，该值指示开始删除归档数据的内容存储库磁盘使用百分比。如果存档为空且内容存储库磁盘使用率高于此百分比，则暂时禁用存档。当磁盘使用率低于此百分比时，将继续存档。默认值为`50%`。                                                                                                                                                                                            
`nifi.content.repository.archive.enabled`              | 要启用内容存档，请将其设置为`true`并指定上述`nifi.content.repository.archive.max.usage.percentage`属性的值。内容归档使来源UI能够查看或重放不再位于数据流队列中的内容。默认情况下，启用存档。                                                                                                                                                                                                                           
`nifi.content.repository.always.sync`                  | 如果设置为`true`，则对存储库的任何更改都将同步到磁盘，这意味着NiFi将要求操作系统不要缓存信息。这非常昂贵并且可以显着降低NiFi性能。但是，如果是`false`，如果突然断电或操作系统崩溃，可能会有数据丢失的可能性。默认值为`false`。                                                                                                                                                                                                                           
`nifi.content.viewer.url`                              | 基于Web的内容查看器的URL(如果有)。默认为空白。                                                                                                                                                                                                                                                                                                                             

### Volatile内容存储库属性 (Volatile Content Repository Properties)

**属性**                                        | **描述**                                 
--------------------------------------------- | ------------------------------
`nifi.volatile.content.repository.max.size`   | 内容存储库中的内容存储库最大大小。默认值为`100 MB`。
`nifi.volatile.content.repository.block.size` | 内容存储库块大小。默认值为`32 KB`。         

### Provenance存储库(Provenance Repository)

Provenance Repository包含与Data Provenance相关的信息。接下来的四个部分是针对Provenance Repository属性的。

**属性**                                      | **描述**        
------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`nifi.provenance.repository.implementation` | Provenance Repository实现。默认值为`org.apache.nifi.provenance.WriteAheadProvenanceRepository`。还有三个额外的存储库。要将起源事件存储在内存而不是磁盘上(在这种情况下，所有事件将在重新启动时丢失，并且事件将按先进先出的顺序逐出)，将此属性设置为`org.apache.nifi.provenance.VolatileProvenanceRepository`。这在Java堆中保存可配置数量的Provenance事件，因此可以保留的事件数量非常有限。第三和第四种选择是可用的：`org.apache.nifi.provenance.PersistentProvenanceRepository`和`org.apache.nifi.provenance.EncryptedWriteAheadProvenanceRepository`。在`PersistentProvenanceRepository`最初写有持续出处活动，因为它们是产生和提供依次遍历这些事件的能力的简单的目标。后来，希望能够压缩数据以便存储更多数据。之后，添加了索引和查询数据的功能。随着需求的不断变化，存储库不断变化，没有任何重大的重新设计。当在负责处理大量小型FlowFiles的NiFi实例中使用时，`PersistentProvenanceRepository`很快就会成为瓶颈。在`WriteAheadProvenanceRepository`随后被写入提供相同功能的`PersistentProvenanceRepository`同时提供更好的性能。该`WriteAheadProvenanceRepository`是在NiFi版本1.2.0中添加的。从那时起，它已被证明非常稳定和强大，因此被作为默认实现。`PersistentProvenanceRepository`现在被认为是过时的，不应再使用。如果管理当前正在使用的NiFi实例， `PersistentProvenanceRepository`强烈建议升级到`WriteAheadProvenanceRepository`。由于Provenance Repository是向后兼容的，因此不会丢失数据或功能。`EncryptedWriteAheadProvenanceRepository`是建立在`WriteAheadProvenanceRepository`，为数据加密。**注：**`WriteAheadProvenanceRepository`无法更改回`PersistentProvenanceRepository`

### Write Ahead Provenance属性(Write Ahead Provenance Repository Properties)

**属性**                                                | **描述**                                                              
----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`nifi.provenance.repository.directory.default`\*      | Provenance存储库的位置。默认值为`./provenance_repository`。  **注意**：可以使用`nifi.provenance.repository.directory.`带有唯一后缀的前缀和单独的路径作为值来指定多个出处存储库。  例如，要提供另外两个位置作为起源库的一部分，用户还可以使用以下键指定其他属性：`nifi.provenance.repository.directory.provenance1=/repos/provenance1` `nifi.provenance.repository.directory.provenance2=/repos/provenance2`  提供三个总位置，包括`nifi.provenance.repository.directory.default`。                                                                                                                                                                                                                                                                                                                                               
`nifi.provenance.repository.max.storage.time`         | 保留数据出处信息的最长时间。默认值为`24 hours`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
`nifi.provenance.repository.max.storage.size`         | 一次存储的最大数据源信息量。默认值为`1 GB`。Data Provenance功能可能会占用大量存储空间，因为保留了大量数据。对于生产环境，1-2 TB或更多的值并不罕见。如果定义了多个存储位置，如上所述，存储库将写入单个"事件文件"(或一组"事件文件")一段时间(由`nifi.provenance.repository.rollover.time`和`nifi.provenance.repository.rollover.size`属性定义 )。数据总是一次老化一个文件，因此不建议在很长一段时间内写入单个"事件文件"，因为这样可以防止旧数据平滑老化。                                                                                                                                                                                                                                                                                                                                                                                                                                              
`nifi.provenance.repository.rollover.time`            | 滚动存储库正在写入的"事件文件"之前等待的时间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
`nifi.provenance.repository.rollover.size`            | 要写入单个"事件文件"的数据量。默认值为`100 MB`。对于生成大量Data Provenance的生产环境，值`1 GB`也非常合理。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
`nifi.provenance.repository.query.threads`            | 用于Provenance Repository查询的线程数。默认值为`2`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
`nifi.provenance.repository.index.threads`            | 用于索引Provenance事件的线程数，以便可以搜索它们。默认值为`2`。对于在大量FlowFiles上运行的流，Provenance事件的索引可能成为瓶颈。如果发生这种情况，增加此属性的值可能会提高Provenance Repository能够处理这些记录的速率，从而提高整体吞吐量。建议每个存储位置使用至少1个线程(即，如果有3个存储位置，则应使用至少3个线程)。对于具有更多CPU和磁盘I / O的高吞吐量环境，可能会显着增加此值。通常每个存储位置超过2-4个线程是没有价值的。但是，这可以根据与I / O资源相比可用的CPU资源进行调整。                                                                                                                                                                                                                                                                                                                                                                                                                                                    
`nifi.provenance.repository.compress.on.rollover`     | 指示在滚动"事件文件"时是否压缩起源信息。默认值为`true`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
`nifi.provenance.repository.always.sync`              | 如果设置为`true`，则对存储库的任何更改都将同步到磁盘，这意味着NiFi将要求操作系统不要缓存信息。这非常昂贵并且可以显着降低NiFi性能。但是，如果是`false`，如果突然断电或操作系统崩溃，可能会有数据丢失的可能性。默认值为`false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
`nifi.provenance.repository.indexed.fields`           | 这是一个以逗号分隔的字段列表，应该将其编入索引并进行搜索。未编制索引的字段将无法搜索。有效的字段有：`EventType`，`FlowFileUUID`，`Filename`，`TransitURI`，`ProcessorID`， `AlternateIdentifierURI`，`Relationship`，`Details`。默认值为：`EventType， FlowFileUUID， Filename， ProcessorID`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
`nifi.provenance.repository.indexed.attributes`       | 这是一个以逗号分隔的FlowFile属性列表，应该对其进行索引并使其可搜索。默认为空白。但一些很好的例子要考虑的是`filename`和`mime.type`以及任何自定义属性，你可以使用这对你的使用情况有价值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
`nifi.provenance.repository.index.shard.size`         | 存储库使用Apache Lucene执行索引和搜索功能。此值指示在Repository开始写入新索引之前Lucene索引应该有多大。在搜索Provenance存储库时，分片大小的较大值将导致更多Java堆使用，但应提供更好的性能。默认值为`500 MB`。但是，这是因为默认情况适用于大多数用户开始使用NiFi的非常小的环境。对于生产环境，建议将此值更改`4`为`8 GB`。一旦索引中的所有Provenance Events都从"事件文件"中删除，索引也将被销毁。**注意：**此值应小于(不超过一半)`nifi.provenance.repository.max.storage.size`属性。                                                                                                                                                                                                                                                                                                                                                                                                                          
`nifi.provenance.repository.max.attribute.length`     | 指示从存储库检索Provenance事件时FlowFile属性的最大长度。如果任何属性的长度超过此值，则在检索事件时将截断该值。默认值为`65536`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
`nifi.provenance.repository.concurrent.merge.threads` | Apache Lucene在索引中创建了几个"段"。这些段定期合并在一起，以提供更快的查询。此属性指定允许用于**每个**存储目录的最大线程数。默认值为`2`。对于高吞吐量环境，建议将索引线程数设置为大于合并线程数*存储位置数。例如，如果有2个存储位置并且索引线程的数量设置为`8`，则合并线程的数量应该小于`4`。虽然完成此操作并不重要，但设置大于此数量的合并线程数会导致所有索引线程被用于合并，这会导致NiFi流在索引发生时周期性地暂停，从而导致某些数据被处理具有比其他数据更高的延迟。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
`nifi.provenance.repository.warm.cache.frequency`     | 每次运行Provenance查询时，查询必须首先搜索Apache Lucene索引(至少在大多数情况下 - 有一些查询经常运行并且结果被缓存以避免搜索Lucene索引)。当Lucene索引首次打开时，它可能非常昂贵并且需要几秒钟。这有很多不同的索引，并且可能导致Provenance查询花费更长时间。打开索引后，操作系统的磁盘缓存通常会保留足够的数据，以便更快地重新打开索引 - 至少在一段时间内，直到磁盘缓存逐出该数据。如果设置了此值，NiFi将定期打开每个Lucene索引，然后关闭它，以"加热"缓存。当Provenance Repository很大时，这将导致更快的查询。然而，与所有伟大的事物一样，它带来了成本。加热缓存确实需要一些CPU资源，但更重要的是，它会从操作系统磁盘缓存中驱逐其他数据，并导致从磁盘读取(可能是大量的)数据。这可能导致较低的NiFi性能。但是，如果NiFi在CPU和磁盘未充分利用的环境中运行，则此功能可以使Provenance查询速度快得多。此属性的默认值为空(即禁用)。但更重要的是，它将从操作系统磁盘缓存中驱逐其他数据，并将导致从磁盘读取(可能是大量)数据。这可能导致较低的NiFi性能。但是，如果NiFi在CPU和磁盘未充分利用的环境中运行，则此功能可以使Provenance查询速度快得多。此属性的默认值为空(即禁用)。但更重要的是，它将从操作系统磁盘缓存中驱逐其他数据，并将导致从磁盘读取(可能是大量)数据。这可能导致较低的NiFi性能。但是，如果NiFi在CPU和磁盘未充分利用的环境中运行，则此功能可以使Provenance查询速度快得多。此属性的默认值为空(即禁用)。

### 加密的提前写入存储库属性(Encrypted Write Ahead Provenance Repository Properties)

上面定义的所有属性(请参阅" [编写预先存储库属性"](http://nifi.apache.org/docs/NiFi-docs/html/administration-guide.html#write-ahead-provenance-repository-properties))仍然适用。此处仅列出特定于加密的属性。有关详细信息，请参阅["用户指南"中的"加密的源代码存储库"](http://nifi.apache.org/docs/NiFi-docs/html/user-guide.html#encrypted-provenance)。

**属性**                                                              | **描述**                                                                                                                                                                                                                                                                                                                                         
------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------     
`nifi.provenance.repository.debug.frequency`                        | 控制在记录存储库性能指标的DEBUG语句之间处理的事件数。仅当在日志配置中启用DEBUG级别语句时才使用此值。                                                                                                                                                                                                                                                                                       
`nifi.provenance.repository.encryption.key.provider.implementation` | 这是**密钥提供者**的完全限定类名。密钥提供程序���用于访问加密密钥以保护起源事件的数据存储区接口。目前有两种实现方式-  `StaticKeyProvider`直接从读取键_nifi.properties_和`FileBasedKeyProvider`读取**ñ**从加密的文件很多关键点。该接口是可扩展的，未来预计将支持HSM或其他提供商。                                                                                                                                                                  
`nifi.provenance.repository.encryption.key.provider.location`       | 该键定义资源的路径(为空`StaticKeyProvider`，`./keys.nkp`或类似的路径`FileBasedKeyProvider`)。对于像HSM这样的未来提供商，这可能是连接字符串或URL。                                                                                                                                                                                                                                       
`nifi.provenance.repository.encryption.key.id`                      | 用于加密的活动密钥ID(例如`Key1`)。                                                                                                                                                                                                                                                                                                                        
`nifi.provenance.repository.encryption.key`                         | 使用的关键`StaticKeyProvider`。密钥格式为十六进制编码(`0123456789ABCDEFFEDCBA98765432100123456789ABCDEFFEDCBA9876543210`)，但也可以使用`./encrypt-config.sh`NiFi Toolkit中的工具进行加密(有关详细信息，请参阅[NiFi工具包指南中](http://nifi.apache.org/docs/NiFi-docs/html/toolkit-guide.html)的[加密配置工具](http://nifi.apache.org/docs/NiFi-docs/html/toolkit-guide.html#encrypt_config_tool)部分)。
`nifi.provenance.repository.encryption.key.id.`\*                   | 允许为其指定其他键`StaticKeyProvider`。例如，该行将`nifi.provenance.repository.encryption.key.id.Key2=012…​210`提供可用密钥`Key2`。                                                                                                                                                                                                                                  

最简单的配置如下：

```
nifi.provenance.repository.implementation = org.apache.nifi.provenance.EncryptedWriteAheadProvenanceRepositorynifi.provenance.repository.debug.frequency = 100nifi.provenance.repository.encryption.key.provider.implementation = org.apache.nifi.security.kms.StaticKeyProvidernifi.provenance.repository.encryption.key.provider.location =nifi.provenance.repository.encryption.key.id =key1nifi.provenance.repository.encryption.key = 0123456789ABCDEFFEDCBA98765432100123456789ABCDEFFEDCBA9876543210
```

### 持久性源代码库属性(Persistent Provenance Repository Properties)

**属性**                                            | **描述**  
------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`nifi.provenance.repository.directory.default`\*  | Provenance存储库的位置。默认值为`./provenance_repository`。  **注意**：可以使用`nifi.provenance.repository.directory.`带有唯一后缀的前缀和单独的路径作为值来指定多个出处存储库。  例如，要提供另外两个位置作为起源库的一部分，用户还可以使用以下键指定其他属性：  `nifi.provenance.repository.directory.provenance1=/repos/provenance1`  `nifi.provenance.repository.directory.provenance2=/repos/provenance2`  提供三个总位置，包括`nifi.provenance.repository.directory.default`。
`nifi.provenance.repository.max.storage.time`     | 保留数据出处信息的最长时间。默认值为`24 hours`。                                                                                                                                                                                                                                                                                                                                                          
`nifi.provenance.repository.max.storage.size`     | 一次存储的最大数据源信息量。默认值为`1 GB`。                                                                                                                                                                                                                                                                                                                                                              
`nifi.provenance.repository.rollover.time`        | 在滚动最新数据出处信息之前等待的时间量，以便在用户界面中可用。默认值为`30 secs`。                                                                                                                                                                                                                                                                                                                                          
`nifi.provenance.repository.rollover.size`        | 一次滚动的信息量。默认值为`100 MB`。                                                                                                                                                                                                                                                                                                                                                                 
`nifi.provenance.repository.query.threads`        | 用于Provenance Repository查询的线程数。默认值为`2`。                                                                                                                                                                                                                                                                                                                                                 
`nifi.provenance.repository.index.threads`        | 用于索引Provenance事件的线程数，以便可以搜索它们。默认值为`2`。对于在大量FlowFiles上运行的流，Provenance事件的索引可能成为瓶颈。如果是这种情况，将出现一个公告，表明"数据流的速率超过了出处记录率。减少流量以适应。" 如果发生这种情况，增加此属性的值可能会提高Provenance Repository能够处理这些记录的速率，从而提高整体吞吐量。                                                                                                                                                                                           
`nifi.provenance.repository.compress.on.rollover` | 指示在翻转时是否压缩出处信息。默认值为`true`。                                                                                                                                                                                                                                                                                                                                                             
`nifi.provenance.repository.always.sync`          | 如果设置为`true`，则对存储库的任何更改都将同步到磁盘，这意味着NiFi将要求操作系统不要缓存信息。这非常昂贵并且可以显着降低NiFi性能。但是，如果是`false`，如果突然断电或操作系统崩溃，可能会有数据丢失的可能性。默认值为`false`。                                                                                                                                                                                                                                                          
`nifi.provenance.repository.journal.count`        | 应该用于序列化Provenance事件数据的日志文件数。增加此值将允许更多任务同时更新存储库，但稍后将导致更昂贵的日志文件合并。理想情况下，此值应等于预期同时更新存储库的线程数，但16必须在必需环境中正常工作。默认值为`16`。                                                                                                                                                                                                                                                                     
`nifi.provenance.repository.indexed.fields`       | 这是一个以逗号分隔的字段列表，应该将其编入索引并进行搜索。未编制索引的字段将无法搜索。有效的字段有：`EventType`，`FlowFileUUID`，`Filename`，`TransitURI`，`ProcessorID`，`AlternateIdentifierURI`，`Relationship`，`Details`。默认值为：`EventType， FlowFileUUID， Filename， ProcessorID`。                                                                                                                                                            
`nifi.provenance.repository.indexed.attributes`   | 这是一个以逗号分隔的FlowFile属性列表，应该对其进行索引并使其可搜索。默认为空白。但一些很好的例子要考虑的是`filename`，`uuid`和`mime.type`，以及你可以使用任何自定义attritubes这对你的使用情况有价值。                                                                                                                                                                                                                                                              
`nifi.provenance.repository.index.shard.size`     | 在搜索Provenance存储库时，分片大小的较大值将导致更多Java堆使用，但应提供更好的性能。默认值为`500 MB`。                                                                                                                                                                                                                                                                                                                         
`nifi.provenance.repository.max.attribute.length` | 指示从存储库检索Provenance事件时FlowFile属性的最大长度。如果任何属性的长度超过此值，则在检索事件时将截断该值。默认值为`65536`。                                                                                                                                                                                                                                                                                                           

### 易失性来源存储库属性(Volatile Provenance Repository Properties)

                        

**属性**                                   | **描述**                                      
---------------------------------------- | --------------------------------------------
`nifi.provenance.repository.buffer.size` | Provenance Repository缓冲区大小。`100000`原始事件是默认值。

### 组件状态存储库(Component Status Repository)

组件状态存储库包含用户界面中"组件状态历史记录"工具的信息。这些属性控制着该工具的工作方式。

在`buffer.size`和`snapshot.frequency`一起工作以确定历史数据保留量。例如，配置两天的历史数据，每5分钟发生一次数据点快照，你将配置 `snapshot.frequency`为"5分钟"，缓冲区大小为"576"。为了进一步解释此示例每60分钟，该时间段有12(60/5)个快照窗口。为了保持48小时(12 * 48)的数据，最终缓冲区大小为576。

                                       

**属性**                                             | **描述**                                     
-------------------------------------------------- | -------------------------------------------------------------------------------------------------                                                      
`nifi.components.status.repository.implementation` | 组件状态存储库实现。默认值是`org.apache.nifi.controller.status.history.VolatileComponentStatusRepository`且不应更改。
`nifi.components.status.repository.buffer.size`    | 指定组件状态存储库的缓冲区大小。默认值为`1440`。                                                                      
`nifi.components.status.snapshot.frequency`        | 此值指示显示组件状态历史记录快照的频率。默认值为`1 min`。                                                                 

### 站点到站点属性(Site to Site Properties)

这些属性控制在数据流中配置远程进程组时，此NiFi实例如何与远程NiFi实例通信。远程进程组可以从RAW和HTTP中选择传输协议。命名的属性`nifi.remote.input.socket.*`是特定于RAW传输协议的。同样，`nifi.remote.input.http.*`HTTP传输协议特定属性。

                                                                                                                                                                                 

**属性**                                   | **描述**                                               
---------------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                                                    
`nifi.remote.input.host`                 | 将发送给客户端以连接到此NiFi实例以进行站点到站点通信的主机名。默认情况下，它是来自的值`InetAddress.getLocalHost().getHostName()`。在类UNIX操作系统上，这通常是`hostname`命令的输出。                                                                 
`nifi.remote.input.secure`               | 这表明此NiFi实例与远程NiFi实例之间的通信是否应该是安全的。默认情况下，它设置为`false`。要使安全的站点到站点工作，请将属性设置为`true`。还必须配置许多其他[安全属性](http://nifi.apache.org/docs/NiFi-docs/html/administration-guide.html#security_properties)。 
`nifi.remote.input.socket.port`          | 用于站点到站点通信的远程输入套接字端口。默认情况下，它是空白的，但它必须具有一个值才能使用RAW套接字作为站点到站点的传输协议。                                                                                                                         
`nifi.remote.input.http.enabled`         | 指定是否应在此主机上启用HTTP站点到站点。默认情况下，它设置为`true`。  
站点到站点客户端是使用HTTP还是HTTPS取决于`nifi.remote.input.secure`。如果设置为`true`，则将请求作为HTTPS发送到`nifi.web.https.port`。如果设置为`false`，则发送HTTP请求`nifi.web.http.port`。
`nifi.remote.input.http.transaction.ttl` | 指定事务在服务器上保持活动状态的时间。默认情况下，它设置为`30 secs`。  
如果站点到站点客户端在这段时间之后没有继续进行下一个操作，则从远程NiFi实例中丢弃该事务。例如，当客户端创建事务但不发送或接收流文件时，或者客户端发送或接收流文件但未确认该事务时。                                                    
`nifi.remote.contents.cache.expiration`  | 指定NiFi在通过站点到站点进行通信时应缓存有关远程NiFi实例的信息的时间。默认情况下，NiFi将缓存  
来自远程系统的响应`30 secs`。这允许NiFi避免不断地向远程系统发出HTTP请求，这在NiFi的这个实例  
具有许多远程进程组实例时尤为重要。                                                      

### 反向代理的站点到站点路由属性(Site to Site Routing Properties for Reverse Proxies)

站点到站点需要客户端和远程NiFi节点之间的对等通信。例如，如果远程NiFi集群具有3个节点(`NiFi0`，`NiFi1`和`NiFi2`)，则必须能够到达每个远程节点的客户端请求。

如果计划通过互联网或公司防火墙从/向站点到站点客户端接收/传输数据，则可以在NiFi集群节点前部署反向代理服务器，作为将客户端请求路由到的网关上游NiFi节点，以减少必须暴露的服务器和端口的数量。

在这样的环境中，同一网络中的站点到站点客户端也可以访问相同的NiFi集群。将流文件发送给自身以在NiFi集群节点之间进行负载分配可以是典型示例。在这种情况下，客户端请求应该直接路由到节点而不通过反向代理。

为了支持此类部署，远程NiFi集群需要根据客户端请求上下文动态公开其站点到站点端点。以下属性配置对等方应如何向客户端公开。路由定义包括4个属性，`when`，`hostname`，`port`，和`secure`，通过分组`protocol`和`name`。可以配置多个路由定义。`protocol`表示站点到站点传输协议，即`RAW`或`HTTP`。

                                         

**属性**                                         | **描述**                                         
---------------------------------------------- | -------------------------------------------------
`nifi.remote.route.{protocol}.{name}.when`     | 布尔值，`true`或`false`。控制是否应使用此名称的路由定义。              
`nifi.remote.route.{protocol}.{name}.hostname` | 指定将引入站点到站点客户端以进行进一步通信的主机名。                       
`nifi.remote.route.{protocol}.{name}.port`     | 指定将引入站点到站点客户端以进行进一步通信的端口号。                       
`nifi.remote.route.{protocol}.{name}.secure`   | 布尔值，`true`或`false`。指定是否应通过安全协议访问远程对等方。默认为`false`。

以上所有路由属性都可以使用NiFi表达式语言从请求上下文计算目标对等项描述。可用变量是：

**变量名**                        | **描述**                                                      
------------------------------------ | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`s2s.{source|target}.hostname` | 请求来源的源的主机名和原始目标。                                            
`s2s.{source|target}.port`     | 与上面相同，对于端口。源端口可能没有用，因为它只是一个客户端TCP端口。                        
`s2s.{source|target}.secure`   | 与上述相同，为安全与否。                                                
`s2s.protocol`                 | 正在使用的站点到站点协议的名称，`RAW`或`HTTP`。                               
`s2s.request`                  | 当前请求类型的名称，`SiteToSiteDetail`或`Peers`。有关详细信息，请参阅下面的站点到站点协议序列。
`HTTP request headers`         | HTTP请求标头值可以通过其名称引用。                                         

站点到站点协议序列(Site to Site protocol sequence)

正确配置这些属性需要对站点到站点协议序列有一些了解。

1.  客户端通过向指定的远程URL发送HTTP(S)请求来获取站点到站点协议，以获取远程集群站点到站点信息。具体来说，到' _/NiFi-api/site-to-site_ '。调用此请求`SiteToSiteDetail`。

2.  远程NiFi节点响应其输入和输出端口，以及RAW和TCP传输协议的TCP端口号。

3.  客户端使用＃2返回的TCP端口号发送另一个请求以获取远程对等方。根据此请求，原始套接字通信用于RAW传输协议，而HTTP继续使用HTTP(S)。调用此请求`Peers`。

4.  远程NiFi节点使用包含主机名，端口，安全性和工作负载(例如排队的FlowFiles数)的可用远程对等体列表进行响应。从这一点开始，在客户端和远程NiFi节点之间进行进一步的通信。

5.  客户端根据工作负载信息决定从哪个对等方传输数据。

6.  客户端向远程NiFi节点发送创建事务的请求。

7.  远程NiFi节点接受该事务。

8.  数据被发送到目标对等方。可以批量发送多个数据包。

9.  当没有更多数据要发送或达到批量限制时，通过计算发送数据的CRC32哈希来确认两端的事务。

10.  交易在两端都有。

反向代理配置

大多数反向代理软件都实现HTTP和TCP代理模式。对于NiFi RAW站点到站点协议，需要HTTP和TCP代理配置，并且至少需要打开2个端口。NiFi HTTP站点到站点协议可以将反向代理所需的开放端口数量最小化为1。

在反向代理中设置正确的HTTP头对于NiFi正常工作至关重要，不仅可以路由请求，还可以授权客户端请求。另请参阅[代理配置](http://nifi.apache.org/docs/NiFi-docs/html/administration-guide.html#proxy_configuration)以获取详细信

可以在反向代理服务器上应用两种类型的请求到NiFi节点映射技术。一个是"服务器名称到节点"，另一个是"端口号到节点"。

使用"服务器名称到节点"，可以使用相同的端口根据请求的服务器名称(例如`NiFi0.example.com`，`NiFi1.example.com`)将请求路由到不同的上游NiFi节点。应将主机名解析配置为将不同的主机名映射到相同的反向代理地址，这可以通过添加/ etc / hosts文件或DNS服务器条目来完成。此外，如果反向代理的客户端使用HTTPS，则反向代理服务器证书应具有通配符公用名或SAN，以便由不同的主机名访问。

某些反向代理技术不支持服务器名称路由规则，在这种情况下，请使用"端口号到节点"技术。"端口号到节点"映射要求NiFi集群的反向代理处的N开放端口由N个节点组成。

有关实际配置，请参阅以下示例。

站点到站点和反向代理示例

下面是一些示例反向代理和NiFi设置，以说明配置文件的外观。

下图中的Client1表示无法直接访问NiFi节点的客户端，它通过反向代理进行访问，而Client2具有直接访问权限。

在此示例中，Nginx用作反向代理。

示例1：RAW - 服务器名称到节点映射

![服务器名称到节点映射](https://nifichina.gitee.io/image/general/s2s-rproxy-servername.svg)

1.  Client1启动站点到站点协议，请求被路由到上游NiFi节点之一。NiFi节点计算RAW的站点到站点端口。通过下面显示的_nifi.properties_中的路由规则**example1**，返回端口10443。

2.  Client1要求对等方`nifi.example.com:10443`，请求被路由到`NiFi0:8081`。NiFi节点计算可用的对等体，通过**example1**路由规则，`NiFi0:8081`转换为`NiFi0.example.com:10443`，`NiFi1`以及和`NiFi2`。其结果是，`NiFi0.example.com:10443`，`NiFi1.example.com:10443`和`NiFi2.example.com:10443`返回。

3.  Client1决定`NiFi2.example.com:10443`用于进一步的通信。

4.  另一方面，Client2有两个用于站点到站点引导URI的URI，并使用其中一个启动协议。在**例1**路由不匹配，这对于该请求，并返回端口8081。

5.  Client2向同行询问`NiFi1:8081`。该**例1**不匹配，所以原来的`NiFi0:8081`，`NiFi1:8081`并且`NiFi2:8081`因为它们返回。

6.  Client2决定使用`NiFi2:8081`进一步的通信。

在_nifi.properties中_定义的路由规则**example1**(所有节点具有相同的路由配置)：

```
# S2S Routing for RAW， using server name to node
nifi.remote.route.raw.example1.when=\
${X-ProxyHost:equals('nifi.example.com'):or(\
${s2s.source.hostname:equals('nifi.example.com'):or(\
${s2s.source.hostname:equals('192.168.99.100')})})}
nifi.remote.route.raw.example1.hostname=${s2s.target.hostname}.example.com
nifi.remote.route.raw.example1.port=10443
nifi.remote.route.raw.example1.secure=true
```

_nginx.conf_：

```
http {

    upstream NiFi {
        server NiFi0:8443;
        server NiFi1:8443;
        server NiFi2:8443;
    }

    # Use dnsmasq so that hostnames such as 'NiFi0' can be resolved by /etc/hosts
    resolver 127.0.0.1;

    server {
        listen 443 ssl;
        server_name nifi.example.com;
        ssl_certificate /etc/nginx/nginx.crt;
        ssl_certificate_key /etc/nginx/nginx.key;

        proxy_ssl_certificate /etc/nginx/nginx.crt;
        proxy_ssl_certificate_key /etc/nginx/nginx.key;
        proxy_ssl_trusted_certificate /etc/nginx/NiFi-cert.pem;

        location / {
            proxy_pass https://NiFi;
            proxy_set_header X-ProxyScheme https;
            proxy_set_header X-ProxyHost nginx.example.com;
            proxy_set_header X-ProxyPort 17590;
            proxy_set_header X-ProxyContextPath /;
            proxy_set_header X-ProxiedEntitiesChain $ssl_client_s_dn;
        }
    }
}

stream {

    map $ssl_preread_server_name $NiFi {
        NiFi0.example.com NiFi0;
        NiFi1.example.com NiFi1;
        NiFi2.example.com NiFi2;
        default NiFi0;
    }

    resolver 127.0.0.1;

    server {
        listen 10443;
        proxy_pass $NiFi:8081;
    }
}
```

示例2：RAW - 节点映射的端口号

![端口号到节点映射](https://nifichina.gitee.io/image/general/s2s-rproxy-portnumber.svg)

该**例题**路由映射原始主机名(`NiFi0`，`NiFi1`和`NiFi2`)，以不同的代理端口(`10443`，`10444`以及`10445`使用)`equals`和`ifElse`表达式。

在 _nifi.properties_ 中定义的路由规则**example2**(所有节点具有相同的路由配置)：

```
#S2S路由为RAW，使用端口号到节点
```

```
# S2S Routing for RAW， using port number to node
nifi.remote.route.raw.example2.when=\
${X-ProxyHost:equals('nifi.example.com'):or(\
${s2s.source.hostname:equals('nifi.example.com'):or(\
${s2s.source.hostname:equals('192.168.99.100')})})}
nifi.remote.route.raw.example2.hostname=nifi.example.com
nifi.remote.route.raw.example2.port=\
${s2s.target.hostname:equals('NiFi0'):ifElse('10443'，\
${s2s.target.hostname:equals('NiFi1'):ifElse('10444'，\
${s2s.target.hostname:equals('NiFi2'):ifElse('10445'，\
'undefined')})})}
nifi.remote.route.raw.example2.secure=true
```

_nginx.conf_：

```
http {
    # Same as example 1.
}

stream {

    map $ssl_preread_server_name $NiFi {
        NiFi0.example.com NiFi0;
        NiFi1.example.com NiFi1;
        NiFi2.example.com NiFi2;
        default NiFi0;
    }

    resolver 127.0.0.1;

    server {
        listen 10443;
        proxy_pass NiFi0:8081;
    }
    server {
        listen 10444;
        proxy_pass NiFi1:8081;
    }
    server {
        listen 10445;
        proxy_pass NiFi2:8081;
    }
}
```

示例3：HTTP - 服务器名称到节点映射

![服务器名称到节点映射](https://nifichina.gitee.io/image/general/s2s-rproxy-http.svg)

_nifi.properties中_定义的路由规则**example3**(所有节点具有相同的路由配置)：

```
# S2S Routing for HTTP
nifi.remote.route.http.example3.when=${X-ProxyHost:contains('.example.com')}
nifi.remote.route.http.example3.hostname=${s2s.target.hostname}.example.com
nifi.remote.route.http.example3.port=443
nifi.remote.route.http.example3.secure=true
```

_nginx.conf_：

```
http {
    upstream NiFi_cluster {
        server NiFi0:8443;
        server NiFi1:8443;
        server NiFi2:8443;
    }

    # If target node is not specified， use one from cluster.
    map $http_host $NiFi {
        NiFi0.example.com:443 "NiFi0:8443";
        NiFi1.example.com:443 "NiFi1:8443";
        NiFi2.example.com:443 "NiFi2:8443";
        default "NiFi_cluster";
    }

    resolver 127.0.0.1;

    server {
        listen 443 ssl;
        server_name ~^(.+\.example\.com)$;
        ssl_certificate /etc/nginx/nginx.crt;
        ssl_certificate_key /etc/nginx/nginx.key;

        proxy_ssl_certificate /etc/nginx/nginx.crt;
        proxy_ssl_certificate_key /etc/nginx/nginx.key;
        proxy_ssl_trusted_certificate /etc/nginx/NiFi-cert.pem;

        location / {
            proxy_pass https://$NiFi;
            proxy_set_header X-ProxyScheme https;
            proxy_set_header X-ProxyHost $1;
            proxy_set_header X-ProxyPort 443;
            proxy_set_header X-ProxyContextPath /;
            proxy_set_header X-ProxiedEntitiesChain $ssl_client_s_dn;
        }
    }
}
```

### 网络属性 (Web Properties)

这些属性与基于Web的用户界面有关。


**属性**                               | **描述**                                                   
------------------------------------ | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                  
`nifi.web.war.directory`             | 这是web war目录的位置。默认值为`./lib`。                                                                                                                                                                                                                                                                                
`nifi.web.http.host`                 | HTTP主机。默认为空白。                                                                                                                                                                                                                                                                                              
`nifi.web.http.port`                 | HTTP端口。默认值为`8080`。                                                                                                                                                                                                                                                                                         
`nifi.web.http.port.forwarding`      | 将传入的HTTP请求转发到的端口`nifi.web.http.host`。此属性旨在与"端口转发"一起使用，当NiFi必须由非root用户启动以获得更好的安全性时，需要通过低端口访问以通过防火墙。例如，要在端口80上通过HTTP协议公开NiFi，但实际上在端口8080上侦听，则需要配置OS级别端口转发，例如`iptables`(Linux / Unix)或`pfctl`(OS X)将请求从80重定向到8080.然后设置`nifi.web.http.port`如8080和`nifi.web.http.port.forwarding`80.默认为空。                       
`nifi.web.http.network.interface`\*  | NiFi应为HTTP请求绑定的网络接口的名称。默认为空白。**注意**：可以使用`nifi.web.http.network.interface.`带有唯一后缀的前缀和单独的网络接口名称作为值来指定多个网络接口。例如，要提供两个额外的网络接口，用户还可以使用以下键指定其他属性：  <br>`nifi.web.http.network.interface.eth0=eth0`<br>`nifi.web.http.network.interface.eth1=eth1` 提供三个总网络接口，包括`nifi.web.http.network.interface.default`。     
`nifi.web.https.host`                | HTTPS主机。默认为空白。                                                                                                                                                                                                                                                                                             
`nifi.web.https.port`                | HTTPS端口。默认为空白。配置NiFi以安全运行时，应配置此端口。                                                                                                                                                                                                                                                                         
`nifi.web.https.port.forwarding`     | `nifi.web.http.port.forwarding`与HTTPS 相同，但使用HTTPS进行安全通信。默认为空白。                                                                                                                                                                                                                                             
`nifi.web.https.network.interface`\* | NiFi应为HTTPS请求绑定的网络接口的名称。默认为空白。**注意**：可以使用`nifi.web.https.network.interface.`带有唯一后缀的前缀和单独的网络接口名称作为值来指定多个网络接口。  例如，要提供两个额外的网络接口，用户还可以使用以下键指定其他属性：  <br>`nifi.web.https.network.interface.eth0=eth0`<br>`nifi.web.https.network.interface.eth1=eth1`  提供三个总网络接口，包括`nifi.web.https.network.interface.default`。
`nifi.web.jetty.working.directory`   | Jetty工作目录的位置。默认值为`./work/jetty`。                                                                                                                                                                                                                                                                           
`nifi.web.jetty.threads`             | Jetty线程的数量。默认值为`200`。                                                                                                                                                                                                                                                                                      
`nifi.web.max.header.size`           | 请求和响应标头允许的最大大小。默认值为`16 KB`。                                                                                                                                                                                                                                                                                
`nifi.web.proxy.host`                | 以逗号分隔的允许的HTTP主机标头值列表，当NiFi安全运行时将考虑这些值，并且将接收到与其绑定的不同主机[：port]的请求。例如，在Docker容器中运行或在代理后面运行时(例如localhost：18443，proxyhost：443)。默认情况下，此值为空，表示NiFi应仅允许发送到NiFi绑定的主机[：port]的请求。                                                                                                                                     
`nifi.web.proxy.context.path`        | 要考虑的允许HTTP X-ProxyContextPath，X-Forwarded-Context或X-Forwarded-Prefix标头值的逗号分隔列表。默认情况下，此值为空，表示拒绝包含代理上下文路径的所有请求。配置此属性将允许此列表中包含代理路径的请求。                                                                                                                                                                        

### 安全属性(Security Properties)

这些属性与NiFi中的各种安全功能有关。本"管理员指南"的[安全配置](http://nifi.apache.org/docs/NiFi-docs/html/administration-guide.html#security_configuration)部分详细介绍了其中许多属性 。


**属性**                                       | **描述**                                           
-------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                     
`nifi.sensitive.props.key`                   | 这是用于加密处理器中配置的任何敏感属性值的密码。默认情况下，它是空白的，但系统管理员应为其提供值。它可以是任意长度的字符串，但建议的最小长度为10个字符。请注意，一旦设置了此密码并且配置了一个或多个敏感处理器属性，就不应更改此密码。                                  
`nifi.sensitive.props.algorithm`             | 用于加密敏感属性的算法。默认值为`PBEWITHMD5AND256BITAES-CBC-OPENSSL`。                                                                                                 
`nifi.sensitive.props.provider`              | 敏感的财产提供者。默认值为`BC`。                                                                                                                                    
`nifi.sensitive.props.additional.keys`       | 除了默认敏感属性之外，_nifi.properties中_的逗号分隔属性列表还要加密(请参阅[配置文件中的加密密码](http://nifi.apache.org/docs/NiFi-docs/html/administration-guide.html#encrypt-config_tool))。
`nifi.security.keystore`\*                   | 密钥库的完整路径和名称。默认为空白。                                                                                                                                    
`nifi.security.keystoreType`                 | 密钥库类型。默认为空白。                                                                                                                                          
`nifi.security.keystorePasswd`               | 密钥库密码。默认为空白。                                                                                                                                          
`nifi.security.keyPasswd`                    | 密钥密码。默认为空白。                                                                                                                                           
`nifi.security.truststore`\*                 | 信任库的完整路径和名称。默认为空白。                                                                                                                                    
`nifi.security.truststoreType`               | 信任库类型。默认为空白。                                                                                                                                          
`nifi.security.truststorePasswd`             | 信任库密码。默认为空白。                                                                                                                                          
`nifi.security.user.authorizer`              | 指定_authorizers.xml_文件中要使用的已配置Authorizer 。默认情况下，它设置为`file-provider`。                                                                                   
`nifi.security.user.login.identity.provider` | 这表示要使用的登录标识提供程序类型。默认值为空，可以从指定文件中的提供程序设置为标识符`nifi.login.identity.provider.configuration.file`。设置此属性将触发NiFi以支持用户名/密码身份验证。                               
`nifi.security.ocsp.responder.url`           | 这是在线证书状态协议(OCSP)响应程序的URL(如果正在使用)。默认为空白。                                                                                                               
`nifi.security.ocsp.responder.certificate`   | 这是OCSP响应者证书的位置(如果正在使用)。默认为空白。                                                                                                                         

### 身份映射属性 ( Identity Mapping Properties )

这些属性可用于规范用户身份。实施后，由不同身份提供商(证书，LDAP，Kerberos)进行身份验证的身份在NiFi内部处理相同。因此，避免了重复的用户，并且仅需要为每个用户设置一次特定于用户的配置(例如授权)。

以下示例演示了如何从证书和Kerberos主体中规范化DN：

```
nifi.security.identity.mapping.pattern.dn=^CN=(.*?)， OU=(.*?)， O=(.*?)， L=(.*?)， ST=(.*?)， C=(.*?)$
nifi.security.identity.mapping.value.dn=$1@$2
nifi.security.identity.mapping.transform.dn=NONE
nifi.security.identity.mapping.pattern.kerb=^(.*?)/instance@(.*?)$
nifi.security.identity.mapping.value.kerb=$1@$2
nifi.security.identity.mapping.transform.kerb=NONE

```

每个属性的最后一段是用于将模式与替换值相关联的标识符。当用户向NiFi发出请求时，将检查其身份以查看它是否与字典顺序中的每个模式匹配。对于匹配的第一个，`nifi.security.identity.mapping.value.xxxx`使用属性中指定的替换。因此，登录与`CN=localhost， OU=Apache NiFi， O=Apache， L=Santa Monica， ST=CA， C=US`上面的DN映射模式匹配，并`$1@$2`应用DN映射值。用户标准化为`localhost@Apache NiFi`。

除了映射之外，还可以应用变换。支持的版本是`NONE`(未应用转换)，`LOWER`(标识小写)和`UPPER`(标识大写)。如果未指定，则默认值为`NONE`。

![](./image/general/i.png) 这些映射还应用于"初始管理员标识"，"集群节点标识"以及_authorizers.xml_文件中的所有旧用户以及从LDAP导入的用户(请参阅[Authorizers.xml安装程序](http://nifi.apache.org/docs/NiFi-docs/html/administration-guide.html#authorizers-setup))。

组名也可以映射。以下示例将接受现有的组名称，但会将其小写。与外部授权人一起使用时，这可能会有所帮助。

```
nifi.security.group.mapping.pattern.anygroup=^(.*)$
nifi.security.group.mapping.value.anygroup=$1
nifi.security.group.mapping.transform.anygroup=LOWER
```

![](./image/general/i.png) 这些映射适用于_authorizers.xml中_引用的任何遗留组以及从LDAP导入的组。

### 集群公共属性

设置NiFi集群时，应在所有节点上以相同方式配置这些属性。

**属性**                                     | **描述**                         
------------------------------------------ | -------------------------------
`nifi.cluster.protocol.heartbeat.interval` | 节点应向集群协调器发出心跳的时间间隔。默认值为`5 sec`。
`nifi.cluster.protocol.is.secure`          | 这表明集群通信是否安全。默认值为`false`。       

### 集群节点属性

为集群节点配置这些属性。

**属性**                                           | **描述**                                       
------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------                                                                                                 
`nifi.cluster.is.node`                           | `true`如果实例是集群中的节点，请将此项设置为。默认值为`false`。                                                                                                        
`nifi.cluster.node.address`                      | 节点的完全限定地址。默认为空白。                                                                                                                              
`nifi.cluster.node.protocol.port`                | 节点的协议端口。默认为空白。                                                                                                                                
`nifi.cluster.node.protocol.threads`             | 应该用于与集群中的其他节点通信的线程数。此属性默认为`10`，但对于大型集群，此值可能需要更大。                                                                                              
`nifi.cluster.node.protocol.max.threads`         | 应该用于与集群中其他节点通信的最大线程数。此属性默认为`50`。                                                                                                              
`nifi.cluster.node.event.history.size`           | 更改集群中节点的状态时，将生成一个事件，并可在"集群"页面中查看该事件。此值指示每个节点在内存中保留的事件数。默认值为`25`。                                                                              
`nifi.cluster.node.connection.timeout`           | 连接到集群中的另一个节点时，指定在考虑连接失败之前此节点应等待的时间。默认值为`5 secs`。                                                                                              
`nifi.cluster.node.read.timeout`                 | 与集群中的另一个节点通信时，指定此节点在考虑与节点通信失败之前应等待多长时间从远程节点接收信息。默认值为`5 secs`。                                                                                 
`nifi.cluster.node.max.concurrent.requests`      | 可以复制到集群中节点的未完成Web请求的最大数量。如果超过此数量的请求，嵌入式Jetty服务器将返回"409：Conflict"响应。此属性默认为`100`。                                                               
`nifi.cluster.firewall.file`                     | 节点防火墙文件的位置。这是一个文件，可用于列出允许连接到集群的所有节点。它提供了额外的安全层。默认情况下，此值为空，表示不使用防火墙文件。                                                                         
`nifi.cluster.flow.election.max.wait.time`       | 指定在选择Flow作为"正确"流之前等待的时间量。如果已投票的节点数等于`nifi.cluster.flow.election.max.candidates`属性指定的数量，则集群将不会等待这么长时间。默认值为`5 mins`。请注意，一旦投票第一次投票，时间就会开始。       
`nifi.cluster.flow.election.max.candidates`      | 指定集群中所需的节点数，以便提前选择流。这允许集群中的节点避免在开始处理之前等待很长时间，如果我们至少达到集群中的此数量的节点。                                                                              
`nifi.cluster.flow.election.max.wait.time`       | 指定在选择Flow作为"正确"流之前等待的时间量。如果已投票的节点数等于`nifi.cluster.flow.election.max.candidates`属性指定的数量，则集群将不会等待这么长时间。默认值为`5 mins`。请注意，一旦投票第一次投票，时间就会开始。       
`nifi.cluster.flow.election.max.candidates`      | 指定集群中所需的节点数，以便提前选择流。这允许集群中的节点避免在开始处理之前等待很长时间，如果我们至少达到集群中的此数量的节点。                                                                              
`nifi.cluster.load.balance.port`                 | 指定要侦听传入连接的端口，以便跨集群负载平衡数据。默认值为`6342`。                                                                                                          
`nifi.cluster.load.balance.host`                 | 指定要侦听传入连接的主机名，以便跨集群负载平衡数据。如果未指定，将默认为`nifi.cluster.node.address`属性使用的值。                                                                        
`nifi.cluster.load.balance.connections.per.node` | 此节点与集群中每个其他节点之间要创建的最大连接数。例如，如果集群中有5个节点且此值设置为4，则最多将建立20个套接字连接以实现负载平衡(5 x 4 = 20)。默认值为`4`。                                                      
`nifi.cluster.load.balance.max.thread.count`     | 用于将数据从此节点传输到集群中其他节点的最大线程数。例如，如果此值设置为8，则最多有8个线程负责将数据传输到其他节点，而不管集群中有多少个节点。虽然给定线程一次只能写入一个套接字，但是单个线程能够同时为多个连接提供服务，因为给定的连接可能无法在任何给定时间进行读/写。默认值为`8`。
`nifi.cluster.load.balance.comms.timeout`        | 与另一个节点通信时，如果在读取或写入套接字时经过了这段时间而没有取得任何进展，则会抛出TimeoutException。这将导致数据被重试或发送到集群中的另一个节点，具体取决于配置的负载平衡策略。默认值为`30 sec`。                               

### 索赔管理

每当请求更改数据流时，重要的是NiFi集群中的所有节点都保持同步。为了实现这一点，NiFi采用了两阶段提交。首先将请求复制到集群中的所有节点，只询问是否允许该请求。然后，每个节点确定它是否允许该请求，如果是，则在被修改的组件上发出"声明"。可以将此声明视为请求者拥有的互斥锁。一旦所有节点都对是否允许该请求进行了投票，则发起请求的节点必须决定是否完成该请求。如果任何节点投票为"否"，则取消请求并取消声明，并将错误消息发送回用户。但是，如果节点全部投票' 是'然后请求完成。在这种分布式环境中，在发生投票之后和请求完成之前，发出原始请求的节点可能会失败。这将使组件无限期地锁定，以便不再对组件进行更改。为了避免这种情况，索赔将在一段时间后超时。

### ZooKeeper属性

NiFi依赖于Apache ZooKeeper来确定集群中哪个节点应该扮演主节点的角色以及哪个节点应该扮演集群协调器的角色。必须配置这些属性才能使NiFi加入集群。

**属性**                           | **描述**                                                       
-------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                             
`nifi.zookeeper.connect.string`  | 连接到Apache ZooKeeper所需的Connect String。这是一个以逗号分隔的hostname：port对列表。例如，`localhost:2181，localhost:2182，localhost:2183`。这应该包含ZooKeeper仲裁中所有ZooKeeper实例的列表。必须指定此属性才能加入集群，并且没有默认值。
`nifi.zookeeper.connect.timeout` | 在考虑连接失败之前连接到ZooKeeper时需要等待多长时间。默认值为`3 secs`。                                                                                                                              
`nifi.zookeeper.session.timeout` | 在会话过期之前丢失与ZooKeeper的连接后等待多长时间。默认值为`3 secs`。                                                                                                                               
`nifi.zookeeper.root.node`       | 应该在ZooKeeper中使用的根ZNode。ZooKeeper提供了一个类似目录的结构来存储数据。此结构中的每个"目录"称为ZNode。这表示应该用于存储数据的根ZNode或"目录"。默认值为`/root`。这对于正确设置很重要，因为NiFi实例尝试加入的集群取决于它连接到哪个ZooKeeper实例以及指定的ZooKeeper根节点。 

### Kerberos属性

**属性**                                             | **描述**                                     
-------------------------------------------------- | -----------------------------------------------------------------------------------------------------------------------------                                                                                  
`nifi.kerberos.krb5.file`\*                        | krb5文件的位置(如果使用)。默认为空白。此时，每个NiFi实例只允许指定一个krb5文件，因此此属性在此处配置为支持SPNEGO和服务主体，而不是单个处理器。如有必要，krb5文件可以支持多个领域。例：`/etc/krb5.conf`      
`nifi.kerberos.service.principal`\*                | NiFi Kerberos服务主体的名称(如果使用)。默认为空白。请注意，此属性适用于NiFi作为客户端其他系统进行身份验证。示例：`NiFi/nifi.example.com`或`NiFi/nifi.example.com@EXAMPLE.COM`
`nifi.kerberos.service.keytab.location`\*          | NiFi Kerberos密钥表的文件路径(如果使用)。默认为空白。请注意，此属性适用于NiFi作为客户端其他系统进行身份验证。例：`/etc/nifi.keytab`                                         
`nifi.kerberos.spnego.principal`\*                 | NiFi Kerberos服务主体的名称(如果使用)。默认为空白。请注意，此属性用于验证NiFi用户。示例：`HTTP/nifi.example.com`或`HTTP/nifi.example.com@EXAMPLE.COM`            
`nifi.kerberos.spnego.keytab.location`\*           | NiFi Kerberos密钥表的文件路径(如果使用)。默认为空白。请注意，此属性用于验证NiFi用户。例：`/etc/http-nifi.keytab`                                                
`nifi.kerberos.spengo.authentication.expiration`\* | 成功使用Kerberos用户身份验证的到期持续时间(如果使用)。默认值为`12 hours`。                                                                              

### 自定义属性

配置用于NiFi表达式语言的自定义属性：

* 创建自定义属性。确保这件事：
    * 每个自定义属性都包含一个不同的属性值，因此它不会被现有的环境属性，系统属性或FlowFile属性覆盖。

    * 集群环境中的每个节点都配置有相同的自定义属性。

* `nifi.variable.registry.properties`使用自定义属性文件的位置进行更新：

**属性**                              | **描述**                         
----------------------------------- | -------------------------------
`nifi.variable.registry.properties` | 这是一个逗号分隔的一个或多个自定义属性文件的文件位置路径列表。

* 重新启动NiFi实例以获取要更新的更新。

也可以在NiFi UI中配置自定义属性。有关详细信息，请参阅"用户指南"中的[变量窗口](http://nifi.apache.org/docs/NiFi-docs/html/user-guide.html#Variables_Window)部分。


![](./image/general/iii.png)_升级_

配置上面标有星号(*)的属性时要小心。要使升级过程更容易，建议将默认配置更改为主根安装目录之外的位置。通过这种方式，这些项目可以通过升级保留在其配置的位置，NiFi可以找到所有存储库和配置文件，并在旧版本停止并启动新版本后立即从中断处继续。此外，管理员可以重复使用此_nifi.properties_文件和任何其他配置文件，而无需在每次升级时重新配置它们。如前所述，检查_nifi.properties中的_任何更改非常重要升级时新版本的文件，并确保它们反映在你使用的_nifi.properties_文件中。

## NiFi升级

以下说明是从1.x.0版本升级到另一个版本时要遵循的一般步骤。

在升级之前，你应该仔细查看以下链接：https://cwiki.apache.org/confluence/display/NiFi/Release+Notes，以确保你了解新版本中所做的更改及其影响可能存在于你现有的数据流和/或环境中。此外，请查看链接：https://cwiki.apache.org/confluence/display/NiFi/Migration+Guidance 页面，以获取在特定NiFi版本之间移动时应注意的事项。

警告：群集中的所有节点都必须升级到相同的NiFi版本，因为同一群集中不支持具有不同NiFi版本的节点。

### 保留自定义组件

如果你有任何自定义NAR，请在升级过程中通过将其存储在集中位置来保留它们，如下所示：

1. 创建另一个名为“ custom_lib”的库目录。 
2. 将你的自定义NAR移到这个新的lib目录中。 
3. 在 _nifi.properties_ 文件中添加新行以指定此新的lib目录：

```
   nifi.nar.library.directory=./lib
   nifi.nar.library.directory.custom=/opt/configuration_resources/custom_lib
```

### 保留修改的NAR包

如果你修改了任何默认的NAR文件，则升级将覆盖这些更改。保留你的自定义内容，如下所示：

1. 识别并保存对默认NAR文件所做的更改。 
2. 执行NiFi升级。 
3. 在新的NiFi实例中实施相同的NAR文件更改。

### 清除活动并关闭现有的NiFi

在你现有的NiFi安装上：

1. 停止所有源处理器，以防止摄取新数据。 
2. 允许NiFi运行，直到数据流中的任何队列中没有活动数据为止。 
3. 关闭现有的NiFi实例。

### 安装新版本NiFi

将新的NiFi安装到与现有NiFi安装平行的目录中。

1. 下载Apache NiFi的链接：https://nifi.apache.org/download.html 。 
2. 将NiFi _.tar_ 文件（“ tar -xvzf文件名”）解压缩到与现有NiFi目录平行的目录中。例如，如果你现有的NiFi安装安装在`/opt/NiFi/existing-NiFi/`中，则将新的NiFi版本安装在`/opt/NiFi/new-NiFi/`中。 
3. 如果要升级NiFi群集，请在群集中的每个节点上重复这些步骤。

```
  Host Machine - Node 1
  |--> opt/
     |--> existing-NiFi
     |--> new-NiFi

  Host Machine - Node 2
  |--> opt/
     |--> existing-NiFi
     |--> new-NiFi

  Host Machine - Node 3
  |--> opt/
     |--> existing-NiFi
     |--> new-NiFi

```

注意：确保新NiFi目录的所有文件和目录所有权与你在现有目录上设置的所有权相匹配。

### 更新新NiFi安装的配置文件

使用现有NiFi安装中的配置文件来手动更新新NiFi部署中的相应属性。

警告：通常，请勿将配置文件从现有的NiFi版本复制到新的NiFi版本。较新的配置文件可能会引入新属性，如果你复制和粘贴配置文件，这些新属性将会丢失。

使用下表来指导位于conf中的配置文件的更新。

| Configuration file	                       |  Necessary changes
|----|----
|_authorizers.xml_                           | Copy the `<authorizer>...</authorizer>` configured in the existing _authorizers.xml_  to the new NiFi file.If you are using the `file-provider` authorizer， ensure that you copy the _users.xml_ and _authorizations.xml_ files from the existing to the new nifi.Configuration best practices recommend creating a separate location outside of the NiFi base directory for storing such configuration files， for example: `/opt/NiFi/configuration-resources/`. If you are storing these files in a separate directory， you do not need to move them. Instead， ensure that the new NiFi is pointing to the same files.
|_bootstrap-notification-services.xml_       | Use the existing NiFi _bootstrap-notification-services.xml_  file to update properties in the new nifi.
|_bootstrap.conf_                            | Use the existing NiFi _bootstrap.conf_ file to update properties in the new nifi.
|_flow.xml.gz_                               | If you retained the default location for storing flows (`<installation-directory>/conf/`)， copy _flow.xml.gz_ from the existing to the new NiFi base install `conf` directory. If you stored flows to an external location via _nifi.properties_， update the property `nifi.flow.configuration.file` to point there.If you are encrypting sensitive component properties in your dataflow via the sensitive properties key in _nifi.properties_， make sure the same key is used when copying over your _flow.xml.gz_.  If you need to change the key， see the <<sensitive_flow_migration>> section below.
|_nifi.properties_ |Use the existing _nifi.properties_ to populate the same properties in the new NiFi file.<br/><br/>*Note:* This file contains the majority of NiFi configuration settings， so ensure that you have copied the values correctly.<br/>If you followed NiFi best practices， the following properties should be pointing to external directories outside of the base NiFi installation path.<br/>If the below properties point to directories inside the NiFi base installation path， you must copy the target directories to the new nifi. Stop your existing NiFi installation before you do this.<br/><br/>`nifi.flow.configuration.file=`<br/>If you have retained the default value (`./conf/flow.xml.gz`)， copy _flow.xml.gz_ from the existing to the new NiFi base install conf directory.<br/>If you stored flows to an external location， update the property value to point there.<br/><br/>`nifi.flow.configuration.archive.dir=`<br/>Same applies as above if you want to retain archived copies of the _flow.xml.gz_.<br/><br/>`nifi.database.directory=`<br/>Best practices recommends that you use an external location for each repository. Point the new NiFi at the same external database repository location.<br/><br/>`nifi.flowfile.repository.directory=`<br/>Best practices recommends that you use an external location for each repository. Point the new NiFi at the same external flowfile repository location.<br/>*Warning:* You may experience data loss if flowfile repositories are not accessible to the new nifi.<br/><br/>`nifi.content.repository.directory.default=`<br/>Best practices recommends that you use an external location for each repository. Point the new NiFi at the same external content repository location.<br/>Your existing NiFi may have multiple content repos defined. Make sure the exact same property names are used and point to the appropriate matching content repo locations. For example:<br/>`nifi.content.repository.directory.content1=`<br/>`nifi.content.repository.directory.content2=`<br/>*Warning:* You may experience data loss if content repositories are not accessible to the new nifi.<br/>*Warning:* You may experience data loss if property names are wrong or the property points to the wrong content repository.<br/>`nifi.provenance.repository.directory.default=`<br/>Best practices recommends that you use an external location for each repository. Point the new NiFi at the same external provenance repository location.<br/>Your existing NiFi may have multiple content repos defined. Make sure the exact same property names are used and point to the appropriate matching provenance repo locations. For example:<br/>`nifi.provenance.repository.directory.provenance1=`<br/>`nifi.provenance.repository.directory.provenance2=`<br/>*Note:* You may not be able to query old events if provenance repos are not moved correctly or properties are not updated correctly.
| _state-management.xml_ |For the `local-provider` state provider， verify the location of the local directory.<br/>If you have retained the default location (`./state/local`)， copy the complete directory tree to the new nifi. The existing NiFi should be stopped if you are copying this directory because it may be constantly writing to this directory while running.<br/>Configuration best practices recommend that you move the state to an external directory like `/opt/NiFi/configuration-resources/` to facilitate easier upgrading later.<br/><br/>For a NiFi cluster， the `cluster-provider`<br/>ZooKeeper “Connect String" property should be set to the same external ZooKeeper as the existing NiFi installation.<br/><br/>For a NiFi cluster， make sure the `cluster-provider` ZooKeeper "Root Node" property matches exactly the value used in the existing nifi.<br/><br/>If you are also setting up a new external ZooKeeper， see the <<zookeeper_migrator>> section for instructions on how to move ZooKeeper information from one cluster to another and migrate ZooKeeper node ownership.

警告：仔细检查所有配置的属性是否存在错别字。

##### 迁移具有敏感属性的流

在 _nifi.properties_ 中为`nifi.sensitive.props.key`设置值时，指定的密钥用于加密流中的敏感属性（例如，组件中的密码字段）。如果密钥需要更改，NiFi工具包中的Encrypt-Config工具可以迁移敏感属性密钥并更新_flow.xml.gz_。具体来说，加密配置：

1. 读取现有的 _flow.xml.gz_ 并使用当前密钥解密敏感值。  
2. 使用指定的新密钥加密所有敏感值。 
3. 更新 _nifi.properties_ 和 _flow.xml.gz_ 文件或创建它们的新版本。

例如，假设版本1.9.2是现有的NiFi实例，并且敏感属性键设置为“密码”。目标是使用新的敏感属性键“new_password”将1.9.2 _flow.xml.gz_ 移至1.10.0实例。运行以下Encrypt-Config命令将使用原始敏感属性密钥从1.9.2读取 _flow.xml.gz_ 和 _nifi.properties_ 文件，并在1.10.0中写出新版本，并使用新密码对敏感属性进行加密：

```
$ ./NiFi-toolkit-1.10.0/bin/encrypt-config.sh -f /path/to/NiFi/NiFi-1.9.2/conf/flow.xml.gz -g /path/to/NiFi/NiFi-1.10.0/conf/flow.xml.gz -s new_password -n /path/to/NiFi/NiFi-1.9.2/conf/nifi.properties -o /path/to/NiFi/NiFi-1.10.0/conf/nifi.properties -x
```

* `-f` specifies the source _flow.xml.gz_ (NiFi-1.9.2)
* `-g` specifies the destination _flow.xml.gz_ (NiFi-1.10.0)
* `-s` specifies the new sensitive properties key (`new_password`)
* `-n` specifies the source _nifi.properties_ (NiFi-1.9.2)
* `-o` specifies the destination _nifi.properties_ (NiFi-1.10.0)
* `-x` tells Encrypt-Config to only process the sensitive properties

更多信息，请参阅《 NiFi工具包指南》中的<< toolkit-guide.adoc＃encrypt_config_tool，Encrypt-Config Tool >>部分。

### 启动新的NiFi

1. 启动每个新的NiFi实例。 
2. 验证：
    * 你的所有数据流都已返回运行状态。某些处理器可能具有需要配置的新属性，在这种情况下，它们将被停止并标记为无效。 
    * 你所有预期的控制器服务和报告任务将再次运行。解决任何标记为无效的控制器服务或报告任务。 
3. 确认新的NiFi实例稳定并且可以正常工作后，可以删除旧的安装。

注意：如果将原始NiFi设置为作为服务运行，请更新所有符号链接或服务脚本以指向新的NiFi版本可执行文件。