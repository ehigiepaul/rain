var express = require('express')
var app = express();
var engine = require('consolidate')
var body = require('body-parser')
var passport = require('passport')
var path = require('path')

var flash = require('connect-flash'),
    LocalStrategy = require('passport-local').Strategy;
// var routes = require('./routes/index')




app.engine('html', engine.ejs);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'));
app.use(body.urlencoded({
    extended: false
}));


app.get('/', function (req, res, next) {
    res.render('login');
    // res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/user');
app.get('/search');
app.get('/series')
app.get('/movies')
app.get('/player');
app.get('/:type/:title', (req, res, next) => {
    var type = req.params.type
    var title = req.params.title;
})

// app.use(passport.initialize())
// app.use(passport.session())



// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'passwd'
// }))


app.listen(3000);
console.log('Joy is online on http://localhost:3000')