var express = require('express');
var router = express.Router();
let models = require('../models');
let User = models.User;

router.get('/users', function(req, res, next) {
    User.find().then((users) => {
        res.render('users/index', {
            title: 'Thoreddit',
            users
        });
    })
});


router.get('/users/:id', function(req, res, next) {
    let id = req.params.id;
    console.log("\n\nID: ", id)
    User.findById(id).then((user) => {
        if (user) {
            res.render('users/show', {
                title: 'Thoreddit',
                user
            });
        }
        else {
            res.redirect('/users');
        }
    })
});

module.exports = router;
