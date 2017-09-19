var url = require("url");
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

module.exports = app => {
  // Auth

  // New
  // var onNew = (req, res) => {
  //   if (req.session.currentUser) {
  //     res.redirect("/users");
  //   } else {
  //     res.render("sessions/new");
  //   }
  //
  // };
  router.get("/");
  router.get("/login");

  // Create

  // Destroy

  router.get("/logout");
  router.delete("/logout");

  return router;
};
