var express = require('express');
var router = express.Router();



router.post('/', function(req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    //query the database to see if they already exist
    //if not create them
    //then redirect to homepage

    //set currentUser session
    req.session.currentUser =

        res.redirect('/');
});
