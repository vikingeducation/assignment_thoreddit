var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var Posts = mongoose.model("Post");

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
    .populate({path:"comments", populate: [{path:'user'}, {path:'score'}]})
    .then(post => {
      res.render("posts/show", { post });
    });
});

router.get("/:id/comments/new", (req, res) =>{
  res.render('comments/new')
})

router.post("/:id/comments/new", (req, res) =>{
  let commentParams = {
    kind: "comments",
    text: req.body.comment.text,
    user: 
  }
  Scorables.insert()
})


module.exports = router;
