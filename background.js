config.defaults({
    whitelist: []
});

function isWhitelisted(url) {
    return config.get('whitelist').some(function(pat) {
        return RegExp(pat).test(url);
    });
}

chrome.extension.onRequest.addListener(function(msg, src, send) {
    send(!isWhitelisted(msg.url))
});
