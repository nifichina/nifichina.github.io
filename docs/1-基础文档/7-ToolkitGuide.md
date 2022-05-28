# Apache NiFi Toolkit Guide

***
编辑人:__**酷酷的诚**__  邮箱:**zhangchengk@foxmail.com** 
***

## Overview

NiFi Toolkit包含几个命令行实用程序，用于在独立和群集环境中设置和支持NiFi。这些实用程序包括：

* CLI — `cli`工具可让管理员与NiFi和NiFi Registry实例进行交互，以自动化任务，例如部署版本化流程，管理流程组和集群节点。

* Encrypt Config — `encrypt-config`工具会加密 _nifi.properties_ 文件中的敏感密钥，以便于设置安全的NiFi实例。

* File Manager — `file-manager`工具使管理员能够从备份中备份、安装或还原NiFi安装。

* Flow Analyzer — `flow-analyzer`工具会生成一个报告，可帮助管理员了解指定流程可以存储在背压中的最大数据量。

* Node Manager — `node-manager`工具使管理员能够对节点执行状态检查，并具有从集群连接，断开连接或从中删除节点的能力。

* Notify — `notify`工具使管理员能够将公告发送到NiFi UI。

* S2S — `s2s`工具使管理员可以通过site-to-site向NiFi流发送数据或从NiFi流发送数据。

* TLS Toolkit — `tls-toolkit`会生成所需的密钥库，信任库和相关的配置文件，以简化安全NiFi实例的设置。

* ZooKeeper Migrator — `zk-migrator`工具使管理员能够：

    * 将ZooKeeper信息从一个ZooKeeper集群移动到另一个集群

    * 迁移ZooKeeper节点所有权

这些实用程序将通过NiFi Toolkit安装目录的`bin`文件夹中的脚本执行。

