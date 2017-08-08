var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var Post = mongoose.model("Post");

// ----------------------------------------
// Index
// ----------------------------------------
router.get("/", (req, res) => {
  Post.find({})
    .then(users => {
      res.render("index", { users });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// New
// ----------------------------------------
router.get("/new", (req, res) => {
  res.render("new");
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get("/:id/edit", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.render("posts/edit", { post });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.render("posts/show", { post });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post("/", (req, res) => {
  var post = new Post({
    fname: req.body.user.fname,
    lname: req.body.user.lname,
    username: req.body.user.username,
    email: req.body.user.email
  });

  post
    .save()
    .then(post => {
      res.redirect(`/posts/${post.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Update
// ----------------------------------------
router.put("/:id", (req, res) => {
  var postParams = {
    fname: req.body.post.fname,
    lname: req.body.post.lname,
    username: req.body.post.postname,
    email: req.body.post.email
  };

  User.findByIdAndUpdate(req.params.id, postParams)
    .then(post => {
      req.method = "GET";
      res.redirect(`/posts/${post.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete("/:id", (req, res) => {
  var currentPost = req.session.currentPost;
  Post.findByIdAndRemove(req.params.id)
    .then(() => {
      req.method = "GET";
      if (currentPost.id === req.params.id) {
        res.redirect("/logout");
      } else {
        res.redirect("/posts");
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
