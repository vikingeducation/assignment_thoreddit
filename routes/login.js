var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var User = mongoose.model('User');

router.get('/', (req, res, next) => {
  res.render('login');
})

router.post('/', (req, res, next) => {
  User.findOne({ email: req.body.email, username: req.body.username }).then(user => {
    req.session.userId = user.id;
    req.method = "get";
    res.redirect(`/posts`);
  })
})

module.exports = router;