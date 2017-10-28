var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var models = require('./../models');
var User = mongoose.model('User');

// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.render('users/index', { users });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.render('users/show', { user });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
