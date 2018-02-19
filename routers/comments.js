const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');

// Form for creating a comment
router.get('/new/:id/:type', (req, res) => {
   let parentId = req.params.id;
   let type = req.params.type;

   if (type === 'post') {
      Post.findById(parentId)
      .then((post) => {
         res.render('comments/new', { parent: post, id: parentId });
      })
      .catch((e) => res.status(500).send(e.stack));

   } else if (type === 'comment') {
      Comment.findById(parentId)
      .then((comment) => {
         res.render('comments/new', { parent: comment, id: parentId });
      })
      .catch((e) => res.status(500).send(e.stack));
   } else {
      res.write("Undefined parent type");
   }
   
});

// Save new comment
router.post('/new/:id', (req, res) => {
   let parentId = req.params.id;
   let _id = req.session.databaseId;
   let comment = req.body.comment;
   
   let commentParams = {
      text: comment.text,
      rating: 0,
      author: _id,
      comments: []
   };

   Comment.create(commentParams)
   .then((comment) => {
      // Save new comment to user
      return User.findById(comment.author);
   })
   .then((user) => {
      let currentComments = user.comments || [];
      currentComments.push(comment._id);
      return User.findByIdAndUpdate(user._id, { comments: currentComments})
   })
   .then((user) => {
      res.redirect('/');
   })
   .catch((e) => res.status(500).send(e.stack));
});

module.exports = router;