const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

router.get('/', (req, res) => {
   // if they don't have an active session, forward to sessions/login
   if(!req.session.databaseId) {
      res.redirect('/sessions/login');
   } else {
      Post.find()
      .limit(10)
      .then((posts) => {
         res.render('posts/index', { posts });
      });
   }
});


// Form for creating a new post
router.get('/new', (req, res) => {
   res.render('posts/new');
});


// Create new post on form submission
router.post('/new', (req, res) => {
   let post = req.body.post;

   // pull in user info through session info
   let _id = req.session.databaseId || [];
   
   let newPost = {
      title: post.title,
      text: post.text,
      rating: 0,
      author: _id
   };
   
   Post.create(newPost).then(function(err, post) {
      if (err) {
         res.redirect('/');
         throw new Error;
      } else {
         // save new post to User model
         User.findById(_id, function(err, user) {
            if (err) {
               console.log(err);
               res.status(500).send(err);
            }
            else {
               // user.posts.push(newPost);
               user.save(function(err) {
                  if (err) {
                     res.status(500).send(err);
                  }
               });
            }
         });
      }
   });
});

module.exports = router;