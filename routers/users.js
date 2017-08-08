var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

// ----------------------------------------
// Index
// ----------------------------------------
router.get("/", (req, res) => {
  User.find({})
    .then(users => {
      res.render("users/index", { users });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// New
// ----------------------------------------
router.get("/new", (req, res) => {
  res.render("new");
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get("/:id/edit", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.render("users/edit", { user });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.render("users/show", { user });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post("/", (req, res) => {
  var user = new User({
    fname: req.body.user.fname,
    lname: req.body.user.lname,
    username: req.body.user.username,
    email: req.body.user.email
  });

  user
    .save()
    .then(user => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Update
// ----------------------------------------
router.put("/:id", (req, res) => {
  var userParams = {
    fname: req.body.user.fname,
    lname: req.body.user.lname,
    username: req.body.user.username,
    email: req.body.user.email
  };

  User.findByIdAndUpdate(req.params.id, userParams)
    .then(user => {
      req.method = "GET";
      res.redirect(`/users/${user.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete("/:id", (req, res) => {
  var currentUser = req.session.currentUser;
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      req.method = "GET";
      if (currentUser.id === req.params.id) {
        res.redirect("/logout");
      } else {
        res.redirect("/users");
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
