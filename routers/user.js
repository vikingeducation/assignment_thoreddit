var url = require("url");
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

module.exports = app => {
  router.get("/:id", (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        res.render("session/userOne", { user });
      })
      .catch(e => res.status(500).send(e.stack));
  });

  return router;
};
