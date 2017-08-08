var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

router.get("/posts", (req, res) => {
  Posts.find().then((posts)=>{
 
    res.render("posts/index", {posts});
  }) 
};);


module.exports = router;