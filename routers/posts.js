var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var models = require("./../models");
var Post = mongoose.model("Post");
var Users = mongoose.model("User");

// ----------------------------------------
// Index
// ----------------------------------------
router.get("/", (req, res) => {
  var posts;
  Post.find({})
    .sort({ score: -1 })
    //.populate("ratings")
    // .then(results => {
    //   posts = results;
    //   return Motel.find({}).populate("ratings");
    // })
    .then(results => {
      posts = results;
      return Users.find({});
    })
    .then(users => {
      for (let i = 0; i < posts.length; i++) {
        for (let j = 0; j < users.length; j++) {
          if (users[j].email === posts[i].author_id) {
            posts[i].name = users[j].fname + " " + users[j].lname;
          }
        }
      }

      res.render("posts/index", { posts });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
