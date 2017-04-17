var url = require("url");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
// var models = require('./../models');
// var User = mongoose.model('User');

//var app = express();

router.get("/", function(req, res) {
  // invoked when localhost:3000 is visited
  if (req.session.currentUser) {
    // to send user to logged page if already signed in on different browser tab, per the specification
    res.send("Hello Theoreddit!");
  } else {
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  if (req.session.currentUser) {
    // to prevent unauthorized direct access to the 'logged' private page
    res.redirect("/");
  } else {
    res.render("sessions/login");
  }
});

router.post("/login", (req, res) => {
  // invoked when '/login' action called on index.hbs page
  //req.session.visited = true;
  req.session.currentUser = { name: req.body.username, email: req.body.email };
  res.redirect("/");
});

router.post("/logout", (req, res) => {
  // invoked when '/logout' action called on logged.hbs page
  req.session.destroy(); // to prevent unauthorized direct access to the 'logged' private page
  res.redirect("/");
});

module.exports = router;
