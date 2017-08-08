var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

var onIndex = (req, res) => {
  User.find().then((users)=>{
  //   // users.forEach(user => {
  //   //   // user.posts = user.posts.length
  //     console.log(users.posts)
  //   })
  //   console.log(users.posts.length)
    res.render("users/index", {users});
  }) 
};

router.get("/users", onIndex);
router.get("/", onIndex);

module.exports = router;
