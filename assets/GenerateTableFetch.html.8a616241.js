import{_ as t,o as e,c as r,e as a}from"./app.3ad1c1e4.js";var d="/assets/1.14a98e24.png",s="/assets/2.6b1a9bd8.png",n="/assets/3.9777637e.png",p="/assets/4.6bf120a2.png",i="/assets/5.b821d719.png",o="/assets/6.86830cd5.png",h="/assets/21.a1048b2f.png",l="/assets/22.d8f783d3.png",c="/assets/31.ec1b7f87.png",g="/assets/32.239c87f5.png",b="/assets/33.8e5ff86e.png",m="/assets/34.0d00b242.png",_="/assets/41.914413ce.png",u="/assets/42.64ac96a1.png",f="/assets/43.8122694e.png",S="/assets/44.d933ab0c.png",v="/assets/45.0f1c3b1d.png",L="/assets/46.dade6847.png",x="/assets/51.b416db81.png",Q="/assets/52.54a22c51.png",T="/assets/53.5f6fa1fa.png",C="/assets/54.f7c1fae9.png",F="/assets/55.427996c5.png",y="/assets/56.79253da0.png",E="/assets/57.2b07c52c.png";const P={},G=a('<h1 id="generatetablefetch" tabindex="-1"><a class="header-anchor" href="#generatetablefetch" aria-hidden="true">#</a> GenerateTableFetch</h1><hr><p>\u7F16\u8F91\u4EBA(\u5168\u7F51\u540C\u540D)\uFF1A<strong><strong>\u9177\u9177\u7684\u8BDA</strong></strong> \u90AE\u7BB1\uFF1A<strong>zhangchengk@foxmail.com</strong></p><hr><h2 id="\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>\u8BE5\u5904\u7406\u5668\u7528\u4E8E\u751F\u6210\u5728\u8868\u4E2D\u6267\u884C\u5206\u9875\u67E5\u8BE2\u7684SQL \u67E5\u8BE2\u8BED\u53E5\uFF0C\u5206\u533A(\u5C5E\u6027partition)\u5927\u5C0F\u4EE5\u53CA\u8868\u7684\u884C\u6570\u51B3\u5B9A\u9875\u9762\u7684\u5927\u5C0F\u548C\u6570\u91CF\u4EE5\u53CA\u751F\u6210\u7684\u6D41\u6587\u4EF6\u3002\u6B64\u5916\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E\u6700\u5927\u503C\u5217\u6765\u5B9E\u73B0\u589E\u91CF\u6293\u53D6\u6570\u636E\uFF0C\u5904\u7406\u5668\u4F1A\u8DDF\u8E2A\u5217\u7684\u6700\u5927\u503C\uFF0C\u4ECE\u800C\u53EA\u6293\u53D6\u5217\u503C\u8D85\u8FC7\u5DF2\u8BB0\u5F55\u5230\u7684\u6700\u5927\u503C\u7684\u884C\uFF0C\u8BE5\u5904\u7406\u5668\u53EA\u5728\u4E3B\u8282\u70B9\u4E0A\u8FD0\u884C\uFF0C\u53EF\u4EE5\u63A5\u53D7\u4F20\u5165\u7684\u8FDE\u63A5;</p><p>\u63D0\u4F9B\u4F20\u5165\u8FDE\u63A5\u4E0E\u5426\uFF0C\u5904\u7406\u5668\u7684\u884C\u4E3A\u662F\u4E0D\u540C\u7684:</p><p>\u5982\u679C\u6CA1\u6709\u6307\u5B9A\u4F20\u5165\u8FDE\u63A5\uFF0C\u5904\u7406\u5668\u5C06\u6839\u636E\u6307\u5B9A\u7684\u5904\u7406\u5668\u8C03\u5EA6\u751F\u6210SQL\u8BED\u53E5\u3002\u8BB8\u591A\u5B57\u6BB5\u90FD\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00\uFF0C\u4F46\u662F\u6CA1\u6709\u6D41\u6587\u4EF6\u5C5E\u6027\u53EF\u7528\u3002\u4F46\u662F\uFF0C\u53EF\u4EE5\u4F7F\u7528\u53D8\u91CF\u6CE8\u518C\u8868\u8BC4\u4F30\u5C5E\u6027\u3002</p><p>\u5982\u679C\u6307\u5B9A\u4E86\u4F20\u5165\u8FDE\u63A5\uFF0C\u5E76\u4E14\u5904\u7406\u5668\u4EFB\u52A1\u6CA1\u6709\u53EF\u7528\u7684\u6D41\u6587\u4EF6\uFF0C\u5219\u4E0D\u6267\u884C\u4EFB\u4F55\u5DE5\u4F5C\u3002</p><p>\u5982\u679C\u6307\u5B9A\u4E86\u4F20\u5165\u8FDE\u63A5\uFF0C\u5E76\u4E14\u5904\u7406\u7A0B\u5E8F\u4EFB\u52A1\u6709\u53EF\u7528\u6D41\u6587\u4EF6\uFF0C\u5219\u6D41\u6587\u4EF6\u7684\u5C5E\u6027\u53EF\u4EE5\u5728\u8868\u8FBE\u5F0F\u8BED\u8A00\u4E2D\u7528\u4E8E\u8868\u540D\u7B49\u5B57\u6BB5\u3002\u4F46\u662F\uFF0CMax-Value\u5217\u548C\u8FD4\u56DE\u5B57\u6BB5\u7684\u5217\u5FC5\u987B\u4E3A\u7A7A\u6216\u8005\u5F15\u7528\u6BCF\u4E2A\u6307\u5B9A\u8868\u4E2D\u53EF\u7528\u7684\u5217(\u591A\u8868\u67E5\u8BE2\uFF0C\u5B57\u6BB5\u4E5F\u53EF\u4EE5\u8BBE\u7F6E\u6210\u5C5E\u6027\u8868\u8FBE\u5F0F\u8BED\u8A00\u5C31\u53EF\u4EE5\u4E86)\u3002</p><h2 id="\u5C5E\u6027\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5C5E\u6027\u914D\u7F6E" aria-hidden="true">#</a> \u5C5E\u6027\u914D\u7F6E</h2><p>\u5728\u4E0B\u9762\u7684\u5217\u8868\u4E2D\uFF0C\u5FC5\u9700\u5C5E\u6027\u7684\u540D\u79F0\u4EE5\u7C97\u4F53\u663E\u793A\u3002\u4EFB\u4F55\u5176\u4ED6\u5C5E\u6027(\u4E0D\u662F\u7C97\u4F53)\u90FD\u88AB\u8BA4\u4E3A\u662F\u53EF\u9009\u7684\uFF0C\u5E76\u4E14\u6307\u51FA\u5C5E\u6027\u9ED8\u8BA4\u503C\uFF08\u5982\u679C\u6709\u9ED8\u8BA4\u503C\uFF09\uFF0C\u4EE5\u53CA\u5C5E\u6027\u662F\u5426\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00\u3002</p><table><thead><tr><th>\u5C5E\u6027\u540D\u79F0</th><th>\u9ED8\u8BA4\u503C</th><th>\u53EF\u9009\u503C</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td><strong>Database Connection Pooling Service</strong></td><td></td><td><strong>Controller Service API:</strong> <br> BCPService <br> <strong>Implementations:</strong> <br> DBCPConnectionPool <br>DBCPConnectionPoolLookup <br> HiveConnectionPool</td><td>\u7528\u4E8E\u83B7\u53D6\u5230\u6570\u636E\u5E93\u7684\u8FDE\u63A5\u7684\u63A7\u5236\u5668\u670D\u52A1\u3002</td></tr><tr><td><strong>Database Type</strong></td><td>Generic</td><td>\u25AAGeneric<br> \u25AAOracle<br> \u25AAOracle 12+ <br> \u25AAMS SQL 2012+ <br> \u25AAMS SQL 2008<br> \u25AAMySQL</td><td>\u6570\u636E\u5E93\u7684\u7C7B\u578B\uFF0C\u7528\u4E8E\u751F\u6210\u7279\u5B9A\u4E8E\u6570\u636E\u5E93\u7684\u4EE3\u7801\u3002\u5728\u8BB8\u591A\u60C5\u51B5\u4E0B\uFF0C\u6CDB\u578B\u7C7B\u578B\u5C31\u8DB3\u591F\u4E86\uFF0C\u4F46\u662F\u6709\u4E9B\u6570\u636E\u5E93(\u5982Oracle)\u9700\u8981\u5B9A\u5236SQL\u5B50\u53E5\u3002</td></tr><tr><td><strong>Table Name</strong></td><td></td><td></td><td>\u8981\u67E5\u8BE2\u7684\u6570\u636E\u5E93\u8868\u7684\u540D\u79F0\u3002<br><strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true(\u5C06\u4F7F\u7528\u6D41\u6587\u4EF6\u5C5E\u6027\u548C\u53D8\u91CF\u6CE8\u518C\u8868\u8FDB\u884C\u8BC4\u4F30)</strong></td></tr><tr><td>Columns to Return</td><td></td><td></td><td>\u8981\u5728\u67E5\u8BE2\u4E2D\u4F7F\u7528\u7684\u4EE5\u9017\u53F7\u5206\u9694\u7684\u5217\u540D\u5217\u8868\u3002\u5982\u679C\u6570\u636E\u5E93\u9700\u8981\u5BF9\u540D\u79F0\u8FDB\u884C\u7279\u6B8A\u5904\u7406(\u4F8B\u5982\u5F15\u7528)\uFF0C\u90A3\u4E48\u6BCF\u4E2A\u540D\u79F0\u90FD\u5E94\u8BE5\u5305\u542B\u8FD9\u6837\u7684\u5904\u7406\u3002\u5982\u679C\u6CA1\u6709\u63D0\u4F9B\u5217\u540D\uFF0C\u5219\u8FD4\u56DE\u6307\u5B9A\u8868\u4E2D\u7684\u6240\u6709\u5217\u3002\u6CE8\u610F:\u5BF9\u4E8E\u7ED9\u5B9A\u7684\u8868\uFF0C\u4F7F\u7528\u4E00\u81F4\u7684\u5217\u540D\u5F88\u91CD\u8981\uFF0C\u8FD9\u6837\u589E\u91CF\u83B7\u53D6\u624D\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002<br><strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true(\u5C06\u4F7F\u7528\u6D41\u6587\u4EF6\u5C5E\u6027\u548C\u53D8\u91CF\u6CE8\u518C\u8868\u8FDB\u884C\u8BC4\u4F30)</strong></td></tr><tr><td>Maximum-value Columns</td><td></td><td></td><td>\u4EE5\u9017\u53F7\u5206\u9694\u7684\u5217\u540D\u5217\u8868\u3002\u5904\u7406\u5668\u5C06\u8DDF\u8E2A\u5904\u7406\u5668\u5F00\u59CB\u8FD0\u884C\u4EE5\u6765\u8FD4\u56DE\u7684\u6BCF\u4E2A\u5217\u7684\u6700\u5927\u503C\u3002\u4F7F\u7528\u591A\u4E2A\u5217\u610F\u5473\u7740\u8981\u5BF9\u5217\u5217\u8868\u8FDB\u884C\u6392\u5E8F\uFF0C\u5E76\u4E14\u6BCF\u4E2A\u5217\u7684\u503C\u7684\u589E\u957F\u901F\u5EA6\u90FD\u6BD4\u524D\u4E00\u5217\u7684\u503C\u8981\u6162\u3002\u56E0\u6B64\uFF0C\u4F7F\u7528\u591A\u4E2A\u5217\u610F\u5473\u7740\u5217\u7684\u5C42\u6B21\u7ED3\u6784\uFF0C**\u901A\u5E38\u7528\u4E8E\u5206\u533A\u8868\u3002**\u6B64\u5904\u7406\u5668\u4EC5\u53EF\u7528\u4E8E\u68C0\u7D22\u81EA\u4E0A\u6B21\u68C0\u7D22\u4EE5\u6765\u5DF2\u6DFB\u52A0\u6216\u66F4\u65B0\u7684\u884C\u3002\u6CE8\u610F\uFF0C\u4E00\u4E9BJDBC\u7C7B\u578B(\u5982bit/boolean)\u4E0D\u5229\u4E8E\u7EF4\u62A4\u6700\u5927\u503C\uFF0C\u56E0\u6B64\u8FD9\u4E9B\u7C7B\u578B\u7684\u5217\u4E0D\u5E94\u8BE5\u5217\u5728\u6B64\u5C5E\u6027\u4E2D\uFF0C\u5E76\u4E14\u5728\u5904\u7406\u8FC7\u7A0B\u4E2D\u4F1A\u5BFC\u81F4\u9519\u8BEF\u3002\u5982\u679C\u6CA1\u6709\u63D0\u4F9B\u6B64\u5217\uFF0C\u5219\u5C06\u8003\u8651\u8868\u4E2D\u7684\u6240\u6709\u884C\uFF0C\u8FD9\u53EF\u80FD\u4F1A\u5F71\u54CD\u6027\u80FD\u3002\u6CE8\u610F:\u5BF9\u4E8E\u7ED9\u5B9A\u7684\u8868\uFF0C\u4F7F\u7528\u4E00\u81F4\u7684max-value\u5217\u540D\u5F88\u91CD\u8981\uFF0C\u8FD9\u6837\u589E\u91CF\u83B7\u53D6\u624D\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002<br><strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true(\u5C06\u4F7F\u7528\u6D41\u6587\u4EF6\u5C5E\u6027\u548C\u53D8\u91CF\u6CE8\u518C\u8868\u8FDB\u884C\u8BC4\u4F30)</strong></td></tr><tr><td><strong>Max Wait Time</strong></td><td>0 seconds</td><td></td><td>\u5141\u8BB8\u8FD0\u884CSQL select\u67E5\u8BE2\u7684\u6700\u5927\u65F6\u95F4\u91CF\uFF0C\u4E3A\u96F6\u610F\u5473\u7740\u6CA1\u6709\u9650\u5236\u3002\u5C0F\u4E8E1\u79D2\u7684\u6700\u957F\u65F6\u95F4\u7B49\u4E8E\u96F6\u3002<br><strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true(\u5C06\u4F7F\u7528\u6D41\u6587\u4EF6\u5C5E\u6027\u548C\u53D8\u91CF\u6CE8\u518C\u8868\u8FDB\u884C\u8BC4\u4F30)</strong></td></tr><tr><td><strong>Partition Size</strong></td><td>10000</td><td></td><td>\u6BCF\u4E2A\u751F\u6210\u7684SQL\u8BED\u53E5\u8981\u83B7\u53D6\u7684\u7ED3\u679C\u884C\u6570\u3002\u8868\u4E2D\u603B\u884C\u6570\u9664\u4EE5\u5206\u533A\u5927\u5C0F\u7ED9\u51FA\u751F\u6210\u7684SQL\u8BED\u53E5(\u5373\u6D41\u6587\u4EF6)\u7684\u6570\u91CF\u3002\u503C\u4E3A0\u8868\u793A\u5C06\u751F\u6210\u4E00\u4E2A\u6D41\u6587\u4EF6\uFF0C\u5176SQL\u8BED\u53E5\u5C06\u83B7\u53D6\u8868\u4E2D\u7684\u6240\u6709\u884C\u3002<br><strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true(\u5C06\u4F7F\u7528\u6D41\u6587\u4EF6\u5C5E\u6027\u548C\u53D8\u91CF\u6CE8\u518C\u8868\u8FDB\u884C\u8BC4\u4F30)</strong></td></tr><tr><td>Column for Value Partitioning</td><td></td><td></td><td>\u503C\u5C06\u7528\u4E8E\u5206\u533A\u7684\u5217\u7684\u540D\u79F0\u3002\u9ED8\u8BA4\u884C\u4E3A\u662F\u4F7F\u7528\u7ED3\u679C\u96C6\u4E2D\u7684\u884C\u53F7\uFF0C\u4F7F\u7528\u504F\u79FB\u6216\u9650\u5236\u7B56\u7565\u5C06\u7ED3\u679C\u5206\u533A\u5230\u8981\u4ECE\u6570\u636E\u5E93\u83B7\u53D6\u7684\u201C\u9875\u9762\u201D\u4E2D\u3002\u7136\u800C\uFF0C\u5BF9\u4E8E\u67D0\u4E9B\u6570\u636E\u5E93\uFF0C\u5728\u9002\u5F53\u7684\u60C5\u51B5\u4E0B\u4F7F\u7528\u5217\u503C\u672C\u8EAB\u6765\u5B9A\u4E49\u201C\u9875\u9762\u201D\u53EF\u80FD\u66F4\u6709\u6548(\u6BD4\u5982\u81EA\u589EID)\u3002\u53EA\u6709\u5F53\u9ED8\u8BA4\u67E5\u8BE2\u6267\u884C\u5F97\u4E0D\u597D\u3001\u6CA1\u6709\u6700\u5927\u503C\u5217\u6216\u53EA\u6709\u4E00\u4E2A\u6700\u5927\u503C\u5217\uFF08\u5176\u7C7B\u578B\u53EF\u4EE5\u5F3A\u5236\u4E3A\u957F\u6574\u6570\uFF08\u5373\u4E0D\u662F\u65E5\u671F\u6216\u65F6\u95F4\u6233\uFF09\uFF09\u4E14\u5217\u503C\u5747\u5300\u5206\u5E03\u800C\u4E0D\u662F\u7A00\u758F\u65F6\uFF0C\u624D\u5E94\u4F7F\u7528\u6B64\u5C5E\u6027<br><strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true(\u5C06\u4F7F\u7528\u6D41\u6587\u4EF6\u5C5E\u6027\u548C\u53D8\u91CF\u6CE8\u518C\u8868\u8FDB\u884C\u8BC4\u4F30)</strong></td></tr><tr><td>Additional WHERE clause</td><td></td><td></td><td>\u5728\u6784\u5EFASQL\u67E5\u8BE2\u65F6\uFF0C\u8981\u5728WHERE\u6761\u4EF6\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u81EA\u5B9A\u4E49\u5B50\u53E5\u3002<br><strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true(\u5C06\u4F7F\u7528\u6D41\u6587\u4EF6\u5C5E\u6027\u548C\u53D8\u91CF\u6CE8\u518C\u8868\u8FDB\u884C\u8BC4\u4F30)</strong></td></tr><tr><td><strong>Output Empty FlowFile on Zero Results</strong></td><td>false</td><td>\u25AAtrue<br> \u25AAfalse</td><td>\u6839\u636E\u6307\u5B9A\u7684\u5C5E\u6027\uFF0C\u6B64\u5904\u7406\u5668\u7684\u6267\u884C\u53EF\u80FD\u4E0D\u4F1A\u751F\u6210\u4EFB\u4F55SQL\u8BED\u53E5\u3002\u5F53\u6B64\u5C5E\u6027\u4E3A\u771F\u65F6\uFF0C\u5C06\u751F\u6210\u4E00\u4E2A\u7A7A\u6D41\u6587\u4EF6(\u5982\u679C\u5B58\u5728\u4F20\u5165\u6D41\u6587\u4EF6\u7684\u7236\u6587\u4EF6)\uFF0C\u5E76\u5C06\u5176\u4F20\u8F93\u5230success\u5173\u7CFB\u3002\u5F53\u6B64\u5C5E\u6027\u4E3Afalse\u65F6\uFF0C\u5C06\u4E0D\u4F1A\u751F\u6210\u4EFB\u4F55\u8F93\u51FA\u6D41\u6587\u4EF6\u3002</td></tr></tbody></table><h2 id="\u52A8\u6001\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u52A8\u6001\u5C5E\u6027" aria-hidden="true">#</a> \u52A8\u6001\u5C5E\u6027</h2><p>\u8BE5\u5904\u7406\u5668\u5141\u8BB8\u7528\u6237\u6307\u5B9A\u5C5E\u6027\u7684\u540D\u79F0\u548C\u503C\u3002</p><table><thead><tr><th>\u5C5E\u6027\u540D\u79F0</th><th>\u5C5E\u6027\u503C</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>initial.maxvalue.&lt;max_value_column&gt;</td><td>\u6307\u5B9A\u5217\u7684\u521D\u59CB\u6700\u5927\u503C</td><td>\u5C5E\u6027\u5E94\u8BE5\u4EE5\u201Cinitial.maxvalue.&lt;max_value_column&gt;\u201D\u683C\u5F0F\u6DFB\u52A0\u3002\u6B64\u503C\u4EC5\u5728\u7B2C\u4E00\u6B21\u8BBF\u95EE\u8868\u65F6\u4F7F\u7528(\u6307\u5B9A\u6700\u5927\u503C\u5217\u65F6)\u3002\u5728\u4F20\u5165\u8FDE\u63A5\u7684\u60C5\u51B5\u4E0B\uFF0C\u4EC5\u7B2C\u4E00\u6B21\u4E3A\u6D41\u6587\u4EF6\u4E2D\u6307\u5B9A\u7684\u6BCF\u4E2A\u8868\u4F7F\u7528\u8BE5\u503C\u3002<br><strong>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true(\u5C06\u4F7F\u7528\u6D41\u6587\u4EF6\u5C5E\u6027\u548C\u53D8\u91CF\u6CE8\u518C\u8868\u8FDB\u884C\u8BC4\u4F30)</strong></td></tr></tbody></table><h2 id="\u8FDE\u63A5\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#\u8FDE\u63A5\u5173\u7CFB" aria-hidden="true">#</a> \u8FDE\u63A5\u5173\u7CFB</h2><table><thead><tr><th>\u540D\u79F0</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>sucess</td><td>\u6210\u529F\u5730\u4ECESQL\u67E5\u8BE2\u7ED3\u679C\u96C6\u521B\u5EFA\u4E86\u6D41\u6587\u4EF6\u3002</td></tr><tr><td>failure</td><td>\u6B64\u5173\u7CFB\u4EC5\u5728SQL\u67E5\u8BE2\u6267\u884C\u5931\u8D25(\u4F7F\u7528\u4F20\u5165\u6D41\u6587\u4EF6)\u65F6\u624D\u4F7F\u7528\u3002\u4F20\u5165\u7684\u6D41\u6587\u4EF6\u5C06\u88AB\u60E9\u7F5A\u5E76\u8DEF\u7531\u5230\u6B64\u5173\u7CFB\u3002\u5982\u679C\u6CA1\u6709\u6307\u5B9A\u4F20\u5165\u8FDE\u63A5\uFF0C\u5219\u6B64\u5173\u7CFB\u4E0D\u4F7F\u7528\u3002</td></tr></tbody></table><h2 id="\u8BFB\u53D6\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u8BFB\u53D6\u5C5E\u6027" aria-hidden="true">#</a> \u8BFB\u53D6\u5C5E\u6027</h2><p>\u6CA1\u6709\u6307\u5B9A\u3002</p><h2 id="\u5199\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u5199\u5C5E\u6027" aria-hidden="true">#</a> \u5199\u5C5E\u6027</h2><table><thead><tr><th>\u5C5E\u6027\u540D\u79F0</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>generatetablefetch.sql.error</td><td>\u5982\u679C\u5904\u7406\u5668\u6709\u4F20\u5165\u8FDE\u63A5\uFF0C\u5E76\u4E14\u5904\u7406\u4F20\u5165\u6D41\u6587\u4EF6\u4F1A\u5BFC\u81F4SQL\u5F02\u5E38\uFF0C\u5219\u5C06\u6D41\u6587\u4EF6\u8DEF\u7531\u5230failure\uFF0C\u5E76\u5C06\u6B64\u5C5E\u6027\u8BBE\u7F6E\u4E3A\u5F02\u5E38\u6D88\u606F\u3002</td></tr><tr><td>generatetablefetch.tableName</td><td>\u8981\u67E5\u8BE2\u7684\u6570\u636E\u5E93\u8868\u7684\u540D\u79F0\u3002</td></tr><tr><td>generatetablefetch.columnNames</td><td>\u67E5\u8BE2\u4E2D\u4F7F\u7528\u7684\u4EE5\u9017\u53F7\u5206\u9694\u7684\u5217\u540D\u5217\u8868\u3002</td></tr><tr><td>generatetablefetch.whereClause</td><td>\u67E5\u8BE2\u4E2D\u7528\u4E8E\u83B7\u53D6\u9884\u671F\u884C\u7684Where\u5B50\u53E5\u3002</td></tr><tr><td>generatetablefetch.maxColumnNames</td><td>\u9017\u53F7\u5206\u9694\u7684\u5217\u540D\u5217\u8868\uFF0C\u7528\u4E8E\u8DDF\u8E2A\u5904\u7406\u5668\u5F00\u59CB\u8FD0\u884C\u4EE5\u6765\u8FD4\u56DE\u7684\u6570\u636E\u3002</td></tr><tr><td>generatetablefetch.limit</td><td>SQL\u8BED\u53E5\u8981\u83B7\u53D6\u7684\u7ED3\u679C\u884C\u6570\u3002</td></tr><tr><td>generatetablefetch.offset</td><td>\u7528\u4E8E\u68C0\u7D22\u76F8\u5E94\u5206\u533A\u7684\u504F\u79FB\u91CF\u3002</td></tr><tr><td>fragment.identifier</td><td>\u4ECE\u76F8\u540C\u7684\u67E5\u8BE2\u7ED3\u679C\u96C6\u751F\u6210\u7684\u6240\u6709\u6D41\u6587\u4EF6\u5BF9\u4E8E\u7247\u6BB5\u90FD\u5177\u6709\u76F8\u540C\u7684\u503C\u3002\u6807\u8BC6\u7B26\u5C5E\u6027\u3002\u7136\u540E\u53EF\u4EE5\u7528\u5B83\u6765\u5173\u8054\u7ED3\u679C\u3002</td></tr><tr><td>fragment.count</td><td>\u8FD9\u662F\u5355\u4E2AResultSet\u751F\u6210\u7684\u6D41\u6587\u4EF6\u7684\u603B\u6570\u3002\u8FD9\u53EF\u4EE5\u4E0E\u7247\u6BB5\u4E00\u8D77\u4F7F\u7528\u3002\u6807\u8BC6\u7B26\u5C5E\u6027\uFF0C\u4EE5\u4FBF\u77E5\u9053\u6709\u591A\u5C11\u6D41\u6587\u4EF6\u5C5E\u4E8E\u76F8\u540C\u7684\u4F20\u5165\u7ED3\u679C\u96C6\u3002</td></tr><tr><td>fragment.index</td><td>\u8FD9\u662F\u8FD9\u4E2A\u6D41\u6587\u4EF6\u5728\u6240\u6709\u7531\u76F8\u540C\u6267\u884C\u751F\u6210\u7684\u8F93\u51FA\u6D41\u6587\u4EF6\u5217\u8868\u4E2D\u7684\u4F4D\u7F6E\u3002\u8FD9\u53EF\u4EE5\u4E0E\u7247\u6BB5\u4E00\u8D77\u4F7F\u7528\u3002\u6807\u8BC6\u7B26\u5C5E\u6027\uFF0C\u4EE5\u4E86\u89E3\u54EA\u4E9B\u6D41\u6587\u4EF6\u6E90\u81EA\u76F8\u540C\u7684\u6267\u884C\uFF0C\u4EE5\u53CA\u751F\u6210\u6D41\u6587\u4EF6\u7684\u987A\u5E8F</td></tr></tbody></table><h2 id="\u72B6\u6001\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u72B6\u6001\u7BA1\u7406" aria-hidden="true">#</a> \u72B6\u6001\u7BA1\u7406</h2><table><thead><tr><th>\u8303\u56F4</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>CLUSTER</td><td>\u5728\u5BF9\u6307\u5B9A\u8868\u6267\u884C\u67E5\u8BE2\u4E4B\u540E\uFF0C\u5C06\u4FDD\u7559\u6307\u5B9A\u5217\u7684\u6700\u5927\u503C\uFF0C\u4EE5\u4FBF\u5728\u5C06\u6765\u6267\u884C\u67E5\u8BE2\u65F6\u4F7F\u7528\u3002\u8FD9\u5141\u8BB8\u5904\u7406\u5668\u53EA\u83B7\u53D6\u6700\u5927\u503C\u5927\u4E8E\u4FDD\u7559\u503C\u7684\u8BB0\u5F55\u3002\u8FD9\u53EF\u4EE5\u7528\u4E8E\u589E\u91CF\u6293\u53D6\uFF0C\u6293\u53D6\u65B0\u6DFB\u52A0\u7684\u884C\uFF0C\u7B49\u7B49\u3002\u8981\u6E05\u9664\u6700\u5927\u503C\uFF0C\u8BF7\u6839\u636E\u72B6\u6001\u7BA1\u7406\u6587\u6863\u6E05\u9664\u5904\u7406\u5668\u7684\u72B6\u6001</td></tr></tbody></table><h2 id="\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#\u9650\u5236" aria-hidden="true">#</a> \u9650\u5236</h2><p>\u6B64\u7EC4\u4EF6\u4E0D\u53D7\u9650\u5236\u3002</p><h2 id="\u8F93\u5165\u8981\u6C42" tabindex="-1"><a class="header-anchor" href="#\u8F93\u5165\u8981\u6C42" aria-hidden="true">#</a> \u8F93\u5165\u8981\u6C42</h2><p>\u6B64\u7EC4\u4EF6\u5141\u8BB8\u4F20\u5165\u8FDE\u63A5\u5173\u7CFB\u3002</p><h2 id="\u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651" tabindex="-1"><a class="header-anchor" href="#\u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651" aria-hidden="true">#</a> \u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651</h2><p>\u6CA1\u6709\u6307\u5B9A\u3002</p><h2 id="\u5E94\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u5E94\u7528\u573A\u666F" aria-hidden="true">#</a> \u5E94\u7528\u573A\u666F</h2><p>GenerateTableFetch\u4F7F\u7528\u5176\u5C5E\u6027\u548C\u6307\u5B9A\u7684\u6570\u636E\u5E93\u8FDE\u63A5\u751F\u6210\u5305\u542BSQL\u8BED\u53E5\u7684\u6D41\u6587\u4EF6\uFF0C\u8FD9\u4E9BSQL\u8BED\u53E5\u53EF\u7528\u4E8E\u4ECE\u8868\u4E2D\u83B7\u53D6\u5206\u9875\u7684\u6570\u636E\u3002GenerateTableFetch\u6267\u884C\u5BF9\u6570\u636E\u5E93\u7684\u67E5\u8BE2\uFF0C\u4EE5\u786E\u5B9A\u5F53\u524D\u884C\u6570\u548C\u6700\u5927\u503C\uFF0C\u5982\u679C\u6307\u5B9A\u4E86\u6700\u5927\u503C\u5217\uFF0C\u5219\u6536\u96C6\u5176\u6700\u5927\u503C\u5217\u7684\u503C\u5927\u4E8EGenerateTableFetch\u6700\u540E\u89C2\u5BDF\u5230\u7684\u503C\u7684\u884C\u6570\u3002\u8FD9\u5141\u8BB8\u589E\u91CF\u83B7\u53D6\u65B0\u884C\uFF0C\u800C\u4E0D\u662F\u6BCF\u6B21\u751F\u6210SQL\u6765\u83B7\u53D6\u6574\u4E2A\u8868\u3002\u5982\u679C\u6CA1\u6709\u8BBE\u7F6E\u6700\u5927\u503C\u5217\uFF0C\u90A3\u4E48\u5904\u7406\u5668\u5C06\u751F\u6210SQL\u6765\u6BCF\u6B21\u83B7\u53D6\u6574\u4E2A\u8868\u3002</p><p>\u4E3A\u4E86\u751F\u6210\u5C06\u83B7\u53D6\u5206\u9875\u6570\u636E\u7684SQL\uFF0C\u9ED8\u8BA4\u60C5\u51B5\u4E0BGenerateTableFetch\u5C06\u751F\u6210\u57FA\u4E8E\u6700\u5927\u503C\u5217(\u5982\u679C\u5B58\u5728)\u5BF9\u6570\u636E\u6392\u5E8F\u7684SQL\uFF0C\u5E76\u4F7F\u7528\u7ED3\u679C\u96C6\u7684\u884C\u53F7\u6765\u786E\u5B9A\u6BCF\u4E2A\u9875\u9762\u3002\u4F8B\u5982\uFF0C\u5982\u679C\u6700\u5927\u503C\u5217\u662F\u4E00\u4E2A\u6574\u6570\u201Cid\u201D\uFF0C\u5206\u533A\u5927\u5C0F\u4E3A10\uFF0C\u90A3\u4E48\u7B2C\u4E00\u4E2A\u9875\u9762\u7684SQL\u53EF\u80FD\u662F\u201CSELECT * FROM myTable LIMIT 10\u201D\uFF0C\u7B2C\u4E8C\u4E2A\u9875\u9762\u53EF\u80FD\u662F\u201CSELECT * FROM myTable OFFSET 10 LIMIT 10\u201D\uFF0C\u4F9D\u6B64\u7C7B\u63A8\u3002</p><p>\u6839\u636E\u6570\u636E\u5E93\u3001\u884C\u6570\u7B49\uFF0C\u5BF9\u6570\u636E\u8FDB\u884C\u6392\u5E8F\u53EF\u80FD\u662F\u4E00\u9879\u6602\u8D35\u7684\u64CD\u4F5C\u3002\u6216\u8005\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528column for Value Partitioning\u5C5E\u6027\u6307\u5B9A\u4E00\u4E2A\u5217\uFF0C\u8BE5\u5217\u7684\u503C\u5C06\u7528\u4E8E\u786E\u5B9A\u9875\u9762\u3002\u5982\u679C\u8BBE\u7F6E\u4E86\uFF0CGenerateTableFetch\u5C06\u786E\u5B9A\u5217\u7684\u6700\u5C0F\u503C\u548C\u6700\u5927\u503C\uFF0C\u5E76\u4F7F\u7528\u6700\u5C0F\u503C\u4F5C\u4E3A\u521D\u59CB\u504F\u79FB\u91CF\u3002\u7136\u540E\uFF0C\u83B7\u53D6\u9875\u9762\u7684SQL\u57FA\u4E8E\u8FD9\u4E2A\u521D\u59CB\u504F\u79FB\u91CF\u548C\u503C\u7684\u603B\u5DEE(\u5373\u6700\u5927\u503C-\u6700\u5C0F\u503C)\u9664\u4EE5\u9875\u9762\u5927\u5C0F\u3002\u4F8B\u5982,\u5982\u679C\u5217\u201Cid\u201D\u7528\u4E8E\u503C\u5206\u533A,\u7136\u540E\u5217\u503C100\u5230200,\u9875\u9762\u5927\u5C0F\u4E3A10\u7684SQL\u6765\u83B7\u53D6\u7B2C\u4E00\u9875\u53EF\u80FD\u662F\u201CSELECT * FROM myTable id &gt; = 100\u548Cid &lt; 110\u201D\u548C\u7B2C\u4E8C\u9875\u53EF\u80FD\u662F\u201CSELECT *\u4ECEmyTable id &gt; = 110\u548Cid &lt; 120\u201D,\u7B49\u7B49\u3002</p><p>\u91CD\u8981\u7684\u662F\uFF0C\u5C06\u7528\u4E8E\u503C\u5206\u533A\u7684\u5217\u8BBE\u7F6E\u4E3A\u53EF\u4EE5\u5F3A\u5236\u7C7B\u578B\u4E3A\u957F\u6574\u6570(\u5373\u4E0D\u662F\u65E5\u671F\u6216\u65F6\u95F4\u6233)\u7684\u5217\uFF0C\u5E76\u4E14\u4E3A\u4E86\u83B7\u5F97\u6700\u4F73\u6027\u80FD\uFF0C\u5217\u503C\u662F\u5747\u5300\u5206\u5E03\u7684\uFF0C\u800C\u4E0D\u662F\u7A00\u758F\u7684\u3002\u4F5C\u4E3A\u4E0A\u9762\u7684\u53CD\u4F8B\uFF0C\u8003\u8651\u4E00\u4E2A\u5217\u201Cid\u201D\uFF0C\u5176\u503C\u5206\u522B\u4E3A100\u30012000\u548C30000\u3002\u5982\u679C\u5206\u533A\u5927\u5C0F\u4E3A100\uFF0C\u90A3\u4E48\u5217\u503C\u76F8\u5BF9\u7A00\u758F\uFF0C\u56E0\u6B64\u201C\u7B2C\u4E8C\u9875\u201D(\u53C2\u89C1\u4E0A\u9762\u7684\u793A\u4F8B)\u7684SQL\u5C06\u8FD4\u56DE\u96F6\u884C\uFF0C\u76F4\u5230\u67E5\u8BE2\u4E2D\u7684\u503C\u53D8\u4E3A\u201Cid &gt;= 2000\u201D\u4E3A\u6B62\uFF0C\u6BCF\u4E2A\u9875\u9762\u90FD\u5C06\u8FD4\u56DE\u96F6\u884C\u3002\u53E6\u4E00\u4E2A\u53CD\u4F8B\u662F\u503C\u4E0D\u662F\u5747\u5300\u5206\u5E03\u7684\uFF1A\u5047\u8BBE\u4E00\u4E2A\u503C\u4E3A100\u3001200\u3001201\u3001202\u3001\u2026299. \u7136\u540E\uFF0C\u7B2C\u4E00\u4E2A\u9875\u9762\u7684SQL(\u53C2\u89C1\u4E0A\u9762\u7684\u793A\u4F8B)\u5C06\u8FD4\u56DE\u503C\u4E3Aid = 100\u7684\u4E00\u884C\uFF0C\u7B2C\u4E8C\u4E2A\u9875\u9762\u5C06\u8FD4\u56DE\u503C\u4E3A200\u7684100\u884C\u2026\u2026299. \u8FD9\u53EF\u80FD\u5BFC\u81F4\u4E0B\u6E38\u5904\u7406\u65F6\u95F4\u4E0D\u4E00\u81F4\uFF0C\u56E0\u4E3A\u9875\u9762\u53EF\u80FD\u5305\u542B\u975E\u5E38\u4E0D\u540C\u7684\u884C\u6570\u3002\u7531\u4E8E\u8FD9\u4E9B\u539F\u56E0\uFF0C\u5EFA\u8BAE\u4F7F\u7528\u8DB3\u591F\u5BC6\u96C6(\u800C\u4E0D\u662F\u7A00\u758F)\u4E14\u5206\u5E03\u76F8\u5F53\u5747\u5300\u7684\u5217\u8FDB\u884C\u503C\u5206\u533A\u3002</p><h2 id="\u793A\u4F8B\u8BF4\u660E-\u793A\u4F8B\u4E2D\u8868\u6570\u636E\u90FD\u5F88\u5C11-\u6240\u4EE5\u4E00\u822C\u90FD\u751F\u6210\u4E86\u4E00\u6761\u6D41\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u793A\u4F8B\u8BF4\u660E-\u793A\u4F8B\u4E2D\u8868\u6570\u636E\u90FD\u5F88\u5C11-\u6240\u4EE5\u4E00\u822C\u90FD\u751F\u6210\u4E86\u4E00\u6761\u6D41\u6570\u636E" aria-hidden="true">#</a> \u793A\u4F8B\u8BF4\u660E\uFF1A(\u793A\u4F8B\u4E2D\u8868\u6570\u636E\u90FD\u5F88\u5C11\uFF0C\u6240\u4EE5\u4E00\u822C\u90FD\u751F\u6210\u4E86\u4E00\u6761\u6D41\u6570\u636E\uFF0C)</h2><p>\u9996\u5148\u914D\u7F6E\u597D\u6570\u636E\u5E93DBCPConnectionPool\uFF1A</p><p><img src="'+d+'" alt=""></p><p>\u7136\u540E\u914D\u7F6EGenerateTableFetch\u4E2D\u7684Database Connection Pooling Service\uFF1A</p><p><img src="'+s+'" alt=""></p><p>\u6848\u4F8B\u4E00\uFF1A\u65E0\u8F93\u5165\u6D41\u6587\u4EF6\uFF0C\u6765\u6E90\u8868\u542B\u589E\u91CF\u5B57\u6BB5</p><p><img src="'+n+'" alt=""></p><p><img src="'+p+'" alt=""> \u8F93\u51FASQL\u8BED\u53E5\uFF1A</p><p><img src="'+i+'" alt=""></p><p>\u4FDD\u5B58\u72B6\u6001\uFF1A</p><p><img src="'+o+'" alt=""></p><p>\u6848\u4F8B\u4E8C\uFF1A\u65E0\u8F93\u5165\u6D41\u6587\u4EF6\uFF0C\u4E0D\u542B\u589E\u91CF\u5B57\u6BB5</p><p><img src="'+h+'" alt=""></p><p>\u8F93\u51FA\uFF1A</p><p><img src="'+l+'" alt=""></p><p>\u6848\u4F8B\u4E09\uFF1A\u65E0\u8F93\u5165\u6D41\u6587\u4EF6\uFF0C\u5E26\u81EA\u589Eid</p><p><img src="'+c+'" alt=""></p><p>\u5F53\u7136\uFF0C\u5B9E\u9645\u589E\u91CF\u62BD\u53D6\u65F6\uFF0Cmax-value\u4E5F\u8BBE\u7F6E\u6210id</p><p><img src="'+g+'" alt=""></p><p><img src="'+b+'" alt=""></p><p><img src="'+m+'" alt=""></p><p>\u6848\u4F8B\u56DB\uFF1A\u6709\u6765\u6E90\u6D41\u6587\u4EF6\uFF0C\u67E5\u591A\u8868,\u65E0\u589E\u91CF\u5B57\u6BB5</p><p><img src="'+_+'" alt=""></p><p>\u4F7F\u7528GenerateFlowFile\u914D\u7F6E\u4E00\u4E2A\u591A\u8868\u8868\u540D\u6570\u7EC4\uFF0C\u5207\u5272json\uFF0C\u7136\u540E\u5C06\u8868\u540D\u63D0\u53D6\u5230\u5C5E\u6027\u4E2D\uFF1A</p><p><img src="'+u+'" alt=""></p><p><img src="'+f+'" alt=""></p><p>\u8F93\u51FA\u7ED3\u679C\uFF1A</p><p><img src="'+S+'" alt=""></p><p><img src="'+v+'" alt=""></p><p><img src="'+L+'" alt=""></p><p>\u6848\u4F8B\u4E94\uFF1A\u6709\u6765\u6E90\u6D41\u6587\u4EF6\uFF0C\u67E5\u591A\u8868,\u5E26\u589E\u91CF\u5B57\u6BB5</p><p>\u53EA\u5C06\u6848\u4F8B\u56DB\u4E2Djson\u4FEE\u6539\u4E00\u4E0B\uFF1A</p><p><img src="'+x+'" alt=""></p><p><img src="'+Q+'" alt=""></p><p><img src="'+T+'" alt=""></p><p>\u8F93\u51FA\u7ED3\u679C\uFF1A</p><p><img src="'+C+'" alt=""></p><p><img src="'+F+'" alt=""></p><p><img src="'+y+'" alt=""></p><p>\u72B6\u6001\uFF1A</p><p><img src="'+E+'" alt=""></p>',76),M=[G];function R(D,O){return e(),r("div",null,M)}var I=t(P,[["render",R],["__file","GenerateTableFetch.html.vue"]]);export{I as default};