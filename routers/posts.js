var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");
var Post = mongoose.model("Post");

// ----------------------------------------
// Index
// ----------------------------------------
router.get("/", (req, res) => {
  if (req.session.currentUser) {
    var posts;
    Post.find({})
      .then(postsProm => {
        posts = postsProm;
        var promiseArr = [];
        posts.forEach(post => {
          promiseArr.push(User.findById(post.author));
        });
        return Promise.all(promiseArr);
      })
      .then(users => {
        posts.forEach(post => {
          users.forEach(user => {
            //console.log("user " + user + "\n" + "post " + post);
            if (post.author == user.id) {
              console.log("inside if statement .......");
              post.user = user;
            }
          });
        });
        res.render("posts/index", { posts });
      })
      .catch(e => res.status(500).send(e.stack));
  } else {
    res.redirect("/login");
  }
});

router.get("/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate({
      path: "comments author",
      populate: {
        path: "comments author",
        populate: {
          path: "author"
        }
      }
    })
    .then(post => {
      console.log("inside router.get ", post);
      res.render("posts/show", { post });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
