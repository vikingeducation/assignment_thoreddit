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
      .limit(20)
      .populate('author')
      .populate({
          path: 'comments',
          populate: { path: 'author' }
      })
      .sort({ createdAt: -1 })
      .then((posts) => {
         // get author's name for each POST
         posts.forEach((post) => {
            if (post.author[0]) {
               post.displayUsername = post.author[0].username;
            }

            // console.log(`Post.comments: ${post.comments}`);
            // retrieve comments for each post
            post.displayComments = [];
            
            post.comments.forEach((comment) => {
               
                  
               // retrieve comment info and author username
               if (comment) {
                  comment.displayUsername = comment.author[0].username;
                  post.displayComments.push(comment);
               };
            });
         });

         res.render('posts/index', { posts });
      })
      .catch((e) => res.status(500).send(e.stack));
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
   
   Post.create(newPost)
   .then((post) => {
      // Save new post to User model
      return User.findById(post.author);
   })
   .then((user) => {
      let currentPosts = user.posts || [];
      currentPosts.push(post._id);
      return User.findByIdAndUpdate(user._id, { posts: currentPosts });
   })
   .then((user) => {
      res.redirect('/');
   })
   .catch((e) => res.status(500).send(e.stack));
});

module.exports = router;