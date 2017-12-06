var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', (req, res) => {
  console.log('ROUTE IS BEING HIT');
  User.find({})
    .then(users => {
      console.log('THEN IS BEING HIT');
      res.render('users/user_index', { users });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
