var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var Posts = mongoose.model("Post");

router.get("/", (req, res) => {
  Posts.find().populate('user').sort({title:1}).then((posts)=>{

    res.render("posts/index", {posts});
  })
});


module.exports = router;
