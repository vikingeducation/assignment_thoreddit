const express = require("express");
const router = express.Router();
var models = require("./../models");
var { Post } = models;

router.get("/posts", (req, res) => {
  Post.find()
    .populate("users", "username")
    .then(posts => {
      console.log(posts);
      res.render("posts/index", { posts });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  Post.findById(id)
    .populate("comments score")
    .then(post => {
      console.log(post);
      res.render("posts/show", { post });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
