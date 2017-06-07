const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const models = require('./../models');
const User = mongoose.model('User');

// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.render('users/index', { users });
    })
    .catch((e) => res.status(500).send(e.stack));
});
