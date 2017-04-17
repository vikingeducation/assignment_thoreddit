var express = require('express');
var router = express.Router();

/* GET home page. */




router.get('/', function(req, res, next) {
    //Query database for posts and send to template
    res.render('posts');
});

module.exports = router;
