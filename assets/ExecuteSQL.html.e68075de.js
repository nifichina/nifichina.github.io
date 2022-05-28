import{_ as t,o as r,c as s,e}from"./app.3ad1c1e4.js";var a="/assets/1.da783c93.png",o="/assets/2.6908e07c.png",d="/assets/3.f51da15d.png",p="/assets/4.4c6f684d.png",i="/assets/5.3b837017.png",n="/assets/6.b8d611c5.png",l="/assets/7.847262e7.png",c="/assets/8.a244a0aa.png",g="/assets/9.6e813463.png",m="/assets/10.696b6486.png",_="/assets/11.02f9f1f5.png",h="/assets/12.fcc3ddf7.png",u="/assets/13.911cdc71.png",L="/assets/14.cf02e3f5.png",v="/assets/15.860e4579.png",S="/assets/16.9360c946.png",b="/assets/17.d02c2d60.png";const f={},E=e('<h1 id="executesql" tabindex="-1"><a class="header-anchor" href="#executesql" aria-hidden="true">#</a> ExecuteSQL</h1><hr><p>\u7F16\u8F91\u4EBA(\u5168\u7F51\u540C\u540D)\uFF1A<strong><strong>\u9177\u9177\u7684\u8BDA</strong></strong> \u90AE\u7BB1\uFF1A<strong>zhangchengk@foxmail.com</strong></p><hr><h2 id="\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>\u8BE5\u5904\u7406\u5668\u6267\u884CSQL\u8BED\u53E5\uFF0C\u8FD4\u56DEavro\u683C\u5F0F\u6570\u636E\u3002\u5904\u7406\u5668\u4F7F\u7528\u6D41\u5F0F\u5904\u7406\uFF0C\u56E0\u6B64\u652F\u6301\u4EFB\u610F\u5927\u7684\u7ED3\u679C\u96C6\u3002\u5904\u7406\u5668\u53EF\u4EE5\u4F7F\u7528\u6807\u51C6\u8C03\u5EA6\u65B9\u6CD5\u5C06\u6B64\u5904\u7406\u5668\u8C03\u5EA6\u4E3A\u5728\u8BA1\u65F6\u5668\u6216cron\u8868\u8FBE\u5F0F\u4E0A\u8FD0\u884C\uFF0C\u4E5F\u53EF\u4EE5\u7531\u4F20\u5165\u7684\u6D41\u6587\u4EF6\u89E6\u53D1\u3002SQL\u8BED\u53E5\u6765\u6E90\u53EF\u4EE5\u6765\u81EA\u8BE5\u5904\u7406\u5668\u5C5E\u6027SQL select query\uFF0C\u4E5F\u53EF\u4EE5\u6765\u81EA\u4E0A\u4E00\u4E2A\u5904\u7406\u5668\u7684\u8F93\u51FA\u6D41\uFF08FlowFile\u7684\u5185\u5BB9\u5E94\u91C7\u7528UTF-8\u683C\u5F0F\uFF09\uFF08GenerateTableFetch\uFF0CConvertJsonToSql\u7B49\u7B49\u751F\u6210\u7684\u6D41\u5185\u5BB9\u4E2D\u7684SQL\u8BED\u53E5\uFF0C\u7C7B\u4F3C\u4E8Einsert into\u3002\u3002\u3002value \uFF08\uFF1F\u3002\u3002\u3002\uFF09\uFF0C\u8FD9\u4E2A\uFF1F\u7684\u503C\u662F\u5B58\u5728\u4E8E\u6D41\u5C5E\u6027\u4E2D\u7684\uFF0C\u547D\u540D\u7EA6\u5B9A\u4E3Asql.args.N.value sql.args.N.type \uFF0C\u5176\u4E2DN\u662F\u4E00\u4E2A\u6B63\u6574\u6570\u3002 sql.args.N.type\u5E94\u8BE5\u662F\u6307\u793AJDBC\u7C7B\u578B\u7684\u6570\u5B57\u3002FlowFile\u5C5E\u6027&#39;executesql.row.count&#39;\u6307\u793A\u9009\u62E9\u4E86\u591A\u5C11\u884C\u3002\uFF09</p><h2 id="\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u5C5E\u6027" aria-hidden="true">#</a> \u5C5E\u6027</h2><table><thead><tr><th>\u5C5E\u6027\u540D\u79F0</th><th>\u9ED8\u8BA4\u503C</th><th>\u53EF\u9009\u503C</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td><strong>Database Connection Pooling Service</strong></td><td></td><td><strong>Controller Service API:</strong> <br> DBCPService <br> <strong>Implementations:</strong> <br>DBCPConnectionPoolLookup <br>HiveConnectionPool<br> DBCPConnectionPool</td><td>\u6570\u636E\u5E93\u8FDE\u63A5\u6C60</td></tr><tr><td>SQL Pre-Query</td><td></td><td></td><td>\u7528\u5206\u53F7\u5206\u9694\u7684SQL\u67E5\u8BE2\u5217\u8868\uFF0C\u5728\u6267\u884C\u4E3BSQL\u67E5\u8BE2\u4E4B\u524D\u6267\u884C\u3002\u4F8B\u5982\uFF0C\u5728\u4E3B\u67E5\u8BE2\u4E4B\u524D\u8BBE\u7F6E\u4F1A\u8BDD\u5C5E\u6027\u3002\u5982\u679C\u6CA1\u6709\u9519\u8BEF\uFF0C\u8FD9\u4E9B\u67E5\u8BE2\u7684\u6267\u884C\u7ED3\u679C\u4E0D\u4F1A\u88AB\u8F93\u51FA\u3002<br> <strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00</strong></td></tr><tr><td>SQL select query</td><td></td><td></td><td>\u8981\u6267\u884C\u7684SQL\uFF0C\u8BBE\u7F6E\u4E86\u6B64\u5C5E\u6027\uFF0C\u5219\u4F7F\u7528\u6B64SQL\uFF08\u4E0D\u7528\u6D41\u4E2D\u7684SQL\uFF09\uFF1B\u4E0D\u8BBE\u7F6E\uFF0C\u5219\u4F7F\u7528\u6D41\u4E2D\u7684SQL\uFF1B<br> <strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00</strong></td></tr><tr><td>SQL Post-Query</td><td></td><td></td><td>\u7528\u5206\u53F7\u5206\u9694\u7684SQL\u67E5\u8BE2\u5217\u8868\uFF0C\u5728\u6267\u884C\u4E3BSQL\u67E5\u8BE2\u540E\u6267\u884C\u3002\u4F8B\u5982\u5728\u4E3B\u67E5\u8BE2\u540E\u8BBE\u7F6E\u4F1A\u8BDD\u5C5E\u6027\u7684\u793A\u4F8B\u3002\u5982\u679C\u6CA1\u6709\u9519\u8BEF\uFF0C\u8FD9\u4E9B\u67E5\u8BE2\u7684\u6267\u884C\u7ED3\u679C\u4E0D\u4F1A\u88AB\u8F93\u51FA\u3002<br> <strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00</strong></td></tr><tr><td><strong>Max Wait Time</strong></td><td>0 seconds</td><td></td><td>\u6267\u884CSQL\u7684\u6700\u5927\u7B49\u5F85\u65F6\u95F4\uFF0C\u5C0F\u4E8E1\u79D2\u5219\u7CFB\u7EDF\u9ED8\u8BA4\u6B64\u914D\u7F6E\u7B49\u4E8E0\u79D2\uFF0C0\u79D2\u5373\u6CA1\u6709\u9650\u5236\u7684\u610F\u601D\uFF0C\u65E0\u9650\u7B49\u5F85</td></tr><tr><td><strong>Normalize Table/Column Names</strong></td><td>false</td><td>\u25AA true<br> \u25AA false</td><td>\u662F\u5426\u5C06\u8868\u540D\uFF0C\u5217\u540D\u4E2D\u53EF\u80FD\u5B58\u5728\u7684avro\u683C\u5F0F\u4E0D\u517C\u5BB9\u7684\u5B57\u7B26\u8FDB\u884C\u8F6C\u6362\uFF08\u4F8B\u5982\u9017\u53F7\u5192\u53F7\u8F6C\u6362\u4E3A\u4E0B\u5212\u7EBF\uFF0C\u5F53\u7136\u4E00\u822C\u8868\u540D\u5217\u540D\u4E5F\u4E0D\u5B58\u5728\u8FD9\u4E9B\u5B57\u7B26\uFF0C\u5E94\u7528\u8F83\u5C11\uFF0C\u9ED8\u8BA4false\uFF09</td></tr><tr><td><strong>Use Avro Logical Types</strong></td><td>false</td><td>\u25AAtrue<br> \u25AA false</td><td>\u662F\u5426\u5BF9DECIMAL/NUMBER, DATE, TIME \u548CTIMESTAMP\u7C7B\u578B\u4F7F\u7528Avro Logical Types\u3002\u5982\u679C\u9009\u62E9false\uFF0C\u8FD9\u4E9B\u5217\u5219\u8F6C\u6210\u5B57\u7B26\u4E32\u5F62\u5F0F\u3002\u5982\u679C\u9009\u62E9true,Avro Logical Types\u5219\u4F5C\u4E3A\u5176\u57FA\u672C\u7C7B\u578B,\u5177\u4F53\u6765\u8BF4,DECIMAL/NUMBER\u8F6C\u6362\u6210logical &#39;decimal&#39;:\u5199\u6210\u5E26\u6709\u7CBE\u5EA6\u7684\u5B57\u8282,DATE\u8F6C\u6362\u4E3A\u903B\u8F91logical\u201Cdate-millis\u201D:\u503C\u5199\u6210\u5929\u6570\uFF08\u4ECE\u7EAA\u5143(1970-01-01)\u7B97\u8D77\u7684\u6574\u6570\uFF09,TIME\u8F6C\u6362\u4E3Alogical\u201Ctime-millis\u201D:\u503C\u5199\u6210\u6BEB\u79D2\u6570\uFF08\u4ECE\u7EAA\u5143(1970-01-01)\u7B97\u8D77\u7684\u6574\u6570\uFF09,TIMESTAMP\u8F6C\u6362\u4E3Alogical\u201Ctimestamp-millis\u201D:\u503C\u5199\u6210\u6BEB\u79D2\u6570\uFF08\u4ECE\u7EAA\u5143(1970-01-01)\u7B97\u8D77\u7684\u6574\u6570\uFF09\u3002\u5982\u679CAvro\u8BB0\u5F55\u7684reader\u4E5F\u77E5\u9053\u8FD9\u4E9BLogical Types\uFF0C\u90A3\u4E48\u5C31\u53EF\u4EE5\u6839\u636Ereader\u7684\u5B9E\u73B0\u7C7B\u7ED3\u5408\u4E0A\u4E0B\u6587\u53CD\u5E8F\u5217\u5316\u8FD9\u4E9B\u503C\u3002</td></tr><tr><td><strong>Compression Format</strong></td><td>NONE</td><td>\u25AA BZIP2<br> \u25AA DEFLATE<br> \u25AA NONE<br> \u25AA SNAPPY<br> \u25AA LZO</td><td>\u538B\u7F29\u7C7B\u578B\uFF0C\u9ED8\u8BA4\u503CNONE</td></tr><tr><td><strong>Default Decimal Precision</strong></td><td>10</td><td></td><td>\u7CBE\u5EA6\uFF1B\u5F53\u4E00\u4E2ADECIMAL/NUMBER\u7C7B\u578B\u7684\u503C\u88AB\u5199\u6210\u201CDECIMAL\u201DAvro Logical \u7C7B\u578B\u65F6\uFF0C\u9700\u8981\u4E00\u4E2A\u7279\u5B9A\u7684\u201Cprecision\u201D\u6765\u8868\u793A\u53EF\u7528\u5177\u4F53\u6570\u5B57\u7684\u6570\u91CF\u3002\u901A\u5E38\uFF0C\u7CBE\u5EA6\u7531\u5217\u6570\u636E\u7C7B\u578B\u5B9A\u4E49\u6216\u6570\u636E\u5E93\u5F15\u64CE\u9ED8\u8BA4\u5B9A\u4E49\u3002\u5F53\u7136\uFF0C\u67D0\u4E9B\u6570\u636E\u5E93\u5F15\u64CE\u4E5F\u53EF\u4EE5\u8FD4\u56DE\u672A\u5B9A\u4E49\u7684\u7CBE\u5EA6(0)\u3002<br> <strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00</strong></td></tr><tr><td><strong>Default Decimal Scale</strong></td><td>0</td><td></td><td>\u5F53\u4E00\u4E2ADECIMAL/NUMBER\u7C7B\u578B\u88AB\u5199\u6210\u201CDECIMAL\u201DAvro Logical \u7C7B\u578B\u65F6\uFF0C\u9700\u8981\u4E00\u4E2A\u7279\u5B9A\u7684\u201Cscale\u201D\u6765\u8868\u793A\u53EF\u7528\u7684\u5C0F\u6570\u4F4D\u6570\u3002\u901A\u5E38\uFF0Cscale\u662F\u7531\u5217\u6570\u636E\u7C7B\u578B\u5B9A\u4E49\u6216\u6570\u636E\u5E93\u5F15\u64CE\u9ED8\u8BA4\u5B9A\u4E49\u7684\u3002\u4F46\u662F\uFF0C\u5F53\u8FD4\u56DE\u672A\u5B9A\u4E49\u7684\u7CBE\u5EA6(0)\u65F6\uFF0C\u4E00\u4E9B\u6570\u636E\u5E93\u5F15\u64CE\u7684\u4F38\u7F29\u6027\u4E5F\u53EF\u80FD\u4E0D\u786E\u5B9A\u3002\u201C\u9ED8\u8BA4\u5341\u8FDB\u5236\u201D\u7528\u4E8E\u7F16\u5199\u90A3\u4E9B\u672A\u5B9A\u4E49\u7684\u6570\u5B57\u3002\u5982\u679C\u4E00\u4E2A\u503C\u7684\u5C0F\u6570\u6BD4\u6307\u5B9A\u7684\u6BD4\u4F8B\u591A\uFF0C\u90A3\u4E48\u8BE5\u503C\u5C06\u88AB\u56DB\u820D\u4E94\u5165\uFF0C\u4F8B\u5982\uFF0C1.53\u5728\u6BD4\u4F8B\u4E3A0\u65F6\u53D8\u62102\uFF0C\u5728\u6BD4\u4F8B\u4E3A1\u65F6\u53D8\u62101.5\u3002<br> <strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00</strong></td></tr><tr><td><strong>Max Rows Per Flow File</strong></td><td>0</td><td></td><td>\u5355\u4E2A\u6D41\u6587\u4EF6\u4E2D\u5305\u542B\u7684\u6700\u5927\u7ED3\u679C\u884C\u6570\u3002\u8FD9\u610F\u5473\u7740\u5141\u8BB8\u5C06\u975E\u5E38\u5927\u7684\u7ED3\u679C\u96C6\u5206\u89E3\u4E3A\u591A\u4E2A\u6D41\u6587\u4EF6\u3002\u5982\u679C\u6307\u5B9A\u7684\u503C\u4E3A\u96F6\uFF0C\u5219\u5728\u5355\u4E2A\u6D41\u6587\u4EF6\u4E2D\u8FD4\u56DE\u6240\u6709\u884C\u3002 <br> <strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00</strong></td></tr><tr><td><strong>Output Batch Size</strong></td><td>0</td><td></td><td>\u63D0\u4EA4\u8FDB\u7A0B\u4F1A\u8BDD\u4E4B\u524D\u8981\u6392\u961F\u7684\u8F93\u51FA\u6D41\u6587\u4EF6\u7684\u6570\u91CF\u3002\u5F53\u8BBE\u7F6E\u4E3A\u96F6\u65F6\uFF0C\u4F1A\u8BDD\u5C06\u5728\u5904\u7406\u5B8C\u6240\u6709\u7ED3\u679C\u96C6\u884C\u5E76\u51C6\u5907\u597D\u5C06\u8F93\u51FA\u6D41\u6587\u4EF6\u4F20\u8F93\u5230\u4E0B\u6E38\u5173\u7CFB\u65F6\u63D0\u4EA4\u3002\u5BF9\u4E8E\u5927\u578B\u7ED3\u679C\u96C6\uFF0C\u8FD9\u53EF\u80FD\u5BFC\u81F4\u5728\u5904\u7406\u5668\u6267\u884C\u7ED3\u675F\u65F6\u4F20\u8F93\u5927\u91CF\u6D41\u6587\u4EF6\u3002\u5982\u679C\u8BBE\u7F6E\u4E86\u6B64\u5C5E\u6027\uFF0C\u90A3\u4E48\u5F53\u6307\u5B9A\u6570\u91CF\u7684\u6D41\u6587\u4EF6\u51C6\u5907\u597D\u4F20\u8F93\u65F6\uFF0C\u5C06\u63D0\u4EA4\u4F1A\u8BDD\uFF0C\u4ECE\u800C\u5C06\u6D41\u6587\u4EF6\u91CA\u653E\u5230\u4E0B\u6E38\u5173\u7CFB\u3002\u6CE8\u610F:\u7247\u6BB5\u3002\u5728\u8BBE\u7F6E\u6B64\u5C5E\u6027\u65F6\uFF0C\u4E0D\u4F1A\u5728FlowFiles\u4E0A\u8BBE\u7F6Ecount\u5C5E\u6027\u3002<br> <strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00</strong></td></tr><tr><td><strong>Fetch Size</strong></td><td></td><td></td><td>\u4E00\u6B21\u8981\u4ECE\u7ED3\u679C\u96C6\u4E2D\u83B7\u53D6\u7684\u7ED3\u679C\u884C\u6570\u3002\u8FD9\u662F\u5BF9\u6570\u636E\u5E93\u9A71\u52A8\u7A0B\u5E8F\u7684\u63D0\u793A\uFF0C\u6709\u53EF\u80FDJDBC\u9A71\u52A8\u5E76\u4E0D\u652F\u6301\u3002\u5982\u679C\u6307\u5B9A\u7684\u503C\u4E3A\u96F6\uFF0C\u5219\u5FFD\u7565\u63D0\u793A\u3002</td></tr></tbody></table><h2 id="\u793A\u4F8B\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u793A\u4F8B\u8BF4\u660E" aria-hidden="true">#</a> \u793A\u4F8B\u8BF4\u660E</h2><p>1\uFF1AAvro Logical Types \uFF0C\u6CA1\u6709\u63A5\u89E6\u8FC7\u7684\u4EBA\u53EF\u80FD\u4F1A\u4E00\u5934\u96FE\u6C34\u3002\u7B80\u5355\u6765\u8BF4\uFF0C\u6570\u636E\u5E93\u6709\u81EA\u5DF1\u7684\u6570\u636E\u7C7B\u578B\uFF0Cavro\u683C\u5F0F\u6570\u636E\u4E5F\u6709\u81EA\u5DF1\u7684\u6570\u636E\u7C7B\u578B\uFF0C\u4E24\u65B9\u7684\u6570\u636E\u7C7B\u578B\u6709\u4E9B\u662F\u80FD\u76F4\u63A5\u6620\u5C04\u7684\uFF0C\u6709\u4E9B\u662F\u9700\u8981\u8F6C\u6362\u7684\uFF0C\u6587\u6863\u4E2D\u6240\u8BF4\u7684DECIMAL/NUMBER, DATE, TIME \u548CTIMESTAMP\u8FD9\u4E9B\u6765\u6E90\u6570\u636E\u7684\u7C7B\u578B\u5728avro\u4E2D\u5C31\u65E0\u6CD5\u76F4\u63A5\u6620\u5C04\u7C7B\u578B\uFF1B\u8FD9\u91CC\u63D0\u4F9B\u4E86\u4E24\u79CD\u89E3\u51B3\u65B9\u6CD5\uFF0C\u7B2C\u4E00\u79CD\u662F\u4E0A\u8FF0\u7C7B\u578B\u7EDF\u4E00\u8F6C\u6210\u5B57\u7B26\u4E32\u7C7B\u578B\uFF0C\u5177\u4F53\u503C\u4E0D\u53D8\uFF1B\u53E6\u4E00\u79CD\u662F\u8F6C\u6362\u6210avro Logical Types\uFF0C\u4F46\u6570\u636E\u503C\u4F1A\u53D8\u52A8\u8F6C\u6362\u3002\u6309\u6211\u4F7F\u7528\u4E00\u822C\u8FD9\u4E2A\u5C5E\u6027\u8BBE\u7F6E\u4E3Afalse\uFF0C\u5341\u8FDB\u5236/\u6570\u5B57\u3001\u65E5\u671F\u3001\u65F6\u95F4\u548C\u65F6\u95F4\u6233\u5217\u5C31\u5199\u6210\u5B57\u7B26\u4E32\u3002\u6700\u5927\u7684\u597D\u5904\u5C31\u662F\u503C\u4E0D\u53D8\uFF08\u5982\u4E0B\uFF09<img src="'+a+'" alt=""></p><p>\u7136\u540E\u53EF\u4EE5\u4F7F\u7528ConvertJsonToSql\uFF08\u4ECE\u76EE\u6807\u8868\u83B7\u53D6\u5143\u6570\u636E\u4FE1\u606F\uFF09\u6216\u8005\u5199\u4E34\u65F6\u8868\uFF0C\u5916\u90E8\u8868\u7B49\u7B49,\u6700\u540E\u4E5F\u4F1A\u6709\u5F88\u591A\u65B9\u6CD5\u6210\u529F\u5199\u5165\u5230\u76EE\u6807\u5E93\u3002<img src="'+o+'" alt=""></p><p>2\uFF1ASQL select query</p><p>\u9996\u5148\u8BBE\u8BA1\u5982\u56FE\u4E00\u4E2A\u6D41\u7A0B\uFF1A</p><p><img src="'+d+'" alt=""></p><p>\u6D41\u4E2D\u662F\u4E00\u4E2ASQL\u8BED\u53E5 limit 1</p><p><img src="'+p+'" alt=""></p><p>SQL select query \u5C5E\u6027\u8BBE\u6210 limit 2</p><p><img src="'+i+'" alt=""></p><p>\u7ED3\u679C\u53D1\u73B0\uFF0C\u5F53SQL select query\u914D\u7F6E\u540E\uFF0C\u5C06\u5FFD\u7565\u6D41\u4E2D\u4F20\u8FC7\u6765\u7684SQL</p><p><img src="'+n+'" alt=""></p><p>3\uFF1A</p><p>Max Rows Per Flow File Output Batch Size</p><p>\u8FD9\u4E24\u4E2A\u770B\u8D77\u6765\u90FD\u662F\u63A7\u5236\u8F93\u51FA\u5927\u5C0F\u7684\uFF0C\u6587\u6863\u770B\u7684\u6709\u70B9\u8FF7\u7CCA\uFF1B</p><p>\u54B1\u4EEC\u4E00\u4E2A\u4E00\u4E2A\u6765\u770B\uFF1A</p><p>3.1 \u9996\u5148\u67E5\u4E00\u767E\u6761\u6570\u636E\uFF0CMax Rows Per Flow File \u8BBE\u4E3A10</p><p><img src="'+l+'" alt=""></p><p>\u7ED3\u679C\u662F\u8F93\u51FA10\u4E2A\u6D41\u6587\u4EF6\uFF0C\u6BCF\u4E2A\u6D41\u6587\u4EF610\u6761\u6570\u636E</p><p><img src="'+c+'" alt=""></p><p><img src="'+g+'" alt=""></p><p>3.2</p><p><img src="'+m+'" alt=""></p><p><img src="'+_+'" alt=""></p><p><img src="'+h+'" alt=""></p><p>\u7ED3\u679C\u611F\u89C9\u8DDF\u6CA1\u8BBE\u7F6E\u4E00\u6837\uFF0C\u53CA\u65F6\u8BBE\u6210\u6210 limit \u4E00\u767E\u4E07 \u4E00\u4E2A\u4EBF\uFF0C\u4E5F\u662F\u8F93\u51FA\u4E00\u4E2A\u6D41\u6587\u4EF6\uFF1B\u5F53\u7136\u4E86\uFF0C\u8FD9\u4F1A\u513F\u4E00\u822C\u5927\u5BB6\u90FD\u4F1A\u9A82\u5A18\u201C\u8FD9NIFI\u592A\u5751\u4E86\uFF01\u90FD\u6CA1\u7528\uFF01\u5783\u573E\u3002\u3002\u3002\u201D</p><p>\u522B\u6025\uFF0C\u770B\u4E0B\u4EE3\u7801\u5C31\u660E\u767D\u4EC0\u4E48\u610F\u601D\u4E86\uFF08\u5982\u4E0B\u56FE\uFF09\u770B\u6CE8\u91CA\u5DF2\u7ECF\u6B64\u5904\u7684\u4EE3\u7801\u903B\u8F91\uFF0C\u5F53\u6D41\u6587\u4EF6\u6570\u8FBE\u5230\u4E86outputBatchSize\u7684\u65F6\u5019\uFF0C\u8FD9\u6279\u6D41\u6587\u4EF6\u4F1A\u88AB\u8F93\u51FA\u5230sucess</p><p><img src="'+u+'" alt=""></p><p>\u6BD4\u5982\u914D\u7F6E\u5982\u4E0B\uFF0C\u4F1A\u53D1\u73B0\u6D41\u6587\u4EF6\u8F93\u51FA\u4E0D\u518D\u662F\u4E00\u4E2A\u4E00\u4E2A\u7684\u8F93\u51FA\uFF0C\u800C\u662F2\u4E2A\u4E3A\u5355\u4F4D\u7684\u8F93\u51FA\uFF1A</p><p><img src="'+L+'" alt=""></p><p>\u4E0D\u4FE1\u4F60\u53EF\u4EE5\u8BD5\u8BD5\uFF0Coutput Batch size\u8BBE\u6210\u5076\u6570\uFF0C\u6D41\u589E\u957F\u90FD\u662F\u5076\u6570</p><p><img src="'+v+'" alt=""></p><p>\u540C\u7406\uFF0C\u8BBE\u4E3A\u5947\u6570\uFF0C\u5C31\u4F1A\u53D1\u73B0\u662F\u6309\u5947\u6570\u589E\u957F\u7684</p><p><img src="'+S+'" alt=""></p><p><img src="'+b+'" alt=""></p>',43),Q=[E];function M(T,A){return r(),s("div",null,Q)}var D=t(f,[["render",M],["__file","ExecuteSQL.html.vue"]]);export{D as default};
