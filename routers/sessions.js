var url = require("url");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
// var models = require('./../models');
// var User = mongoose.model('User');

app.get("/", function(req, res) {
  // invoked when localhost:3000 is visited
  if (req.session.visited) {
    // to send user to logged page if already signed in on different browser tab, per the specification
    res.send("Hello Theoreddit!");
  } else {
    res.render("sessions/new");
  }
});

app.get("/logged", (req, res) => {
  if (req.session.visited) {
    // to prevent unauthorized direct access to the 'logged' private page
    res.render("logged");
  } else {
    res.redirect("/");
  }
});

app.post("/login", (req, res) => {
  // invoked when '/login' action called on index.hbs page
  req.session.visited = true;
  res.redirect("/logged");
});

app.post("/logout", (req, res) => {
  // invoked when '/logout' action called on logged.hbs page
  req.session.destroy(); // to prevent unauthorized direct access to the 'logged' private page
  res.redirect("/");
});
