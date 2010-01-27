config.defaults({
    whitelist: ['^https?://chrome\\.google\\.com/extensions']
});

function isWhitelisted(url) {
    return config.get('whitelist').some(function(pat) {
        return RegExp(pat).test(url);
    });
}

chrome.extension.onRequest.addListener(function(msg, src, send) {
    if (!isWhitelisted(msg.url))
        send(null);
});
