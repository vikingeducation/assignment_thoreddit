var express = require("express");
var router = express.Router();

//for accessing database
const mongoose = require("mongoose");
const models = require("../models");
const User = models.User;
const Commentable = models.Commentable;
//Commentable

router.post("/newpost", function(req, res, next) {
  //testing callback
  console.log("post started");
  console.log("this is the username" + req.body.username);

  User.findOne({ username: `${req.body.username}` }).then(result => {
    // console.log(result[0]._id)

    console.log("this is the user.find then body");
    let newPost = {
      user: result,
      title: req.body.title,
      text: req.body.text,
      parentId: 0,
      score: 0
    };

    Commentable.create(newPost).then(() => {
      res.send("respond with a resource");
    });
  });

  //end of post callback
});

router.get("/newpost", (req, res, next) => {
  res.render("form");
});

module.exports = router;
