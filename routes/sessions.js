var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var models = require('./../models');
var User = models.User;

router.post('/sessions', function(req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    User.findOne({
        username: username,
        email: email
    }).then((user) => {
        if (user) {
            req.session.currentUser = {
                username: user.username,
                email: user.email,
                id: user.id
            };
            res.redirect('/');
        }
        else {
            let user = new User({
                username: username,
                email: email
            });
            user.save()
                .then((data) => {
                    console.log("\n\n\n\n\nData:", data)
                    req.session.currentUser = {
                        username: username,
                        email: email,
                        id: user.id
                    };
                    res.redirect('/');
                });
        }
    })
});

router.delete('/sessions', function(req, res, next) {
    req.session.destroy();
    req.method = 'GET';
    res.redirect('/login');
})


module.exports = router;
