var exec = require('child_process').exec;
// var fm = require('./fm');
var path = require('path');
var extract = (file, newloc) => {
    exec("unrar x -y " + file + ' ' + path.dirname(file), (err, out) => {
        console.log(path.basename(file) + ' extraction completed');
        // fm(file, newloc);
        return 'ok'
    });

}

module.exports = extract;