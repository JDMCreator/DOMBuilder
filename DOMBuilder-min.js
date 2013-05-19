!function(e){var t=e.document,a=/^[a-z]+/i,r=/([.]{1}[^\[#.]+)|(#{1}[^\[#.]+)|(\[[ ]*[a-z_-]+[ ]*\])|(\[[ ]*[a-z_-]+[ ]*=[^\]]+\])/gi,n=/\[\s*name\s*=([^\]]+)\]/gi,i=/^\[[ ]?([\s\S]*)[ ]?\]$/i,s=/\[[ ]*([a-z_-]+)[ ]*=[ ]*([^\]]+)/gi,l=/^<!--([\S\s]*)-->$/gi,c=["httpEquiv","allowTransparency","aLink","bgColor","vLink","acceptCharset","tabIndex","accessKey","readOnly","useMap","dateTime","isMap","codeBase","codeType","noHref","cellPadding","cellSpacing","chOff","vAlign","colSpan","noWrap","rowSpan","frameBorder","longDesc","marginHeight","marginWidth","noResize","noShade","hSpace","vSpace"],o="|"+c.join("|").toLowerCase()+"|",d=String.prototype.trim,f=function(e){d&&d.call(e)
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
r.setAttribute("style",c),s.cssText=c}if(n.value&&("input"==l||"textarea"==l?r.defaultValue=n.value:"option"==l&&(r.value=n.value)),n.on){var h=n.on,m=h.constructor.prototype,g=h.hasOwnProperty
for(var y in h)if(g&&g.call(h,y)||m[y]!==h[y])if(n.jQuery&&(typeof n.jQuery==typeof Function()||e.jQuery)){var v=n.jQuery=typeof n.jQuery==typeof Function()?n.jQuery:e.jQuery
v.on(y,h[y])}else r.addEventListener?r.addEventListener(y,h[y],!1):r.attachEvent&&r.attachEvent("on"+event,function(e,t){return function(){e.call(t)}}(h[y],r))}if(n.attr){var C=n.attr,m=C.constructor.prototype,g=C.hasOwnProperty
for(var y in C)(g&&g.call(C,y)||m[y]!==C[y])&&(i||"input"==l&&"name"==y.toLowerCase()||setAttribute(r,y,C[y]))}if(n.childNodes)for(var x,T=n.childNodes,T=p(T)?T:[T],y=0,b=T.length;b>y;y++)if(x=T[y],p(x)?x=DOMBuilder(x[0],x[1]):""+x===x&&(x=DOMBuilder(x)),"table"==l&&n.tableBeautifier!==!1&&0!==n.tableBeautifier){var A=r.firstChild,O=x.tagName
if(-1!="|TBODY|THEAD|TFOOT|".indexOf("|"+O+"|")||8==x.nodeType)r.appendChild(x)
else if("COLGROUP"==O||"CAPTION"==O)r.insertBefore(x,A)
else if(A&&-1!="|TBODY|THEAD|TFOOT|".indexOf("|"+A.tagName+"|")||(A=r.appendChild(t.createElement("tbody"))),"tr"==O)A.appendChild(x)
else{var N=A.firstChild
if(N&&"TR"==N.tagname||(N=A.appendChild(t.createElement("tr"))),"td"==O||"th"==O)N.appendChild(x)
else{var E=N.firstChild
E&&"TD"==E.tagName&&"TH"==E.tagName||(E=N.appendChild(t.createElement("td"))),E.appendChild(x)}}}else r.appendChild(x)
if(n.documentFragment||n.fragment){var L=t.createDocumentFragment()
return L.appendChild(r),L}return r},setAttribute=function(e,t,a){if(t=f(t.toLowerCase()),/^data-/.test(t))e.dataset?e.dataset[u(t.substring(5))]=a:e.setAttribute(t,a)
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
if("input"==(""+h).toLowerCase()){var g,y=c&&c.attr?c.attr.name||c.attr.NAME:!1
if(!y){for(n.lastIndex=0;o=n.exec(e);)y=o[1]
y&&(y=f(y),g=y.charAt(0),"'"!=g&&'"'!=g||y.charAt(y.length-1)!=g||(y=y.substring(1,y.length-1)))}if(y){try{p=t.createElement('<input name = "'+y+'" >'),m=!0}catch(v){p=t.createElement("input"),p.name=y}"INPUT"!=p.tagName&&(p=t.createElement("input"),p.name=y)}}for(;o=r.exec(e);)if(o[1]){var C=o[1].substring(1)
p.classList?p.classList.add(C):p.className?p.className+=" "+C:p.className=C}else if(o[2])p.id=o[2].substring(1)
else if(o[3]){var x=i.exec(o[3])
x&&x[1]&&(x=x[1],setAttribute(p,x,x))}else if(o[4]){s.lastIndex=0
var T=s.exec(o[4]),x=T[1],b=T[2],A=b.charAt(0),O=b.charAt(b.length-1)
"'"!=A&&'"'!=A||A!==O||(b=b.substring(1,b.length-1)),m||"name"==x.toLowerCase()&&"INPUT"==p.tagName||setAttribute(p,x,b)}}else var p=t.createTextNode(e.substring(1,e.length-1))
return c&&""+c===c&&(c={content:c}),c&&xCreateElement&&(p=xCreateElement(e,p,c,m)),p},e.DOMBuilder=DOMBuilder}(window)
