// var imdb = require('omdb');
var http = require('http');
var mongodb = require('mongodb').MongoClient;


var imdb = {
    get: function (title, type, season, episode) {
        if (type == "movies") {
            url = 'http://www.omdbapi.com/?t=' + title + '&type=' + type;
        } else {
            if (season == "" || episode == "") {
                url = 'http://www.omdbapi.com/?t=' + title + '&type=' + type + '&r=json&plot=full';
            } else {
                url = 'http://www.omdbapi.com/?t=' + title + '&type=' + type + '&r=json&plot=full&Season=' + Number(season) + '&Episode=' + Number(episode);
            }
        }
        let rawData = '';
        http.get(url, (res) => {
            res.on('data', (chunk) => rawData += chunk);
            res.on('end', () => {
                let parsedData = JSON.parse(rawData);
                mongodb.connect('mongodb://localhost:27017/projectJoy', (err, db) => {
                    if (db.collection(type).find({
                            "Title": parsedData.Title
                        }).toArray().length > 0) {
                        console.log('am here')
                    } else {
                        console.log('not found')
                        console.log(parsedData);
                        console.log('not found')

                    }
                })
                // console.log(parsedData);
            });
        })
    }
}

imdb.get('Shooter', 'series', '1', '03')