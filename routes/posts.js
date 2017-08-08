const express = require("express");
const router = express.Router();
var models = require("./../models");
var { Post } = models;

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
        populate: ["user", "score"]
      }
    ])
    .then(post => {
      console.log(post);
      res.render("posts/show", { post });
    })
    .catch(e => res.status(500).send(e.stack));
});

let promiseArray = [];

function gatherNestedComments(comments) {
  for (let i = 0; i < comments.length; i++) {
    // gatherNestedComments(comment)
    if (comments[i].comments.length > 0) {
      comments[i].comments.map(comment => {
        let p = Comment.findById(comment);
        promiseArray.push(p);
        return p;
      });
      comments[i].comments = gatherNestedComments(comments[i].comments);
    } else {
      return comments[i].comments;
    }
  }
}

function resolvePromiseArray() {
  Promise.all(promiseArray).then(() => {});
}

router.get("/posts/new", (req, res) => {});

module.exports = router;
