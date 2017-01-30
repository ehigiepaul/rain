var fs = require('fs');
var path = require('path');
var os = require('os');
var sh = require('shelljs');
var exec = require('child_process').exec;
var reg = require('./regex');
var mongodb = require('mongodb').MongoClient;
var vf = ['.mkv', '.avi', '.mp4'];
var files = [];
var directory = [];
var d = '/Users/ballz/Downloads/';
var cPath = "/Users/ballz/Desktop/";
var compressed = ['.rar', '.zip'];
var series = /(. * )(?:[^x](?:(\d {1})(\d {2}))[^p] | (?:s(\d + )e(\d + )))(. * )/igm;
var movies = /(. * )[^x](\d {4})[^p](?:. * )/gim;
var rf = /((?:^(ETRG)) | ((. * )?(sample))(. * ) | ((. * )?(subs)))(. * )/igm;

// arrange file by moving the to thier folders
var arrFile = function (file, moveLoc) {
    console.log(file);
    var exist = fs.existsSync(path.join(moveLoc, path.basename(file)));
    if (exist) {
        console.log('file path exist');
        // most be a path please use path.join
    } else {
        sh.mkdir('-p', moveLoc);
        console.log('moving ----  ' + path.basename(file));
        sh.mv(file, moveLoc);
        console.log("moving " + path.basename(file) + " completed")
        arrFile(file, moveLoc);
    }
}


var com = [];
var x = function (dir, newloc) {
    var list = fs.readdirSync(dir);
    for (var i in list) {
        var stat = fs.statSync(path.join(dir, list[i])).isFile();
        if (stat) {
            if (compressed.indexOf(path.extname(list[i])) >= 0 && !rf.test(list[i])) {
                console.log('extracting ' + list[i]);
                exec('unrar x -y ' + path.join(dir, list[i]) + " " + path.dirname(path.join(dir, list[i])));
                console.log('extracting completed');
            }
        } else {
            x(path.join(dir, list[i]), newloc);
        }
    }
}

function movieCheck(dir, name, newLoc) {

    files.push({// copy the movies to an array
        'name': reg(movies, name, "$1"),
        'year': reg(movies, name, "$2"),
        'path': path.join(newLoc, 'movies', reg(movies, name, "$2"), reg(movies, name, "$1").slice(0, 1)),
        'fullPath': path.join(newLoc, 'movies', reg(movies, name, "$2"), reg(movies, name, "$1").slice(0, 1).toUpperCase(), name)
    });
    // movie file to the new created path
    arrFile(path.join(dir, name), files[files.length - 1].path);
    // console.log(files[files.length - 1]); // print out the path for each movie catched
    fs.appendFileSync(path.join(newLoc, "moved files.log"), name + '\r');
}

function seriesCheck(dir, name, newLoc) {
    if (/^(?:s(\d + )e(\d + ))/igm.test(name)) {// check for series that starts with series info
        n = path.basename(path.dirname(path.join(dir, name)));
        Sname = reg(/(. * )(?:(season) | (s\d + ))(. * )/igm, n, "$1");
        sN = Sname + " ";
    } else {
        Sname = reg(series, name, '$1').trim();
        sN = "";
    }

    files.push({//copy all series in directory
        'name': Sname,
        'season': reg(series, name, '$4 $2').trim(),
        'episode': reg(series, name, '$5 $3').trim(),
        'path': path.join(newLoc, 'series', Sname, reg(series, name, '$4 $2').trim()),
        'fullPath': path.join(newLoc, 'series', Sname, reg(series, name, '$4 $2').trim(), name)
    });
    //move file to array
    arrFile(path.join(dir, name), files[files.length - 1].path);
    // console.log(files[files.length - 1].name); // print out the path for each series catch 
    fs.appendFileSync(path.join(newLoc, "moved files.log"), name + '\r');
}

function readD(dir, newLoc) {

    fs.readdir(dir, (err, list) => {//read the directory
        x(path.join(dir), newLoc);

        for (var i in list) {//loop the the file and directory in the path
            var stat = fs.statSync(path.join(dir, list[i])).isFile(); // check if the item is a file  

            if (stat && vf.indexOf(path.extname(list[i])) >= 0) {//check if file and has given extension

                if (rf.test(list[i])) {// if not movie check if the file contains the following expression
                    console.log(list[i] + "\r removed");
                    fs.appendFileSync(path.join(newLoc, "removed Files.log"), list[i] + '\r')
                } else if (movies.test(list[i]) && !rf.test(list[i])) {//get all movies in directory
                    movieCheck(dir, list[i], newLoc);
                } else {
                    seriesCheck(dir, list[i], newLoc);
                }
            } else {// go through the folders found in the list
                // directory.push(path.join(dir, list[i]));
                readD(path.join(dir, list[i]), newLoc);
            }
        }


    });
}

// function allRead(dir, newLoc) {
//     x(dir, newLoc);
//     readD(dir, newLoc);
// }

// allRead(d, cPath)


readD(d, cPath); 