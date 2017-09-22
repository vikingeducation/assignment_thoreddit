var url = require("url");
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");
var Post = mongoose.model("Post");

module.exports = app => {
  router.get("/", (req, res) => {
    Post.find({})
      .populate("user")
      .then(posts => {
        console.log(posts);
        res.render("post/start", { posts });
      })
      .catch(e => res.status(500).send(e.stack));
  });

  return router;
};
