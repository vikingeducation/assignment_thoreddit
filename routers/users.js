const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mdoels = require("./../models");
let User = mongoose.model('User');

router.get('/', (req, res) => {
  User.find()
  .then((users) => {
     return res.render('./users/index', { users })
  })
  .catch((e) => res.status(500).send(e.stack))
});


module.exports = router;
