import{_ as t,o as e,c as r,e as a}from"./app.3ad1c1e4.js";var s="/assets/hive.d706f32d.png",d="/assets/hive2.7be6d4fb.png",n="/assets/input.ad0dbc7e.png",i="/assets/config.560cc01d.png",o="/assets/dataflow.a4e8cec2.png",h="/assets/result.b105af24.png",l="/assets/dataflow2.8f250e00.png";const p={},c=a('<h1 id="puthivestreaming" tabindex="-1"><a class="header-anchor" href="#puthivestreaming" aria-hidden="true">#</a> PutHiveStreaming</h1><hr><p>\u7F16\u8F91\u4EBA(\u5168\u7F51\u540C\u540D)\uFF1A<strong><strong>\u9177\u9177\u7684\u8BDA</strong></strong> \u90AE\u7BB1\uFF1A<strong>zhangchengk@foxmail.com</strong></p><hr><h2 id="\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>\u8BE5\u5904\u7406\u5668\u4F7F\u7528Hive\u6D41\u5C06\u6D41\u6587\u4EF6\u6570\u636E\u53D1\u9001\u5230Apache Hive\u8868\u3002\u4F20\u5165\u7684\u6D41\u6587\u4EF6\u9700\u8981\u662FAvro\u683C\u5F0F\uFF0C\u8868\u5FC5\u987B\u5B58\u5728\u4E8EHive\u4E2D\u3002\u6709\u5173Hive\u8868\u7684\u9700\u6C42(\u683C\u5F0F\u3001\u5206\u533A\u7B49)\uFF0C\u8BF7\u53C2\u9605Hive\u6587\u6863\u3002\u5206\u533A\u503C\u662F\u6839\u636E\u5904\u7406\u5668\u4E2D\u6307\u5B9A\u7684\u5206\u533A\u5217\u7684\u540D\u79F0\uFF0C\u7136\u540E\u4ECEAvro\u8BB0\u5F55\u4E2D\u63D0\u53D6\u7684\u3002\u6CE8\u610F:\u5982\u679C\u4E3A\u8FD9\u4E2A\u5904\u7406\u5668\u914D\u7F6E\u4E86\u591A\u4E2A\u5E76\u53D1\u4EFB\u52A1\uFF0C\u90A3\u4E48\u4E00\u4E2A\u7EBF\u7A0B\u5728\u4EFB\u4F55\u65F6\u5019\u53EA\u80FD\u5199\u5165\u4E00\u4E2A\u8868\u3002\u5199\u5165\u540C\u4E00\u8868\u7684\u5176\u4ED6\u4EFB\u52A1\u5C06\u7B49\u5F85\u5F53\u524D\u4EFB\u52A1\u5B8C\u6210\u5BF9\u8868\u7684\u5199\u5165\u3002</p><h2 id="\u5C5E\u6027\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5C5E\u6027\u914D\u7F6E" aria-hidden="true">#</a> \u5C5E\u6027\u914D\u7F6E</h2><table><thead><tr><th>\u5C5E\u6027\u540D\u79F0</th><th style="text-align:right;">\u9ED8\u8BA4\u503C</th><th>\u53EF\u9009\u503C</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td><strong>Hive Metastore URI</strong></td><td style="text-align:right;"></td><td></td><td>Hive Metastore\u7684URI\u4F4D\u7F6E\u3002\u6CE8\u610F\uFF0C\u8FD9\u4E0D\u662FHive\u670D\u52A1\u5668\u7684\u4F4D\u7F6E\u3002Hive metastore\u7684\u9ED8\u8BA4\u7AEF\u53E3\u662F9043<br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true</td></tr><tr><td>Hive Configuration Resources</td><td style="text-align:right;"></td><td></td><td>\u4E00\u4E2A\u6587\u4EF6\u6216\u7740\u88AB\u9017\u53F7\u5206\u9694\u7684\u6587\u4EF6\u5217\u8868\uFF0C\u5176\u4E2D\u5305\u542BHive\u914D\u7F6E(hive-site.xml)\u3002\u5982\u679C\u6CA1\u6709\u8FD9\u4E2A\u914D\u7F6E\uFF0CHadoop\u5C06\u5728\u7C7B\u8DEF\u5F84\u4E2D\u641C\u7D22&#39;hive-site.xml&#39;\uFF0C\u6216\u7740\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E\u3002\u6CE8\u610F\uFF0C\u5982\u679C\u8981\u542F\u7528Kerberos\u7B49\u8EAB\u4EFD\u9A8C\u8BC1\uFF0C\u5FC5\u987B\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u8BBE\u7F6E\u9002\u5F53\u7684\u5C5E\u6027\u3002\u8FD8\u8981\u6CE8\u610F\uFF0C\u5982\u679CMax Concurrent Tasks\u88AB\u8BBE\u7F6E\u4E3A\u4E00\u4E2A\u5927\u4E8E1\u7684\u6570\u5B57\uFF0C\u90A3\u4E48&#39;hcatalog.hive.client.cache.disabled&#39;\u5C06\u88AB\u8FEB\u8BBE\u7F6E\u4E3A&#39;true&#39;\u4EE5\u907F\u514D\u5E76\u53D1\u95EE\u9898\u3002\u8BF7\u53C2\u9605Hive\u6587\u6863\u4E86\u89E3\u66F4\u591A\u7EC6\u8282<br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true\uFF08\u53EA\u7528\u4E8E\u53D8\u91CF\u6CE8\u518C\u8868\uFF09</td></tr><tr><td><strong>Database Name</strong></td><td style="text-align:right;"></td><td></td><td>\u6570\u636E\u5E93\u540D\u79F0 <br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true</td></tr><tr><td><strong>Table Name</strong></td><td style="text-align:right;"></td><td></td><td>\u8868\u540D <br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true</td></tr><tr><td>Partition Columns</td><td style="text-align:right;"></td><td></td><td>\u4EE5\u9017\u53F7\u5206\u9694\u7684\u5DF2\u5BF9\u8868\u8FDB\u884C\u5206\u533A\u7684\u5217\u540D\u5217\u8868\u3002\u6B64\u5217\u8868\u4E2D\u7684\u503C\u7684\u987A\u5E8F\u5FC5\u987B\u4E0E\u8868\u521B\u5EFA\u671F\u95F4\u6307\u5B9A\u7684\u5206\u533A\u5217\u7684\u987A\u5E8F\u5B8C\u5168\u5BF9\u5E94\u3002 <br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true\uFF08\u53EA\u7528\u4E8E\u53D8\u91CF\u6CE8\u518C\u8868\uFF09</td></tr><tr><td><strong>Auto-Create Partitions</strong></td><td style="text-align:right;">true</td><td>\u25AAtrue<br> \u25AAfalse</td><td>\u6807\u5FD7\uFF0C\u6307\u793A\u662F\u5426\u5E94\u8BE5\u81EA\u52A8\u521B\u5EFA\u5206\u533A</td></tr><tr><td><strong>Max Open Connections</strong></td><td style="text-align:right;">8</td><td></td><td>\u540C\u65F6\u4ECE\u8FD9\u4E2A\u6C60\u4E2D\u5206\u914D\u7684\u6700\u5927\u6253\u5F00\u8FDE\u63A5\u6570\uFF0C\u4E3A\u8D1F\u5219\u8868\u793A\u6CA1\u6709\u9650\u5236\u3002</td></tr><tr><td><strong>Heartbeat Interval</strong></td><td style="text-align:right;">60</td><td></td><td>\u6307\u793A\u5F53\u7ECF\u8FC7\u6307\u5B9A\u7684\u79D2\u6570\u65F6\u5E94\u53D1\u9001\u5FC3\u8DF3\u3002\u503C0\u8868\u793A\u4E0D\u5E94\u8BE5\u53D1\u9001\u5FC3\u8DF3\u3002\u6CE8\u610F\uFF0C\u5C3D\u7BA1\u6B64\u5C5E\u6027\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00\uFF0C\u4F46\u5B83\u4E0D\u4F1A\u6839\u636E\u4F20\u5165\u7684FlowFile\u5C5E\u6027\u8FDB\u884C\u8BA1\u7B97\u3002 <br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true\uFF08\u53EA\u7528\u4E8E\u53D8\u91CF\u6CE8\u518C\u8868\uFF09</td></tr><tr><td><strong>Transactions per Batch</strong></td><td style="text-align:right;">100</td><td></td><td>\u4E00\u4E2A\u6307\u5411Hive\u6D41\u7684\u63D0\u793A\uFF0C\u6307\u793A\u5904\u7406\u5668\u4EFB\u52A1\u5C06\u9700\u8981\u591A\u5C11\u4E8B\u52A1\u3002\u8FD9\u4E2A\u503C\u5FC5\u987B\u5927\u4E8E1\u3002<br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true</td></tr><tr><td><strong>Records per Transaction</strong></td><td style="text-align:right;">10000</td><td></td><td>\u63D0\u4EA4\u4E8B\u52A1\u4E4B\u524D\u8981\u5904\u7406\u7684\u8BB0\u5F55\u6570\u3002\u8FD9\u4E2A\u503C\u5FC5\u987B\u5927\u4E8E1\u3002 <br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true</td></tr><tr><td><strong>Call Timeout</strong></td><td style="text-align:right;">0</td><td></td><td>Hive\u6D41\u64CD\u4F5C\u5B8C\u6210\u6240\u9700\u7684\u79D2\u6570\u3002\u503C0\u8868\u793A\u5904\u7406\u5668\u5E94\u8BE5\u65E0\u9650\u671F\u5730\u7B49\u5F85\u64CD\u4F5C\u3002\u6CE8\u610F\uFF0C\u5C3D\u7BA1\u6B64\u5C5E\u6027\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00\uFF0C\u4F46\u5B83\u4E0D\u4F1A\u6839\u636E\u4F20\u5165\u7684FlowFile\u5C5E\u6027\u8FDB\u884C\u8BA1\u7B97\u3002 <br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true\uFF08\u53EA\u7528\u4E8E\u53D8\u91CF\u6CE8\u518C\u8868\uFF09</td></tr><tr><td><strong>Rollback On Failure</strong></td><td style="text-align:right;">false</td><td>\u25AAtrue<br> \u25AAfalse</td><td>\u6307\u5B9A\u5982\u4F55\u5904\u7406\u9519\u8BEF\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B(false)\uFF0C\u5982\u679C\u5728\u5904\u7406\u4E00\u4E2A\u6D41\u6587\u4EF6\u65F6\u53D1\u751F\u9519\u8BEF\uFF0C\u8BE5\u6D41\u6587\u4EF6\u5C06\u6839\u636E\u9519\u8BEF\u7C7B\u578B\u8DEF\u7531\u5230\u201Cfailure\u201D\u6216\u201Cretry\u201D\u5173\u7CFB\uFF0C\u5904\u7406\u5668\u53EF\u4EE5\u7EE7\u7EED\u5904\u7406\u4E0B\u4E00\u4E2A\u6D41\u6587\u4EF6\u3002\u76F8\u53CD\uFF08true\uFF09\uFF0C\u5C06\u56DE\u6EDA\u5F53\u524D\u5904\u7406\u7684\u6D41\u6587\u4EF6\u5E76\u7ACB\u5373\u505C\u6B62\u8FDB\u4E00\u6B65\u7684\u5904\u7406\uFF0C\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u5931\u8D25\u7684\u6D41\u6587\u4EF6\u5C06\u4FDD\u7559\u5728\u8F93\u5165\u5173\u7CFB\u4E2D\uFF0C\u800C\u4E0D\u4F1A\u5BF9\u5176\u8FDB\u884C\u60E9\u7F5A\uFF0C\u5E76\u91CD\u590D\u5904\u7406\uFF0C\u76F4\u5230\u6210\u529F\u5904\u7406\u6216\u901A\u8FC7\u5176\u4ED6\u65B9\u6CD5\u5220\u9664\u5B83\u3002\u91CD\u8981\u7684\u662F\u8981\u8BBE\u7F6E\u8DB3\u591F\u7684\u201CYield Duration\u201D\uFF0C\u4EE5\u907F\u514D\u8FC7\u4E8E\u9891\u7E41\u5730\u91CD\u8BD5\u3002\u6CE8\u610F:\u5F53\u4E00\u4E2A\u9519\u8BEF\u53D1\u751F\u5728\u4E00\u4E2A\u6E90\u81EA\u76F8\u540C\u7684\u8F93\u5165FlowFile\u7684\u5DF2\u63D0\u4EA4\u7684Hive\u6D41\u4E8B\u52A1,(\u5373FlowFile\u5305\u542B\u6BD4\u8BB0\u5F55\u6BCF\u7B14\u4EA4\u6613\u7684\u8BB0\u5F55\uFF0C\u9519\u8BEF\u53D1\u751F\u5728\u7B2C\u4E8C\u4E2A\u4E8B\u52A1\u6216\u5176\u4ED6\u7248\u672C),\u6210\u529F\u8BB0\u5F55\u5C06\u88AB\u8F6C\u79FB\u5230\u201C\u6210\u529F\u201D\u7684\u5173\u7CFB,\u800C\u539F\u59CB\u8F93\u5165FlowFile\u5446\u5728\u8F93\u5165\u961F\u5217\u3002\u5F53\u518D\u6B21\u5904\u7406\u76F8\u540C\u7684\u6D41\u6587\u4EF6\u65F6\uFF0C\u6570\u636E\u4F1A\u91CD\u590D \u3002</td></tr><tr><td>Kerberos Credentials Service</td><td style="text-align:right;"></td><td><strong>Controller Service API:</strong><br>KerberosCredentialsService<br><strong>Implementation:</strong><br>KeytabCredentialsService</td><td>\u6307\u5B9A\u5E94\u8BE5\u7528\u4E8EKerberos\u8EAB\u4EFD\u9A8C\u8BC1\u7684Kerberos\u51ED\u8BC1\u63A7\u5236\u5668\u670D\u52A1</td></tr><tr><td>Kerberos Principal</td><td style="text-align:right;"></td><td></td><td>Kerberos\u4E3B\u4F53\u8FDB\u884C\u8EAB\u4EFD\u9A8C\u8BC1\u3002\u9700\u8981\u5728nifi.properties\u4E2D\u8BBE\u7F6Enifi.kerberos.krb5.file <br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true\uFF08\u53EA\u7528\u4E8E\u53D8\u91CF\u6CE8\u518C\u8868\uFF09</td></tr><tr><td>Kerberos Keytab</td><td style="text-align:right;"></td><td></td><td>\u4E0E\u4E3B\u4F53\u5173\u8054\u7684Kerberos keytab\u3002\u9700\u8981\u5728nifi.properties\u4E2D\u8BBE\u7F6Enifi.kerberos.krb5.file <br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true\uFF08\u53EA\u7528\u4E8E\u53D8\u91CF\u6CE8\u518C\u8868\uFF09</td></tr></tbody></table><h2 id="\u8FDE\u63A5\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#\u8FDE\u63A5\u5173\u7CFB" aria-hidden="true">#</a> \u8FDE\u63A5\u5173\u7CFB</h2><table><thead><tr><th>\u540D\u79F0</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>retry</td><td>\u5982\u679C\u4F20\u5165\u7684\u6D41\u6587\u4EF6\u7684\u8BB0\u5F55\u4E0D\u80FD\u4F20\u8F93\u5230Hive\uFF0C\u5219\u5C06\u5176\u8DEF\u7531\u5230\u6B64\u5173\u7CFB\u3002\u6CE8\u610F\uFF0C\u4E00\u4E9B\u8BB0\u5F55\u53EF\u80FD\u5DF2\u7ECF\u6210\u529F\u5904\u7406\uFF0C\u5B83\u4EEC\u5C06\u88AB\u8DEF\u7531\u5230\u6210\u529F\u5173\u7CFB(\u4F5C\u4E3AAvro\u6D41\u6587\u4EF6)\u3002\u91CD\u8BD5\u3001\u6210\u529F\u548C\u5931\u8D25\u5173\u7CFB\u7684\u7EC4\u5408\u8868\u660E\u6709\u591A\u5C11\u8BB0\u5F55\u6210\u529F\u548C/\u6216\u5931\u8D25\u3002\u8FD9\u53EF\u4EE5\u7528\u6765\u63D0\u4F9B\u91CD\u8BD5\u529F\u80FD\uFF0C\u56E0\u4E3A\u4E0D\u53EF\u80FD\u5B8C\u5168\u56DE\u6EDA\u3002</td></tr><tr><td>success</td><td>\u4E00\u4E2A\u5305\u542BAvro\u8BB0\u5F55\u7684\u6D41\u6587\u4EF6\uFF0C\u5728\u8BE5\u8BB0\u5F55\u6210\u529F\u4F20\u8F93\u5230Hive\u540E\u8DEF\u7531\u5230\u8FD9\u4E2A\u5173\u7CFB\u3002</td></tr><tr><td>failure</td><td>\u5982\u679C\u65E0\u6CD5\u5C06Avro\u8BB0\u5F55\u4F20\u8F93\u5230Hive\uFF0C\u5219\u5305\u542B\u8DEF\u7531\u5230\u6B64\u5173\u7CFB\u7684Avro\u8BB0\u5F55\u7684\u6D41\u6587\u4EF6\u3002</td></tr></tbody></table><h2 id="\u8BFB\u53D6\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u8BFB\u53D6\u5C5E\u6027" aria-hidden="true">#</a> \u8BFB\u53D6\u5C5E\u6027</h2><p>\u6CA1\u6709\u6307\u5B9A\u3002</p><h2 id="\u5199\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u5199\u5C5E\u6027" aria-hidden="true">#</a> \u5199\u5C5E\u6027</h2><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>hivestreaming.record.count</td><td>\u6B64\u5C5E\u6027\u5199\u5165\u8DEF\u7531\u5230\u201C\u6210\u529F\u201D\u548C\u201C\u5931\u8D25\u201D\u5173\u7CFB\u7684\u6D41\u6587\u4EF6\uFF0C\u5E76\u5305\u542B\u5206\u522B\u5199\u5165\u6210\u529F\u548C\u672A\u6210\u529F\u7684\u4F20\u5165\u6D41\u6587\u4EF6\u4E2D\u7684\u8BB0\u5F55\u6570\u3002</td></tr><tr><td>query.output.tables</td><td>\u6B64\u5C5E\u6027\u5199\u5728\u8DEF\u7531\u5230\u201C\u6210\u529F\u201D\u548C\u201C\u5931\u8D25\u201D\u5173\u7CFB\u7684\u6D41\u6587\u4EF6\u4E0A\uFF0C\u5E76\u5728\u201CdatabaseName\u201D\u4E2D\u5305\u542B\u76EE\u6807\u8868\u540D,\u8868\u7684\u683C\u5F0F\u3002</td></tr></tbody></table><h2 id="\u72B6\u6001\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u72B6\u6001\u7BA1\u7406" aria-hidden="true">#</a> \u72B6\u6001\u7BA1\u7406</h2><p>\u6B64\u7EC4\u4EF6\u4E0D\u5B58\u50A8\u72B6\u6001\u3002</p><h2 id="\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#\u9650\u5236" aria-hidden="true">#</a> \u9650\u5236</h2><p>\u6B64\u7EC4\u4EF6\u4E0D\u53D7\u9650\u5236\u3002</p><h2 id="\u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651" tabindex="-1"><a class="header-anchor" href="#\u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651" aria-hidden="true">#</a> \u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651</h2><p>\u6CA1\u6709\u6307\u5B9A\u3002</p><h2 id="\u5E94\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u5E94\u7528\u573A\u666F" aria-hidden="true">#</a> \u5E94\u7528\u573A\u666F</h2><p>\u8BE5\u5904\u7406\u5668\u7528\u4E8E\u5411hive\u8868\u5199 \u6570\u636E\uFF0C\u6570\u636E\u8981\u6C42 \u662Favro\u683C\u5F0F\uFF0C\u8981\u6C42\u4F7F\u7528\u8005\u719F\u7EC3\u4F7F\u7528hive\u3002</p><p>\u901A\u8FC7 thrift nifi\u8FDEhive\u7684\u95EE\u9898\u6709\u70B9\u590D\u6742,Apache\u7248NIFI\u5BF9\u5E94\u7684Apache\u7248hive\uFF0CHDP\u7248NIFI\u5BF9\u5E94\u7684HDP\u7248hive\u3002</p><p>\u8FDE\u63A5HDP\u7248hive\u65F6NIFI\u8FD0\u884C\u73AF\u5883\u9700\u914D\u7F6Ehive HDFS\u7684\u76F8\u5173hosts,\u5E76\u4E14\u8FD0\u884CNIFI \u7684\u7528\u6237\u62E5\u6709hive\u8868\u7684\u8BFB\u5199\u6743\u9650\u3002</p><p>\u6B64\u5904\u7406\u5668hive\u652F\u6301\u7684\u7248\u672C\u4E3A1.2.1\uFF0C\u4E0D\u652F\u6301hive2.x,hive3.x\u5219\u4F7F\u7528\u522B\u7684\u5904\u7406\u5668\u3002</p><h2 id="\u793A\u4F8B\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u793A\u4F8B\u8BF4\u660E" aria-hidden="true">#</a> \u793A\u4F8B\u8BF4\u660E</h2><p>1\uFF1A\u4ECE\u6570\u636E\u5E93\u8BFB\u53D6\u6570\u636E\u5199\u5165hive\u8868\uFF08\u65E0\u5206\u533A\uFF09,Apache NIFI 1.8 - Apache hive 1.2.1</p><p>\u5EFA\u8868\u8BED\u53E5:</p><p>hive\u8868\u53EA\u80FD\u662FORC\u683C\u5F0F\uFF1B</p><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF081.2\u53CA\u4EE5\u4E0A\u7248\u672C\uFF09\u5EFA\u8868\u4F7F\u7528SQL2011\u5173\u952E\u5B57\u4F1A\u62A5\u9519\uFF0C\u5982\u679C\u5F03\u7528\u4FDD\u7559\u5173\u952E\u5B57\uFF0C\u8FD8\u9700\u53E6\u505A\u914D\u7F6E\uFF1B</p><p>\u5EFA\u8868\u65F6\u5FC5\u987B\u6307\u660Etransactional = &quot;true&quot;</p><p>\u5EFA\u8868\u65F6\u9700&quot;clustered by (colName) into (n) buckets&quot;</p><p>\u8BE6\u60C5\u8BF7\u67E5\u770Bhive streaming \u5B98\u65B9\u6587\u6863\uFF08https://cwiki.apache.org/confluence/display/Hive/Streaming+Data+Ingest\uFF09</p><p><img src="'+s+`" alt=""></p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> demo_hive<span class="token punctuation">(</span>id <span class="token keyword">int</span><span class="token punctuation">,</span>name string<span class="token punctuation">,</span>day_time string<span class="token punctuation">)</span>
<span class="token keyword">CLUSTERED</span> <span class="token keyword">BY</span> <span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token keyword">INTO</span> <span class="token number">5</span> BUCKETS
STORED <span class="token keyword">AS</span> ORC
TBLPROPERTIES<span class="token punctuation">(</span><span class="token string">&#39;transactional&#39;</span><span class="token operator">=</span><span class="token string">&#39;true&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+d+'" alt=""></p><p>\u6765\u6E90 \u5E93\u6570\u636E\uFF1A</p><p><img src="'+n+'" alt=""></p><p>\u914D\u7F6E\u5982\u4E0B\uFF1Ahive\u7684thrift\u8981\u67E5\u770B\u914D\u7F6E hive-site.xml</p><p><img src="'+i+'" alt=""></p><p><img src="'+o+'" alt=""></p><p>\u8F93\u51FA\u7ED3\u679C:</p><p><img src="'+h+'" alt=""></p><p>2: HDP NIFI 1.5 - HDP hive 1.2.1</p><p><img src="'+l+'" alt=""></p>',45),g=[c];function u(v,b){return e(),r("div",null,g)}var f=t(p,[["render",u],["__file","PutHiveStreaming.html.vue"]]);export{f as default};