var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var Post = mongoose.model("Post");
var User = mongoose.model("User");
var Scorable = mongoose.model("Scorable");
var Score = mongoose.model("Score");
var Comment = mongoose.model("Comment");

router.get("/", (req, res) => {
  Post.find()
    .populate("user")
    .populate("score")
    .sort({ title: 1 })
    .then(posts => {
      res.render("posts/index", { posts });
    });
});

router.get("/show/:postId", (req, res) => {
  Post.findById(req.params.postId)
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

router.get("/:postId/comments/new", (req, res) => {
  res.render("comments/new");
});

router.post("/:postId/comments/new", (req, res) => {
  let postId = req.params.postId;
  let thisUser;
  User.find({ username: req.body.comment.username }).then(user => {
    thisUser = user[0];

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

    var promises = [];
    promises.push(newComment.save(), newScore.save(), Post.findById(postId));
    Promise.all(promises).then(results => {
      let post = results[2];
      post.comments.push(newComment);
      post.save().then(() => {
        res.redirect(`/posts/show/${postId}`);
      });
    });
  });
});

router.put("/:postId/:vote", (req, res) => {
  Score.find({ scorable: req.params.postId }).then(score => {
    //need to check if session user has already voted
    score[0].value += req.params.vote === "up" ? 1 : -1;
    score[0].save().then(() => {
      res.redirect(`/posts/show/${req.params.postId}`);
    });
  });
});

router.put("/:postId/comments/:commentId/:vote", (req, res) => {
  Score.find({ scorable: req.params.commentId }).then(score => {
    //need to check if session user has already voted
    score[0].value += req.params.vote === "up" ? 1 : -1;
    score[0].save().then(() => {
      res.redirect(`/posts/show/${req.params.postId}`);
    });
  });
});

module.exports = router;
