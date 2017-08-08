const express = require("express");
const router = express.Router();
var models = require("./../models");
var { Post, Comment } = models;

router.get("/posts", (req, res) => {
  Post.find()
    .populate("user", "username")
    .then(posts => {
      console.log(posts);
      res.render("posts/index", { posts });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  Post.findById(id)
    .populate([
      "user",
      "score",
      {
        path: "comments",
        populate: [
          "user",
          "score",
          {
            path: "comments",
            populate: [
              "user",
              "score",
              {
                path: "comments",
                populate: ["user", "score"]
              }
            ]
          }
        ]
      }
    ])
    .then(post => {
      console.log(post.comments[0].comments[0].comments[0].comments[0]);
      res.render("posts/show", { post });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/comments/:id", (req, res) => {
  let id = req.params.id;
  Comment.findById(id).then(comment => {
    res.render("comments/loadAsync", { comment: comment, layout: false });
  });
});

module.exports = router;
