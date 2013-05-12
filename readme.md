DOMBuilder
=============

__Version 1.1.2__

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


When you create an HTML node, the optional second argument is an options ``object`` :

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

How to create a comment :
```js
DOMBuilder("<!--comment-->");
```

How to create a Text Node :

```js
DOMBuilder('"my text"');
```

*You don't need to escape the quotes marks.*

How to create an HTML node :

```js
DOMBuilder("input#ID.class[type=checkbox][checked]");
```

The first argument is a CSS selector.

If your second attribute is ```String```, this string will be the value of the **content** attribute.

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

**childNodes** : An ```Array``` of the child nodes of the element. The elements of the array can be an ```HTMLElement Object```, an ```Array``` or a ```String```. If it's a String, the ```DOMBuilder``` function will be called and the String will be the first argument. If it's an Array, it will be the arguments of the ```DOMBuilder``` function.Example :

```js
DOMBuilder("div#myDiv", {
    childNodes: [
        document.createElement("span"),
            "<!--a comment-->", // This will create a comment
        "'Commedia dell'arte'", // This will create a Text Node (DON'T ESCAPE THE APOSTROPHE)
        "img[src=myimage.jpeg]", // This will create an image
        ["img", {
                attr: {
                    src: "myimage.jpeg"
                }
            }
        ] // This is the same
    ]
});
```

The HTML code of the element that is generated should look like this :

```html
<div id="myDiv"><span></span><!--a comment-->Commedia dell'arte<img src="myimage.jpeg"><img src="myimage.jpeg"></div>
```

**content** : ```String```. Same as **value** for &lt;INPUT> and &lt;TEXTAREA>, **script** for &lt;SCRIPT>, **css** for &lt;STYLE> and **html** for other HTML tags.

**css** : ```String```. For all element, except STYLE, see **style**. For STYLE HTML elements, the content of the element.

**cssText** : ```String```. See **style**.

**documentFragment** : ```Boolean```. Embed the element in a document fragment

**fragment** : ```Boolean```. See **documentFragment**

**html** : ```String```. The innerHTML of the element. Works for all element excepts singleton tags (BR, HR, META, ...), SCRIPT (use **script** or **content**), STYLE (use **css** or **content**), INPUT and TEXTAREA (use **value**).

**jQuery** : ```Function``` or ```Boolean```. The jQuery function. If specified, we'll use the ".on()" jQuery function to append the events. Example :

```js
DOMBuilder("label", {
        jQuery : window.jQuery
});
```

**on** : ```Object``` of events listeners. Example :

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

**style** : ```String```. STYLE attribute of the element. Example :

```js
DOMBuilder("div", {
        style : "font-weight:bold;"
});
```

**tableBeautifier** : ```Boolean```. The table beautifier is a functionnality that automatically add TBODY, TR, TD tags in your tables when you have to insert them. You can turn it off with a ``Boolean`` value or ``0``.

```js
DOMBuilder("table", {
    childNodes : ["tbody"],
    tableBeautifier : false
})
```

**text** : ```String```. The text of the Text Node that will be the only child node of the element

```js
DOMBuilder("div", {
    text : "<text>"
})
```

**value** : ```String```. The value of the ``defaultValue`` property of INPUT, OPTION and TEXTAREA elements.