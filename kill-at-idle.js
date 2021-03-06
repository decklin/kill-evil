function absolve(elt) {
    elt.oncontextmenu = null;
    elt.onselectstart = null;
    elt.onmousedown = null;
    elt.oncut = null;
    elt.oncopy = null;
    elt.onpaste = null;
    if (elt.nodeName === 'A' && window.location === top.location)
        elt.removeAttribute('target');
}

function absolveAll(elt) {
    absolve(elt);
    var descendents = elt.getElementsByTagName('*');
    for (var i = 0; i < descendents.length; i++)
        absolve(descendents[i]);
}

function absolveDocument() {
    absolve(window);
    absolve(document);
    absolveAll(document.documentElement);
    document.addEventListener('DOMNodeInserted', function(ev) {
        if (ev.srcElement.nodeType === 1)
            absolveAll(ev.srcElement);
    });
}

if (document.documentElement instanceof HTMLHtmlElement) {
    chrome.extension.sendRequest({url: location.href}, function(enabled) {
        if (enabled)
            absolveDocument();
    });
}
