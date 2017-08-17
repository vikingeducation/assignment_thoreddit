var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var models = require("./../models");
var Post = mongoose.model("Post");
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");

router.get("/comment/:id", (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
      res.render("comments/comment", { comment });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post("/comment/:id", (req, res) => {
  let user_id = req.session.currentUser.id;
  Comment.findById(req.params.id)
    .then(result => {
      return Comment.findById(req.params.id);
    })
    .then(result => {
      let comment = result;
      console.log(req.session.currentUser);
      var newComment = new Comment({
        body: req.body.comment,
        author_id: req.session.currentUser.email,
        parent_type: "comment",
        parent_id: req.params.id,
        score: 0
      });

      newComment
        .save()
        .then(() => {
          res.redirect(`/comments/${user_id}`);
        })
        .catch(e => res.status(500).send(e.stack));
    });
});

router.get("/:id/edit", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.render("comments/edit", { post });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/:id", (req, res) => {
  let post;
  let comments;
  Post.findById(req.params.id)
    //.populate("ratings")
    .then(results => {
      post = results;
      console.log(post);
      return Comment.find({ parent_id: req.params.id }).sort({ score: 1 });
    })
    .then(results => {
      comments = results;
      return Comment.find({ parent_type: "comment" });
    })
    .then(results => {
      console.log("---------" + results);
      for (let i = 0; i < comments.length; i++) {
        comments[i].arr = [];
        for (let j = 0; j < results.length; j++) {
          if (comments[i].id === results[j].parent_id) {
            comments[i].arr.push(results[j]);
          }
        }
      }
      console.log(comments);
      res.render("comments/index", { post, comments });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post("/:id", (req, res) => {
  Post.findById(req.params.id).then(result => {
    let post = result;
    console.log(req.session.currentUser);
    var comment = new Comment({
      body: req.body.comment,
      author_id: req.session.currentUser.email,
      parent_type: "post",
      parent_id: req.params.id,
      score: 0
    });

    comment
      .save()
      .then(() => {
        res.redirect(`/comments/${req.params.id}`);
      })
      .catch(e => res.status(500).send(e.stack));
  });
});

module.exports = router;
