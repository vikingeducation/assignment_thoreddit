const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("./../models");
let Post = mongoose.model("Post");
let Vote = mongoose.model("Vote");
let User = mongoose.model("User");

//index route
router.get("/", (req, res) => {
  Post.find().then(posts => {
    let shortPosts = [];
    posts.forEach((post, index) => {
      shortPosts.push({createdAt: post.createdAt, shortTitle: post.shortTitle, shortBody: post.shortBody, username: post.username, id: post.id});
    });
    return res.render("./posts/index", {posts: shortPosts});
  }).catch(e => res.status(500).send(e.stack));
});

//show route
router.get("/show/:id", (req, res) => {
  let id = req.params.id;
  Post.findById(id).populate("votes").populate("user").populate("children").then(post => {
    console.log(`post = ${post}`);
    return res.render("./posts/show", { post, comments: post.children});
  }).catch(e => res.status(500).send(e.stack));
});

router.get("/:postId/upvote", (req, res) => {
  User.findOne().then(user => {
    let vote = new Vote({user: user, voteType: true})
    Post.findById(req.params.postId)
    .then(post => {
      post.updateVote = vote;
      return res.redirect(`/posts/show/${req.params.postId}`);
    })
  })
})

router.get("/:postId/downvote", (req, res) => {
  User.findOne().then(user => {
    let vote = new Vote({user: user, voteType: false})
    Post.findById(req.params.postId)
    .then(post => {
      // console.log(post);
      // console.log(`vote= ${vote}`);
      post.updateVote = vote;
      return res.redirect(`/posts/show/${req.params.postId}`);
    })
  })
})

// //edit post route
// router.get("/:id/edit", (req, res) => {
//   let id = req.params.id;
//   User.findById(id)
//     .then(user => {
//       return res.render("./users/edit", { user });
//     })
//     .catch(e => res.status(500).send(e.stack));
// });

//LATER

//new Post page

//create endpoint
// router.put("/new", (req, res) => {
//   var postParams = {
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
