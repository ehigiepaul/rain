module.exports = function (regex, string, call) {
    var i = string.replace(regex, call);
    return i.replace(/\W/gi, " ").trim();
}

module.exports.ns = function (regex, string, call) {
    var i = string.replace(regex, call);
    var b = i.replace(/\W/gi, " ");
    return b.replace(/\s+$/gi, "").trim();
}