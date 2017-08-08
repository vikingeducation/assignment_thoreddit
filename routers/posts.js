const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("./../models");
let Post = mongoose.model("Post");

//index route
router.get("/", (req, res) => {
  Post.find()
    .then(posts => {
      let shortPosts = [];
      posts.forEach((post, index) => {
        shortPosts.push({
          createdAt: post.createdAt,
          shortTitle: post.shortTitle,
          shortBody: post.shortBody,
          username: post.username,
          id: post.id
        });
      })
      console.log(shortPosts);
      return res.render("./users/index", { posts: shortPosts });
    })
    .catch(e => res.status(500).send(e.stack));
});

//show route
// router.get("/show/:id", (req, res) => {
//   let id = req.params.id;
//   User.findById(id)
//     .then(user => {
//       return res.render("./users/show", { user });
//     })
//     .catch(e => res.status(500).send(e.stack));
// });
//
// //edit page route
// router.get("/:id/edit", (req, res) => {
//   let id = req.params.id;
//   User.findById(id)
//     .then(user => {
//       return res.render("./users/edit", { user });
//     })
//     .catch(e => res.status(500).send(e.stack));
// });
//
// //create endpoint
// router.put("/:id", (req, res) => {
//   var userParams = {
//     fname: req.body.user.fname,
//     lname: req.body.user.lname,
//     username: req.body.user.username,
//     email: req.body.user.email
//   };
//
//   User.findByIdAndUpdate(req.params.id, userParams)
//     .then(user => {
//       req.method = "GET";
//       res.redirect(`/users/show/${user.id}`);
//     })
//     .catch(e => res.status(500).send(e.stack));
// });
// //edit api endpoint
// router.put("/:id", (req, res) => {
//   let userParams = {
//     fname: req.body.user.fname,
//     lname: req.body.user.lname,
//     username: req.body.user.username,
//     email: req.body.user.email
//   };
//   User.findByIdAndUpdate(req.params.id, userParams)
//     .then(user => {
//       req.method = "GET";
//       res.redirect(`/users/show/${user.id}`);
//     })
//     .catch(e => res.status(500).send(e.stack));
// });
//
// //delete api endpoint
// router.delete("/:id", (req, res) => {
//   User.findByIdAndRemove(req.params.id)
//     .then(() => {
//       req.method = "GET";
//       res.redirect("/users/");
//     })
//     .catch(e => res.status(500).send(e.stack));
// });

module.exports = router;
