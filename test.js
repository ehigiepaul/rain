function me() {
    var a = 6;
    var b = 8;
    var c = a * b;
    (() => {
        return d = c
    })()
    return d
}

var call = me()

console.log(call)