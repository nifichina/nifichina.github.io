import{_ as a,r as n,o as d,c as o,a as t,b as h,e as s,d as e}from"./app.3ad1c1e4.js";const c={},i=s('<h1 id="confluentschemaregistry" tabindex="-1"><a class="header-anchor" href="#confluentschemaregistry" aria-hidden="true">#</a> ConfluentSchemaRegistry</h1><hr><p>\u7F16\u8F91\u4EBA(\u5168\u7F51\u540C\u540D)\uFF1A<strong><strong>\u9177\u9177\u7684\u8BDA</strong></strong> \u90AE\u7BB1\uFF1A<strong>zhangchengk@foxmail.com</strong></p><hr><h2 id="\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>\u8BE5\u63A7\u5236\u670D\u52A1\u5668\u63D0\u4F9B\u4E0EConfluent Schema\u6CE8\u518C\u4E2D\u5FC3\u4EA4\u4E92\u7684\u670D\u52A1\uFF0C\u4EE5\u4FBF\u90A3\u4E9B\u5B58\u50A8\u5728Confluent Schema\u6CE8\u518C\u4E2D\u5FC3\u7684schema\u53EF\u4EE5\u5728NiFi\u4E2D\u4F7F\u7528\u3002Confluent Schema\u6CE8\u518C\u8868\u6709\u4E00\u4E2Aschema\u7684\u201Csubject\u201D\u7684\u6982\u5FF5\uFF0C\u8FD9\u662F\u6A21\u5F0F\u540D\u79F0\u7684\u672F\u8BED\u3002\u5F53\u901A\u8FC7\u8FD9\u4E2A\u6CE8\u518C\u8868\u6309\u540D\u79F0\u67E5\u627E\u6A21\u5F0F\u65F6\uFF0C\u5B83\u5C06\u5728Confluent Schema\u6CE8\u518C\u8868\u4E2D\u627E\u5230\u4E0E\u8BE5\u4E3B\u9898\u76F8\u5173\u7684\u6A21\u5F0F\u3002</p><h2 id="\u5C5E\u6027\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5C5E\u6027\u914D\u7F6E" aria-hidden="true">#</a> \u5C5E\u6027\u914D\u7F6E</h2><p>\u5728\u4E0B\u9762\u7684\u5217\u8868\u4E2D\uFF0C\u5FC5\u9700\u5C5E\u6027\u7684\u540D\u79F0\u4EE5\u7C97\u4F53\u663E\u793A\u3002\u4EFB\u4F55\u5176\u4ED6\u5C5E\u6027(\u4E0D\u662F\u7C97\u4F53)\u90FD\u88AB\u8BA4\u4E3A\u662F\u53EF\u9009\u7684\uFF0C\u5E76\u4E14\u6307\u51FA\u5C5E\u6027\u9ED8\u8BA4\u503C\uFF08\u5982\u679C\u6709\u9ED8\u8BA4\u503C\uFF09\uFF0C\u4EE5\u53CA\u5C5E\u6027\u662F\u5426\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00\u3002(1.11.4\u7248\u672C)</p><table><thead><tr><th>\u5C5E\u6027\u540D\u79F0</th><th>\u9ED8\u8BA4\u503C</th><th>\u53EF\u9009\u503C</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td><strong>Schema Registry URLs</strong></td><td>http://localhost:8081</td><td></td><td>\u9017\u53F7\u5206\u9694\u7684URL<br>\u652F\u6301\u8868\u8FBE\u5F0F\u8BED\u8A00\uFF1Atrue</td></tr><tr><td>SSL Context Service</td><td></td><td>Controller Service API:<br>SSLContextService<br>Implementations:<br>StandardRestrictedSSLContextService<br>StandardSSLContextService</td><td>\u6307\u5B9ASSL\u670D\u52A1</td></tr><tr><td><strong>Communications Timeout</strong></td><td>30 secs</td><td></td><td>\u8BBF\u95EEConfluent Schema\u6CE8\u518C\u4E2D\u5FC3\u7B49\u5F85\u65F6\u95F4</td></tr><tr><td><strong>Cache Size</strong></td><td>1000</td><td></td><td>\u7F13\u5B58schema\u7684\u4E2A\u6570</td></tr><tr><td><strong>Cache Expiration</strong></td><td>1 hour</td><td></td><td>\u7F13\u5B58\u8FC7\u671F\u65F6\u95F4</td></tr></tbody></table><h2 id="\u72B6\u6001\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u72B6\u6001\u7BA1\u7406" aria-hidden="true">#</a> \u72B6\u6001\u7BA1\u7406</h2><p>\u6B64\u7EC4\u4EF6\u4E0D\u5B58\u50A8\u72B6\u6001\u3002</p><h2 id="\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#\u9650\u5236" aria-hidden="true">#</a> \u9650\u5236</h2><p>\u65E0\u3002</p><h2 id="\u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651" tabindex="-1"><a class="header-anchor" href="#\u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651" aria-hidden="true">#</a> \u7CFB\u7EDF\u8D44\u6E90\u65B9\u9762\u7684\u8003\u8651</h2><p>\u65E0</p><h2 id="\u6DF1\u5165\u8BB2\u89E3" tabindex="-1"><a class="header-anchor" href="#\u6DF1\u5165\u8BB2\u89E3" aria-hidden="true">#</a> \u6DF1\u5165\u8BB2\u89E3</h2>',16),l=e("\u8BE6\u7EC6\u8FD8\u9700\u5230\u5B98\u7F51\u4E86\u89E3\u5B66\u4E60"),m={href:"http://docs.confluent.io/current/schema-registry/docs/serializer-formatter.html",target:"_blank",rel:"noopener noreferrer"},u=e("http://docs.confluent.io/current/schema-registry/docs/serializer-formatter.html");function f(S,g){const r=n("ExternalLinkIcon");return d(),o("div",null,[i,t("p",null,[l,t("a",m,[u,h(r)])])])}var _=a(c,[["render",f],["__file","ConfluentSchemaRegistry.html.vue"]]);export{_ as default};