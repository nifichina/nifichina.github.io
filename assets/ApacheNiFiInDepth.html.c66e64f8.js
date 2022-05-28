import{_ as e,o as i,c as o,e as l}from"./app.3ad1c1e4.js";var F="/assets/zero-master-node.a1badfaa.png";const a={},r=l('<h1 id="apache-nifi-in-depth" tabindex="-1"><a class="header-anchor" href="#apache-nifi-in-depth" aria-hidden="true">#</a> Apache NiFi In Depth</h1><hr><p>\u7F16\u8F91\u4EBA(\u5168\u7F51\u540C\u540D)\uFF1A<strong><strong>\u9177\u9177\u7684\u8BDA</strong></strong> \u90AE\u7BB1\uFF1A<strong>zhangchengk@foxmail.com</strong></p><hr><h2 id="\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#\u7B80\u4ECB" aria-hidden="true">#</a> \u7B80\u4ECB</h2><p>\u672C\u9AD8\u7EA7\u6587\u6863\u65E8\u5728\u6DF1\u5165\u4E86\u89E3NiFi\u7684\u5B9E\u73B0\u548C\u8BBE\u8BA1\u51B3\u7B56\u3002\u5047\u5B9A\u8BFB\u8005\u5DF2\u9605\u8BFB\u8DB3\u591F\u7684\u5176\u4ED6\u6587\u6863\uFF0C\u5DF2\u7ECF\u4E86\u89E3NiFi\u7684\u57FA\u7840\u77E5\u8BC6\u3002</p><p>FlowFiles\u662FNiFi\u53CA\u5176\u57FA\u4E8E\u6D41\u7684\u8BBE\u8BA1\u7684\u6838\u5FC3\u3002 FlowFile\u662F\u4E00\u4E2A\u6570\u636E\u8BB0\u5F55\uFF0C\u7531\u6307\u5411\u5176\u5185\u5BB9\uFF08\u6709\u6548\u8D1F\u8F7D\uFF09\u7684\u6307\u9488\u548C\u652F\u6301\u8BE5\u5185\u5BB9\u7684\u5C5E\u6027\u7EC4\u6210\uFF0C\u8BE5\u8BB0\u5F55\u4E0E\u4E00\u4E2A\u6216\u591A\u4E2A<code>provenance events</code>\u5173\u8054\u3002\u5C5E\u6027\u662F\u7528\u4F5CFlowFile\u7684\u5143\u6570\u636E\u7684\u952E/\u503C\u5BF9\uFF0C\u4F8B\u5982FlowFile\u6587\u4EF6\u540D\u3002\u5185\u5BB9\u662F\u5B9E\u9645\u6570\u636E\u6216\u6587\u4EF6\u7684\u6709\u6548\u8D1F\u8F7D\u3002\u6765\u6E90\u8BB0\u5F55\u4E86FlowFile\u53D1\u751F\u4E86\u4EC0\u4E48\u3002\u8FD9\u4E9B\u90E8\u5206\u4E2D\u7684\u6BCF\u4E2A\u90E8\u5206\u90FD\u6709\u5176\u81EA\u5DF1\u7684\u5B58\u50A8\u5E93\uFF08repo\uFF09\u7528\u4E8E\u5B58\u50A8\u3002</p><p>\u5B58\u50A8\u5E93\u7684\u4E00\u4E2A\u5173\u952E\u65B9\u9762\u662F\u4E0D\u53D8\u6027\u3002 <code>Content Repository</code>\u4E2D\u7684\u5185\u5BB9\u548C<code>FlowFile Repository</code>\u4E2D\u7684\u6570\u636E\u662F\u4E0D\u53EF\u53D8\u7684\u3002\u5F53FlowFile\u7684\u5C5E\u6027\u53D1\u751F\u66F4\u6539\u65F6\uFF0C\u5C06\u5728\u5185\u5B58\u4E2D\u521B\u5EFA\u5C5E\u6027\u7684\u65B0\u526F\u672C\uFF0C\u7136\u540E\u5C06\u5176\u4FDD\u7559\u5728\u78C1\u76D8\u4E0A\u3002\u5F53\u66F4\u6539\u7ED9\u5B9AFlowFile\u7684\u5185\u5BB9\u65F6\uFF0C\u5C06\u8BFB\u53D6\u5176\u539F\u59CB\u5185\u5BB9\uFF0C\u901A\u8FC7\u8F6C\u6362\u5C06\u5176\u6D41\u5F0F\u4F20\u8F93\u5E76\u5199\u5165\u65B0\u7684\u6D41\u3002\u7136\u540E\uFF0CFlowFile\u7684\u5185\u5BB9\u6307\u9488\u5C06\u66F4\u65B0\u5230\u78C1\u76D8\u4E0A\u7684\u65B0\u4F4D\u7F6E\u3002\u7ED3\u679C\uFF0C\u53EF\u4EE5\u5C06FlowFile\u5185\u5BB9\u5B58\u50A8\u7684\u9ED8\u8BA4\u65B9\u6CD5\u79F0\u4E3A\u4E0D\u53D8\u7248\u672C\u7684\u5185\u5BB9\u5B58\u50A8\u3002\u8FD9\u6837\u505A\u7684\u597D\u5904\u5F88\u591A\uFF0C\u5305\u62EC\uFF1A\u5927\u5927\u51CF\u5C11\u4E86\u5178\u578B\u7684\u590D\u6742\u56FE\u5F62\u5904\u7406\u6240\u9700\u7684\u5B58\u50A8\u7A7A\u95F4\uFF0C\u81EA\u7136\u91CD\u653E\u529F\u80FD\uFF0C\u5229\u7528\u4E86OS\u7F13\u5B58\uFF0C\u51CF\u5C11\u4E86\u968F\u673A\u8BFB\u53D6/\u5199\u5165\u6027\u80FD\u7684\u635F\u5931\uFF0C\u5E76\u4E14\u6613\u4E8E\u63A8\u7406\u3002\u5148\u524D\u7684\u4FEE\u8BA2\u7248\u672C\u662F\u6839\u636E<code>nifi.properties</code>\u6587\u4EF6\u4E2D\u8BBE\u7F6E\u7684\u5B58\u6863\u5C5E\u6027\u4FDD\u7559\u7684\uFF0C\u5E76\u5728NiFi\u7CFB\u7EDF\u7BA1\u7406\u5458\u6307\u5357\u4E2D\u8FDB\u884C\u4E86\u6982\u8FF0\u3002</p><h2 id="repositories" tabindex="-1"><a class="header-anchor" href="#repositories" aria-hidden="true">#</a> Repositories</h2><p>NiFi\u4F7F\u7528\u4E86\u4E09\u4E2A\u5B58\u50A8\u5E93\u3002\u6BCF\u4E2A\u6587\u4EF6\u90FD\u5B58\u5728\u4E8E<code>OS/Host</code>\u7684\u6587\u4EF6\u7CFB\u7EDF\u4E2D\uFF0C\u5E76\u63D0\u4F9B\u7279\u5B9A\u7684\u529F\u80FD\u3002\u4E3A\u4E86\u5168\u9762\u4E86\u89E3FlowFiles\u4EE5\u53CA\u5E95\u5C42\u7CFB\u7EDF\u5982\u4F55\u4F7F\u7528\u5B83\u4EEC\uFF0C\u4E86\u89E3\u8FD9\u4E9B\u5B58\u50A8\u5E93\u975E\u5E38\u91CD\u8981\u3002\u8FD9\u4E09\u4E2A\u5B58\u50A8\u5E93\u90FD\u662F\u672C\u5730\u5B58\u50A8\u4E2DNiFi\u7528\u4E8E\u4FDD\u5B58\u6570\u636E\u7684\u76EE\u5F55\u3002</p><ul><li><p><code>FlowFile Repository</code>\u5E93\u5305\u542B\u6D41\u4E2D\u6240\u6709\u5F53\u524DFlowFiles\u7684\u5143\u6570\u636E\u3002</p></li><li><p><code>Content Repository</code>\u4FDD\u5B58\u5F53\u524D\u548C\u8FC7\u53BBFlowFiles\u7684\u5185\u5BB9\u3002</p></li><li><p><code>Provenance Repository</code>\u4FDD\u5B58FlowFiles\u7684\u5386\u53F2\u8BB0\u5F55\u3002</p></li></ul><p><img src="'+F+'" alt=""></p><h3 id="flowfile-repository" tabindex="-1"><a class="header-anchor" href="#flowfile-repository" aria-hidden="true">#</a> FlowFile Repository</h3><p>\u7CFB\u7EDF\u6B63\u5728\u79EF\u6781\u5904\u7406\u7684FlowFiles\u4FDD\u7559\u5728JVM\u5185\u5B58\u4E2D\u7684\u54C8\u5E0C\u56FE\u4E2D\uFF08\u6709\u5173\u66F4\u6DF1\u5165\u7684\u4E86\u89E3\uFF0C\u8BF7\u53C2\u89C1\u201C\u6DF1\u5165\u89C6\u56FE\uFF1A\u5185\u5B58\u548C\u78C1\u76D8\u4E2D\u7684FlowFiles\u201D\uFF09\u3002\u8FD9\u4F7F\u5F97\u5904\u7406\u5B83\u4EEC\u975E\u5E38\u9AD8\u6548\uFF0C\u4F46\u662F\u7531\u4E8E\u591A\u79CD\u539F\u56E0\uFF08\u4F8B\u5982\u65AD\u7535\uFF0C\u5185\u6838\u5D29\u6E83\uFF0C\u7CFB\u7EDF\u5347\u7EA7\u548C\u7EF4\u62A4\u5468\u671F\uFF09\uFF0C\u9700\u8981\u4F7F\u7528\u8F85\u52A9\u673A\u5236\u5728\u6574\u4E2A\u8FDB\u7A0B\u91CD\u65B0\u542F\u52A8\u65F6\u63D0\u4F9B\u6570\u636E\u6301\u4E45\u6027\u3002 FlowFile\u4FE1\u606F\u5E93\u662F\u7CFB\u7EDF\u4E2D\u5F53\u524D\u5B58\u5728\u7684\u6BCF\u4E2AFlowFiles\u7684\u5143\u6570\u636E\u7684\u201C\u9884\u5199\u65E5\u5FD7\u201D\uFF08\u6216\u6570\u636E\u8BB0\u5F55\uFF09\u3002\u8BE5FlowFile\u5143\u6570\u636E\u5305\u62EC\u4E0EFlowFile\u76F8\u5173\u8054\u7684\u6240\u6709\u5C5E\u6027\uFF0C\u6307\u5411FlowFile\u5B9E\u9645\u5185\u5BB9\u7684\u6307\u9488\uFF08\u8BE5\u5185\u5BB9\u5B58\u5728\u4E8E\u5185\u5BB9\u5E93\u4E2D\uFF09\u4EE5\u53CAFlowFile\u7684\u72B6\u6001\uFF0C\u4F8B\u5982FlowFile\u6240\u5C5E\u7684Connection /Queue\u3002 Ahead Log\u4E3ANiFi\u63D0\u4F9B\u4E86\u5904\u7406\u91CD\u542F\u548C\u610F\u5916\u7CFB\u7EDF\u6545\u969C\u6240\u9700\u7684\u5F39\u6027\u3002</p><p>FlowFile\u4FE1\u606F\u5E93\u5145\u5F53NiFi\u7684\u9884\u5199\u65E5\u5FD7\uFF0C\u56E0\u6B64\uFF0C\u5F53FlowFiles\u5728\u7CFB\u7EDF\u4E2D\u6D41\u52A8\u65F6\uFF0C\u6BCF\u6B21\u66F4\u6539\u90FD\u4F1A\u8BB0\u5F55\u5728FlowFile\u4FE1\u606F\u5E93\u4E2D\uFF0C\u7136\u540E\u518D\u4F5C\u4E3A\u4E8B\u52A1\u6027\u5DE5\u4F5C\u5355\u5143\u8FDB\u884C\u3002\u8FD9\u4F7F\u7CFB\u7EDF\u53EF\u4EE5\u51C6\u786E\u5730\u77E5\u9053\u8282\u70B9\u5728\u5904\u7406\u4E00\u6761\u6570\u636E\u65F6\u6240\u5904\u7684\u6B65\u9AA4\u3002\u5982\u679C\u8282\u70B9\u5728\u5904\u7406\u6570\u636E\u65F6\u53D1\u751F\u6545\u969C\uFF0C\u5219\u53EF\u4EE5\u8F7B\u677E\u5730\u4ECE\u91CD\u65B0\u542F\u52A8\u65F6\u4E2D\u65AD\u7684\u4F4D\u7F6E\u6062\u590D\uFF08\u66F4\u6DF1\u5165\u5730\u4E86\u89E3\u201C\u7CFB\u7EDF\u6545\u969C\u5BF9\u4E8B\u52A1\u7684\u5F71\u54CD\u201D\uFF09\u3002\u65E5\u5FD7\u4E2DFlowFiles\u7684\u683C\u5F0F\u662F\u6CBF\u9014\u53D1\u751F\u7684\u4E00\u7CFB\u5217\u589E\u91CF\uFF08\u6216\u66F4\u6539\uFF09\u3002 NiFi\u901A\u8FC7\u8FD8\u539FFlowFile\u7684\u201C\u5FEB\u7167\u201D\uFF08\u5728\u5BF9\u5B58\u50A8\u5E93\u8FDB\u884C\u68C0\u67E5\u70B9\u521B\u5EFA\u65F6\u521B\u5EFA\uFF09\u6765\u6062\u590DFlowFile\uFF0C\u7136\u540E\u91CD\u64AD\u6BCF\u4E2A\u589E\u91CF\u3002</p><p>\u7CFB\u7EDF\u4F1A\u5B9A\u671F\u81EA\u52A8\u521B\u5EFA\u5FEB\u7167\uFF0C\u8BE5\u5FEB\u7167\u5C06\u4E3A\u6BCF\u4E2AFlowFile\u521B\u5EFA\u4E00\u4E2A\u65B0\u5FEB\u7167\u3002\u7CFB\u7EDF\u901A\u8FC7\u5E8F\u5217\u5316\u54C8\u5E0C\u56FE\u4E2D\u7684\u6BCF\u4E2AFlowFile\u5E76\u5C06\u5176\u5199\u5165\u6587\u4EF6\u540D\u4E3A\u201C .partial\u201D\u7684\u78C1\u76D8\u6765\u8BA1\u7B97\u65B0\u7684\u57FA\u672C\u68C0\u67E5\u70B9\u3002\u968F\u7740\u68C0\u67E5\u70B9\u7684\u8FDB\u884C\uFF0C\u65B0\u7684FlowFile\u57FA\u7EBF\u5C06\u5199\u5165\u201C .partial\u201D\u6587\u4EF6\u3002\u5B8C\u6210\u68C0\u67E5\u70B9\u64CD\u4F5C\u540E\uFF0C\u5C06\u5220\u9664\u65E7\u7684\u201C\u5FEB\u7167\u201D\u6587\u4EF6\uFF0C\u5E76\u5C06\u201C .partial\u201D\u6587\u4EF6\u91CD\u547D\u540D\u4E3A\u201C\u5FEB\u7167\u201D\u3002</p><p>\u7CFB\u7EDF\u68C0\u67E5\u70B9\u4E4B\u95F4\u7684\u65F6\u95F4\u95F4\u9694\u53EF\u4EE5\u5728\u201C nifi.properties\u201D\u6587\u4EF6\u4E2D\u914D\u7F6E\uFF08\u5728\u300A NiFi\u7CFB\u7EDF\u7BA1\u7406\u5458\u6307\u5357\u300B\u4E2D\u8BB0\u5F55\uFF09\u3002\u9ED8\u8BA4\u503C\u4E3A\u4E24\u5206\u949F\u95F4\u9694\u3002</p><h4 id="effect-of-system-failure-on-transactions" tabindex="-1"><a class="header-anchor" href="#effect-of-system-failure-on-transactions" aria-hidden="true">#</a> Effect of System Failure on Transactions</h4><p>NiFi\u901A\u8FC7\u5728\u6BCF\u4E2A\u8282\u70B9\u5404\u81EA\u7684FlowFile\u5B58\u50A8\u5E93\u4E2D\u8BB0\u5F55\u5F53\u65F6\u6BCF\u4E2A\u8282\u70B9\u53D1\u751F\u7684\u60C5\u51B5\u6765\u9632\u6B62\u786C\u4EF6\u548C\u7CFB\u7EDF\u6545\u969C\u3002\u5982\u4E0A\u6240\u8FF0\uFF0CFlowFile Repo\u662FNiFi\u7684\u9884\u5199\u65E5\u5FD7\u3002\u5F53\u8282\u70B9\u91CD\u65B0\u8054\u673A\u65F6\uFF0C\u5B83\u5C06\u901A\u8FC7\u9996\u5148\u68C0\u67E5\u201C\u5FEB\u7167\u201D\u548C\u201C .partial\u201D\u6587\u4EF6\u6765\u6062\u590D\u5176\u72B6\u6001\u3002\u8282\u70B9\u8981\u4E48\u63A5\u53D7\u201C\u5FEB\u7167\u201D\uFF0C\u7136\u540E\u5220\u9664\u201C .partial\u201D\uFF08\u5982\u679C\u5B58\u5728\uFF09\uFF0C\u6216\u8005\u5982\u679C\u201C\u5FEB\u7167\u201D\u6587\u4EF6\u4E0D\u5B58\u5728\uFF0C\u5219\u5C06\u201C .partial\u201D\u6587\u4EF6\u91CD\u547D\u540D\u4E3A\u201C snapshot\u201D\u3002</p><p>\u5982\u679C\u8282\u70B9\u5728\u53D1\u751F\u6545\u969C\u65F6\u5904\u4E8E\u5199\u5165\u5185\u5BB9\u7684\u4E2D\u95F4\uFF0C\u5219\u6CA1\u6709\u4EFB\u4F55\u635F\u574F\uFF0C\u8FD9\u8981\u5F52\u529F\u4E8E\u201C\u5199\u65F6\u590D\u5236\u201D\uFF08\u4E0B\u9762\u63D0\u5230\uFF09\u548C\u201C\u4E0D\u53D8\u6027\u201D\uFF08\u4E0A\u9762\u63D0\u5230\uFF09\u8303\u4F8B\u3002\u7531\u4E8EFlowFile\u4E8B\u52A1\u7EDD\u4E0D\u4F1A\u4FEE\u6539\u539F\u59CB\u5185\u5BB9\uFF08\u7531\u5185\u5BB9\u6307\u9488\u6307\u5411\uFF09\uFF0C\u56E0\u6B64\u539F\u59CB\u5185\u5BB9\u662F\u5B89\u5168\u7684\u3002\u5F53NiFi\u53D1\u751F\u6545\u969C\u65F6\uFF0C\u66F4\u6539\u7684\u5199\u58F0\u660E\u5C06\u88AB\u5B64\u7ACB\uFF0C\u7136\u540E\u7531\u540E\u53F0\u5783\u573E\u56DE\u6536\u6E05\u9664\u3002\u8FD9\u5C06\u63D0\u4F9B\u201C\u56DE\u6EDA\u201D\u5230\u6700\u540E\u4E00\u4E2A\u5DF2\u77E5\u7684\u7A33\u5B9A\u72B6\u6001\u3002</p><p>\u7136\u540E\uFF0C\u8282\u70B9\u4ECEFlowFile\u6062\u590D\u5176\u72B6\u6001\u3002\u6709\u5173\u8BE5\u8FC7\u7A0B\u7684\u66F4\u8BE6\u7EC6\u7684\u5206\u6B65\u8BF4\u660E\uFF0C\u8BF7\u53C2\u9605NiFi\u7684\u9884\u5199\u65E5\u5FD7\u5B9E\u73B0\u3002</p><p>\u5C31\u4E8B\u52A1\u5DE5\u4F5C\u5355\u4F4D\u800C\u8A00\uFF0C\u6B64\u8BBE\u7F6E\u4F7FNiFi\u53EF\u4EE5\u5728\u9006\u5883\u4E2D\u975E\u5E38\u7075\u6D3B\uFF0C\u786E\u4FDD\u5373\u4F7FNiFi\u7A81\u7136\u88AB\u6740\u6B7B\uFF0C\u5B83\u4E5F\u53EF\u4EE5\u6062\u590D\u8FD0\u884C\u800C\u4E0D\u4F1A\u4E22\u5931\u4EFB\u4F55\u6570\u636E\u3002</p>',22),t=[r];function s(p,n){return i(),o("div",null,t)}var d=e(a,[["render",s],["__file","ApacheNiFiInDepth.html.vue"]]);export{d as default};