var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login');
    // res.redirect('/home');
});

router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/user');
router.get('/search');
router.get('/player');
router.get('/:type/:title')


module.exports = router;