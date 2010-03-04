function inject(f) {
    var script = document.createElement("script");
    script.textContent = "(" + f + ")();";
    document.documentElement.appendChild(script);
}

function avertEvil() {
    inject(function() {
        var affect = function() { return {}; }
        var abjure = function() { }
        document.getSelection = affect;
        window.getSelection = affect;
        window.print = abjure;
        window.moveTo = abjure;
        window.moveBy = abjure;
        window.resizeTo = abjure;
        window.resizeBy = abjure;
    });
}

if (document.documentElement instanceof HTMLHtmlElement) {
    chrome.extension.sendRequest({url: location.href}, function(enabled) {
        if (enabled)
            avertEvil();
    });
}
