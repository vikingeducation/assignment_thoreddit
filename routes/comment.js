var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var models = require("./../models");
var Post = mongoose.model("Post");
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");
var Commentable = mongoose.model("Commentable");

router.post("/:parentId", (req, res) => {
  var comment = new Comment({
    author: req.session.userId,
    body: req.body.comment.body,
    children: [],
    parent: req.params.parentId
  });

  comment.save().then(comment => {
    Commentable.findById(req.params.parentId).then(commentable => {
      commentable.children.push(comment.id);
      commentable.save().then(commentable => {
        req.method = "GET";
        res.redirect("back");
      });
    });
  });
});

module.exports = router;
