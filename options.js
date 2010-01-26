function $(id) { return document.getElementById(id); }
function lines(s) { return s ? s.split('\n') : []; }

function init() {
    $('whitelist').value = config.get('whitelist').join('\n');
}

function save() {
    config.set('whitelist', lines($('whitelist').value));
}
