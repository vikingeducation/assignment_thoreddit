const express = require('express');
const router = express.Router();
const { User } = require('./../models');

router.get('/', (req, res) => {
   res.render('home');
});

router.post('/insert-test', (req, res) => {
   User.findById(req.user._id, (err, user) => {
      if (err) throw new Error(err);

      // First, create post with assigned author
      const newPost = {
         title: req.body.title,
         text: req.body.text,
         rating: 0,
         author: req.user._id
      };

      Post.create(newPost, (err, post) => {
         if(err) {
            res.redirect('/');
            throw new Error(err);
         }

         // Once post is created, assign post
         // to user as well
         users.posts.push(newPost);
         user.save((err) => {
            if (err) throw new Error(err);
            return res.redirect(`/posts/${post.id}`);
         });
      });
   });
});

module.exports = router;