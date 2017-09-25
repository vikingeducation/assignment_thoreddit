var url = require("url");
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");
var Post = mongoose.model("Post");

var commentFinder = function(post, commentId) {
  var postComment;
  if (commentId.toString().length === 1) {
    var postComment = post;
  } else if (commentId.toString().length === 2) {
    var commentIdIndex = commentId - 11;
    var postComment = post.comment[commentIdIndex];
  } else if (commentId.toString().length === 4) {
    var firstIndex = Number(commentId.toString().slice(0, 2)) - 11;
    var secondIndex = Number(commentId.toString().slice(2)) - 11;
    var postComment = post.comment[firstIndex].comment[secondIndex];
  } else if (commentId.toString().length === 6) {
    var firstIndex = Number(commentId.toString().slice(0, 2)) - 11;
    var secondIndex = Number(commentId.toString().slice(2, 4)) - 11;
    var thirdIndex = Number(commentId.toString().slice(4)) - 11;
    var postComment =
      post.comment[firstIndex].comment[secondIndex].comment[thirdIndex];
  }
  return postComment;
};

module.exports = app => {
  router.get("/", (req, res) => {
    Post.find({})
      .populate("user")
      .then(posts => {
        res.render("post/start", { posts });
      })
      .catch(e => res.status(500).send(e.stack));
  });

  router.get("/:postid/newUpVote/:linktoId", (req, res) => {
    Post.findById(req.params.postid).then(post => {
      var commentId = req.params.linktoId;
      var postId = req.params.postid;
      var postComment = commentFinder(post, commentId);

      User.find({
        username: req.session.userInfo.username,
        email: req.session.userInfo.email
      }).then(user => {
        var matchUp = false;
        var matchDown = false;
        for (var i = 0; i < user[0].upVote.length; i++) {
          if (
            JSON.stringify(user[0].upVote[i]) ===
            JSON.stringify({ postId, commentId })
          ) {
            matchUp = true;
          }
        }
        for (var i = 0; i < user[0].downVote.length; i++) {
          if (
            JSON.stringify(user[0].downVote[i]) ===
            JSON.stringify({ postId, commentId })
          ) {
            matchDown = true;
          }
        }
        if (matchUp) {
          postComment.score = postComment.score + 0;
        } else if (matchDown) {
          var index = user[0].downVote.indexOf({ postId, commentId });
          user[0].downVote.splice(index, 1);
          user[0].upVote.push({ postId, commentId });
          postComment.score = postComment.score + 2;
        } else {
          user[0].upVote.push({ postId, commentId });
          postComment.score = postComment.score + 1;
        }
        User.update(
          {
            username: req.session.userInfo.username,
            email: req.session.userInfo.email
          },
          user[0]
        ).then(() => {
          Post.update({ _id: `${req.params.postid}` }, post).then(posting => {
            res.redirect(`/post/${req.params.postid}`);
          });
        });
      });
    });
  });

  router.get("/:postid/newDownVote/:linktoId", (req, res) => {
    Post.findById(req.params.postid).then(post => {
      var commentId = req.params.linktoId;
      var postId = req.params.postid;
      var postComment = commentFinder(post, commentId);

      User.find({
        username: req.session.userInfo.username,
        email: req.session.userInfo.email
      }).then(user => {
        var matchUp = false;
        var matchDown = false;
        for (var i = 0; i < user[0].upVote.length; i++) {
          if (
            JSON.stringify(user[0].upVote[i]) ===
            JSON.stringify({ postId, commentId })
          ) {
            matchUp = true;
          }
        }
        for (var i = 0; i < user[0].downVote.length; i++) {
          if (
            JSON.stringify(user[0].downVote[i]) ===
            JSON.stringify({ postId, commentId })
          ) {
            matchDown = true;
          }
        }
        if (matchDown) {
          postComment.score = postComment.score + 0;
        } else if (matchUp) {
          var index = user[0].upVote.indexOf({ postId, commentId });
          user[0].upVote.splice(index, 1);
          user[0].downVote.push({ postId, commentId });
          postComment.score = postComment.score - 2;
        } else {
          user[0].downVote.push({ postId, commentId });
          postComment.score = postComment.score - 1;
        }
        User.update(
          {
            username: req.session.userInfo.username,
            email: req.session.userInfo.email
          },
          user[0]
        ).then(() => {
          Post.update({ _id: `${req.params.postid}` }, post).then(posting => {
            res.redirect(`/post/${req.params.postid}`);
          });
        });
      });
    });
  });

  router.get("/:postid/newComment/:linktoId", (req, res) => {
    Post.findById(req.params.postid).then(post => {
      var commentId = req.params.linktoId;

      var bodyMessage = commentFinder(post, commentId).body;

      res.render("post/newComment", { post, commentId, bodyMessage });
    });
  });

  router.post("/:postid/newComment/:linktoId", (req, res) => {
    Post.findById(req.params.postid).then(post => {
      var commentId = req.params.linktoId;
      //Comment To add
      if (commentId.toString().length === 1) {
        post.comment.push({
          id: post.comment.length + 1,
          user: req.session.userInfo.username,
          body: req.body.commentBody,
          score: 0,
          comment: []
        });
      } else if (commentId.toString().length === 2) {
        var commentIdIndex = commentId - 11;
        post.comment[commentIdIndex].comment.push({
          id:
            commentId * 100 + post.comment[commentIdIndex].comment.length + 11,
          user: req.session.userInfo.username,
          body: req.body.commentBody,
          score: 0,
          comment: []
        });
      } else if (commentId.toString().length === 4) {
        var firstIndex = Number(commentId.toString().slice(0, 2)) - 11;
        var secondIndex = Number(commentId.toString().slice(2)) - 11;
        post.comment[firstIndex].comment[secondIndex].comment.push({
          id:
            firstIndex +
            11 * 10000 +
            secondIndex +
            11 * 100 +
            post.comment[firstIndex].comment[secondIndex].comment.length +
            11,
          user: req.session.userInfo.username,
          body: req.body.commentBody,
          score: 0,
          comment: []
        });
      } else if (commentId.toString().length === 6) {
        var firstIndex = Number(commentId.toString().slice(0, 2)) - 11;
        var secondIndex = Number(commentId.toString().slice(2, 4)) - 11;
        var thirdIndex = Number(commentId.toString().slice(4)) - 11;
        console.log(firstIndex, secondIndex, thirdIndex);
        post.comment[firstIndex].comment[secondIndex].comment[
          thirdIndex
        ].comment.push({
          id:
            (firstIndex + 11) * 1000000 +
            (secondIndex + 11) * 10000 +
            (thirdIndex + 11) * 100 +
            post.comment[firstIndex].comment[secondIndex].comment[thirdIndex]
              .comment.length +
            11,
          user: req.session.userInfo.username,
          body: req.body.commentBody,
          score: 0,
          comment: []
        });
      }

      Post.update({ _id: `${req.params.postid}` }, post).then(posting => {
        console.log(posting);
        res.render("post/postOne", { post });
      });
    });
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
