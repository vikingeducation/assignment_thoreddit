var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

var onIndex = (req, res) => {
  res.render("users/index");
};
router.get("/users", onIndex);
router.get("/", onIndex);

module.exports = router;
