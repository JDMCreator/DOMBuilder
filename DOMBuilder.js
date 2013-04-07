function (window, undefined) {
    var document = window.document,
        regexp_tagname = /^[a-z]+/i,
        regexp_arguments = /([.]{1}[^\[#.]+)|(#{1}[^\[#.]+)|(\[[ ]*[a-z_-]+[ ]*\])|(\[[ ]*[a-z_-]+[ ]*=[^\]]+\])/gi,
        regexp_attributes_empty = /^\[[ ]?([\s\S]*)[ ]?\]$/i,
        regexp_attributes = /\[[ ]*([a-z_-]+)[ ]*=[ ]*([^\]]+)/gi,
        regexp_comment = /^<--([\S\s]*)-->$/gi,

        /* Attributes that need to be escaped for IE6 */
        wrong_attributes = ["httpEquiv", "aLink", "bgColor", "vLink", "acceptCharset", "tabIndex", "accessKey", "readOnly",
                "useMap", "dateTime", "isMap", "codeBase", "codeType", "noHref", "cellPadding", "cellSpacing",
                "chOff", "vAlign", "colSpan", "noWrap", "rowSpan", "frameBorder", "longDesc", "marginHeight",
                "marginWidth", "noResize"
        ],
        wrong_attributes_list = "|" + wrong_attributes.join("|") + "|";

    trimPrototype = String.prototype.trim,
    trim = function trim(str) {
        if (trimPrototype) {
            trimPrototype.call(str);
        }
        var str = str.replace(/^\s\s*/, ''),
            ws = /\s/,
            i = str.length;
        while (ws.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    },
    camelize = function (str) {
        return str.replace(/(\-[a-z])/g, function ($1) {
            return $1.toUpperCase().replace('-', '');
        });
    },
    isASingleton = function isASingleton(tag) {
        return "|base|br|col|command|embed|hr|img|input|link|meta|param|source".indexOf("|" + tag + "|") != -1;
    },
    xCreateElement = function xCreateElement(selector, element, options) {
        if (element.nodeType != 1) {
            return element;
        }
        var style = element.style,
            tagname = element.tagName.toLowerCase();
        if (tagname == "style" && (options.innerHTML || options.innerText || options.css)) {
            var css = options.css || options.innerText || options.innerHTML;
            if (element.styleSheet) {
                element.styleSheet.cssText = css;
            }
            else {
                element.appendChild(document.createTextNode(css));
            }
        }
        else if (tagname == "script" && (options.innerHTML || options.innerText)) {
            element.text = options.innerText || options.innerHTML;
        }
        else {
            if (options.innerHTML && !isASingleton(tagname)) {
                try {
                    element.innerHTML = options.innerHTML
                }
                catch (e) {}
            }
            if (options.innerText && !isASingleton(tagname)) {
                var innerText = options.innerText;
                try {
                    element.innerText = innerText;
                    element.textContent = innerText;
                    style.content = innerText
                }
                catch (e) {}
            }
        }
        if (options.style || options.cssText || (options.css && tagname != "style")) {
            var css = options.style || options.cssText || options.css;
            element.setAttribute("style", css);
            style.cssText = css;
        }
        if (options.on) {
            var on = options.on,
                proto = on.constructor.prototype,
                hasOwnProperty = on.hasOwnProperty;
            for (var i in on) {
                if ((hasOwnProperty && hasOwnProperty.call(on, i)) || proto[i] !== on[i]) {
                    if (options.jQuery && ((typeof options.jQuery == typeof Function()) || window.jQuery)) {
                        var jQuery = options.jQuery = (typeof options.jQuery == typeof Function()) ? options.jQuery : window.jQuery;
                        jQuery.on(i, on[i]);
                    }
                    else if (element.addEventListener) {
                        element.addEventListener(i, on[i], false)
                    }
                    else if (element.attachEvent) {
                        element.attachEvent("on" + event, (function (callback, element) {
                            return function () {
                                callback.call(element)
                            }
                        })(on[i], element))
                    }
                }
            }
        }
        if (options.attr) {
            var attr = options.attr,
                proto = attr.constructor.prototype,
                hasOwnProperty = attr.hasOwnProperty;
            for (var i in attr) {
                if ((hasOwnProperty && hasOwnProperty.call(attr, i)) || proto[i] !== attr[i]) {
                    setAttribute(element, i, attr[i]);
                }
            }
        }
        if (options.childNodes) {
            for (var c = options.childNodes, i = 0, l = c.length, child; i < l; i++) {
                child = c[i];
                if (child.toString() === child) {
                    child = DOMBuilder(child);
                }
                element.appendChild(child);
            }
        }
        if (options.documentFragment || options.fragment) {
            var documentFragment = document.createDocumentFragment();
            documentFragment.appendChild(element);
            return documentFragment
        }
        return element
    },
    setAttribute = function (element, name, value) {
        name = trim(name.toLowerCase());
        if (/^data-/.test(name)) {
            if (element.dataset) {
                element.dataset[camelize(name.substring(5))] = value;
            }
            else {
                element.setAttribute(name, value);
            }
        }
        else if ("|style|class|classname|type|for|htmlfor|".indexOf("|" + name + "|") != -1) {
            switch (name) {
                case "style":
                    element.setAttribute(name, value);
                    element.style.cssText = value;
                    break;
                case "class":
                case "classname":
                    if (element.classList) {
                        var classname = value.split(/\s+/g);
                        for (var i = 0; i < classname.length; i++) {
                            element.classList.add(classname[i]);
                        }
                    }
                    else {
                        element.className = value;
                    }
                case "type":
                    element.type = value;
                    break;
                case "for":
                case "htmlfor":
                    element.htmlFor = value;
                    break;
                default:
                    element.setAttribute(name, value, 0);
            }
        }
        else if (wrong_attributes_list.indexOf("|" + name + "|") != -1) {
            for (var i = 0, n, ni; i < wrong_attributes.length; i++) {
                n = wrong_attributes[i],
                ni = n.toLowerCase();
                if (ni == name) {
                    element[n] = value;
                }
            }
        }
        else {
            element.setAttribute(name, value, 0);
        }
    },
    DOMBuilder = function createElement(selector, options) {
        selector = trim(selector || "");
        var match = null;
        if (!selector) {
            return null
        }
        var comment = regexp_comment.exec(selector),
            selector_first_char = selector.charAt(0);
        if (comment && comment[1]) {
            /* Process comments */
            var element = document.createComment("");
            element.nodeValue = comment[1];
        }
        else if ((selector_first_char == '"' || selector_first_char == "'") && selector.charAt(selector.length - 1) == selector_first_char) {
            /* Process Text Node */
            var element = document.createTextNode(selector.substring(1, selector.length - 1));
        }
        else {
            /* Process HTML Elements */
            var tagname = regexp_tagname.exec(selector) || "div",
                element = document.createElement(tagname[0]);
            while (match = regexp_arguments.exec(selector)) {
                if (match[1]) {
                    var classname = match[1].substring(1);
                    if (element.classList) {
                        element.classList.add(classname);
                    }
                    else if (!element.className) {
                        element.className = classname
                    }
                    else {
                        element.className += " " + classname
                    }
                }
                else if (match[2]) {
                    element.id = match[2].substring(1)
                }
                else if (match[3]) {
                    var attribute_name = regexp_attributes_empty.exec(match[3]);
                    if (attribute_name && attribute_name[1]) {
                        attribute_name = attribute_name[1];
                        setAttribute(element, attribute_name, attribute_name)
                    }
                }
                else if (match[4]) {
                    regexp_attributes.lastIndex = 0;
                    var attribute = regexp_attributes.exec(match[4]);
                    var attribute_name = attribute[1],
                        attribute_value = attribute[2],
                        attribute_value_first_char = attribute_value.charAt(0),
                        attribute_value_last_char = attribute_value.charAt(attribute_value.length - 1);
                    if ((attribute_value_first_char == "'" || attribute_value_first_char == '"') && attribute_value_first_char === attribute_value_last_char) {
                        attribute_value = attribute_value.substring(1, attribute_value.length - 1)
                    }
                    setAttribute(element, attribute_name, attribute_value);
                }
            }
        }
        if (options && options.toString() === options) {
            options = {
                innerHTML: options
            }
        }
        if (options && xCreateElement) {
            element = xCreateElement(selector, element, options)
        }
        return element
    }
    window.DOMBuilder = DOMBuilder;
})(window);