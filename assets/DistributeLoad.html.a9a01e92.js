import{_ as t,o as a,c as e,e as r}from"./app.3ad1c1e4.js";var d="/assets/config.512b0fdb.png",h="/assets/dataflow.464289e4.png",i="/assets/result.2527ab4f.png";const n={},s=r('<h1 id="distributeload" tabindex="-1"><a class="header-anchor" href="#distributeload" aria-hidden="true">#</a> DistributeLoad</h1><hr><p>\u7F16\u8F91\u4EBA(\u5168\u7F51\u540C\u540D)\uFF1A<strong><strong>\u9177\u9177\u7684\u8BDA</strong></strong> \u90AE\u7BB1\uFF1A<strong>zhangchengk@foxmail.com</strong></p><hr><h2 id="\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>\u8BE5\u5904\u7406\u5668\u6839\u636E\u5206\u53D1\u7B56\u7565\u5C06\u6D41\u6587\u4EF6\u5206\u53D1\u7ED9\u4E0B\u6E38\u5904\u7406\u5668\u3002\u5982\u679C\u4F7F\u7528\u5FAA\u73AF\u7B56\u7565\uFF0C\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u4E3A\u6BCF\u4E2A\u76EE\u7684\u5730\u5206\u914D1\u4E2A\u6743\u91CD(\u5747\u5300\u5206\u5E03)\u3002\u5F53\u7136\uFF0C\u6743\u91CD\u4E0E relationship\u90FD\u662F\u7075\u6D3B\u53EF\u914D\u7684\uFF0C\u6BD4\u5982\u81EA\u5B9A\u4E49 \u5C5E\u6027\u540D\u20185\u2019\uFF0C\u503C\u20182\u2019\uFF0C\u90A3\u4E48relationship\u4E3A\u20185\u2019\u7684\u6743\u91CD\u4E3A2\u3002</p><h2 id="\u5C5E\u6027\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5C5E\u6027\u914D\u7F6E" aria-hidden="true">#</a> \u5C5E\u6027\u914D\u7F6E</h2><p>\u5728\u4E0B\u9762\u7684\u5217\u8868\u4E2D\uFF0C\u5FC5\u9700\u5C5E\u6027\u7684\u540D\u79F0\u4EE5\u7C97\u4F53\u663E\u793A\u3002\u4EFB\u4F55\u5176\u4ED6\u5C5E\u6027(\u4E0D\u662F\u7C97\u4F53)\u90FD\u88AB\u8BA4\u4E3A\u662F\u53EF\u9009\u7684\uFF0C\u5E76\u4E14\u6307\u51FA\u5C5E\u6027\u9ED8\u8BA4\u503C\uFF08\u5982\u679C\u6709\u9ED8\u8BA4\u503C\uFF09\uFF0C\u4EE5\u53CA\u5C5E\u6027\u662F\u5426\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00\u3002</p><table><thead><tr><th>\u5C5E\u6027\u540D\u79F0</th><th>\u9ED8\u8BA4\u503C</th><th>\u53EF\u9009\u503C</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td><strong>Number of Relationships</strong></td><td>1</td><td></td><td>\u786E\u5B9A\u8D1F\u8F7D\u5E94\u8BE5\u5206\u5E03\u5230\u7684\u5173\u7CFB\u7684\u6570\u91CF</td></tr><tr><td><strong>Distribution Strategy</strong></td><td>round robin</td><td>\u25AAround robin<br> \u25AAnext available<br> \u25AAload distribution service</td><td>\u786E\u5B9A\u8D1F\u8F7D\u5C06\u5982\u4F55\u5206\u914D\u3002\u5982\u679C\u4F7F\u7528\u5FAA\u73AF\uFF0C\u5C06\u4E0D\u4F1A\u5206\u53D1\u4EFB\u4F55\u6D41\u6587\u4EF6\uFF0C\u9664\u975E\u6240\u6709\u76EE\u7684\u5730\u90FD\u53EF\u4EE5\u63A5\u53D7\u6D41\u6587\u4EF6;\u5F53\u4F7F\u7528Next Available\u65F6\uFF0C\u53EA\u8981\u81F3\u5C11\u6709\u4E00\u4E2A\u76EE\u7684\u5730\u53EF\u4EE5\u63A5\u53D7\u6D41\u6587\u4EF6\uFF0C\u5C31\u4F1A\u5206\u53D1\u6D41\u6587\u4EF6\u3002</td></tr></tbody></table><h2 id="\u52A8\u6001\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u52A8\u6001\u5C5E\u6027" aria-hidden="true">#</a> \u52A8\u6001\u5C5E\u6027\uFF1A</h2><p>\u8BE5\u5904\u7406\u5668\u5141\u8BB8\u7528\u6237\u6307\u5B9A\u5C5E\u6027\u7684\u540D\u79F0\u548C\u503C\u3002</p><table><thead><tr><th>\u5C5E\u6027\u540D\u79F0</th><th>\u5C5E\u6027\u503C</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>The relationship name(positive number)</td><td>The relationship Weight(positive number)</td><td>\u6DFB\u52A0\u540D\u79F0\u4E3A\u201C5\u201D\u548C\u503C\u4E3A\u201C10\u201D\u7684\u5C5E\u6027\u610F\u5473\u7740\u540D\u79F0\u4E3A\u201C5\u201D\u7684\u5173\u7CFB\u5C06\u5728\u6BCF\u6B21\u8FED\u4EE3\u4E2D\u63A5\u653610\u4E2A\u6D41\u6587\u4EF6\uFF0C\u800C\u4E0D\u662F1\u4E2A\u3002<br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:false</td></tr></tbody></table><h2 id="\u8FDE\u63A5\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#\u8FDE\u63A5\u5173\u7CFB" aria-hidden="true">#</a> \u8FDE\u63A5\u5173\u7CFB</h2><table><thead><tr><th>\u540D\u79F0</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>1</td><td></td></tr></tbody></table><h2 id="\u81EA\u5B9A\u4E49\u8FDE\u63A5\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u8FDE\u63A5\u5173\u7CFB" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49\u8FDE\u63A5\u5173\u7CFB</h2><p>\u53EF\u4EE5\u6839\u636E\u7528\u6237\u914D\u7F6E\u5904\u7406\u5668\u7684\u65B9\u5F0F\u521B\u5EFA\u52A8\u6001\u5173\u7CFB\u3002</p><table><thead><tr><th>\u540D\u79F0</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>\u6570\u5B57</td><td>\u6309\u7167&lt;\u5206\u53D1\u7B56\u7565&gt;\u5C06\u6D41\u6587\u4EF6\u53D1\u9001\u5230\u8FD9\u4E2A\u5173\u7CFB</td></tr></tbody></table><h2 id="\u8BFB\u53D6\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u8BFB\u53D6\u5C5E\u6027" aria-hidden="true">#</a> \u8BFB\u53D6\u5C5E\u6027</h2><p>\u6CA1\u6709\u6307\u5B9A\u3002</p><h2 id="\u5199\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u5199\u5C5E\u6027" aria-hidden="true">#</a> \u5199\u5C5E\u6027</h2><p>\u6CA1\u6709\u6307\u5B9A\u3002</p><h2 id="\u72B6\u6001\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u72B6\u6001\u7BA1\u7406" aria-hidden="true">#</a> \u72B6\u6001\u7BA1\u7406</h2><p>\u6B64\u7EC4\u4EF6\u4E0D\u5B58\u50A8\u72B6\u6001\u3002</p><h2 id="\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#\u9650\u5236" aria-hidden="true">#</a> \u9650\u5236</h2><p>\u6B64\u7EC4\u4EF6\u4E0D\u53D7\u9650\u5236\u3002</p><h2 id="\u8F93\u5165\u8981\u6C42" tabindex="-1"><a class="header-anchor" href="#\u8F93\u5165\u8981\u6C42" aria-hidden="true">#</a> \u8F93\u5165\u8981\u6C42</h2><p>\u6B64\u7EC4\u4EF6\u9700\u8981\u4F20\u5165\u5173\u7CFB\u3002</p><h2 id="\u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651" tabindex="-1"><a class="header-anchor" href="#\u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651" aria-hidden="true">#</a> \u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651</h2><p>\u6CA1\u6709\u6307\u5B9A\u3002</p><h2 id="\u5E94\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u5E94\u7528\u573A\u666F" aria-hidden="true">#</a> \u5E94\u7528\u573A\u666F</h2><p>\u6309\u6743\u91CD\u5411\u4E0B\u6E38\u591A\u4E2A\u5904\u7406\u5668\u5206\u53D1\u6570\u636E\u3002\u5728\u5355\u4E2A\u6D41\u7A0B\u5904\u7406\u6570\u636E\u8FBE\u5230\u74F6\u9888\uFF0C\u800C\u6574\u4F53\u73AF\u5883\u8D44\u6E90\u5145\u8DB3\uFF0C\u8FD9\u79CD\u60C5\u51B5\u6709\u53EF\u80FD\u9700\u8981\u591A\u4E2A\u6D41\u7A0B\u6765\u5206\u62C5\u6570\u636E\u5904\u7406\u538B\u529B\u3002\u800C\u8BE5\u5904\u7406\u5668\u5145\u5F53\u4E00\u4E2A\u5206\u53D1\u6570\u636E\u7684\u89D2\u8272\uFF1B\uFF08\u6CE8\uFF1A\u4E0Econnection\u7684Load Balance\u8981\u533A\u5206\u5F00\uFF09</p><h2 id="\u793A\u4F8B\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u793A\u4F8B\u8BF4\u660E" aria-hidden="true">#</a> \u793A\u4F8B\u8BF4\u660E</h2><p>\u6D41\u7A0B\u6A21\u677Fxml(1.9.2)</p><a href="../template/DistributeLoad.xml" download="DistributeLoad.xml">DistributeLoad.xml</a><p>\u914D\u7F6E3\u4E2Arelationship\uFF0C\u518D\u5206\u522B\u914D\u7F6E\u4E0D\u540C\u7684\u6743\u91CD\u3002</p><p><img src="'+d+'" alt=""></p><p>\u6D4B\u8BD5\u4E2D\u4F7F\u5F97\u6570\u636E\u5206\u914D\u524D\u961F\u5217\u4E2D\u67096\u4E2Aflowfile</p><p><img src="'+h+'" alt=""></p><p>\u7ED3\u679C\uFF1A</p><p><img src="'+i+'" alt=""></p>',40),o=[s];function l(p,c){return a(),e("div",null,o)}var u=t(n,[["render",l],["__file","DistributeLoad.html.vue"]]);export{u as default};