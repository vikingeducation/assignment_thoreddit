var url = require("url");
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
// var models = require("./../models");
// var User = mongoose.model("User");

module.exports = app => {
  router.get("/", (req, res) => {
    res.render("session/login");
  });

  return router;
};
