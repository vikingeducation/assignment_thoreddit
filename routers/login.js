var url = require("url");
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

module.exports = app => {
  var startPage = (req, res) => {
    if (req.session.userInfo != null) {
      User.find({})
        .then(users => {
          res.render("session/start", { users });
        })
        .catch(e => res.status(500).send(e.stack));
    } else {
      res.render("session/login");
    }
  };

  router.get("/", startPage);

  router.get("/login", startPage);

  router.post("/login", (req, res) => {
    if (req.body.username.length > 0 && req.body.email.length > 0) {
      var usernameEntered = req.body.username;
      var emailEntered = req.body.email;
      req.session.userInfo = { username: usernameEntered, email: emailEntered };
      User.find({})
        .then(users => {
          res.render("session/start", { users });
        })
        .catch(e => res.status(500).send(e.stack));
    } else {
      res.redirect("/login");
    }
  });

  router.get("/logout", (req, res) => {
    if (req.session.userInfo) {
      req.session.userInfo = null;
    }
    res.render("session/login");
  });

  return router;
};
