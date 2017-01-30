var mongodb = require('mongodb').MongoClient;
// module.exports.connect = mongodb.connect('mongodb://localhost:27017/ProjectJoy');
var test = {
    name: 'ehiie',
    age: 89,
    email: 'ehigiepaul@yahoo.com',
    location: 'Nigeria',
    dob: '23/12/86'
}

mongodb.connect('mongodb://localhost:27017/projectJoy', (err, db) => {
    db.collection('test').insert(test)
})