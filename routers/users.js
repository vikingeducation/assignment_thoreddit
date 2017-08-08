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

router.get("/show/:id", (req, res)=>{
  User.findById(req.params.id).populate('posts').then(user=>{
    res.render('/users/show', {user})
  })
})


module.exports = router;
