(function(e){var t=e.document,r=/^[a-z]+/i,n=/([.]{1}[^\[#.]+)|(#{1}[^\[#.]+)|(\[[ ]*[a-z_-]+[ ]*\])|(\[[ ]*[a-z_-]+[ ]*=[^\]]+\])/gi,a=/^\[[ ]?([\s\S]*)[ ]?\]$/i,s=/\[[ ]*([a-z_-]+)[ ]*=[ ]*([^\]]+)/gi,i=/^<--([\S\s]*)-->$/gi,c=["httpEquiv","aLink","bgColor","vLink","acceptCharset","tabIndex","accessKey","readOnly","useMap","dateTime","isMap","codeBase","codeType","noHref","cellPadding","cellSpacing","chOff","vAlign","colSpan","noWrap","rowSpan","frameBorder","longDesc","marginHeight","marginWidth","noResize"],l="|"+c.join("|")+"|"
trimPrototype=String.prototype.trim,trim=function(e){trimPrototype&&trimPrototype.call(e)
for(var e=e.replace(/^\s\s*/,""),t=/\s/,r=e.length;t.test(e.charAt(--r)););return e.slice(0,r+1)},camelize=function(e){return e.replace(/(\-[a-z])/g,function(e){return e.toUpperCase().replace("-","")})},isASingleton=function(e){return"|base|br|col|command|embed|hr|img|input|link|meta|param|source".indexOf("|"+e+"|")!=-1},xCreateElement=function(r,n,a){if(n.nodeType!=1)return n
var s=n.style,i=n.tagName.toLowerCase()
if("style"==i&&(a.innerHTML||a.innerText||a.css)){var c=a.css||a.innerText||a.innerHTML
n.styleSheet?n.styleSheet.cssText=c:n.appendChild(t.createTextNode(c))}else if("script"==i&&(a.innerHTML||a.innerText))n.text=a.innerText||a.innerHTML
else{if(a.innerHTML&&!isASingleton(i))try{n.innerHTML=a.innerHTML}catch(l){}if(a.innerText&&!isASingleton(i)){var o=a.innerText
try{n.innerText=o,n.textContent=o,s.content=o}catch(l){}}}if(a.style||a.cssText||a.css&&"style"!=i){var c=a.style||a.cssText||a.css
n.setAttribute("style",c),s.cssText=c}if(a.on){var u=a.on,f=u.constructor.prototype,d=u.hasOwnProperty
for(var p in u)if(d&&d.call(u,p)||f[p]!==u[p])if(a.jQuery&&(typeof a.jQuery==typeof Function()||e.jQuery)){var m=a.jQuery=typeof a.jQuery==typeof Function()?a.jQuery:e.jQuery
m.on(p,u[p])}else n.addEventListener?n.addEventListener(p,u[p],!1):n.attachEvent&&n.attachEvent("on"+event,function(e,t){return function(){e.call(t)}}(u[p],n))}if(a.attr){var y=a.attr,f=y.constructor.prototype,d=y.hasOwnProperty
for(var p in y)(d&&d.call(y,p)||f[p]!==y[p])&&setAttribute(n,p,y[p])}if(a.childNodes)for(var h,g=a.childNodes,p=0,v=g.length;v>p;p++)h=g[p],""+h===h&&(h=DOMBuilder(h)),n.appendChild(h)
if(a.documentFragment||a.fragment){var x=t.createDocumentFragment()
return x.appendChild(n),x}return n},setAttribute=function(e,t,r){if(t=trim(t.toLowerCase()),/^data-/.test(t))e.dataset?e.dataset[camelize(t.substring(5))]=r:e.setAttribute(t,r)
else if("|style|class|classname|type|for|htmlfor|".indexOf("|"+t+"|")!=-1)switch(t){case"style":e.setAttribute(t,r),e.style.cssText=r
break
case"class":case"classname":if(e.classList)for(var n=r.split(/\s+/g),a=0;a<n.length;a++)e.classList.add(n[a])
else e.className=r
case"type":e.type=r
break
case"for":case"htmlfor":e.htmlFor=r
break
default:e.setAttribute(t,r,0)}else if(l.indexOf("|"+t+"|")!=-1)for(var s,i,a=0;a<c.length;a++)s=c[a],i=s.toLowerCase(),i==t&&(e[s]=r)
else e.setAttribute(t,r,0)},DOMBuilder=function(e,c){e=trim(e||"")
var l=null
if(!e)return null
var o=i.exec(e),u=e.charAt(0)
if(o&&o[1]){var f=t.createComment("")
f.nodeValue=o[1]}else if('"'!=u&&"'"!=u||e.charAt(e.length-1)!=u){for(var d=r.exec(e)||"div",f=t.createElement(d[0]);l=n.exec(e);)if(l[1]){var p=l[1].substring(1)
f.classList?f.classList.add(p):f.className?f.className+=" "+p:f.className=p}else if(l[2])f.id=l[2].substring(1)
else if(l[3]){var m=a.exec(l[3])
m&&m[1]&&(m=m[1],setAttribute(f,m,m))}else if(l[4]){s.lastIndex=0
var y=s.exec(l[4]),m=y[1],h=y[2],g=h.charAt(0),v=h.charAt(h.length-1)
"'"!=g&&'"'!=g||g!==v||(h=h.substring(1,h.length-1)),setAttribute(f,m,h)}}else var f=t.createTextNode(e.substring(1,e.length-1))
return c&&""+c===c&&(c={innerHTML:c}),c&&xCreateElement&&(f=xCreateElement(e,f,c)),f},e.DOMBuilder=DOMBuilder})(window)
