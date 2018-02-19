const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');

// Form for creating a comment
router.get('/new/:id', (req, res) => {
   let id = req.params.id;
   res.render('comments/new', {});
});

// Save new comment
router.post('/new/:id', (req, res) => {
   let parentId = req.params.id;


   

   let commentParams = {
      text: req.body.post.text,
      rating: 0,
      // author: ??
      comments: []
   };

   Comment.create(commentParams)
   .then((comment) => {

   })

});

module.exports = router;