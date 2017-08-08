var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

router.get("/users", (req, res) => {
  res.render("users/index");
});

module.exports = router;
