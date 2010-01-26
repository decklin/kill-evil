function emap(e,f) { for (var i=0; i<e.length; i++) f(e[i]); }

function sanitizeAll(e) {
    sanitize(e);
    emap(e.getElementsByTagName('*'), sanitize);
}

function sanitize(e) {
    e.oncontextmenu = null;
    e.onpaste = null;
    e.onselectstart = null;
    e.onmousedown = null;
    if (e.nodeName == 'A')
        e.removeAttribute('target');
}

if (document.documentElement instanceof HTMLHtmlElement) {
    chrome.extension.sendRequest({url: location.href}, function() {
        sanitizeAll(document.documentElement);
        document.addEventListener('DOMNodeInserted', function(ev) {
            if (ev.srcElement.nodeType == 1)
                sanitizeAll(ev.srcElement);
        });
    });
}
