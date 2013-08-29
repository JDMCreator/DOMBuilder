!function(e){var t=e.document,a=/^[a-z]+/i,r=/([.]{1}[^\[#.]+)|(#{1}[^\[#.]+)|(\[[ ]*\^?[ ]*[a-z_-]+[ ]*\])|(\[[ ]*\^?[ ]*[a-z_-]+[ ]*=[^\]]+\])/gi,n=/\[\s*name\s*=([^\]]+)\]/gi,i=/^\[[ ]?([\s\S]*)[ ]?\]$/i,s=/\[[ ]*(\^?)[ ]*([a-z_-]+)[ ]*=[ ]*([^\]]+)/gi,l=/^<!--([\S\s]*)-->$/gi,c=["httpEquiv","allowTransparency","aLink","bgColor","vLink","acceptCharset","tabIndex","accessKey","readOnly","useMap","dateTime","isMap","codeBase","codeType","noHref","cellPadding","cellSpacing","chOff","vAlign","colSpan","noWrap","rowSpan","frameBorder","longDesc","marginHeight","marginWidth","noResize","noShade","hSpace","vSpace"],o="|"+c.join("|").toLowerCase()+"|",d=String.prototype.trim,f=function(e){d&&d.call(e)
for(var e=e.replace(/^\s\s*/,""),t=/\s/,a=e.length;t.test(e.charAt(--a)););return e.slice(0,a+1)},u=function(e){return e.replace(/(\-[a-z])/g,function(e){return e.toUpperCase().replace("-","")})},p=function(e){return"[object Array]"===Object.prototype.toString.call(e)}
isASingleton=function(e){return-1!="|base|br|col|command|embed|hr|img|input|link|meta|param|source".indexOf("|"+e+"|")},xCreateElement=function(a,r,n,i){if(1!=r.nodeType)return r
var s=r.style,l=r.tagName.toLowerCase()
if("style"==l&&(n.content||n.text||n.css)){var c=n.css||n.content||n.text
if(r.styleSheet)r.styleSheet.cssText=c
else{var o=r.cloneNode(!0),d=t.createElement("head")
d.appendChild(o),o.styleSheet?(o.styleSheet.cssText=c,r=o.parentNode.removeChild(o)):r.appendChild(t.createTextNode(c))}}else if("script"==l&&(n.script||n.content||n.text))r.text=n.script||n.content||n.text
else if(!n.html&&!n.content||isASingleton(l))if(n.text&&!isASingleton(l))try{r.appendChild(t.createTextNode(n.text))}catch(f){}else!n.content||"input"!=l&&"textarea"!=l||(n.defaultValue=n.value||content)
else try{if("tr"==l&&r.outerHTML){var u=t.createElement("div")
for(u.innerHTML="<table><tbody><tr>"+(n.html||n.content)+"</tr></tbody></table>",u=u.getElementsByTagName("tr")[0];u.firstChild;)r.appendChild(u.firstChild)}else r.innerHTML=n.html||n.content,"pre"==l&&(r.innerHTML=r.innerHTML)}catch(f){try{var u=t.createElement("div")
for(u.innerHTML=n.html||n.content;u.firstChild;)r.appendChild(u.firstChild)}catch(f){}}if(n.style||n.cssText||n.css&&"style"!=l){var c=n.style||n.cssText||n.css
r.setAttribute("style",c),s.cssText=c}if(n.value&&("input"==l||"textarea"==l?r.defaultValue=n.value:"option"==l&&(r.value=n.value)),n.title&&(r.title=n.title),n.src||n.href){var h=t.createElement("a")
h.href=n.src||n.href,n.src?h.src=h.href:h.href=h.href}if(n.on){var m=n.on,g=m.constructor.prototype,v=m.hasOwnProperty
for(var y in m)if(v&&v.call(m,y)||g[y]!==m[y])if(n.jQuery&&(typeof n.jQuery==typeof Function()||e.jQuery)){var C=n.jQuery=typeof n.jQuery==typeof Function()?n.jQuery:e.jQuery
C.on(y,m[y])}else r.addEventListener?r.addEventListener(y,m[y],!1):r.attachEvent&&r.attachEvent("on"+event,function(e,t){return function(){e.call(t)}}(m[y],r))}if(n.attr){var T=n.attr,g=T.constructor.prototype,v=T.hasOwnProperty
for(var y in T)(v&&v.call(T,y)||g[y]!==T[y])&&(i||"input"==l&&"name"==y.toLowerCase()||setAttribute(r,y,T[y]))}if(n.childNodes)for(var x,b=n.childNodes,b=p(b)?b:[b],y=0,A=b.length;A>y;y++)if(x=b[y],p(x)?x=DOMBuilder(x[0],x[1]):""+x===x&&(x=DOMBuilder(x)),"table"==l&&n.tableBeautifier!==!1&&0!==n.tableBeautifier){var O=r.firstChild,N=x.tagName
if(-1!="|TBODY|THEAD|TFOOT|".indexOf("|"+N+"|")||8==x.nodeType)r.appendChild(x)
else if("COLGROUP"==N||"CAPTION"==N)r.insertBefore(x,O)
else if(O&&-1!="|TBODY|THEAD|TFOOT|".indexOf("|"+O.tagName+"|")||(O=r.appendChild(t.createElement("tbody"))),"TR"==N)O.appendChild(x)
else{var E=O.firstChild
if(E&&"TR"==E.tagname||(E=O.appendChild(t.createElement("tr"))),"TD"==N||"TH"==N)E.appendChild(x)
else{var L=E.firstChild
L&&"TD"==L.tagName&&"TH"==L.tagName||(L=E.appendChild(t.createElement("td"))),L.appendChild(x)}}}else r.appendChild(x)
if(n.documentFragment||n.fragment){var S=t.createDocumentFragment()
return S.appendChild(r),S}return r},setAttribute=function(e,t,a){if(t=f(t.toLowerCase()),/^data-/.test(t))e.dataset?e.dataset[u(t.substring(5))]=a:e.setAttribute(t,a)
else if(/^on/.test(t)){e.setAttribute(t,a)
try{e[t]=Function(a)}catch(r){}}else if(-1!="|style|class|classname|type|for|htmlfor|".indexOf("|"+t+"|"))switch(t){case"style":e.setAttribute(t,a),e.style.cssText=a
break
case"class":case"classname":if(e.classList)for(var n=a.split(/\s+/g),i=0;i<n.length;i++)e.classList.add(n[i])
else e.className=a
case"type":e.type=a
break
case"for":case"htmlfor":e.htmlFor=a
break
default:e.setAttribute(t,a,0)}else if(-1!=o.indexOf("|"+t+"|"))for(var s,l,i=0;i<c.length;i++){var s=c[i],l=s.toLowerCase()
l==t&&(e[s]=a)}else e.setAttribute(t,a,0)},DOMBuilder=function(e,c){e=f(e||"")
var o=null
if(!e)return null
l.lastIndex=0
var d=l.exec(e),u=e.charAt(0)
if(d&&d[1]){var p=t.createComment("")
p.nodeValue=d[1]}else if('"'!=u&&"'"!=u||e.charAt(e.length-1)!=u){var h=a.exec(e)||"div",p=t.createElement(h[0]),m=!1
if("input"==(""+h).toLowerCase()){var g,v=c&&c.attr?c.attr.name||c.attr.NAME:!1
if(!v){for(n.lastIndex=0;o=n.exec(e);)v=o[1]
v&&(v=f(v),g=v.charAt(0),"'"!=g&&'"'!=g||v.charAt(v.length-1)!=g||(v=v.substring(1,v.length-1)))}if(v)try{if(p=t.createElement('<input name = "'+v+'" >'),m=!0,"INPUT"!=p.tagName)throw 0}catch(y){p=t.createElement("input"),p.name=v}}for(;o=r.exec(e);)if(o[1]){var C=o[1].substring(1)
p.classList?p.classList.add(C):p.className?p.className+=" "+C:p.className=C}else if(o[2])p.id=o[2].substring(1)
else if(o[3]){var T=i.exec(o[3])
T&&T[1]&&(T=T[1],setAttribute(p,T,T))}else if(o[4]){s.lastIndex=0
var x=s.exec(o[4]),T=(x[1]?"data-":"")+x[2],b=x[3],A=b.charAt(0),O=b.charAt(b.length-1)
"'"!=A&&'"'!=A||A!==O||(b=b.substring(1,b.length-1)),m||"name"==T.toLowerCase()&&"INPUT"==p.tagName||setAttribute(p,T,b)}}else var p=t.createTextNode(e.substring(1,e.length-1))
return c&&""+c===c&&(c={content:c}),c&&xCreateElement&&(p=xCreateElement(e,p,c,m)),p},e.DOMBuilder=DOMBuilder}(window)
