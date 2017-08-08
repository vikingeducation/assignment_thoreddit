var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var Posts = mongoose.model("Post");
var Users = mongoose.model("User");
var Scorables = mongoose.model("Scorable");
var Scores = mongoose.model("Score");
var Comment = require("../models/comment");
var Score = require("../models/score");

router.get("/", (req, res) => {
  Posts.find()
    .populate("user")
    .populate("score")
    .sort({ title: 1 })
    .then(posts => {
      res.render("posts/index", { posts });
    });
});

router.get("/show/:id", (req, res) => {
  Posts.findById(req.params.id)
    .populate("score")
    .populate("user")
    .populate({
      path: "comments",
      populate: [{ path: "user" }, { path: "score" }]
    })
    .then(post => {
      res.render("posts/show", { post });
    });
});

router.get("/:id/comments/new", (req, res) => {
  res.render("comments/new");
});

router.post("/:id/comments/new", (req, res) => {
  let postId = req.params.id
  let thisUser = Users.find({ username: req.body.comment.username }).id;

  let newComment = new Comment({
    text: req.body.comment.text,
    score: {},
    user: thisUser
  });

  let newScore = new Score({
    value: 0,
    scorable: newComment,
    users: []
  });

  newComment.score = newScore;

  newComment.save().then(() => {
    newScore.save().then(() => {
    //  let updatedPost = Posts.findByIdAndUpdate(postId, {comments: comments.push(newComment)}).then(()=>{
        res.redirect(`/posts`);
     
    });
  });
});

module.exports = router;
