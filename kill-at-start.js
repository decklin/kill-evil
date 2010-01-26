function inject(func) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + func + ")();";
    document.documentElement.appendChild(script);
}

if (document.documentElement instanceof HTMLHtmlElement) {
    chrome.extension.sendRequest({url: location.href}, function() {
        inject(function() {
            document.getSelection = function() { };
            window.getSelection = function() { };
            window.print = function() { };
            window.moveTo = function() { };
            window.moveBy = function() { };
            window.resizeTo = function() { };
            window.resizeBy = function() { };
        });
    });
}
