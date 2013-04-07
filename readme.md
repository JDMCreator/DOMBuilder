DOMBuilder
=============

__Wait for more infos !__

How to use :
-------------

```js
var element = DOMBuilder("input#id.myClass[type=checkbox][checked]");
```

is the same as :

```js
var element = document.createElement("input");
element.id = "id";
element.className = "myClass";
element.type = "checkbox";
element.checked = "checked";
```


with options :

```js
DOMBuilder("input#id.myClass[type=checkbox][checked]", {
	on : {
		click : function(){
			this.style.background = "red";
		}
	     }
});
```

DOMBuilder aims to support IE6+, FF3+, Safari 3+, Chrome 2+ and Opera 9+. If some features don't work, it's a bug.