var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var Posts = mongoose.model("Post");

router.get("/posts", (req, res) => {
  Posts.find().then((posts)=>{

    res.render("posts/index", {posts});
  })
};);


module.exports = router;
