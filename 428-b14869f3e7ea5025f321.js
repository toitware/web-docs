(self.webpackChunkweb_docs=self.webpackChunkweb_docs||[]).push([[428],{428:function(e,r,n){n(7207),function(e){"use strict";function r(e,r){return"string"==typeof e?e=new RegExp(e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),r?"gi":"g"):e.global||(e=new RegExp(e.source,e.ignoreCase?"gi":"g")),{token:function(r){e.lastIndex=r.pos;var n=e.exec(r.string);if(n&&n.index==r.pos)return r.pos+=n[0].length||1,"searching";n?r.pos=n.index:r.skipToEnd()}}}function n(){this.posFrom=this.posTo=this.lastQuery=this.query=null,this.overlay=null}function t(e){return e.state.search||(e.state.search=new n)}function o(e){return"string"==typeof e&&e==e.toLowerCase()}function a(e,r,n){return e.getSearchCursor(r,n,{caseFold:o(r),multiline:!0})}function i(e,r,n,t,o){e.openDialog(r,t,{value:n,selectValueOnOpen:!0,closeOnEnter:!1,onClose:function(){h(e)},onKeyDown:o,bottom:e.options.search.bottom})}function s(e,r,n,t,o){e.openDialog?e.openDialog(r,o,{value:t,selectValueOnOpen:!0,bottom:e.options.search.bottom}):o(prompt(n,t))}function c(e,r,n,t){e.openConfirm?e.openConfirm(r,t):confirm(n)&&t[0]()}function l(e){return e.replace(/\\([nrt\\])/g,(function(e,r){return"n"==r?"\n":"r"==r?"\r":"t"==r?"\t":"\\"==r?"\\":e}))}function u(e){var r=e.match(/^\/(.*)\/([a-z]*)$/);if(r)try{e=new RegExp(r[1],-1==r[2].indexOf("i")?"":"i")}catch(n){}else e=l(e);return("string"==typeof e?""==e:e.test(""))&&(e=/x^/),e}function f(e,n,t){n.queryText=t,n.query=u(t),e.removeOverlay(n.overlay,o(n.query)),n.overlay=r(n.query,o(n.query)),e.addOverlay(n.overlay),e.showMatchesOnScrollbar&&(n.annotate&&(n.annotate.clear(),n.annotate=null),n.annotate=e.showMatchesOnScrollbar(n.query,o(n.query)))}function p(r,n,o,a){var c=t(r);if(c.query)return d(r,n);var l=r.getSelection()||c.lastQuery;if(l instanceof RegExp&&"x^"==l.source&&(l=null),o&&r.openDialog){var u=null,p=function(n,t){e.e_stop(t),n&&(n!=c.queryText&&(f(r,c,n),c.posFrom=c.posTo=r.getCursor()),u&&(u.style.opacity=1),d(r,t.shiftKey,(function(e,n){var t;n.line<3&&document.querySelector&&(t=r.display.wrapper.querySelector(".CodeMirror-dialog"))&&t.getBoundingClientRect().bottom-4>r.cursorCoords(n,"window").top&&((u=t).style.opacity=.4)})))};i(r,g(r),l,p,(function(n,o){var a=e.keyName(n),i=r.getOption("extraKeys"),s=i&&i[a]||e.keyMap[r.getOption("keyMap")][a];"findNext"==s||"findPrev"==s||"findPersistentNext"==s||"findPersistentPrev"==s?(e.e_stop(n),f(r,t(r),o),r.execCommand(s)):"find"!=s&&"findPersistent"!=s||(e.e_stop(n),p(o,n))})),a&&l&&(f(r,c,l),d(r,n))}else s(r,g(r),"Search for:",l,(function(e){e&&!c.query&&r.operation((function(){f(r,c,e),c.posFrom=c.posTo=r.getCursor(),d(r,n)}))}))}function d(r,n,o){r.operation((function(){var i=t(r),s=a(r,i.query,n?i.posFrom:i.posTo);(s.find(n)||(s=a(r,i.query,n?e.Pos(r.lastLine()):e.Pos(r.firstLine(),0))).find(n))&&(r.setSelection(s.from(),s.to()),r.scrollIntoView({from:s.from(),to:s.to()},20),i.posFrom=s.from(),i.posTo=s.to(),o&&o(s.from(),s.to()))}))}function h(e){e.operation((function(){var r=t(e);r.lastQuery=r.query,r.query&&(r.query=r.queryText=null,e.removeOverlay(r.overlay),r.annotate&&(r.annotate.clear(),r.annotate=null))}))}function m(e,r){var n=e?document.createElement(e):document.createDocumentFragment();for(var t in r)n[t]=r[t];for(var o=2;o<arguments.length;o++){var a=arguments[o];n.appendChild("string"==typeof a?document.createTextNode(a):a)}return n}function g(e){var r=m("label",{className:"CodeMirror-search-label"},e.phrase("Search:"),m("input",{type:"text",style:"width: 10em",className:"CodeMirror-search-field",id:"CodeMirror-search-field"}));return r.setAttribute("for","CodeMirror-search-field"),m("",null,r," ",m("span",{style:"color: #666",className:"CodeMirror-search-hint"},e.phrase("(Use /re/ syntax for regexp search)")))}function y(e){return m("",null," ",m("input",{type:"text",style:"width: 10em",className:"CodeMirror-search-field"})," ",m("span",{style:"color: #666",className:"CodeMirror-search-hint"},e.phrase("(Use /re/ syntax for regexp search)")))}function v(e){return m("",null,m("span",{className:"CodeMirror-search-label"},e.phrase("With:"))," ",m("input",{type:"text",style:"width: 10em",className:"CodeMirror-search-field"}))}function x(e){return m("",null,m("span",{className:"CodeMirror-search-label"},e.phrase("Replace?"))," ",m("button",{},e.phrase("Yes"))," ",m("button",{},e.phrase("No"))," ",m("button",{},e.phrase("All"))," ",m("button",{},e.phrase("Stop")))}function C(e,r,n){e.operation((function(){for(var t=a(e,r);t.findNext();)if("string"!=typeof r){var o=e.getRange(t.from(),t.to()).match(r);t.replace(n.replace(/\$(\d)/g,(function(e,r){return o[r]})))}else t.replace(n)}))}function b(e,r){if(!e.getOption("readOnly")){var n=e.getSelection()||t(e).lastQuery,o=r?e.phrase("Replace all:"):e.phrase("Replace:"),i=m("",null,m("span",{className:"CodeMirror-search-label"},o),y(e));s(e,i,o,n,(function(n){n&&(n=u(n),s(e,v(e),e.phrase("Replace with:"),"",(function(t){if(t=l(t),r)C(e,n,t);else{h(e);var o=a(e,n,e.getCursor("from")),i=function(){var r,l=o.from();!(r=o.findNext())&&(o=a(e,n),!(r=o.findNext())||l&&o.from().line==l.line&&o.from().ch==l.ch)||(e.setSelection(o.from(),o.to()),e.scrollIntoView({from:o.from(),to:o.to()}),c(e,x(e),e.phrase("Replace?"),[function(){s(r)},i,function(){C(e,n,t)}]))},s=function(e){o.replace("string"==typeof n?t:t.replace(/\$(\d)/g,(function(r,n){return e[n]}))),i()};i()}})))}))}}e.defineOption("search",{bottom:!1}),e.commands.find=function(e){h(e),p(e)},e.commands.findPersistent=function(e){h(e),p(e,!1,!0)},e.commands.findPersistentNext=function(e){p(e,!1,!0,!0)},e.commands.findPersistentPrev=function(e){p(e,!0,!0,!0)},e.commands.findNext=p,e.commands.findPrev=function(e){p(e,!0)},e.commands.clearSearch=h,e.commands.replace=b,e.commands.replaceAll=function(e){b(e,!0)}}(n(5698),n(5876),n(7715))},647:function(e,r,n){var t=n(1702),o=n(7908),a=Math.floor,i=t("".charAt),s=t("".replace),c=t("".slice),l=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,u=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,r,n,t,f,p){var d=n+e.length,h=t.length,m=u;return void 0!==f&&(f=o(f),m=l),s(p,m,(function(o,s){var l;switch(i(s,0)){case"$":return"$";case"&":return e;case"`":return c(r,0,n);case"'":return c(r,d);case"<":l=f[c(s,1,-1)];break;default:var u=+s;if(0===u)return o;if(u>h){var p=a(u/10);return 0===p?o:p<=h?void 0===t[p-1]?i(s,1):t[p-1]+i(s,1):o}l=t[u-1]}return void 0===l?"":l}))}},7850:function(e,r,n){var t=n(111),o=n(4326),a=n(5112)("match");e.exports=function(e){var r;return t(e)&&(void 0!==(r=e[a])?!!r:"RegExp"==o(e))}},7066:function(e,r,n){"use strict";var t=n(9670);e.exports=function(){var e=t(this),r="";return e.hasIndices&&(r+="d"),e.global&&(r+="g"),e.ignoreCase&&(r+="i"),e.multiline&&(r+="m"),e.dotAll&&(r+="s"),e.unicode&&(r+="u"),e.unicodeSets&&(r+="v"),e.sticky&&(r+="y"),r}},4706:function(e,r,n){var t=n(6916),o=n(2597),a=n(7976),i=n(7066),s=RegExp.prototype;e.exports=function(e){var r=e.flags;return void 0!==r||"flags"in s||o(e,"flags")||!a(s,e)?r:t(i,e)}},1340:function(e,r,n){var t=n(648),o=String;e.exports=function(e){if("Symbol"===t(e))throw TypeError("Cannot convert a Symbol value to a string");return o(e)}},8757:function(e,r,n){"use strict";var t=n(2109),o=n(6916),a=n(1702),i=n(4488),s=n(614),c=n(8554),l=n(7850),u=n(1340),f=n(8173),p=n(4706),d=n(647),h=n(5112),m=n(1913),g=h("replace"),y=TypeError,v=a("".indexOf),x=a("".replace),C=a("".slice),b=Math.max,w=function(e,r,n){return n>e.length?-1:""===r?n:v(e,r,n)};t({target:"String",proto:!0},{replaceAll:function(e,r){var n,t,a,h,q,N,M,S,O,R=i(this),P=0,T=0,k="";if(!c(e)){if((n=l(e))&&(t=u(i(p(e))),!~v(t,"g")))throw y("`.replaceAll` does not allow non-global regexes");if(a=f(e,g))return o(a,e,R,r);if(m&&n)return x(u(R),e,r)}for(h=u(R),q=u(e),(N=s(r))||(r=u(r)),M=q.length,S=b(1,M),P=w(h,q,0);-1!==P;)O=N?u(r(q,P,h)):d(q,h,P,[],void 0,r),k+=C(h,T,P)+O,T=P+M,P=w(h,q,P+S);return T<h.length&&(k+=C(h,T)),k}})},7207:function(e,r,n){n(8757)}}]);
//# sourceMappingURL=428-b14869f3e7ea5025f321.js.map