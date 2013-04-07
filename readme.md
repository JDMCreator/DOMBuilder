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

Create a comment :
```js
DOMBuilder("<!--comment-->");
```

Create a Text Node :

```js
DOMBuilder('"my text"');
```

*You don't need to escape the quotes marks.*

When you create an HTML element, you can use the optional second argument, which is an option object.

List of properties of the optional object
----------------------------------------

**attr** : ```Object``` of attributes. Example :

```js
DOMBuilder("label", {
        attr : {
            "title" : "my title",
            "for" : "myelement",
            "id" : "myid",
            "class" : "myclassname"
        }
});
```

*If you don't want to quote the attributes' name, you must use __className__ for the CLASS attribute and __htmlFor__ for the FOR attribute*

**childNodes** : An ```Array``` of the child nodes of the element. The elements of the array can be an ```HTMLElement Object``` or a ```String```. If it's a String, the ```DOMBuilder``` function will be called and the String will be the first argument. Example :

```js
DOMBuilder("div#myDiv", {
        childNodes : [
            document.createElement("span"),
            "<!--a comment-->", // This will create a comment
            "'Commedia dell'arte'", // This will create a Text Node (DON'T ESCAPE THE APOSTROPHE)
            "img[src=myimage.jpeg]", // This will create an image
            DOMBuilder("img[src=myimage.jpeg]") // This is the same
        ]
});
```

The HTML code of the element that is generated should look like this :

```html
<div id="myDiv"><span></span><!--a comment-->Commedia dell'arte<img src="myimage.jpeg"><img src="myimage.jpeg"></div>
```

**css** : For all element, except STYLE, see **style**. For STYLE HTML elements, the content of the element.

**cssText** : See **style**.

**documentFragment** : Embed the element in a document fragment

**fragment** : See **documentFragment**

**innerHTML** : The innerHTML of the element. Works for all element (including SCRIPT and STYLE) excepts for singleton tag (BR, HR, INPUT, META, ...) and TEXTAREA.

**innerText** : The text of the Text Node that will be the only child node of the element

**jQuery** : The jQuery function. If specified, we'll use the ".on()" jQuery function to append the events. Example :

```js
DOMBuilder("label", {
        jQuery : window.jQuery
});
```

**on** : Object of events listeners. Example :

```js
DOMBuilder("div", {
        on: {
            mouseover : function(){
                            this.style.background = "green";
                        },
            mouseout : function(){
                            this.style.background = "red";
                        }
        }
});
```

**style** : STYLE attribute of the element. Example :

```js
DOMBuilder("div", {
        style : "font-weight:bold;"
});
```

