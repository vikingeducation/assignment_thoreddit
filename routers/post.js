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
        res.render("post/start", { posts });
      })
      .catch(e => res.status(500).send(e.stack));
  });

  router.get("/:id", (req, res) => {
    Post.findById(req.params.id)
      .populate("user")
      .then(post => {
        res.render("post/postOne", { post });
      })
      .catch(e => res.status(500).send(e.stack));
  });

  return router;
};
