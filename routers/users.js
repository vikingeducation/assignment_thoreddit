var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

router.get("/", (req, res) => {
  User.find().then(users => {
    res.render("users/index", { users });
  });
});

router.get("/show/:userId", (req, res) => {
  User.findById(req.params.userId)
    .populate({ path: "posts", populate: { path: "score" } })
    .then(user => {
      res.render("users/show", { user });
    });
});

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/", (req, res) => {
  let userParams = {
    username: req.body.user.username,
    email: req.body.user.email
  };
  User.findOrCreate(userParams).then(() => {
    res.redirect("/");
  });
});

router.delete("/:userId", (req, res) => {
  User.findByIdAndRemove(req.params.userId).then(() => {
    req.method = "GET";
    res.redirect("/users");
  });
});

router.get("/:userId/edit", (req, res) => {
  User.findById(req.params.userId).then(user => {
    res.render("users/edit", { user });
  });
});

router.put("/:userId", (req, res) => {
  var userParams = {
    username: req.body.user.username,
    email: req.body.user.email
  };
  User.findByIdAndUpdate(req.params.userId, userParams).then(() => {
    req.method = "GET";
    res.redirect("/");
  });
});

module.exports = router;