注意：NiFi Toolkit是从NiFi单独下载的 (see the [Apache NiFi Downloads](https://nifi.apache.org/download.html) page).

### Prerequisites for Running in a Secure Environment

对于受保护的节点和群集，应预先配置两个策略：

* Access the controller – 通过创建具有查看和修改权限的“access the controller”策略(`/controller`)，可以在NiFi中授权有权访问这些实用程序的用户。

* Proxy user request – 如果以前未设置，则应授权节点的身份(节点证书的DN值)代表用户代理请求

在安全环境中执行Notify或Node Manager工具时，应使用`proxyDN`标志选项，以正确识别被授权执行这些命令的用户。在非安全环境中，或者如果在节点管理器工具上运行状态操作，则忽略该标志。

## NiFi CLI

该工具提供了一个CLI，该CLI专注于与NiFi和NiFi Registry进行交互以自动化任务，例如将流从NIFi Registy部署到NiFi实例或管理流程组和集群节点。

### Usage

CLI工具包可以在独立模式下执行以执行单个命令，也可以在交互模式下执行以进入交互式外壳。

要执行单个命令：

<pre>
./bin/cli.sh command args
</pre>

要启动交互式shell：

<pre>
./bin/cli.sh
</pre>

要显示帮助：

<pre>
./bin/cli.sh -h
</pre>

以下是可用的命令：

<pre>
demo quick-import
nifi current-user
nifi cluster-summary
nifi connect-node
nifi delete-node
nifi disconnect-node
nifi get-root-id
nifi get-node
nifi get-nodes
nifi offload-node
nifi list-reg-clients
nifi create-reg-client
nifi update-reg-client
nifi get-reg-client-id
nifi pg-import
nifi pg-start
nifi pg-stop
nifi pg-get-vars
nifi pg-set-var
nifi pg-get-version
nifi pg-change-version
nifi pg-get-all-versions
nifi pg-list
nifi pg-status
nifi pg-get-services
nifi pg-enable-services
nifi pg-disable-services
nifi pg-create-service
nifi create-user
nifi list-users
nifi create-user-group
nifi list-user-groups
nifi update-user-group
nifi get-policy
nifi update-policy
nifi create-service
nifi get-services
nifi get-service
nifi disable-services
nifi enable-services
nifi get-reporting-task
nifi get-reporting-tasks
nifi create-reporting-task
nifi set-param
nifi delete-param
nifi list-param-contexts
nifi get-param-context
nifi create-param-context
nifi delete-param-context
nifi merge-param-context
nifi import-param-context
nifi pg-get-param-context
nifi pg-set-param-context
nifi list-templates
nifi download-template
nifi upload-template
nifi start-reporting-tasks
nifi stop-reporting-tasks
registry current-user
registry list-buckets
registry create-bucket
registry delete-bucket
registry list-flows
registry create-flow
registry delete-flow
registry list-flow-versions
registry export-flow-version
registry import-flow-version
registry sync-flow-versions
registry transfer-flow-version
registry diff-flow-versions
registry upload-bundle
registry upload-bundles
registry list-bundle-groups
registry list-bundle-artifacts
registry list-bundle-versions
registry download-bundle
registry get-bundle-checksum
registry list-extension-tags
registry list-extensions
registry list-users
registry create-user
registry update-user
registry list-user-groups
registry create-user-group
registry update-user-group
registry get-policy
registry update-policy
registry update-bucket-policy
session keys
session show
session get
session set
session remove
session clear
exit
help
</pre>

要显示特定命令的广泛帮助：

<pre>
./bin/cli.sh command -h
</pre>

### Property/Argument Handling

大多数命令都需要为NiFi或NiFi Registry实例指定baseUrl。

在NiFi Registry实例中列出存储桶的示例命令如下：

<pre>
./bin/cli.sh registry list-buckets -u http://localhost:18080
</pre>

为了避免在每个命令上指定URL(以及可能的TLS其他可选参数)，可以定义一个包含重复参数的属性文件。

本地NiFi Registry实例的示例属性文件如下所示：
```
 baseUrl=http://localhost:18080
 keystore=
 keystoreType=
 keystorePasswd=
 keyPasswd=
 truststore=
 truststoreType=
 truststorePasswd=
 proxiedEntity=
```

然后通过指定`-p`可以在命令上使用该属性文件：

<pre>
./bin/cli.sh registry list-buckets -p /path/to/local-nifi-registry.properties
</pre>

然后，您可以为计划与之交互的每个环境维护一个属性文件，例如Dev，QA和Prod。

除了在每个命令上指定属性文件之外，您还可以设置默认属性文件，以在未指定属性文件的情况下使用。

默认属性文件是使用`session`概念指定的，该概念在名为 _.nifi-cli.config_ 的文件中保留在用户的主目录中。
为NiFi设置默认属性文件的示例如下：
<pre>
./bin/cli.sh session set nifi.props /path/to/local-nifi.properties
</pre>

NiFi Registry的示例如下：
<pre>
./bin/cli.sh session set nifi.reg.props /path/to/local-nifi-registry.properties
</pre>

这会将上述属性写入用户主目录中的 _.nifi-cli.config_ 中，并允许在不指定URL或属性文件的情况下执行命令：

<pre>
./bin/cli.sh registry list-buckets
</pre>

上面的命令现在将使用 _local-nifi-registry.properties_ 中的`baseUrl`。

解决参数的顺序如下：

* 直接参数会覆盖属性文件或会话中的所有内容

* 属性文件参数(-p)覆盖会话

* 如果未指定其他任何内容，则使用该会话

### Security Configuration

如果NiFi和NiFi注册表受到保护，则从CLI执行的命令将需要建立TLS连接并以具有执行所需操作权限的用户身份进行身份验证。

当前，CLI支持使用客户端证书和可选的代理实体进行身份验证。一种常见的情况是从安装NiFi或NiFi Registry的节点之一运行CLI，这使CLI可以使用与NiFi/NiFi Registry实例相同的密钥库和信任库。

可以按命令或在上一节中描述的属性文件之一中指定安全性配置。

以下示例适用于NiFi Registry，但相同的概念适用于NiFi命令。

#### Example - Secure NiFi Registry without Proxied-Entity

假设我们有一个包含"CN=user1, OU=NIFI"证书的密钥库，则示例属性文件如下：
```
baseUrl=https://localhost:18443
 keystore=/path/to/keystore.jks
 keystoreType=JKS
 keystorePasswd=changeme
 keyPasswd=changeme
 truststore=/path/to/truststore.jks
 truststoreType=JKS
 truststorePasswd=changeme
```

在此示例中，命令将以"CN=user1, OU=NIFI"执行。该用户必须是NiFi Registry中的用户，并且访问存储桶的命令将仅限于该用户有权访问的存储桶。

#### Example - Secure NiFi Registry with Proxied-Entity

假设我们可以访问NiFi Registry本身的密钥库，并且NiFi Registry也配置为允许Kerberos或LDAP身份验证，则示例属性文件如下：

```
baseUrl=https://localhost:18443
 keystore=/path/to/keystore.jks
 keystoreType=JKS
 keystorePasswd=changeme
 keyPasswd=changeme
 truststore=/path/to/truststore.jks
 truststoreType=JKS
 truststorePasswd=changeme
 proxiedEntity=user1@NIFI.COM
```

在此示例中，_keystore.jks_ 中的证书将用于NiFi Registry服务器，例如"CN=localhost, OU=NIFI"。该身份需要在NiFi Registry中定义为用户，并具有“Proxy”的权限。

"CN=localhost, OU=NIFI" 将作为要以[user1@NIFI.COM](mailto：user1@NIFI.COM)执行的代理命令。

### nteractive Usage

在交互模式下，Tab键可用于执行自动完成。
例如，在空提示下键入tab应该显示第一个参数的可能命令：
<pre>
#>
demo       exit       help       nifi       registry   session
</pre>

键入“nifi ”，然后Tab键将显示NiFi的子命令：
<pre>
#> nifi
cluster-summary         enable-services         list-templates          pg-list
connect-node            export-param-context    list-user-groups        pg-set-param-context
create-param-context    get-node                list-users              pg-set-var
create-reg-client       get-nodes               merge-param-context     pg-start
create-reporting-task   get-param-context       offload-node            pg-status
create-service          get-policy              pg-change-version       pg-stop
create-user             get-reg-client-id       pg-create-service       set-param
create-user-group       get-reporting-task      pg-disable-services     start-reporting-tasks
current-user            get-reporting-tasks     pg-enable-services      stop-reporting-tasks
delete-node             get-root-id             pg-get-all-versions     update-policy
delete-param            get-service             pg-get-param-context    update-reg-client
delete-param-context    get-services            pg-get-services         update-user-group
disable-services        import-param-context    pg-get-vars             upload-template
disconnect-node         list-param-contexts     pg-get-version
download-template       list-reg-clients        pg-import
</pre>

代表文件路径的参数(例如-p或在会话中设置属性文件时)将自动完成所键入的路径：
<pre>
#> session set nifi.props /tmp/
dir1/   dir2/   dir3/
</pre>

### Output

大多数命令都支持指定`--outputType`参数或简称为`-ot`的功能。
当前，输出类型可能是simple或json。

交互模式下的默认输出类型很简单，而独立模式下的默认输出类型是json。
`list-buckets`的简单输出示例：
<pre>
#> registry list-buckets -ot simple
My Bucket - 3c7b7467-0012-4d8f-a918-6aa42b6b9d39
</pre>

list-buckets的json输出示例：
<pre>
#> registry list-buckets -ot json
[ {
  "identifier" : "3c7b7467-0012-4d8f-a918-6aa42b6b9d39",
  "name" : "My Bucket",
  "createdTimestamp" : 1516718733854,
  "permissions" : {
    "canRead" : true,
    "canWrite" : true,
    "canDelete" : true
  },
  "link" : {
    "params" : {
      "rel" : "self"
    },
    "href" : "buckets/3c7b7467-0012-4d8f-a918-6aa42b6b9d39"
  }
} ]
</pre>

### Back-Referencing

使用交互式CLI时，常见的情况是将上一个结果中的id用作下一个命令的输入。反向引用提供了一种快捷方式，用于通过位置引用来引用先前命令的结果。

col 1 | col 2                                                                                                            
----- | -----------------------------------------------------------------------------------------------------------------
__    | Not every command produces back-references. To determine if a command supports back-referencing, check the usage.

<pre>
#> registry list-buckets help
Lists the buckets that the current user has access to.
PRODUCES BACK-REFERENCES
</pre>

利用反向引用的常见情况如下：
1.  用户首先浏览注册表实例中的可用存储桶

    <pre>
    #> registry list-buckets
    #   Name           Id                                     Description
    -   ------------   ------------------------------------   -----------
    1   My Bucket      3c7b7467-0012-4d8f-a918-6aa42b6b9d39   (empty)
    2   Other Bucket   175fb557-43a2-4abb-871f-81a354f47bc2   (empty)
    </pre>

2.  然后，用户使用位置1中先前结果的存储桶ID的向后引用，查看其中一个存储桶中的流

    <pre>
    #> registry list-flows -b &1
    Using a positional back-reference for 'My Bucket'
    #   Name      Id                                     Description
    -   -------   ------------------------------------   ----------------
    1   My Flow   06acb207-d2f1-447f-85ed-9b8672fe6d30   This is my flow.
    </pre>

3.  然后，用户使用对位置1中先前结果的流ID的反向引用来查看流的版本

    <pre>
    #> registry list-flow-versions -f &1
    Using a positional back-reference for 'My Flow'
    Ver   Date                         Author                     Message
    ---   --------------------------   ------------------------   -------------------------------------
    1     Tue, Jan 23 2018 09:48 EST   anonymous                  This is the first version of my flow.
    </pre>

4.  用户使用对存储桶的反向引用和步骤2中的流ID部署流的版本1

    <pre>
    #> nifi pg-import -b &1 -f &1 -fv 1
    Using a positional back-reference for 'My Bucket'
    Using a positional back-reference for 'My Flow'
    9bd157d4-0161-1000-b946-c1f9b1832efd
    </pre>

步骤4之所以能够引用步骤2的结果，是因为步骤3中的`list-flow-versions`命令不会产生反向引用，因此步骤2的结果仍然可用。

### Adding Commands

要添加NiFi命令，请创建扩展`AbstractNiFiCommand`的新类：
```java
public class MyCommand extends AbstractNiFiCommand {

  public MyCommand() {
      super("my-command");
  }

  @Override
  protected void doExecute(NiFiClient client, Properties properties)
          throws NiFiClientException, IOException, MissingOptionException, CommandException {
      // TODO implement
  }

  @Override
  public String getDescription() {
      return "This is my new command";
  }
}
```

将新命令添加到`NiFiCommandGroup`中：

```java
commands.add(new MyCommand());
```

要添加NiFi Registry命令，请执行相同的步骤，但要从`AbstractNiFiRegistryCommand`扩展，然后将命令添加至`NiFiRegistryCommandGroup`。

## Encrypt-Config Tool

`encrypt-config`命令行工具(称为`./bin/encrypt-config.sh`或`bin\encrypt-config.bat`)从具有明文敏感配置值的 _nifi.properties_ 文件中读取，提示输入root密码或原始十六进制密钥，并加密每个值。它将原始值替换为同一文件中的受保护值，或者如果指定，则写入新的 _nifi.properties_ 文件。

使用的默认加密算法是AES/GCM128/256位。如果未安装JCE无限强度加密管辖区策略文件，则使用128位；如果安装了256位，则使用256位。

### Usage

To show help:

<pre>
./bin/encrypt-config.sh -h
</pre>

以下是可用的选项：
* `-h`,`--help`                                 Prints this usage message

* `-v`,`--verbose`                              Sets verbose mode (default false)

* `-n`,`--niFiProperties <arg>`                 The _nifi.properties_ file containing unprotected config values (will be overwritten)

* `-l`,`--loginIdentityProviders <arg>`         The _login-identity-providers.xml_ file containing unprotected config values (will be overwritten)

* `-a`,`--authorizers <arg>`                    The _authorizers.xml_ file containing unprotected config values (will be overwritten)

* `-f`,`--flowXml <arg>`                        The _flow.xml.gz_ file currently protected with old password (will be overwritten)

* `-b`,`--bootstrapConf <arg>`                  The _bootstrap.conf_ file to persist root key

* `-o`,`--outputNiFiProperties <arg>`           The destination _nifi.properties_ file containing protected config values (will not modify input _nifi.properties_)

* `-i`,`--outputLoginIdentityProviders <arg>`   The destination _login-identity-providers.xml_ file containing protected config values (will not modify input _login-identity-providers.xml_)

* `-u`,`--outputAuthorizers <arg>`              The destination _authorizers.xml_ file containing protected config values (will not modify input _authorizers.xml_)

* `-g`,`--outputFlowXml <arg>`                  The destination _flow.xml.gz_ file containing protected config values (will not modify input _flow.xml.gz_)

* `-k`,`--key <arg>`                            The raw hexadecimal key to use to encrypt the sensitive properties

* `-e`,`--oldKey <arg>`                         The old raw hexadecimal key to use during key migration

* `-p`,`--password <arg>`                       The password from which to derive the key to use to encrypt the sensitive properties

* `-w`,`--oldPassword <arg>`                    The old password from which to derive the key during migration

* `-r`,`--useRawKey`                            If provided, the secure console will prompt for the raw key value in hexadecimal form

* `-m`,`--migrate`                              If provided, the _nifi.properties_ and/or _login-identity-providers.xml_ sensitive properties will be re-encrypted with a new key

* `-x`,`--encryptFlowXmlOnly`                   If provided, the properties in _flow.xml.gz_ will be re-encrypted with a new key but the _nifi.properties_ and/or _login-identity-providers.xml_ files will not be modified

* `-s`,`--propsKey <arg>`                       The password or key to use to encrypt the sensitive processor properties in _flow.xml.gz_

* `-A`,`--newFlowAlgorithm <arg>`               The algorithm to use to encrypt the sensitive processor properties in _flow.xml.gz_

* `-P`,`--newFlowProvider <arg>`                The security provider to use to encrypt the sensitive processor properties in _flow.xml.gz_

作为该工具如何工作的示例，假设您已将该工具安装在支持256位加密并且 _nifi.properties_ 文件中具有以下现有值的计算机上：

```
# security properties #
nifi.sensitive.props.key=thisIsABadSensitiveKeyPassword
nifi.sensitive.props.algorithm=PBEWITHMD5AND256BITAES-CBC-OPENSSL
nifi.sensitive.props.provider=BC
nifi.sensitive.props.additional.keys=

nifi.security.keystore=/path/to/keystore.jks
nifi.security.keystoreType=JKS
nifi.security.keystorePasswd=thisIsABadKeystorePassword
nifi.security.keyPasswd=thisIsABadKeyPassword
nifi.security.truststore=
nifi.security.truststoreType=
nifi.security.truststorePasswd=
```

Enter the following arguments when using the tool:

<pre>
encrypt-config.sh
-b bootstrap.conf
-k 0123456789ABCDEFFEDCBA98765432100123456789ABCDEFFEDCBA9876543210
-n nifi.properties
</pre>

结果，_nifi.properties_ 文件被受保护的属性和同级加密标识符(“aes/gcm/256”，当前支持的算法)覆盖：

```
# security properties #
nifi.sensitive.props.key=n2z+tTTbHuZ4V4V2||uWhdasyDXD4ZG2lMAes/vqh6u4vaz4xgL4aEbF4Y/dXevqk3ulRcOwf1vc4RDQ==
nifi.sensitive.props.key.protected=aes/gcm/256
nifi.sensitive.props.algorithm=PBEWITHMD5AND256BITAES-CBC-OPENSSL
nifi.sensitive.props.provider=BC
nifi.sensitive.props.additional.keys=

nifi.security.keystore=/path/to/keystore.jks
nifi.security.keystoreType=JKS
nifi.security.keystorePasswd=oBjT92hIGRElIGOh||MZ6uYuWNBrOA6usq/Jt3DaD2e4otNirZDytac/w/KFe0HOkrJR03vcbo
nifi.security.keystorePasswd.protected=aes/gcm/256
nifi.security.keyPasswd=ac/BaE35SL/esLiJ||+ULRvRLYdIDA2VqpE0eQXDEMjaLBMG2kbKOdOwBk/hGebDKlVg==
nifi.security.keyPasswd.protected=aes/gcm/256
nifi.security.truststore=
nifi.security.truststoreType=
nifi.security.truststorePasswd=
```

此外，使用加密密钥更新 _bootstrap.conf_文 件，如下所示：
```
# Root key in hexadecimal format for encrypted sensitive configuration values
nifi.bootstrap.sensitive.key=0123456789ABCDEFFEDCBA98765432100123456789ABCDEFFEDCBA9876543210
```

默认情况下，该工具会加密敏感的配置值，但是，如果需要，您可以加密任何其他属性。要加密其他属性，请在`nifi.sensitive.props.additional.keys`属性中将其指定为逗号分隔的值。

如果 _nifi.properties_ 文件已经具有有效的受保护值，则该工具不会修改这些属性值。

当应用于 _login-identity-providers.xml_ 和 _authorizers.xml_ 时，属性元素将使用`encryption`属性进行更新：

受保护的_login-identity-providers.xml_的示例：

```
<!-- LDAP Provider -->
   <provider>
       <identifier>ldap-provider</identifier>
       <class>org.apache.nifi.ldap.LdapProvider</class>
       <property name="Authentication Strategy">START_TLS</property>
       <property name="Manager DN">someuser</property>
       <property name="Manager Password" encryption="aes/gcm/128">q4r7WIgN0MaxdAKM||SGgdCTPGSFEcuH4RraMYEdeyVbOx93abdWTVSWvh1w+klA</property>
       <property name="TLS - Keystore"></property>
       <property name="TLS - Keystore Password" encryption="aes/gcm/128">Uah59TWX+Ru5GY5p||B44RT/LJtC08QWA5ehQf01JxIpf0qSJUzug25UwkF5a50g</property>
       <property name="TLS - Keystore Type"></property>
       ...
   </provider>
```

受保护的 _authorizers.xml_ 的示例：

```
<!-- LDAP User Group Provider -->
   <userGroupProvider>
       <identifier>ldap-user-group-provider</identifier>
       <class>org.apache.nifi.ldap.tenants.LdapUserGroupProvider</class>
       <property name="Authentication Strategy">START_TLS</property>
       <property name="Manager DN">someuser</property>
       <property name="Manager Password" encryption="aes/gcm/128">q4r7WIgN0MaxdAKM||SGgdCTPGSFEcuH4RraMYEdeyVbOx93abdWTVSWvh1w+klA</property>
       <property name="TLS - Keystore"></property>
       <property name="TLS - Keystore Password" encryption="aes/gcm/128">Uah59TWX+Ru5GY5p||B44RT/LJtC08QWA5ehQf01JxIpf0qSJUzug25UwkF5a50g</property>
       <property name="TLS - Keystore Type"></property>
       ...
   </userGroupProvider>
```

## File Manager

File Manager(称为`./bin/file-manager.sh` `bin\file-manager.bat`)允许系统管理员对现有NiFi安装进行备份，在新版NiFi中安装指定的位置(在迁移任何先前的配置设置时)或从先前的备份中还原安装。文件管理器支持NiFi 1.0.0及更高版本。

### Usage

要显示帮助：

<pre>
./bin/file-manager.sh -h
</pre>

以下是可用的选项：

* `-b`,`--backupDir <arg>`          Backup NiFi Directory (used with backup or restore operation)

* `-c`,`--nifiCurrentDir <arg>`     Current NiFi Installation Directory (used optionally with install or restore operation)

* `-d`,`--nifiInstallDir <arg>`     NiFi Installation Directory (used with install or restore operation)

* `-h`,`--help`                     Print help info (optional)

* `-i`,`--installFile <arg>`        NiFi Install File (used with install operation)

* `-m`,`--moveRepositories`         Allow repositories to be moved to new/restored nifi directory from existing installation, if available (used optionally with install or restore operation)

* `-o`,`--operation <arg>`          File operation (install | backup | restore)

* `-r`,`--nifiRollbackDir <arg>`    NiFi Installation Directory (used with install or restore operation)

* `-t`,`--bootstrapConf <arg>`      Current NiFi Bootstrap Configuration File (used optionally)

* `-v`,`--verbose`                  Verbose messaging (optional)

* `-x`,`--overwriteConfigs`         Overwrite existing configuration directory with upgrade changes (used optionally with install or restore operation)

在Linux上的用法示例：

<pre>
# backup NiFi installation
# option -t may be provided to ensure backup of external boostrap.conf file
./file-manager.sh
-o backup
–b /tmp/nifi_bak
–c /usr/nifi_old
-v
</pre>

<pre>
# install NiFi using compressed tar file into /usr/nifi directory (should install as /usr/nifi/nifi-1.3.0).
# migrate existing configurations with location determined by external bootstrap.conf and move over repositories from nifi_old
# options -t and -c should both be provided if migration of configurations, state and repositories are required
./file-manager.sh
-o install
–i nifi-1.3.0.tar.gz
–d /usr/nifi
–c /usr/nifi/nifi_old
-t /usr/nifi/old_conf/bootstrap.conf
-v
-m
</pre>

<pre>
# restore NiFi installation from backup directory and move back repositories
# option -t may be provided to ensure bootstrap.conf is restored to the file path provided, otherwise it is placed in the
# default directory under the rollback path (e.g. /usr/nifi_old/conf)
./file-manager.sh
-o restore
–b /tmp/nifi_bak
–r /usr/nifi_old
–c /usr/nifi
-m
-v
</pre>

### Expected Behavior

#### Backup

在备份操作期间，将在现有NiFi安装的指定位置创建备份目录。备份将捕获所有关键文件(包括任何内部或外部配置，库，脚本和文档)，但是由于潜在的大小，它不包括备份存储库和日志。如果配置/库文件位于现有安装文件夹的外部，则备份操作也将捕获这些文件。

#### Install

在安装过程中，文件管理器将使用指定的NiFi二进制文件(tar.gz或zip文件)执行安装，以创建新安装或将现有nifi安装迁移到新安装。安装可以选择将存储库(如果位于当前安装的配置文件夹中)移至新安装，以及将配置文件迁移至较新的安装。

#### Restore

通过还原操作，现有安装可以还原为先前的安装。使用现有的备份目录(通过备份操作创建)，FileManager实用程序将还原库，脚本和文档，并还原到以前的配置。

注意： 如果由于安装了较新版本的NiFi而更改了存储库，则在恢复过程中它们可能不再兼容。在那种情况下，请排除`-m`选项以确保将创建新的存储库，或者，如果存储库位于NiFi目录之外，请删除它们，以便可以在还原后启动时重新创建它们。 

## Flow Analyzer

The `flow-analyzer` tool (invoked as `./bin/flow-analyzer.sh` or `bin\flow-analyzer.bat`) analyzes the _flow.xml.gz_ file and reports:

* Total Bytes Utilized by the System

* Min/Max Back Pressure Size

* Average Back Pressure Size

* Min/Max Flowfile Queue Size

* Average Flowfile Queue Size

### Usage

执行`flow-analyzer`工具：

<pre>
flow-analyzer.sh flow.xml.gz路径
</pre>

例：

<pre>
$ ./flow-analyzer.sh /Users/nifiuser/nifi-1.8.0/conf/flow.xml.gz
Using flow=/Users/nifiuser/nifi-1.8.0/conf/flow.xml.gz
Total Bytes Utilized by System=1518 GB
Max Back Pressure Size=1 GB
Min Back Pressure Size=1 GB
Average Back Pressure Size=2.504950495 GB
Max Flowfile Queue Size=10000
Min Flowfile Queue Size=10000
Avg Flowfile Queue Size=10000.000000000
</pre>

## Node Manager

节点管理器(称为`./bin/node-manager.sh` or `bin\node-manager.bat`)支持在群集中连接，断开连接和删除节点(如果节点不属于该节点，则会显示错误消息集群)以及获取节点的状态。当节点与群集断开连接并且需要连接或移除时，应提供已连接节点的URL列表，以将所需命令发送到活动群集。节点管理器支持NiFi 1.0.0及更高版本。

### Usage

To show help:

<pre>
./bin/node-manager.sh -h
</pre>

The following are available options:

* `-b`,`--bootstrapConf <arg>`     Existing Bootstrap Configuration file (required)

* `-d`,`--nifiInstallDir <arg>`    NiFi Root Folder (required)

* `-h`,`--help`                    Help Text (optional)

* `-o`, `--operation <arg>`        Operations supported: status, connect (cluster), disconnect (cluster), remove (cluster)

* `-p`,`--proxyDN <arg>`           Proxy or User DN (required for secured nodes doing connect, disconnect and remove operations)

* `-u`,`--clusterUrls <arg>`       Comma delimited list of active urls for cluster (optional). Not required for disconnecting a node yet will be needed when connecting or removing from a cluster

* `-v`,`--verbose`                 Verbose messaging (optional)

To connect, disconnect, or remove a node from a cluster:

<pre>
node-manager.sh -d {$NIFI_HOME} –b { nifi bootstrap file path}
-o {remove|disconnect|connect|status} [-u {url list}] [-p {proxy name}] [-v]
</pre>

Example usage on Linux:

<pre>
# disconnect without cluster url list
./node-manager.sh
-d /usr/nifi/nifi_current
-b /usr/nifi/nifi_current/conf/bootstrap.conf
-o disconnect
–p ydavis@nifi
-v
</pre>

<pre>
#with url list
./node-manager.sh
-d /usr/nifi/nifi_current
-b /usr/nifi/nifi_current/conf/bootstrap.conf
-o connect
-u 'http://nifi-server-1:8080,http://nifi-server-2:8080'
-v
</pre>

Example usage on Windows:

<pre>
node-manager.bat
-d "C:\\Program Files\\nifi\\nifi-1.2.0-SNAPSHOT"
-b "C:\\Program Files\\nifi\\nifi-1.2.0-SNAPSHOT\\conf\\bootstrap.conf"
-o disconnect
–v
</pre>

### Expected Behavior

#### Status

要获取有关节点的UI可用性的信息，可以使用状态操作来确定节点是否正在运行。如果未提供`-u(clusterUrls)`选项，则检查当前节点的URL，否则将检查提供的URL。

#### Disconnect

当节点从群集断开连接时，节点本身应显示为已断开连接，并且群集应具有公告，指示已收到断开连接请求。群集还应显示群集中可用的_n-1 /n_个节点。例如，如果1个节点与3节点群集断开连接，则群集中的其余节点上应显示“ 2 of 3”节点。在节点断开连接的群集上，不允许更改流。

#### Connect

当执行connect命令将节点重新连接到群集时，完成后，节点本身应通过显示 _n/n_ 个节点来表明它已重新加入群集。以前它会显示为已断开连接。群集中的其他节点应收到连接请求的公告，并显示 _n/n_ 个节点，以允许对流进行更改。

#### Remove

当执行remove命令时，该节点应显示为与群集断开连接。群集中剩余的节点应显示 _n-1/n-1_ 个节点。例如，如果从3节点群集中删除1个节点，则其余2个节点应显示“2 of 2”个节点。群集应允许调整流量。如果重新启动并且该集群的流量没有更改，那么已删除的节点可以重新加入该集群。如果更改了流，则应在重新启动节点之前删除已删除节点的流模板，以使其获得群集流(否则可能会发生不可继承的流文件异常)。

## Notify

通知(称为`./bin/notify.sh` or `bin\notify.bat`)允许管理员将消息作为公告发送到NiFi。 NiFi版本1.2.0和更高版本支持通知。

### Usage

To show help:

<pre>
./bin/notify.sh -h
</pre>

The following are available options:

* `-b`,`--bootstrapConf <arg>`      Existing Bootstrap Configuration file (required)

* `-d`,`--nifiInstallDir <arg>`     NiFi Root Folder (required)

* `-h`,`--help`                     Help Text (optional)

* `-l`,`--level <arg>`              Status level of bulletin – `INFO`, `WARN`, `ERROR`

* `-m`,`--message <arg>`            Bulletin message (required)

* `-p`,`--proxyDN <arg>`            Proxy or User DN (required for secured nodes)

* `-v`,`--verbose`                  Verbose messaging (optional)

发送通知：

<pre>
notify.sh -d {$NIFI_HOME} –b {nifi bootstrap file path} -m {message} [-l {level}] [-v]
</pre>

在Linux上的用法示例：

<pre>
./notify.sh -d /usr/nifi/nifi_current -b /usr/nifi/nifi_current/conf/bootstrap.conf -m "Test Message Server 1" -l "WARN" –p “ydavis@nifi” -v
</pre>

Windows上的示例用法：

<pre>
notify.bat -v -d "C:\\Program Files\\nifi\\nifi-1.2.0-SNAPSHOT" -b "C:\\Program Files\\nifi\\nifi-1.2.0-SNAPSHOT\\conf\\bootstrap.conf" -m "Test Message Server 1" -v
</pre>

执行上述命令行应该会在NiFi中显示一个公告：

![NiFi Notifications](https://nifichina.gitee.io/image/general/nifi-notifications.png)

## S2S

S2S是一种命令行工具(称为`./bin/s2s.sh` or `bin\s2s.bat`)，可以从stdin读取DataPackets列表以通过站点到站点进行发送，也可以写入接收到的DataPackets到标准输出。

### Usage

要显示帮助：

<pre>
./bin/s2s.sh -h
</pre>

以下是可用的选项：

* `--batchCount <arg>`             Number of flow files in a batch

* `--batchDuration <arg>`          Duration of a batch

* `--batchSize <arg>`              Size of flow files in a batch

* `-c`,`--compression`             Use compression

* `-d`,`--direction`               Direction (valid directions: `SEND`, `RECEIVE`) (default: `SEND`)

* `-h`,`--help`                    Help Text (optional)

* `-i`,`--portIdentifier <arg>`    Port id

* `--keystore <arg>`               Keystore

* `--keyStorePassword <arg>`       Keystore password

* `--keyStoreType <arg>`           Keystore type (default: `JKS`)

* `-n`,`--portName`                Port name

* `-p`,`--transportProtocol`       Site to site transport protocol (default: `RAW`)

* `--peerPersistenceFile <arg>`    File to write peer information to so it can be recovered on restart

* `--penalization <arg>`           Penalization period

* `--proxyHost <arg>`              Proxy hostname

* `--proxyPassword <arg>`          Proxy password

* `--proxyPort <arg>`              Proxy port

* `--proxyUsername <arg>`          Proxy username

* `--timeout <arg>`                Timeout

* `--trustStore <arg>`             Truststore

* `--trustStorePassword <arg>`     Truststore password

* `--trustStoreType <arg>`         Truststore type (default: `JKS`)

* `-u,--url <arg>`                 NiFI URL to connect to (default: `http://localhost:8080/nifi`)

s2s cli输入/输出格式是DataPackets的JSON列表。它们可以具有以下格式：

<pre>
[{"attributes":{"key":"value"},"data":"aGVsbG8gbmlmaQ=="}]
</pre>

其中data是FlowFile内容的base64编码值(始终用于接收的数据)或：
<pre>
[{"attributes":{"key":"value"},"dataFile":"/Users/pvillard/Documents/GitHub/nifi/nifi-toolkit/nifi-toolkit-assembly/target/nifi-toolkit-1.9.0-SNAPSHOT-bin/nifi-toolkit-1.9.0-SNAPSHOT/bin/EXAMPLE"}]
</pre>

其中dataFile是从中读取FlowFile内容的文件。

用法示例，通过带有名为“input”的输入端口的HTTP，将内容为“hey nifi”的FlowFile发送到本地不安全的NiFi：

<pre>
echo '[{"data":"aGV5IG5pZmk="}]' | bin/s2s.sh -n input -p http
</pre>

## TLS Toolkit

为了促进NiFi的安全设置，您可以使用`tls-toolkit`命令行实用程序自动生成所需的密钥库，信任库和相关的配置文件。这对于保护多个NiFi节点特别有用，这可能是一个乏味且容易出错的过程。

注意： 请注意，macOS 10.15中对受信任证书有新要求。可以在[here](https://support.apple.com/zh-cn/HT210176)中找到详细信息，但特别重要的是，2019年7月1日之后颁发的所有TLS服务器证书必须具有不多于825天的有效期。

Requirements for trusted certificates in iOS 13 and macOS 10.15

Learn about new security requirements for TLS server certificates in iOS 13 and macOS 10.15.

All TLS server certificates must comply with these new security requirements in iOS 13 and macOS 10.15:

* TLS server certificates and issuing CAs using RSA keys must use key sizes greater than or equal to 2048 bits. Certificates using RSA key sizes smaller than 2048 bits are no longer trusted for TLS.
* TLS server certificates and issuing CAs must use a hash algorithm from the SHA-2 family in the signature algorithm. SHA-1 signed certificates are no longer trusted for TLS.
* TLS server certificates must present the DNS name of the server in the Subject Alternative Name extension of the certificate. DNS names in the CommonName of a certificate are no longer trusted.

Additionally, all TLS server certificates issued after July 1, 2019 (as indicated in the NotBefore field of the certificate) must follow these guidelines:

* TLS server certificates must contain an ExtendedKeyUsage (EKU) extension containing the id-kp-serverAuth OID.
* TLS server certificates must have a validity period of 825 days or fewer (as expressed in the NotBefore and NotAfter fields of the certificate).

Connections to TLS servers violating these new requirements will fail and may cause network failures, apps to fail, and websites to not load in Safari in iOS 13 and macOS 10.15.

Published Date: November 03, 2019


### 通配符证书(Wildcard Certificates)

通配符证书(两个节点“node1.nifi.apache.org”和“node2.nifi.apache.org”被分配了具有*.nifi.apache.org的CN或SAN条目的同一证书)是**不被官方支持**和**不推荐**。使用通配符证书有许多弊端，并且在以前的版本中，出于偶然(而非有意的支持)而出现了使用通配符证书的群集。 如果每个证书都维护一个额外的唯一SAN条目和CN条目，则可以使用通配符SAN条目。

#### Potential issues with wildcard certificates

* 在整个代码库的许多地方，群集通信多次使用证书标识来标识节点，如果证书仅显示通配符DN，则不能解析为特定节点

* 管理员可能需要在 _authorizers.xml_ 中为 `*.nifi.apache.org` 提供一个自定义节点身份，因为所有代理操作仅会解析为证书DN（有关更多信息，请参见《系统管理员指南》中的用户身份验证部分）。

* 管理员无法追溯到哪个节点执行了操作，因为他们都解析为同一DN

* 管理员在同一台计算机上使用不同的端口在多个实例上运行以标识它们的实例时，可能会不小心将node1主机名与node2端口放在一起，该地址将解析为正确，因为它使用的是相同的证书，但是主机标头处理程序将阻止它，因为没有正确地将“node1”主机名列出为“node2”实例的可接受主机

* 如果通配符证书被破坏，则所有节点都被破坏

注意： 建议将JKS密钥库和信任库用于NiFi。该工具允许在命令行上指定其他密钥库类型，但会忽略用作信任库的PKCS12类型，因为该格式在BouncyCastle和Oracle实现之间存在一些兼容性问题。

### 操作模式(Operation Modes)

tls-toolkit命令行工具具有两种主要的操作模式：

1.  Standalone（独立）— 在一个命令中生成证书颁发机构，密钥库，信任库和 _nifi.properties_ 文件。

2.  Client/Server — 使用证书颁发机构服务器，该服务器接受来自客户端的证书签名请求，对其进行签名，然后将生成的证书发回。客户端和服务器都通过共享机密验证对方的身份。

#### Standalone

通过运行`./bin/tls-toolkit.sh standalone` or `bin\tls-toolkit.sh standalone`来调用独立模式 

##### Usage

要显示帮助：

<pre>
./bin/tls-toolkit.sh standalone -h
</pre>

以下是可用的选项：

* `-a`,`--keyAlgorithm <arg>`                   用于生成密钥的算法(默认: `RSA`)

* `--additionalCACertificate <arg>`             必要时采用PEM格式的其他CA证书（用于签署工具包CA证书）的路径

* `-B`,`--clientCertPassword <arg>`             客户证书的密码。每个客户端DN必须为一个值或一个值（如果未指定，则自动生成）

* `-c`,`--certificateAuthorityHostname <arg>`   NiFi证书颁发机构的主机名（默认值：`localhost`）

* `-C`,`--clientCertDn <arg>`                   生成适用于具有指定DN的浏览器的客户端证书（可以多次指定）

* `-d`,`--days <arg>`                           颁发证书的天数应在（有效期：`825`)

* `-f`,`--nifiPropertiesFile <arg>`             要更新的基本 _nifi.properties_ 文件（如果未指定，则将使用与默认NiFi安装中的嵌入文件相同的嵌入文件）

* `-g`,`--differentKeyAndKeystorePasswords`     为密钥和密钥库使用不同的生成密码

* `-G`,`--globalPortSequence <arg>`             使用根据提供的主机名表达式为所有主机计算的顺序端口（可以多次指定，从运行到运行必须相同）

* `-h`,`--help`                                 打印帮助并退出

* `-k`,`--keySize <arg>`                        生成密钥的位数（默认值：2048）

* `-K`,`--keyPassword <arg>`                    要使用的密钥密码。每个主机必须为一个值或一个值（如果未指定，则自动生成）

* `-n`,`--hostnames <arg>`                      以逗号分隔的主机名列表

* `--nifiDnPrefix <arg>`                        确定DN时要附加到主机名的字符串（默认值：`CN =`）

* `--nifiDnSuffix <arg>`                        确定DN时附加到主机名的字符串（默认值：`，OU = NIFI`）

* `-o`,`--outputDirectory <arg>`                输出密钥库，信任库，配置文件的目录（默认：`../bin`）

* `-O`,`--isOverwrite`                          覆盖现有主机输出

* `-P`,`--trustStorePassword <arg>`             要使用的密钥库密码。每个主机必须为一个值或一个值（如果未指定，则自动生成）

* `-s`,`--signingAlgorithm <arg>`               用于签署证书的算法（默认值：`SHA256WITHRSA`）

* `-S`,`--keyStorePassword <arg>`               要使用的密钥库密码。每个主机必须为一个值或一个值（如果未指定，则自动生成）

* `--subjectAlternativeNames <arg>`             逗号分隔的域列表，用作证书中的主题备用名称

* `-T`,`--keyStoreType <arg>`                   要生成的密钥库的类型（默认值：`jks`）

“主机名”和“主题备用名称”模式：

* 可以使用方括号来轻松指定一系列主机名或主题备用名称。例如：`[01-20]`

* 可以使用括号来指定在给定的主机上运行多个NiFi实例。示例：`（5）`

例子：

为本地主机创建4组密钥库，信任库，_nifi.properties_ 以及具有给定DN的客户端证书：

<pre>
bin/tls-toolkit.sh standalone -n 'localhost(4)' -C 'CN=username,OU=NIFI'
</pre>

在4个子域的每个域中为10个NiFi主机名创建密钥库，信任库，_nifi.properties_：

<pre>
bin/tls-toolkit.sh standalone -n 'nifi[01-10].subdomain[1-4].domain'
</pre>

在4个子域中的每个域中为10个NiFi主机名创建2组密钥库，信任库_nifi.properties_以及具有给定DN的客户端证书：

<pre>
bin/tls-toolkit.sh standalone -n 'nifi[01-10].subdomain[1-4].domain(2)' -C 'CN=username,OU=NIFI'
</pre>

同一命令，带有一系列主题备用名称：

<pre>
bin/tls-toolkit.sh standalone -n 'nifi[01-10].subdomain[1-4].domain(2)' -C 'CN=username,OU=NIFI' --subjectAlternativeNames 'nifi[21-30].other[2-5].example.com(2)'
</pre>

#### Client/Server

客户端/服务器模式依赖于长期运行的证书颁发机构（CA）颁发证书。当您不使节点联机时，可以停止CA。

##### Server

通过运行`./bin/tls-toolkit.sh server` or `bin\tls-toolkit.sh server`来调用CA服务器模式。

###### Usage

要显示帮助：

<pre>
./bin/tls-toolkit.sh server -h
</pre>

The following are available options:

* `-a`,`--keyAlgorithm <arg>`                   Algorithm to use for generated keys (default: `RSA`)

* `--configJsonIn <arg>`                        The place to read configuration info from (defaults to the value of configJson), implies useConfigJson if set (default: `configJson` value)

* `-d`,`--days <arg>`                           Number of days issued certificate should be valid for (default: `825`)

* `-D`,`--dn <arg>`                             The dn to use for the CA certificate (default: `CN=YOUR_CA_HOSTNAME,OU=NIFI`)

* `-f`,`--configJson <arg>`                     The place to write configuration info (default: `config.json`)

* `-F`,`--useConfigJson`                        Flag specifying that all configuration is read from `configJson` to facilitate automated use (otherwise `configJson` will only be written to)

* `-g`,`--differentKeyAndKeystorePasswords`     Use different generated password for the key and the keystore

* `-h`,`--help`                                 Print help and exit

* `-k`,`--keySize <arg>`                        Number of bits for generated keys (default: `2048`)

* `-p`,`--PORT <arg>`                           The port for the Certificate Authority to listen on (default: `8443`)

* `-s`,`--signingAlgorithm <arg>`               Algorithm to use for signing certificates (default: `SHA256WITHRSA`)

* `-T`,`--keyStoreType <arg>`                   The type of keystores to generate (default: `jks`)

* `-t`,`--token <arg>`                          The token to use to prevent MITM (required and must be same as one used by clients)

##### Client

客户端可用于从CA请求新证书。客户端实用程序生成密钥对和证书签名请求（CSR），并将CSR发送到证书颁发机构。通过运行`./bin/tls-toolkit.sh client` or `bin\tls-toolkit.sh client`来调用CA客户模式。

###### Usage

要显示帮助：

<pre>
./bin/tls-toolkit.sh client -h
</pre>

以下是可用的选项：

* `-a`,`--keyAlgorithm <arg>`                   Algorithm to use for generated keys (default: `RSA`)

* `-c`,`--certificateAuthorityHostname <arg>`   Hostname of NiFi Certificate Authority (default: `localhost`)

* `-C`,`--certificateDirectory <arg>`           The directory to write the CA certificate (default: `.`)

* `--configJsonIn <arg>`                        The place to read configuration info from, implies `useConfigJson` if set (default: `configJson` value)

* `-D`,`--dn <arg>`                             The DN to use for the client certificate (default: `CN=<localhost name>,OU=NIFI`) (this is auto-populated by the tool)

* `-f`,`--configJson <arg>`                     The place to write configuration info (default: `config.json`)

* `-F`,`--useConfigJson`                        Flag specifying that all configuration is read from `configJson` to facilitate automated use (otherwise `configJson` will only be written to)

* `-g`,`--differentKeyAndKeystorePasswords`     Use different generated password for the key and the keystore

* `-h`,`--help`                                 Print help and exit

* `-k`,`--keySize <arg>`                        Number of bits for generated keys (default: `2048`)

* `-p`,`--PORT <arg>`                           The port to use to communicate with the Certificate Authority (default: `8443`)

* `--subjectAlternativeNames <arg>`             Comma-separated list of domains to use as Subject Alternative Names in the certificate

* `-T`,`--keyStoreType <arg>`                   The type of keystores to generate (default: `jks`)

* `-t`,`--token <arg>`                          The token to use to prevent MITM (required and must be same as one used by CA)

After running the client you will have the CA’s certificate, a keystore, a truststore, and a `config.json` with information about them as well as their passwords.

For a client certificate that can be easily imported into the browser, specify: `-T PKCS12`.

### 使用现有的Intermediate CA(Using An Existing Intermediate Certificate Authority)

In some enterprise scenarios, a security/IT team may provide a signing certificate that has already been signed by the organization’s certificate authority (CA). This **intermediate CA** can be used to sign the **node** (sometimes referred to as **leaf**) certificates that will be installed on each NiFi node, or the **client certificates** used to identify users. In order to inject the existing signing certificate into the toolkit process, follow these steps:

1.  Generate or obtain the signed intermediate CA keys in the following format (see additional commands below):

    * Public certificate in PEM format: `nifi-cert.pem`

    * Private key in PEM format: `nifi-key.key`

2.  Place the files in the **toolkit working directory**. This is the directory where the tool is configured to output the signed certificates. **This is not necessarily the directory where the binary is located or invoked**.

    * For example, given the following scenario, the toolkit command can be run from its location as long as the output directory `-o` is `../hardcoded/`, and the existing `nifi-cert.pem` and `nifi-key.key` will be used.

        * e.g. `$ ./toolkit/bin/tls-toolkit.sh standalone -o ./hardcoded/ -n 'node4.nifi.apache.org' -P thisIsABadPassword -S thisIsABadPassword -O` will result in a new directory at `./hardcoded/node4.nifi.apache.org` with a keystore and truststore containing a certificate signed by `./hardcoded/nifi-key.key`

    * If the `-o` argument is not provided, the default working directory (`.`) must contain `nifi-cert.pem` and `nifi-key.key`

        * e.g. `$ cd ./hardcoded/ && ../toolkit/bin/tls-toolkit.sh standalone -n 'node5.nifi.apache.org' -P thisIsABadPassword -S thisIsABadPassword -O`

```
# Example directory structure *before* commands above are run

🔓 0s @ 18:07:58 $ tree -L 2
.
├── hardcoded
│   ├── CN=myusername.hardcoded_OU=NiFi.p12
│   ├── CN=myusername.hardcoded_OU=NiFi.password
│   ├── nifi-cert.pem
│   ├── nifi-key.key
│   ├── node1.nifi.apache.org
│   ├── node2.nifi.apache.org
│   └── node3.nifi.apache.org
└── toolkit
    ├── LICENSE
    ├── NOTICE
    ├── README
    ├── bin
    ├── conf
    ├── docs
    └── lib
```

The `nifi-cert.pem` and `nifi-key.key` files should be ASCII-armored (Base64-encoded ASCII) files containing the CA public certificate and private key respectively. Here are sample files of each to show the expected format:

#### [](https://nifi.apache.org/docs/nifi-docs/html/toolkit-guide.html#nifi-cert-pem)nifi-cert.pem

```
# The first command shows the actual content of the encoded file, and the second parses it and shows the internal values

.../certs $ more nifi-cert.pem
-----BEGIN CERTIFICATE-----
MIIDZTCCAk2gAwIBAgIKAWTeM3kDAAAAADANBgkqhkiG9w0BAQsFADAxMQ0wCwYD
VQQLDAROSUZJMSAwHgYDVQQDDBduaWZpLWNhLm5pZmkuYXBhY2hlLm9yZzAeFw0x
ODA3MjgwMDA0MzJaFw0yMTA3MjcwMDA0MzJaMDExDTALBgNVBAsMBE5JRkkxIDAe
BgNVBAMMF25pZmktY2EubmlmaS5hcGFjaGUub3JnMIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEAqkVrrC+AkFbjnCpupSy84tTFDsRVUIWYj/k2pVwC145M
3bpr0pRCzLuzovAjFCmT5L+isTvNjhionsqif07Ebd/M2psYE/Rih2MULsX6KgRe
1nRUiBeKF08hlmSBMGDFPj39yDzE/V9edxV/KGjRqVgw/Qy0vwaS5uWdXnLDhzoV
4/Mz7lGmYoMasZ1uexlH93jjBl1+EFL2Xoa06oLbEojJ9TKaWhpG8ietEedf7WM0
zqBEz2kHo9ddFk9yxiCkT4SUKnDWkhwc/o6us1vEXoSw+tmufHY/A3gVihjWPIGz
qyLFl9JuN7CyJepkVVqTdskBG7S85G/kBlizUj5jOwIDAQABo38wfTAOBgNVHQ8B
Af8EBAMCAf4wDAYDVR0TBAUwAwEB/zAdBgNVHQ4EFgQUKiWBKbMMQ1zUabD4gI7L
VOWOcy0wHwYDVR0jBBgwFoAUKiWBKbMMQ1zUabD4gI7LVOWOcy0wHQYDVR0lBBYw
FAYIKwYBBQUHAwIGCCsGAQUFBwMBMA0GCSqGSIb3DQEBCwUAA4IBAQAxfHFIZLOw
mwIqnSI/ir8f/uzDMq06APHGdhdeIKV0HR74BtK95KFg42zeXxAEFeic98PC/FPV
tKpm2WUa1slMB+oP27cRx5Znr2+pktaqnM7f2JgMeJ8bduNH3RUkr9jwgkcJRwyC
I4fwHC9k18aizNdOf2q2UgQXxNXaLYPe17deuNVwwrflMgeFfVrwbT2uPJTMRi1D
FQyc6haF4vsOSSRzE6OyDoc+/1PpyPW75OeSXeVCbc3AEAvRuTZMBQvBQUqVM51e
MDG+K3rCeieSBPOnGNrEC/PiA/CvaMXBEog+xPAw1SgYfuCz4rlM3BdRa54z3+oO
lc8xbzd7w8Q3
-----END CERTIFICATE-----
.../certs $ openssl x509 -in nifi-cert.pem -text -noout
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            01:64:de:33:79:03:00:00:00:00
    Signature Algorithm: sha256WithRSAEncryption
        Issuer: OU=NIFI, CN=nifi-ca.nifi.apache.org
        Validity
            Not Before: Jul 28 00:04:32 2018 GMT
            Not After : Jul 27 00:04:32 2021 GMT
        Subject: OU=NIFI, CN=nifi-ca.nifi.apache.org
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:aa:45:6b:ac:2f:80:90:56:e3:9c:2a:6e:a5:2c:
                    bc:e2:d4:c5:0e:c4:55:50:85:98:8f:f9:36:a5:5c:
                    02:d7:8e:4c:dd:ba:6b:d2:94:42:cc:bb:b3:a2:f0:
                    23:14:29:93:e4:bf:a2:b1:3b:cd:8e:18:a8:9e:ca:
                    a2:7f:4e:c4:6d:df:cc:da:9b:18:13:f4:62:87:63:
                    14:2e:c5:fa:2a:04:5e:d6:74:54:88:17:8a:17:4f:
                    21:96:64:81:30:60:c5:3e:3d:fd:c8:3c:c4:fd:5f:
                    5e:77:15:7f:28:68:d1:a9:58:30:fd:0c:b4:bf:06:
                    92:e6:e5:9d:5e:72:c3:87:3a:15:e3:f3:33:ee:51:
                    a6:62:83:1a:b1:9d:6e:7b:19:47:f7:78:e3:06:5d:
                    7e:10:52:f6:5e:86:b4:ea:82:db:12:88:c9:f5:32:
                    9a:5a:1a:46:f2:27:ad:11:e7:5f:ed:63:34:ce:a0:
                    44:cf:69:07:a3:d7:5d:16:4f:72:c6:20:a4:4f:84:
                    94:2a:70:d6:92:1c:1c:fe:8e:ae:b3:5b:c4:5e:84:
                    b0:fa:d9:ae:7c:76:3f:03:78:15:8a:18:d6:3c:81:
                    b3:ab:22:c5:97:d2:6e:37:b0:b2:25:ea:64:55:5a:
                    93:76:c9:01:1b:b4:bc:e4:6f:e4:06:58:b3:52:3e:
                    63:3b
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature, Non Repudiation, Key Encipherment, Data Encipherment, Key Agreement, Certificate Sign, CRL Sign
            X509v3 Basic Constraints:
                CA:TRUE
            X509v3 Subject Key Identifier:
                2A:25:81:29:B3:0C:43:5C:D4:69:B0:F8:80:8E:CB:54:E5:8E:73:2D
            X509v3 Authority Key Identifier:
                keyid:2A:25:81:29:B3:0C:43:5C:D4:69:B0:F8:80:8E:CB:54:E5:8E:73:2D

            X509v3 Extended Key Usage:
                TLS Web Client Authentication, TLS Web Server Authentication
    Signature Algorithm: sha256WithRSAEncryption
         31:7c:71:48:64:b3:b0:9b:02:2a:9d:22:3f:8a:bf:1f:fe:ec:
         c3:32:ad:3a:00:f1:c6:76:17:5e:20:a5:74:1d:1e:f8:06:d2:
         bd:e4:a1:60:e3:6c:de:5f:10:04:15:e8:9c:f7:c3:c2:fc:53:
         d5:b4:aa:66:d9:65:1a:d6:c9:4c:07:ea:0f:db:b7:11:c7:96:
         67:af:6f:a9:92:d6:aa:9c:ce:df:d8:98:0c:78:9f:1b:76:e3:
         47:dd:15:24:af:d8:f0:82:47:09:47:0c:82:23:87:f0:1c:2f:
         64:d7:c6:a2:cc:d7:4e:7f:6a:b6:52:04:17:c4:d5:da:2d:83:
         de:d7:b7:5e:b8:d5:70:c2:b7:e5:32:07:85:7d:5a:f0:6d:3d:
         ae:3c:94:cc:46:2d:43:15:0c:9c:ea:16:85:e2:fb:0e:49:24:
         73:13:a3:b2:0e:87:3e:ff:53:e9:c8:f5:bb:e4:e7:92:5d:e5:
         42:6d:cd:c0:10:0b:d1:b9:36:4c:05:0b:c1:41:4a:95:33:9d:
         5e:30:31:be:2b:7a:c2:7a:27:92:04:f3:a7:18:da:c4:0b:f3:
         e2:03:f0:af:68:c5:c1:12:88:3e:c4:f0:30:d5:28:18:7e:e0:
         b3:e2:b9:4c:dc:17:51:6b:9e:33:df:ea:0e:95:cf:31:6f:37:
         7b:c3:c4:37
```

#### [](https://nifi.apache.org/docs/nifi-docs/html/toolkit-guide.html#nifi-key-key)nifi-key.key

```
# The first command shows the actual content of the encoded file, and the second parses it and shows the internal values

.../certs $ more nifi-key.key
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAqkVrrC+AkFbjnCpupSy84tTFDsRVUIWYj/k2pVwC145M3bpr
0pRCzLuzovAjFCmT5L+isTvNjhionsqif07Ebd/M2psYE/Rih2MULsX6KgRe1nRU
iBeKF08hlmSBMGDFPj39yDzE/V9edxV/KGjRqVgw/Qy0vwaS5uWdXnLDhzoV4/Mz
7lGmYoMasZ1uexlH93jjBl1+EFL2Xoa06oLbEojJ9TKaWhpG8ietEedf7WM0zqBE
z2kHo9ddFk9yxiCkT4SUKnDWkhwc/o6us1vEXoSw+tmufHY/A3gVihjWPIGzqyLF
l9JuN7CyJepkVVqTdskBG7S85G/kBlizUj5jOwIDAQABAoIBAAdWRnV89oVBuT0Z
dvsXGmyLzpH8U9DMcO6DRp+Jf3XaY+WKCutgCCDaVbtHrbtIr17EAzav5QOifGGb
SbVCp6Q0aJdi5360oSpEUrJRRZ5Z4dxL1vimSwUGG+RnIEn9YYJ1GWJve+2PFnr7
KieLnL03V6UPzxoMJnhcnJNdTp+dBwzSazVQwye2csSJlVMk49t2lxBwce7ohuh+
9fL7G3HU5S9d08QT1brknMHahcw1SYyJd0KSjRJCB6wAxnAZmJYJ1jQCI8YICq0j
RX2rhxEXuEMXQcaiFQXzCrmQEXreKUISDvNeu/h7YU9UvJWPZSFGnEGgnMP2XvQm
EjK3rQECgYEA5+OkpLsiLNMHGzj72PiBkq82sTLQJ2+8udYp6PheOGkhjjXoBse5
YynyHlQt6CnVpJQ33mQUkJ+3ils0SMFtmI3rz3udzleek1so2L2J3+CI4kt7fFCb
FFbVXv+dLNrm+tOw68J48asyad8kEnHYq9Us+/3MLDmFJYTthkgzCpECgYEAu/ml
lQaWaZAQcQ8UuVeasxMYoN8zMmzfrkxc8AfNwKxF9nc44ywo4nJr+u/UVRGYpRgM
rdll5vz0Iq68qk03spaW7vDJn8hJQhkReQw1it9Fp/51r9MHzGTVarORJGa2oZ0g
iNe8LNizD3bQ19hEvju9mn0x9Q62Q7dapVpffwsCgYEAtC1TPpQQ59dIjERom5vr
wffWfTTIO/w8HgFkKxrgyuAVLJSCJtKFH6H1+M7bpKrsz6ZDCs+kkwMm76ASLf3t
lD2h3mNkqHG4SzLnuBD90jB666pO1rci6FjYDap7i+DC3F4j9+vxYYXt9Aln09UV
z94hx+LaA/rlk9OHY3EyB6ECgYBA/cCtNNjeaKv2mxM8PbjD/289d85YueHgfpCH
gPs3iZiq7W+iw8ri+FKzMSaFvw66zgTcOtULtxulviqG6ym9umk29dOQRgxmKQqs
gnckq6uGuOjxwJHqrlZHjQw6vLSaThxIk+aAzu+iAh+U8TZbW4ZjmrOiGdMUuJlD
oGpyHwKBgQCRjfqQjRelYVtU7j6BD9BDbCfmipwaRNP0CuAGOVtS+UnJuaIhsXFQ
QGEBuOnfFijIvb7YcXRL4plRYPMvDqYRNObuI6A+1xNtr000nxa/HUfzKVeI9Tsn
9AKMWnXS8ZcfStsVf3oDFffXYRqCaWeuhpMmg9TwdXoAuwfpE5GCmw==
-----END RSA PRIVATE KEY-----
.../certs $ openssl rsa -in nifi-key.key -text -noout
Private-Key: (2048 bit)
modulus:
    00:aa:45:6b:ac:2f:80:90:56:e3:9c:2a:6e:a5:2c:
    bc:e2:d4:c5:0e:c4:55:50:85:98:8f:f9:36:a5:5c:
    02:d7:8e:4c:dd:ba:6b:d2:94:42:cc:bb:b3:a2:f0:
    23:14:29:93:e4:bf:a2:b1:3b:cd:8e:18:a8:9e:ca:
    a2:7f:4e:c4:6d:df:cc:da:9b:18:13:f4:62:87:63:
    14:2e:c5:fa:2a:04:5e:d6:74:54:88:17:8a:17:4f:
    21:96:64:81:30:60:c5:3e:3d:fd:c8:3c:c4:fd:5f:
    5e:77:15:7f:28:68:d1:a9:58:30:fd:0c:b4:bf:06:
    92:e6:e5:9d:5e:72:c3:87:3a:15:e3:f3:33:ee:51:
    a6:62:83:1a:b1:9d:6e:7b:19:47:f7:78:e3:06:5d:
    7e:10:52:f6:5e:86:b4:ea:82:db:12:88:c9:f5:32:
    9a:5a:1a:46:f2:27:ad:11:e7:5f:ed:63:34:ce:a0:
    44:cf:69:07:a3:d7:5d:16:4f:72:c6:20:a4:4f:84:
    94:2a:70:d6:92:1c:1c:fe:8e:ae:b3:5b:c4:5e:84:
    b0:fa:d9:ae:7c:76:3f:03:78:15:8a:18:d6:3c:81:
    b3:ab:22:c5:97:d2:6e:37:b0:b2:25:ea:64:55:5a:
    93:76:c9:01:1b:b4:bc:e4:6f:e4:06:58:b3:52:3e:
    63:3b
publicExponent: 65537 (0x10001)
privateExponent:
    07:56:46:75:7c:f6:85:41:b9:3d:19:76:fb:17:1a:
    6c:8b:ce:91:fc:53:d0:cc:70:ee:83:46:9f:89:7f:
    75:da:63:e5:8a:0a:eb:60:08:20:da:55:bb:47:ad:
    bb:48:af:5e:c4:03:36:af:e5:03:a2:7c:61:9b:49:
    b5:42:a7:a4:34:68:97:62:e7:7e:b4:a1:2a:44:52:
    b2:51:45:9e:59:e1:dc:4b:d6:f8:a6:4b:05:06:1b:
    e4:67:20:49:fd:61:82:75:19:62:6f:7b:ed:8f:16:
    7a:fb:2a:27:8b:9c:bd:37:57:a5:0f:cf:1a:0c:26:
    78:5c:9c:93:5d:4e:9f:9d:07:0c:d2:6b:35:50:c3:
    27:b6:72:c4:89:95:53:24:e3:db:76:97:10:70:71:
    ee:e8:86:e8:7e:f5:f2:fb:1b:71:d4:e5:2f:5d:d3:
    c4:13:d5:ba:e4:9c:c1:da:85:cc:35:49:8c:89:77:
    42:92:8d:12:42:07:ac:00:c6:70:19:98:96:09:d6:
    34:02:23:c6:08:0a:ad:23:45:7d:ab:87:11:17:b8:
    43:17:41:c6:a2:15:05:f3:0a:b9:90:11:7a:de:29:
    42:12:0e:f3:5e:bb:f8:7b:61:4f:54:bc:95:8f:65:
    21:46:9c:41:a0:9c:c3:f6:5e:f4:26:12:32:b7:ad:
    01
prime1:
    00:e7:e3:a4:a4:bb:22:2c:d3:07:1b:38:fb:d8:f8:
    81:92:af:36:b1:32:d0:27:6f:bc:b9:d6:29:e8:f8:
    5e:38:69:21:8e:35:e8:06:c7:b9:63:29:f2:1e:54:
    2d:e8:29:d5:a4:94:37:de:64:14:90:9f:b7:8a:5b:
    34:48:c1:6d:98:8d:eb:cf:7b:9d:ce:57:9e:93:5b:
    28:d8:bd:89:df:e0:88:e2:4b:7b:7c:50:9b:14:56:
    d5:5e:ff:9d:2c:da:e6:fa:d3:b0:eb:c2:78:f1:ab:
    32:69:df:24:12:71:d8:ab:d5:2c:fb:fd:cc:2c:39:
    85:25:84:ed:86:48:33:0a:91
prime2:
    00:bb:f9:a5:95:06:96:69:90:10:71:0f:14:b9:57:
    9a:b3:13:18:a0:df:33:32:6c:df:ae:4c:5c:f0:07:
    cd:c0:ac:45:f6:77:38:e3:2c:28:e2:72:6b:fa:ef:
    d4:55:11:98:a5:18:0c:ad:d9:65:e6:fc:f4:22:ae:
    bc:aa:4d:37:b2:96:96:ee:f0:c9:9f:c8:49:42:19:
    11:79:0c:35:8a:df:45:a7:fe:75:af:d3:07:cc:64:
    d5:6a:b3:91:24:66:b6:a1:9d:20:88:d7:bc:2c:d8:
    b3:0f:76:d0:d7:d8:44:be:3b:bd:9a:7d:31:f5:0e:
    b6:43:b7:5a:a5:5a:5f:7f:0b
exponent1:
    00:b4:2d:53:3e:94:10:e7:d7:48:8c:44:68:9b:9b:
    eb:c1:f7:d6:7d:34:c8:3b:fc:3c:1e:01:64:2b:1a:
    e0:ca:e0:15:2c:94:82:26:d2:85:1f:a1:f5:f8:ce:
    db:a4:aa:ec:cf:a6:43:0a:cf:a4:93:03:26:ef:a0:
    12:2d:fd:ed:94:3d:a1:de:63:64:a8:71:b8:4b:32:
    e7:b8:10:fd:d2:30:7a:eb:aa:4e:d6:b7:22:e8:58:
    d8:0d:aa:7b:8b:e0:c2:dc:5e:23:f7:eb:f1:61:85:
    ed:f4:09:67:d3:d5:15:cf:de:21:c7:e2:da:03:fa:
    e5:93:d3:87:63:71:32:07:a1
exponent2:
    40:fd:c0:ad:34:d8:de:68:ab:f6:9b:13:3c:3d:b8:
    c3:ff:6f:3d:77:ce:58:b9:e1:e0:7e:90:87:80:fb:
    37:89:98:aa:ed:6f:a2:c3:ca:e2:f8:52:b3:31:26:
    85:bf:0e:ba:ce:04:dc:3a:d5:0b:b7:1b:a5:be:2a:
    86:eb:29:bd:ba:69:36:f5:d3:90:46:0c:66:29:0a:
    ac:82:77:24:ab:ab:86:b8:e8:f1:c0:91:ea:ae:56:
    47:8d:0c:3a:bc:b4:9a:4e:1c:48:93:e6:80:ce:ef:
    a2:02:1f:94:f1:36:5b:5b:86:63:9a:b3:a2:19:d3:
    14:b8:99:43:a0:6a:72:1f
coefficient:
    00:91:8d:fa:90:8d:17:a5:61:5b:54:ee:3e:81:0f:
    d0:43:6c:27:e6:8a:9c:1a:44:d3:f4:0a:e0:06:39:
    5b:52:f9:49:c9:b9:a2:21:b1:71:50:40:61:01:b8:
    e9:df:16:28:c8:bd:be:d8:71:74:4b:e2:99:51:60:
    f3:2f:0e:a6:11:34:e6:ee:23:a0:3e:d7:13:6d:af:
    4d:34:9f:16:bf:1d:47:f3:29:57:88:f5:3b:27:f4:
    02:8c:5a:75:d2:f1:97:1f:4a:db:15:7f:7a:03:15:
    f7:d7:61:1a:82:69:67:ae:86:93:26:83:d4:f0:75:
    7a:00:bb:07:e9:13:91:82:9b
```

#### [](https://nifi.apache.org/docs/nifi-docs/html/toolkit-guide.html#tls_external-signed_ca)Signing with Externally-signed CA Certificates

To sign generated certificates with a certificate authority (CA) generated outside of the TLS Toolkit, ensure the necessary files are in the right format and location (see [Additional Certificate Commands](https://nifi.apache.org/docs/nifi-docs/html/toolkit-guide.html#additional_certificate_commands)). For example, an organization **Large Organization** has an internal CA (`CN=ca.large.org, OU=Certificate Authority`). This **root CA** is offline and only used to sign other internal CAs. The Large IT team generates an **intermediate CA** (`CN=nifi_ca.large.org, OU=NiFi, OU=Certificate Authority`) to be used to sign all NiFi node certificates (`CN=node1.nifi.large.org, OU=NiFi`, `CN=node2.nifi.large.org, OU=NiFi`, etc.).

To use the toolkit to generate these certificates and sign them using the **intermediate CA**, ensure that the following files are present (see [Additional Certificate Commands](https://nifi.apache.org/docs/nifi-docs/html/toolkit-guide.html#additional_certificate_commands)):

* `nifi-cert.pem` — the public certificate of the **intermediate CA** in PEM format

* `nifi-key.key` — the Base64-encoded private key of the **intermediate CA** in PKCS #1 PEM format

If the **intermediate CA** was the **root CA**, it would be **self-signed** — the signature over the certificate would be issued from the same key. In that case (the same as a toolkit-generated CA), no additional arguments are necessary. However, because the **intermediate CA** is signed by the **root CA**, the public certificate of the **root CA** needs to be provided as well to validate the signature. The `--additionalCACertificate` parameter is used to specify the path to the signing public certificate. The value should be the absolute path to the **root CA** public certificate.

Example:

<pre>
# Generate cert signed by intermediate CA (which is signed by root CA) -- WILL FAIL

$ ./bin/tls-toolkit.sh standalone -n 'node1.nifi.apache.org' \
-P passwordpassword \
-S passwordpassword \
-o /opt/certs/externalCA \
-O

2018/08/02 18:48:11 INFO [main] org.apache.nifi.toolkit.tls.standalone.TlsToolkitStandaloneCommandLine: No nifiPropertiesFile specified, using embedded one.
2018/08/02 18:48:12 INFO [main] org.apache.nifi.toolkit.tls.standalone.TlsToolkitStandalone: Running standalone certificate generation with output directory /opt/certs/externalCA
2018/08/02 18:48:12 INFO [main] org.apache.nifi.toolkit.tls.util.TlsHelper: Verifying the certificate signature for CN=nifi_ca.large.org, OU=Certificate Authority
2018/08/02 18:48:12 INFO [main] org.apache.nifi.toolkit.tls.util.TlsHelper: Attempting to verify certificate CN=nifi_ca.large.org, OU=NiFi, OU=Certificate Authority signature with CN=nifi_ca.large.org, OU=NiFi, OU=Certificate Authority
2018/08/02 18:48:12 WARN [main] org.apache.nifi.toolkit.tls.util.TlsHelper: Certificate CN=nifi_ca.large.org, OU=NiFi, OU=Certificate Authority not signed by CN=nifi_ca.large.org, OU=NiFi, OU=Certificate Authority [certificate does not verify with supplied key]
Error generating TLS configuration. (The signing certificate was not signed by any known certificates)

# Provide additional CA certificate path for signature verification of intermediate CA

$ ./bin/tls-toolkit.sh standalone -n 'node1.nifi.apache.org' \
-P passwordpassword \
-S passwordpassword \
-o /opt/certs/externalCA \
--additionalCACertificate /opt/certs/externalCA/root.pem \
-O

2018/08/02 18:48:44 INFO [main] org.apache.nifi.toolkit.tls.standalone.TlsToolkitStandaloneCommandLine: No nifiPropertiesFile specified, using embedded one.
2018/08/02 18:48:44 INFO [main] org.apache.nifi.toolkit.tls.standalone.TlsToolkitStandalone: Running standalone certificate generation with output directory /opt/certs/externalCA
2018/08/02 18:48:44 INFO [main] org.apache.nifi.toolkit.tls.util.TlsHelper: Verifying the certificate signature for CN=nifi_ca.large.org, OU=NiFi, OU=Certificate Authority
2018/08/02 18:48:44 INFO [main] org.apache.nifi.toolkit.tls.util.TlsHelper: Attempting to verify certificate CN=nifi_ca.large.org, OU=NiFi, OU=Certificate Authority signature with CN=ca.large.org, OU=Certificate Authority
2018/08/02 18:48:44 INFO [main] org.apache.nifi.toolkit.tls.util.TlsHelper: Certificate was signed by CN=ca.large.org, OU=Certificate Authority
2018/08/02 18:48:44 INFO [main] org.apache.nifi.toolkit.tls.standalone.TlsToolkitStandalone: Using existing CA certificate /opt/certs/externalCA/nifi-cert.pem and key /opt/certs/externalCA/nifi-key.key
2018/08/02 18:48:44 INFO [main] org.apache.nifi.toolkit.tls.standalone.TlsToolkitStandalone: Writing new ssl configuration to /opt/certs/externalCA/node1.nifi.apache.org
2018/08/02 18:48:44 INFO [main] org.apache.nifi.toolkit.tls.standalone.TlsToolkitStandalone: Successfully generated TLS configuration for node1.nifi.apache.org 1 in /opt/certs/externalCA/node1.nifi.apache.org
2018/08/02 18:48:44 INFO [main] org.apache.nifi.toolkit.tls.standalone.TlsToolkitStandalone: No clientCertDn specified, not generating any client certificates.
2018/08/02 18:48:44 INFO [main] org.apache.nifi.toolkit.tls.standalone.TlsToolkitStandalone: tls-toolkit standalone completed successfully
</pre>

### 额外的证书命令(Additional Certificate Commands)

1.  To convert from DER encoded public certificate (`cert.der`) to PEM encoded (`cert.pem`):

    * If the DER file contains both the public certificate and private key, remove the private key with this command:

        * `perl -pe 'BEGIN{undef $/;} s|-----BEGIN PRIVATE KEY-----.*?-----END PRIVATE KEY-----|Removed private key|gs' cert.der > cert.pem`

    * If the DER file only contains the public certificate, use this command:

        * `openssl x509 -inform der -in cert.der -out cert.pem`

2.  To convert from a PKCS12 keystore (`keystore.p12`) containing both the public certificate and private key into PEM encoded files (`$PASSWORD` is the keystore password):

    * `openssl pkcs12 -in keystore.p12 -nodes -clcerts -nokeys -out cert.pem  -password "pass:$PASSWORD"`

    * `openssl pkcs12 -in keystore.p12 -nodes -nocerts -out key.key -password "pass:$PASSWORD"`

3.  To convert from a Java Keystore (`keystore.jks`) containing private key into PEM encoded files (`$P12_PASSWORD` is the PKCS12 keystore password, `$JKS_PASSWORD` is the Java keystore password you want to set, and `$ALIAS` can be any value — the NiFi default is `nifi-key`):

    * `keytool -importkeystore -srckeystore keystore.jks -destkeystore keystore.p12 -srcstoretype JKS -deststoretype PKCS12 -destkeypass "$P12_PASSWORD" -deststorepass "$P12_PASSWORD" -srcstorepass "$JKS_PASSWORD" -srcalias "$ALIAS" -destalias "$ALIAS"`

    * Follow the steps above to convert from `keystore.p12` to `cert.pem` and `key.key`

4.  To convert from PKCS #8 PEM format to PKCS #1 PEM format:

    * If the private key is provided in PKCS #8 format (the file begins with `-----BEGIN PRIVATE KEY-----` rather than `-----BEGIN RSA PRIVATE KEY-----`), the following command will convert it to PKCS #1 format, move the original to `nifi-key-pkcs8.key`, and rename the PKCS #1 version as `nifi-key.key`:

        * `openssl rsa -in nifi-key.key -out nifi-key-pkcs1.key && mv nifi-key.key nifi-key-pkcs8.key && mv nifi-key-pkcs1.key nifi-key.key`

5.  To combine a private key in PEM format (`private.key`) and public certificate in PEM format (`certificate.pem`) into PKCS12 keystore:

    * The following command will create the PKCS12 keystore (`keystore.p12`) from the two independent files. A Java keystore (JKS) cannot be formed directly from the PEM files:

        * `openssl pkcs12 -export -out keystore.p12 -inkey private.key -in certificate.pem`

6.  To convert a PKCS12 keystore (`keystore.p12`) to JKS keystore (`keystore.jks`):

    * The following command will create the JKS keystore (`keystore.jks`). The `-destalias` flag is optional, as NiFi does not currently read from a specific alias in the keystore. The user will be prompted for a keystore password, which must be set and have minimum 8 characters, and a key password, which can be the same as the keystore password or different:

        * `keytool -importkeystore -srckeystore keystore.p12 -srcstoretype pkcs12 -destkeystore keystore.jks
            -deststoretype jks -destalias nifi-key`

## ZooKeeper Migrator

You can use the `zk-migrator` tool to perform the following tasks:

* Moving ZooKeeper information from one ZooKeeper cluster to another

* Migrating ZooKeeper node ownership

For example, you may want to use the ZooKeeper Migrator when you are:

* Upgrading from NiFi 0.x to NiFi 1.x in which embedded ZooKeepers are used

* Migrating from an embedded ZooKeeper in NiFi 0.x or 1.x to an external ZooKeeper

* Upgrading from NiFi 0.x with an external ZooKeeper to NiFi 1.x with the same external ZooKeeper

* Migrating from an external ZooKeeper to an embedded ZooKeeper in NiFi 1.x

### [](https://nifi.apache.org/docs/nifi-docs/html/toolkit-guide.html#usage-11)Usage

The `zk-migrator` tool is invoked as `./bin/zk-migrator.sh` or `bin\zk-migrator.bat`.

To show help:

<pre>
./bin/zk-migrator.sh -h
</pre>

The following are available options:

* `-a`,`--auth <username:password>`               Allows the specification of a username and password for authentication with ZooKeeper.  This option is mutually exclusive with the `-k`,`--krb-conf` option.

* `-f`,`--file <filename>`                        The file used for ZooKeeper data serialized as JSON.  When used with the `-r`,`--receive` option, data read from ZooKeeper will be stored in the given filename.  When used with the `-s`,`--send` option, the data in the file will be sent to ZooKeeper.

* `-h`,`--help`                                   Prints help, displays available parameters with descriptions

* `--ignore-source`                               Allows the ZooKeeper Migrator to write to the ZooKeeper and path from which the data was obtained.

* `-k`,`--krb-conf <jaas-filename>`               Allows the specification of a JAAS configuration file to allow authentication with a ZooKeeper configured to use Kerberos.  This option is mutually exclusive with the `-a`,`--auth` option.

* `-r`,`--receive`                                Receives data from ZooKeeper and writes to the given filename (if the `-f`,`--file` option is provided) or standard output. The data received will contain the full path to each node read from ZooKeeper. This option is mutually exclusive with the `-s`,`--send` option.

* `-s`,`--send`                                   Sends data to ZooKeeper that is read from the given filename (if the `-f`,`--file` option is provided) or standard input. The paths for each node in the data being sent to ZooKeeper are absolute paths, and will be stored in ZooKeeper under the **path** portion of the `-z`,`--zookeeper` argument.  Typically, the **path** portion of the argument can be omitted, which will store the nodes at their absolute paths. This option is mutually exclusive with the `-r`,`--receive` option.

* `--use-existing-acl`                            Allows the Zookeeper Migrator to write ACL values retrieved from the source Zookeeper server to destination server. Default action will apply Open rights for unsecured destinations or Creator Only rights for secured destinations.

* `-z`,`--zookeeper <zookeeper-endpoint>`         The ZooKeeper server(s) to use, specified by a connect string, comprised of one or more comma-separated host:port pairs followed by a path, in the format of _host:port[,host2:port…​,hostn:port]/znode/path_.

### [](https://nifi.apache.org/docs/nifi-docs/html/toolkit-guide.html#migrating-between-source-and-destination-zookeepers)Migrating Between Source and Destination ZooKeepers

Before you begin, confirm that:

* You have installed the destination ZooKeeper cluster.

* You have installed and configured a NiFi cluster to use the destination ZooKeeper cluster.

* If you are migrating ZooKeepers due to upgrading NiFi from 0.x to 1.x,, you have already followed appropriate NiFi upgrade steps.

* You have configured Kerberos as needed.

* You have not started processing any dataflow (to avoid duplicate data processing).

* If one of the ZooKeeper clusters you are using is configured with Kerberos, you are running the ZooKeeper Migrator from a host that has access to NiFi’s ZooKeeper client jaas configuration file (see the  [Kerberizing NiFi’s ZooKeeper Client](https://nifi.apache.org/docs/nifi-docs/html/administration-guide.html#zk_kerberos_client) section in the System Administrator’s Guide for more information).

#### [](https://nifi.apache.org/docs/nifi-docs/html/toolkit-guide.html#zookeeper-migration-steps)ZooKeeper Migration Steps

1.  Collect the following information:

| col 1 | col 2 |
|--|--|
| **Required Information** | **Description** |
| Source ZooKeeper hostname (**sourceHostname**) | The hostname must be one of the hosts running in the ZooKeeper ensemble, which can be found in `NiFi installation dir`/conf/zookeeper.properties .  Any of the hostnames declared in the `server.N` properties can be used. |
| Destination ZooKeeper hostname (**destinationHostname**) | The hostname must be one of the hosts running in the ZooKeeper ensemble, which can be found in `NiFi installation dir`/conf/zookeeper.properties.  Any of the hostnames declared in the `server.N` properties can be used. |
| Source ZooKeeper port (**sourceClientPort**) | This can be found in `NiFi installation dir`/conf/zookeeper.properties.  The port is specified in the `clientPort` property or at the end of the server string. |
| Destination ZooKeeper port (**destinationClientPort**) | This can be found in `NiFi installation dir`/conf/zookeeper.properties_.  The port is specified in the `clientPort` property or at the end of the server string. |
| Export data path | Determine the path that will store a json file containing the export of data from ZooKeeper.  It must be readable and writable by the user running the zk-migrator tool. |
| Source ZooKeeper Authentication Information | This information is in `NiFi installation dir`/conf/state-management.xml_. For NiFi 0.x, if Creator Only is specified in _state-management.xml_, you need to supply authentication information using the `-a,--auth` argument with the values from the Username and Password properties in _state-management.xml_. For NiFi 1.x, supply authentication information using the `-k,--krb-conf` argument. |

| If the _state-management.xml_ specifies Open, no authentication is required. |
| Destination ZooKeeper Authentication Information | This information is in `NiFi installation dir`/conf/state-management.xml_. For NiFi 0.x, if Creator Only is specified in _state-management.xml_, you need to supply authentication information using the `-a,--auth` argument with the values from the Username and Password properties in state-management.xml. For NiFi 1.x, supply authentication information using the `-k,--krb-conf` argument. |

| If the _state-management.xml_ specifies Open, no authentication is required. |
| Root path to which NiFi writes data in Source ZooKeeper (**sourceRootPath**) | This information can be found in `<NiFi installation dir>/conf/state-management.xml` under the Root Node property in the cluster-provider element. (default: `/nifi`) |
| Root path to which NiFi writes data in Destination ZooKeeper (**destinationRootPath**) | This information can be found in `NiFi installation dir`/conf/state-management.xml_ under the Root Node property in the cluster-provider element. |

| col 1 | col 2 |
|--|--|
| __ | As of NiFi 1.10.x, because of an upgrade to ZooKeeper 3.5.x, the migrator may have a permission error `"NoAuthException: KeeperErrorCode = NoAuth for /zookeeper/config"` when attempting to use `/` as the destination root path. This is because the `/zookeeper/config` znode has read-only permissions. Instead use a destination path of `/nifi/components` or similar. |

2.  Stop all processors in the NiFi flow.  If you are migrating between two NiFi installations, the flows on both must be stopped.

3.  Export the NiFi component data from the source ZooKeeper.  The following command reads from the specified ZooKeeper running on the given hostname:port, using the provided path to the data, and authenticates with ZooKeeper using the given username and password.  The data read from ZooKeeper is written to the file provided.

    * For NiFi 0.x

        * For an open ZooKeeper:

            * `zk-migrator.sh -r -z sourceHostname:sourceClientPort/sourceRootPath/components -f /path/to/export/zk-source-data.json`

        * For a ZooKeeper using username:password for authentication:

            * `zk-migrator.sh -r -z sourceHostname:sourceClientPort/sourceRootPath/components -a <username:password> -f /path/to/export/zk-source-data.json`

    * For NiFi 1.x

        * For an open ZooKeeper:

            * `zk-migrator.sh -r -z sourceHostname:sourceClientPort/sourceRootPath/components -f /path/to/export/zk-source-data.json`

        * For a ZooKeeper using Kerberos for authentication:

            * `zk-migrator.sh -r -z sourceHostname:sourceClientPort/sourceRootPath/components -k /path/to/jaasconfig/jaas-config.conf -f /path/to/export/zk-source-data.json`

4.  (Optional) If you have used the new NiFi installation to do any processing, you can also export its ZooKeeper data as a backup prior to performing the migration.

    * For an open ZooKeeper:

        * `zk-migrator.sh -r -z destinationHostname:destinationClientPort/destinationRootPath/components -f /path/to/export/zk-destination-backup-data.json`

    * For a ZooKeeper using Kerberos for authentication:

        * `zk-migrator.sh -r -z destinationHostname:destinationClientPort/destinationRootPath/components -k /path/to/jaasconfig/jaas-config.conf -f /path/to/export/zk-destination-backup-data.json`

5.  Migrate the ZooKeeper data to the destination ZooKeeper. If the source and destination ZooKeepers are the same, the `--ignore-source` option can be added to the following examples.

    * For an open ZooKeeper:

        * `zk-migrator.sh -s -z destinationHostname:destinationClientPort/destinationRootPath/components -f /path/to/export/zk-source-data.json`

    * For a ZooKeeper using Kerberos for authentication:

        * `zk-migrator.sh -s -z destinationHostname:destinationClientPort/destinationRootPath/components -k /path/to/jaasconfig/jaas-config.conf -f /path/to/export/zk-source-data.json`

6.  Once the migration has completed successfully, start the processors in the NiFi flow.  Processing should continue from the point at which it was stopped when the NiFi flow was stopped.