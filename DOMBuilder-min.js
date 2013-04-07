(function(e){var t=e.document,r=/^[a-z]+/i,n=/([.]{1}[^\[#.]+)|(#{1}[^\[#.]+)|(\[[ ]*[a-z_-]+[ ]*\])|(\[[ ]*[a-z_-]+[ ]*=[^\]]+\])/gi,a=/^\[[ ]?([\s\S]*)[ ]?\]$/i,s=/\[[ ]*([a-z_-]+)[ ]*=[ ]*([^\]]+)/gi,i=/^<--([\S\s]*)-->$/gi,c=["httpEquiv","aLink","bgColor","vLink","acceptCharset","tabIndex","accessKey","readOnly","useMap","dateTime","isMap","codeBase","codeType","noHref","cellPadding","cellSpacing","chOff","vAlign","colSpan","noWrap","rowSpan","frameBorder","longDesc","marginHeight","marginWidth","noResize"],l="|"+c.join("|")+"|",o=String.prototype.trim,f=function(e){o&&o.call(e)
for(var e=e.replace(/^\s\s*/,""),t=/\s/,r=e.length;t.test(e.charAt(--r)););return e.slice(0,r+1)},u=function(e){return e.replace(/(\-[a-z])/g,function(e){return e.toUpperCase().replace("-","")})},d=function(e){return"|base|br|col|command|embed|hr|img|input|link|meta|param|source".indexOf("|"+e+"|")!=-1},p=function(r,n,a){if(n.nodeType!=1)return n
var s=n.style,i=n.tagName.toLowerCase()
if("style"==i&&(a.innerHTML||a.innerText||a.css)){var c=a.css||a.innerText||a.innerHTML
n.styleSheet?n.styleSheet.cssText=c:n.appendChild(t.createTextNode(c))}else if("script"==i&&(a.innerHTML||a.innerText))n.text=a.innerText||a.innerHTML
else{if(a.innerHTML&&!d(i))try{n.innerHTML=a.innerHTML}catch(l){}if(a.innerText&&!d(i)){var o=a.innerText
try{n.innerText=o,n.textContent=o,s.content=o}catch(l){}}}if(a.style||a.cssText||a.css&&"style"!=i){var c=a.style||a.cssText||a.css
n.setAttribute("style",c),s.cssText=c}if(a.on){var f=a.on,u=f.constructor.prototype,p=f.hasOwnProperty
for(var g in f)if(p&&p.call(f,g)||u[g]!==f[g])if(a.jQuery&&(typeof a.jQuery==typeof Function()||e.jQuery)){var v=a.jQuery=typeof a.jQuery==typeof Function()?a.jQuery:e.jQuery
v.on(g,f[g])}else n.addEventListener?n.addEventListener(g,f[g],!1):n.attachEvent&&n.attachEvent("on"+event,function(e,t){return function(){e.call(t)}}(f[g],n))}if(a.attr){var m=a.attr,u=m.constructor.prototype,p=m.hasOwnProperty
for(var g in m)(p&&p.call(m,g)||u[g]!==m[g])&&h(n,g,m[g])}if(a.childNodes)for(var x,T=a.childNodes,g=0,L=T.length;L>g;g++)x=T[g],""+x===x&&(x=y(x)),n.appendChild(x)
if(a.documentFragment||a.fragment){var b=t.createDocumentFragment()
return b.appendChild(n),b}return n},h=function(e,t,r){if(t=f(t.toLowerCase()),/^data-/.test(t))e.dataset?e.dataset[u(t.substring(5))]=r:e.setAttribute(t,r)
else if("|style|class|classname|type|for|htmlfor|".indexOf("|"+t+"|")!=-1)switch(t){case"style":e.setAttribute(t,r),e.style.cssText=r
break
case"class":case"classname":if(e.classList)for(var n=r.split(/\s+/g),a=0;a<n.length;a++)e.classList.add(n[a])
else e.className=r
case"type":e.type=r
break
case"for":case"htmlfor":e.htmlFor=r
break
default:e.setAttribute(t,r,0)}else if(l.indexOf("|"+t+"|")!=-1)for(var s,i,a=0;a<c.length;a++)s=c[a],i=s.toLowerCase(),i==t&&(e[s]=r)
else e.setAttribute(t,r,0)},y=function(e,c){e=f(e||"")
var l=null
if(!e)return null
var o=i.exec(e),u=e.charAt(0)
if(o&&o[1]){var d=t.createComment("")
d.nodeValue=o[1]}else if('"'!=u&&"'"!=u||e.charAt(e.length-1)!=u){for(var y=r.exec(e)||"div",d=t.createElement(y[0]);l=n.exec(e);)if(l[1]){var g=l[1].substring(1)
d.classList?d.classList.add(g):d.className?d.className+=" "+g:d.className=g}else if(l[2])d.id=l[2].substring(1)
else if(l[3]){var v=a.exec(l[3])
v&&v[1]&&(v=v[1],h(d,v,v))}else if(l[4]){s.lastIndex=0
var m=s.exec(l[4]),v=m[1],x=m[2],T=x.charAt(0),L=x.charAt(x.length-1)
"'"!=T&&'"'!=T||T!==L||(x=x.substring(1,x.length-1)),h(d,v,x)}}else var d=t.createTextNode(e.substring(1,e.length-1))
return c&&""+c===c&&(c={innerHTML:c}),c&&p&&(d=p(e,d,c)),d}
e.DOMBuilder=y})(window)