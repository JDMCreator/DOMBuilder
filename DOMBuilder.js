/* (c) 2013, JDMCreator | DOMBuilder.js | Version 1.2 */
(function (window, undefined) {
    var document = window.document,
        regexp_tagname = /^[a-z]+/i,
        regexp_arguments = /([.]{1}[^\[#.]+)|(#{1}[^\[#.]+)|(\[[ ]*[a-z_-]+[ ]*\])|(\[[ ]*[a-z_-]+[ ]*=[^\]]+\])/gi,
        regexp_argument_name = /\[\s*name\s*=([^\]]+)\]/gi,
        regexp_attributes_empty = /^\[[ ]?([\s\S]*)[ ]?\]$/i,
        regexp_attributes = /\[[ ]*([a-z_-]+)[ ]*=[ ]*([^\]]+)/gi,
        regexp_comment = /^<!--([\S\s]*)-->$/gi,

        /* Attributes that need to be escaped for IE6-7 */
        wrong_attributes = ["httpEquiv", "allowTransparency", "aLink", "bgColor", "vLink", "acceptCharset", "tabIndex", "accessKey", "readOnly",
                "useMap", "dateTime", "isMap", "codeBase", "codeType", "noHref", "cellPadding", "cellSpacing",
                "chOff", "vAlign", "colSpan", "noWrap", "rowSpan", "frameBorder", "longDesc", "marginHeight",
                "marginWidth", "noResize", "noShade", "hSpace", "vSpace"
        ],
        wrong_attributes_list = "|" + wrong_attributes.join("|").toLowerCase() + "|",

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
        camelize = function camelize(str) {
            return str.replace(/(\-[a-z])/g, function ($1) {
                return $1.toUpperCase().replace('-', '');
            });
        },
        isArray = function isArray(a) {
            return Object.prototype.toString.call(a) === "[object Array]";
        }
    isASingleton = function isASingleton(tag) {
        return "|base|br|col|command|embed|hr|img|input|link|meta|param|source".indexOf("|" + tag + "|") != -1;
    },
    xCreateElement = function xCreateElement(selector, element, options, fixIEBug) {
        if (element.nodeType != 1) {
            return element;
        }
        var style = element.style,
            tagname = element.tagName.toLowerCase();
        if (tagname == "style" && (options.content || options.text || options.css)) {
            var css = options.css || options.content || options.text;
            if (element.styleSheet) {
                element.styleSheet.cssText = css;
            }
            else {
                var copyStyle = element.cloneNode(true),
                    op = document.createElement("head");
                op.appendChild(copyStyle);
                if (copyStyle.styleSheet) {
                    copyStyle.styleSheet.cssText = css;
                    element = copyStyle.parentNode.removeChild(copyStyle);
                }
                else {
                    element.appendChild(document.createTextNode(css));
                }
            }

        }
        else if (tagname == "script" && (options.script || options.content || options.text)) {
            element.text = options.script || options.content || options.text;
        }
        else if ((options.html || options.content) && !isASingleton(tagname)) {
            try {
                if (tagname == "tr" && element.outerHTML) {
                    // Fix a terrible bug where .innerHTML doesn't work for <TR> elements, but no error is throwed
                    var containerElement = document.createElement("div");
                    containerElement.innerHTML = "<table><tbody><tr>" + (options.html || options.content) + "</tr></tbody></table>";
                    containerElement = containerElement.getElementsByTagName("tr")[0];
                    while (containerElement.firstChild) {
                        element.appendChild(containerElement.firstChild);
                    }
                }
                else {
                    element.innerHTML = options.html || options.content;
                    if (tagname == "pre") {
                        // Fix a bug in IE where whitespaces are removed
                        element.innerHTML = element.innerHTML;
                    }
                }
            }
            catch (e) {
                try {
                    // Fix a terrible IE bug where .innerHTML is read-only for some elements
                    var containerElement = document.createElement("div");
                    containerElement.innerHTML = options.html || options.content;
                    while (containerElement.firstChild) {
                        element.appendChild(containerElement.firstChild);
                    }

                }
                catch (e) {}
            }
        }
        else if (options.text && !isASingleton(tagname)) {
            try {
                element.appendChild(document.createTextNode(options.text));
            }
            catch (e) {}
        }
        else if (options.content && (tagname == "input" || tagname == "textarea")) {
            options.defaultValue = options.value || content;
        }
        if (options.style || options.cssText || (options.css && tagname != "style")) {
            var css = options.style || options.cssText || options.css;
            element.setAttribute("style", css);
            style.cssText = css;
        }
        if (options.value) {
            if (tagname == "input" || tagname == "textarea") {
                element.defaultValue = options.value;
            }
            else if (tagname == "option") {
                element.value = options.value;
            }
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
                    if (!fixIEBug && (tagname != "input" || i.toLowerCase() != "name")) {
                        setAttribute(element, i, attr[i]);
                    }
                }
            }
        }
        if (options.childNodes) {
            var c = options.childNodes;
            for (var c = isArray(c) ? c : [c], i = 0, l = c.length, child; i < l; i++) {
                child = c[i];
                if (isArray(child)) {
                    child = DOMBuilder(child[0], child[1]);
                }
                else if (child.toString() === child) {
                    child = DOMBuilder(child);
                }
                if (tagname == "table" && options.tableBeautifier !== false && options.tableBeautifier !== 0) {
                    var tbody = element.firstChild,
                        childTN = child.tagName;
                    if ("|TBODY|THEAD|TFOOT|".indexOf("|" + childTN + "|") != -1 || child.nodeType == 8) {
                        element.appendChild(child);
                    }
                    else if (childTN == "COLGROUP" || childTN == "CAPTION") {
                        element.insertBefore(child, tbody);
                    }
                    else {
                        if (!tbody || "|TBODY|THEAD|TFOOT|".indexOf("|" + tbody.tagName + "|") == -1) {
                            tbody = element.appendChild(document.createElement("tbody"));
                        }
                        if (childTN == "tr") {
                            tbody.appendChild(child);
                        }
                        else {
                            var tr = tbody.firstChild;
                            if (!tr || tr.tagname != "TR") {
                                tr = tbody.appendChild(document.createElement("tr"));
                            }
                            if (childTN == "td" || childTN == "th") {
                                tr.appendChild(child);
                            }
                            else {
                                var td = tr.firstChild;
                                if (!td || td.tagName != "TD" || td.tagName != "TH") {
                                    td = tr.appendChild(document.createElement("td"));
                                }
                                td.appendChild(child);
                            }
                        }
                    }
                }
                else {
                    element.appendChild(child);
                }
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
        else if (/^on/.test(name)) {
            element.setAttribute(name, value);
            // Fix a bug where setting inline events in IE doesn't work
            try {
                element[name] = new Function(value);
            }
            catch (e) {}
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
                var n = wrong_attributes[i],
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
        regexp_comment.lastIndex = 0;
        var comment = regexp_comment.exec(selector),
            selector_first_char = selector.charAt(0);
        if (comment && comment[1]) {
            /* Process comments */
            var element = document.createComment("");
            // Fix a rare bug in FF where the comment can't include "--"
            element.nodeValue = comment[1];
        }
        else if ((selector_first_char == '"' || selector_first_char == "'") && selector.charAt(selector.length - 1) == selector_first_char) {
            /* Process Text Node */
            var element = document.createTextNode(selector.substring(1, selector.length - 1));
        }
        else {
            /* Process HTML Elements */
            var tagname = regexp_tagname.exec(selector) || "div",
                element = document.createElement(tagname[0]),
                fixIEBug = false;
            if (tagname.toString().toLowerCase() == "input") {
                var name = (options && options.attr) ? options.attr["name"] || options.attr["NAME"] : false,
                    name_first_char;
                if (!name) {
                    regexp_argument_name.lastIndex = 0;
                    while (match = regexp_argument_name.exec(selector)) {
                        name = match[1];
                    };
                    if (name) {
                        name = trim(name);
                        name_first_char = name.charAt(0);
                        if ((name_first_char == "'" || name_first_char == '"') && name.charAt(name.length - 1) == name_first_char) {
                            name = name.substring(1, name.length - 1);
                        }
                    }
                }
                if (name) {
                    // Terrible try{} catch{} for IE6-7 bug where "name" attribute for input don't work
                    // more info here : http://webbugtrack.blogspot.ca/2007/10/bug-235-createelement-is-broken-in-ie.html
                    // I'll try to find another way to patch this issue;
                    try {
                        element = document.createElement('<input name = "' + name + '" >');
                        fixIEBug = true;
                    }
                    catch (e) {
                        element = document.createElement('input');
                        element.name = name;
                    }
                    if (element.tagName != "INPUT") {
                        // Another validation in case a future browser is stupid enough to run the first code
                        element = document.createElement('input');
                        element.name = name;
                    }
                }
            }
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
                    if (!fixIEBug && (attribute_name.toLowerCase() != "name" || element.tagName != "INPUT")) {
                        setAttribute(element, attribute_name, attribute_value);
                    }
                }
            }
        }
        if (options && options.toString() === options) {
            options = {
                content: options
            }
        }
        if (options && xCreateElement) {
            element = xCreateElement(selector, element, options, fixIEBug)
        }
        return element
    }
    window.DOMBuilder = DOMBuilder;
})(window);