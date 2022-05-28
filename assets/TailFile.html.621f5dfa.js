import{_ as e,o as t,c as i,e as d}from"./app.3ad1c1e4.js";const a={},r=d(`<h1 id="tailfile" tabindex="-1"><a class="header-anchor" href="#tailfile" aria-hidden="true">#</a> TailFile</h1><hr><p>\u7F16\u8F91\u4EBA(\u5168\u7F51\u540C\u540D)\uFF1A<strong><strong>\u9177\u9177\u7684\u8BDA</strong></strong> \u90AE\u7BB1\uFF1A<strong>zhangchengk@foxmail.com</strong></p><hr><h2 id="\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>&quot;Tails&quot;\u4E00\u4E2A\u6587\u4EF6\u6216\u6587\u4EF6\u5217\u8868\uFF0C\u5728\u6587\u4EF6\u5199\u5165\u6587\u4EF6\u65F6\u4ECE\u6587\u4EF6\u4E2D\u6444\u53D6\u6570\u636E\u3002\u8BE5\u6587\u4EF6\u5E94\u4E3A\u6587\u672C\u6587\u4EF6(text)\u3002\u53EA\u6709\u5728\u9047\u5230\u65B0\u884C\uFF08\u56DE\u8F66\u7B26\u6216\u65B0\u884C\u5B57\u7B26\uFF09\u65F6\u624D\u4F1A\u63A5\u6536\u6570\u636E\u3002\u5982\u679C\u8981Tail\u7684\u6587\u4EF6\u662F\u5B9A\u671F\u201Crolled over(\u6EDA\u52A8)\u201D\u7684\uFF08\u65E5\u5FD7\u6587\u4EF6\u901A\u5E38\u662F\u8FD9\u6837\uFF09\uFF0C\u5219\u53EF\u4EE5\u4F7F\u7528\u53EF\u9009\u7684<code>Rolling Filename Pattern</code>\u4ECE\u5DF2\u6EDA\u52A8\u7684\u6587\u4EF6\u4E2D\u68C0\u7D22\u6570\u636E\uFF0C\u5373\u4F7F\u56DE\u6EDA\u53D1\u751F\u5728NiFi\u672A\u8FD0\u884C\u65F6\uFF08\u524D\u63D0\u662F\u6570\u636E\u5728NiFi\u91CD\u65B0\u542F\u52A8\u65F6\u4ECD\u7136\u5B58\u5728\uFF09\u3002\u901A\u5E38\u5EFA\u8BAE\u5C06\u8FD0\u884C\u8BA1\u5212\u8BBE\u7F6E\u4E3A\u51E0\u79D2\uFF0C\u800C\u4E0D\u662F\u4F7F\u7528\u9ED8\u8BA4\u503C0\u79D2\u8FD0\u884C\uFF0C\u5426\u5219\u6B64\u5904\u7406\u5668\u5C06\u6D88\u8017\u5927\u91CF\u8D44\u6E90\u3002\u6B64\u5904\u7406\u5668\u4E0D\u652F\u6301\u63A5\u6536\u201Crolled over\u201D\u65F6\u5DF2\u538B\u7F29\u7684\u6587\u4EF6\u3002</p><h2 id="\u5C5E\u6027\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5C5E\u6027\u914D\u7F6E" aria-hidden="true">#</a> \u5C5E\u6027\u914D\u7F6E</h2><p>\u5728\u4E0B\u9762\u7684\u5217\u8868\u4E2D\uFF0C\u5FC5\u9700\u5C5E\u6027\u7684\u540D\u79F0\u4EE5\u7C97\u4F53\u663E\u793A\u3002\u4EFB\u4F55\u5176\u4ED6\u5C5E\u6027(\u4E0D\u662F\u7C97\u4F53)\u90FD\u88AB\u8BA4\u4E3A\u662F\u53EF\u9009\u7684\uFF0C\u5E76\u4E14\u6307\u51FA\u5C5E\u6027\u9ED8\u8BA4\u503C\uFF08\u5982\u679C\u6709\u9ED8\u8BA4\u503C\uFF09\uFF0C\u4EE5\u53CA\u5C5E\u6027\u662F\u5426\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00\u3002</p><table><thead><tr><th>Name</th><th>Default Value</th><th>Allowable Values</th><th>Description</th></tr></thead><tbody><tr><td><strong>Tailing mode</strong></td><td>Single file</td><td>\u25AASingle file<br>\u25AAMultiple files</td><td>\u4F7F\u7528\u6A21\u5F0F: single file\u53EA\u4F1Atail\u4E00\u4E2A\u6587\u4EF6, multiple file\u5C06tail\u4E00\u4E2A\u6587\u4EF6\u5217\u8868. \u5728multiple file\u6A21\u5F0F\u4E0B\uFF0C\u9700\u8981\u914D\u7F6E<code>Base directory</code>\u3002</td></tr><tr><td><strong>File(s) to Tail</strong></td><td></td><td></td><td>\u5728<code>Single file</code>\u6A21\u5F0F\u4E0B\uFF0C\u8FD9\u91CC\u914D\u7F6E\u6587\u4EF6\u7684<strong>\u5168\u8DEF\u5F84\u540D\u79F0</strong>\u3002\u5982\u679C\u4F7F\u7528<code>multiple file</code>\u6A21\u5F0F\uFF0C\u8FD9\u91CC\u914D\u7F6E\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u5728<code>Base directory</code>\u4E2D\u5339\u914D\u67E5\u627E\u8981tail\u7684\u6587\u4EF6\u3002\u5982\u679C<code>Recursive lookup</code>\u8BBE\u7F6E\u4E3Atrue\uFF0C\u5219\u6B63\u5219\u8868\u8FBE\u5F0F\u5C06\u7528\u4E8E\u5339\u914D\u4ECE<code>Base directory</code>\u5F00\u59CB\u7684\u8DEF\u5F84\u9012\u5F52\u67E5\u627E\u3002<br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true</td></tr><tr><td>Rolling Filename Pattern</td><td></td><td></td><td>\u5982\u679C\u8981tail\u7684\u6587\u4EF6\u50CF\u65E5\u5FD7\u6587\u4EF6\u4E00\u6837\u201Crolled over\u201D\uFF0C\u5219\u6B64\u914D\u7F6E\u5C06\u7528\u4E8E\u6807\u8BC6<strong>\u5DF2\u6EDA\u52A8</strong>\u7684\u6587\u4EF6\uFF0C\u5982\u679CNiFi\u91CD\u65B0\u542F\u52A8\uFF0C\u5E76\u4E14\u6587\u4EF6\u5DF2\u6EDA\u52A8\uFF0C\u5219\u5B83\u4E5F\u80FD\u591F\u4ECE\u505C\u6B62\u7684\u4F4D\u7F6E\u5F00\u59CB\u3002\u6B64\u6A21\u5F0F\u652F\u6301\u901A\u914D\u7B26*\u548C\uFF1F\uFF0C\u5B83\u8FD8\u652F\u6301\u6807\u8BB0\${filename}\u4EE5\u6839\u636E\u6587\u4EF6\u540D\uFF08\u4E0D\u5E26\u6269\u5C55\u540D\uFF09\u6307\u5B9A\u6A21\u5F0F\uFF0C\u9ED8\u8BA4\u8BA4\u4E3A\u5DF2\u6EDA\u52A8\u7684\u6587\u4EF6\u4E0E\u8981tail\u7684\u6587\u4EF6\u4F4D\u4E8E\u540C\u4E00\u76EE\u5F55\u4E2D\u3002\u6240\u6709\u6587\u4EF6\u90FD\u5C06\u4F7F\u7528\u76F8\u540C\u7684glob\u6A21\u5F0F\u3002</td></tr><tr><td>Base directory</td><td></td><td></td><td>\u7528\u4E8E\u67E5\u627E\u9700\u8981tail\u7684\u6587\u4EF6\u7684\u57FA\u672C\u76EE\u5F55\u3002\u4F7F\u7528<code>multiple file</code>\u6A21\u5F0F\u65F6\uFF0C\u6B64\u5C5E\u6027\u662F\u5FC5\u9700\u7684\u3002<br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00:true</td></tr><tr><td><strong>Initial Start Position</strong></td><td>Beginning of File</td><td>\u25AABeginning of File<br>\u25AABeginning of Time<br>\u25AABeginning of File<br>\u25AACurrent Time</td><td>\u5F53\u5904\u7406\u5668\u9996\u6B21\u5F00\u59CBtail\u6570\u636E\u65F6\uFF0C\u6B64\u5C5E\u6027\u6307\u5B9A\u5904\u7406\u5668\u5E94\u5728\u4F55\u5904\u5F00\u59CB\u8BFB\u53D6\u6570\u636E\u3002\u4ECE\u6587\u4EF6\u4E2D\u63D0\u53D6\u6570\u636E\u540E\uFF0C\u5904\u7406\u5668\u5C06\u4ECE\u4E0A\u4E00\u6B21\u63A5\u6536\u6570\u636E\u7684\u6700\u4F4D\u7F6E\u7EE7\u7EEDtail\u6570\u636E\u3002</td></tr><tr><td><strong>State Location</strong></td><td>Local</td><td>\u25AALocal<br>\u25AARemote</td><td>\u6307\u5B9A\u72B6\u6001\u4F4D\u4E8E\u672C\u5730\u6216\u7FA4\u96C6\u7684\u4F4D\u7F6E\uFF0C\u4EE5\u4FBF\u53EF\u4EE5\u9002\u5F53\u5730\u5B58\u50A8\u72B6\u6001\uFF0C\u4FDD\u8BC1\u6570\u636E\u4E0D\u88AB\u91CD\u590Dtail</td></tr><tr><td><strong>Recursive lookup</strong></td><td>false</td><td>\u25AAtrue<br>\u25AAfalse</td><td>\u4F7F\u7528<code>multiple file</code>\u6A21\u5F0F\u65F6\uFF0C\u6B64\u5C5E\u6027\u5B9A\u4E49\u662F\u5426\u5FC5\u987B\u5728\u57FA\u76EE\u5F55\u4E2D\u9012\u5F52\u5217\u51FA\u6587\u4EF6\u3002</td></tr><tr><td>Lookup frequency</td><td>10 minutes</td><td></td><td>\u4EC5\u7528\u4E8E<code>multiple file</code>\u6A21\u5F0F\u3002\u5B83\u6307\u5B9A\u5904\u7406\u5668\u5728\u518D\u6B21\u5217\u51FA\u9700\u8981tail\u7684\u6587\u4EF6\u4E4B\u524D\u5C06\u7B49\u5F85\u7684\u6700\u77ED\u65F6\u95F4\u3002</td></tr><tr><td>Maximum age</td><td>24 hours</td><td></td><td>\u4EC5\u7528\u4E8E<code>multiple file</code>\u6A21\u5F0F\u3002\u5B83\u6307\u5B9A\u4E86\u6587\u4EF6\u5728\u6700\u540E\u4E00\u6B21\u4FEE\u6539\u540E\u5230\u73B0\u5728\u7684\u8FD9\u6BB5\u65F6\u95F4\u5C0F\u4E8E\u6B64\u914D\u7F6E\u65F6\u95F4\u6BB5\u3002\u5982\u679C\u5C06\u65B0\u6D88\u606F\u4EE5\u8F83\u4F4E\u7684\u9891\u7387\u6DFB\u52A0\uFF0C\u5219\u4E0D\u5E94\u5C06\u5176\u8BBE\u7F6E\u5F97\u592A\u4F4E\u4EE5\u907F\u514D\u91CD\u590D\u6570\u636E\u3002\u5982\u679C\u81EA\u6587\u4EF6\u6700\u540E\u4E00\u6B21\u4FEE\u6539\u4EE5\u6765\u7ECF\u8FC7\u7684\u65F6\u95F4\u5927\u4E8E\u6B64\u914D\u7F6E\u65F6\u95F4\u6BB5\uFF0C\u5219\u4E0D\u4F1Atail\u6587\u4EF6\u3002</td></tr></tbody></table><h2 id="\u8FDE\u63A5\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#\u8FDE\u63A5\u5173\u7CFB" aria-hidden="true">#</a> \u8FDE\u63A5\u5173\u7CFB</h2><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>success</td><td>\u6240\u6709FlowFiles\u90FD\u8DEF\u7531\u5230\u6B64\u5173\u7CFB\u3002</td></tr></tbody></table><h2 id="\u8BFB\u53D6\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u8BFB\u53D6\u5C5E\u6027" aria-hidden="true">#</a> \u8BFB\u53D6\u5C5E\u6027</h2><p>\u6CA1\u6709\u6307\u5B9A\u3002</p><h2 id="\u5199\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u5199\u5C5E\u6027" aria-hidden="true">#</a> \u5199\u5C5E\u6027</h2><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>tailfile.original.path</td><td>\u6D41\u6587\u4EF6\u6765\u81EA\u7684\u539F\u59CB\u6587\u4EF6\u7684\u8DEF\u5F84\u3002</td></tr></tbody></table><h2 id="\u72B6\u6001\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u72B6\u6001\u7BA1\u7406" aria-hidden="true">#</a> \u72B6\u6001\u7BA1\u7406</h2><table><thead><tr><th>Scope</th><th>Description</th></tr></thead><tbody><tr><td>LOCAL, CLUSTER</td><td>\u5B58\u50A8\u6709\u5173\u5728tail\u8FC7\u7684\u6587\u4EF6\u7684\u4F4D\u7F6E\u7684\u72B6\u6001\uFF0C\u4EE5\u4FBF\u5728\u91CD\u65B0\u542F\u52A8\u65F6\u4E0D\u5FC5\u91CD\u590Dtail\u6570\u636E\u3002\u72B6\u6001\u5B58\u50A8\u5728\u672C\u5730\u8FD8\u662F\u7FA4\u96C6\u4E2D\u53D6\u51B3\u4E8E<code>State Location</code>\u5C5E\u6027\u3002</td></tr></tbody></table><h2 id="\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#\u9650\u5236" aria-hidden="true">#</a> \u9650\u5236</h2><table><thead><tr><th>Required Permission</th><th>Explanation</th></tr></thead><tbody><tr><td>read filesystem</td><td>\u4F7F\u64CD\u4F5C\u5458\u80FD\u591F\u8BFB\u53D6NiFi\u6709\u6743\u8BBF\u95EE\u7684\u4EFB\u4F55\u6587\u4EF6\u3002</td></tr></tbody></table><h2 id="\u8F93\u5165\u8981\u6C42" tabindex="-1"><a class="header-anchor" href="#\u8F93\u5165\u8981\u6C42" aria-hidden="true">#</a> \u8F93\u5165\u8981\u6C42</h2><p>\u4E0D\u5141\u8BB8\u4F20\u5165\u6D41\u6587\u4EF6</p><h2 id="\u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651" tabindex="-1"><a class="header-anchor" href="#\u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651" aria-hidden="true">#</a> \u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651</h2><p>\u6CA1\u6709\u6307\u5B9A\u3002</p><h2 id="\u8BE6\u7EC6\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u8BE6\u7EC6\u8BF4\u660E" aria-hidden="true">#</a> \u8BE6\u7EC6\u8BF4\u660E</h2><h3 id="modes" tabindex="-1"><a class="header-anchor" href="#modes" aria-hidden="true">#</a> Modes</h3><p>\u8BE5\u5904\u7406\u5668\u7528\u4E8E\u6839\u636E\u591A\u79CD\u6A21\u5F0Ftail\u4E00\u4E2A\u6587\u4EF6\u6216\u591A\u4E2A\u6587\u4EF6\u3002\u9009\u62E9\u7684\u6A21\u5F0F\u53D6\u51B3\u4E8E\u6587\u4EF6\u7684\u65E5\u5FD7\u8BB0\u5F55\u6A21\u5F0F\u3002\u5982\u679C\u5B58\u5728\u6EDA\u52A8\u6A21\u5F0F\uFF0C\u5219\u6EDA\u52A8\u6587\u4EF6\u5FC5\u987B\u662F\u7EAF\u6587\u672C\u6587\u4EF6\uFF08\u5F53\u524D\u4E0D\u652F\u6301\u538B\u7F29\uFF09\u3002</p><ul><li><strong>Single file</strong>: \u5904\u7406\u5668\u5C06\u4F7F\u7528<code>File(s) to Tail</code>\u5C5E\u6027\u4E2D\u6307\u5B9A\u7684\u8DEF\u5F84tail\u6587\u4EF6\u3002</li><li><strong>Multiple files</strong>: \u5904\u7406\u5668\u5C06\u5728<code>Base directory</code>\u4E2D\u67E5\u627E\u6587\u4EF6\u3002\u5B83\u5C06\u6839\u636E\u201C<code>Recursive lookup</code>\u5C5E\u6027\u4EE5\u9012\u5F52\u65B9\u5F0F\u67E5\u627E\u6587\u4EF6\uFF0C\u5E76\u5C06\u5339\u914D<code>File(s) to Tail</code>\u5C5E\u6027\u4E2D\u7684\u6B63\u5219\u8868\u8FBE\u5F0F\u3002</li></ul><h3 id="rolling-filename-pattern" tabindex="-1"><a class="header-anchor" href="#rolling-filename-pattern" aria-hidden="true">#</a> Rolling filename pattern</h3><p>\u5982\u679C\u4F7F\u7528\u4E86<code>Rolling filename pattern&#39;</code>\u5C5E\u6027\uFF0C\u5219\u5F53\u5904\u7406\u5668\u68C0\u6D4B\u5230\u8981tail\u7684\u6587\u4EF6\u5DF2\u6EDA\u52A8\u65F6\uFF0C\u5904\u7406\u5668\u5C06\u5728\u6EDA\u52A8\u4E86\u7684\u6587\u4EF6\u4E2D\u67E5\u627E\u90A3\u4E9B\u53EF\u80FD\u9519\u8FC7\u7684\u6D88\u606F\u3002\u4E3A\u6B64\uFF0C\u5904\u7406\u5668\u5C06\u4F7F\u7528\u8BE5\u914D\u7F6E\u5728\u4E0E\u8981tail\u7684\u6587\u4EF6\u6240\u5728\u7684\u76F8\u540C\u7684\u76EE\u5F55\u4E2D\u67E5\u627E\u6587\u4EF6\u3002</p><p>\u5F53\u591A\u4E2A\u8981tail\u7684\u6587\u4EF6\u4F4D\u4E8E\u540C\u4E00\u76EE\u5F55\u4E2D\u65F6\uFF0C\u4E3A\u4E86\u4F7F\u6B64\u5C5E\u6027\u5728<code>Multiple files</code>\u6A21\u5F0F\u4E0B\u53EF\u7528\uFF0C\u53EF\u4EE5\u4F7F\u7528\${filename}\u6807\u8BB0\u5C06\u8981tail\u7684\u6587\u4EF6\u7684\u540D\u79F0\uFF08\u4E0D\u5E26\u6269\u5C55\u540D\uFF09</p><p>\u6BD4\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/my/path/directory/my-app.log.1  
/my/path/directory/my-app.log  
/my/path/directory/application.log.1  
/my/path/directory/application.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&#39;rolling filename pattern&#39;\u5C31\u662F <em>\${filename}.log.*</em> \u3002</p><h3 id="descriptions-for-different-modes-and-strategies" tabindex="-1"><a class="header-anchor" href="#descriptions-for-different-modes-and-strategies" aria-hidden="true">#</a> Descriptions for different modes and strategies</h3><p><code>Single file</code>\u6A21\u5F0F\u5047\u5B9A\u8981tail\u7684\u6587\u4EF6\u59CB\u7EC8\u5177\u6709\u76F8\u540C\u7684\u540D\u79F0\uFF0C\u5373\u4F7F\u5B58\u5728\u6EDA\u52A8\u6A21\u5F0F\u4E5F\u662F\u5982\u6B64\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/my/path/directory/my-app.log.2
/my/path/directory/my-app.log.1
/my/path/directory/my-app.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5E76\u4E14\u65B0\u7684\u65E5\u5FD7\u6D88\u606F\u603B\u662F\u9644\u52A0\u5728<code>my-app.log</code>\u6587\u4EF6\u4E2D\u3002</p><p>\u5982\u679C\u9012\u5F52\u8BBE\u7F6E\u4E3Atrue\u3002\u6B63\u5219\u8868\u8FBE\u5F0F\u5FC5\u987B\u5305\u542B\u57FA\u672C\u76EE\u5F55\u548C\u6587\u4EF6\u5C3E\u90E8\u4E4B\u95F4\u7684\u53EF\u80FD\u4E2D\u95F4\u76EE\u5F55\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/my/path/directory1/my-app1.log
/my/path/directory2/my-app2.log
/my/path/directory3/my-app3.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Base directory: /my/path</li><li>Files to tail: directory[1-3]/my-app[1-3].log</li><li>Recursivity: true</li></ul><p>\u5982\u679C\u5904\u7406\u5668\u914D\u7F6E\u4E3A<code>Multiple files</code>\u6A21\u5F0F\uFF0C\u5219</p><ul><li>Lookup frequency: \u6307\u5B9A\u5904\u7406\u5668\u5728\u518D\u6B21\u5217\u51FA\u6587\u4EF6\u65F6\u5C06\u7B49\u5F85\u7684\u6700\u77ED\u65F6\u95F4\u3002</li><li>Maximum age\uFF1A\u5982\u679C\u81EA\u6587\u4EF6\u4FEE\u6539\u4EE5\u6765\u7ECF\u8FC7\u7684\u65F6\u95F4\u5927\u4E8E\u6B64\u65F6\u95F4\u6BB5\uFF0C\u5219\u4E0D\u4F1Atail\u6587\u4EF6\u3002\u4F8B\u5982\uFF0C\u5982\u679C\u6587\u4EF6\u662F24\u5C0F\u65F6\u524D\u4FEE\u6539\u7684\uFF0C\u5E76\u4E14\u6B64\u5C5E\u6027\u8BBE\u7F6E\u4E3A12\u5C0F\u65F6\uFF0C\u5219\u4E0D\u4F1Atail\u6587\u4EF6\u3002\u4F46\u662F\uFF0C\u5982\u679C\u5C06\u6B64\u5C5E\u6027\u8BBE\u7F6E\u4E3A36\u5C0F\u65F6\uFF0C\u5219\u6587\u4EF6\u5C06\u88ABtail\u3002</li></ul><p>\u4E3A\u4E86\u83B7\u5F97\u9AD8\u6027\u80FD\uFF0C\u6709\u5FC5\u8981\u6CE8\u610F&#39;Lookup frequency&#39;\u548C&#39;Maximum age&#39;\u5C5E\u6027\u4EE5\u53CA\u89E6\u53D1\u5904\u7406\u5668\u7684\u9891\u7387\u3002\u5EFA\u8BAE\u4FDD\u6301Maximum age&#39;&gt;&#39;Lookup frequency&#39;&gt;\u5904\u7406\u5668\u8C03\u5EA6\u9891\u7387\uFF0C\u4EE5\u907F\u514D\u4E22\u5931\u6570\u636E\u3002\u8FD8\u5EFA\u8BAE\u4E0D\u8981\u5C06&#39;Maximum Age&#39;\u8BBE\u7F6E\u5F97\u592A\u4F4E\uFF0C\u56E0\u4E3A\u5982\u679C\u5728\u6B64\u6587\u4EF6\u88AB\u8BA4\u4E3A&#39;too old&#39;\u4E4B\u540E\u5728\u6587\u4EF6\u4E2D\u9644\u52A0\u4E86\u6D88\u606F\uFF0C\u5219\u53EF\u80FD\u4F1A\u518D\u6B21\u8BFB\u53D6\u6587\u4EF6\u4E2D\u7684\u6240\u6709\u6D88\u606F(\u8FD9\u4E2A\u88AB\u8BA4\u4E3Atoo old\u7684\u6587\u4EF6\u7A0B\u5E8F\u6709\u53EF\u80FD\u5728\u5B83\u6709\u65B0\u5185\u5BB9\u589E\u52A0\u540E\u628A\u5B83\u5F53\u6210\u662F\u65B0\u7684\u6587\u4EF6\u6765tail)\uFF0C\u4ECE\u800C\u5BFC\u81F4\u6570\u636E\u91CD\u590D\u3002</p><p>\u5982\u679C\u5904\u7406\u5668\u914D\u7F6E\u4E3A<code>Multiple files</code>\u6A21\u5F0F\uFF0C\u5219&#39;Rolling filename pattern&#39;\u5C5E\u6027\u5FC5\u987B\u8DB3\u591F\u5177\u4F53\uFF0C\u4EE5\u786E\u4FDD\u4EC5\u5217\u51FA\u6EDA\u52A8\u6587\u4EF6\uFF0C\u800C\u4E0D\u4F1A\u5217\u51FA\u540C\u4E00\u76EE\u5F55\u4E2D\u7684\u5176\u4ED6\u5DF2\u7ECFtail\u8FC7\u7684\u6587\u4EF6\u3002</p>`,44),l=[r];function o(n,s){return t(),i("div",null,l)}var h=e(a,[["render",o],["__file","TailFile.html.vue"]]);export{h as default};
