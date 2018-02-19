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
         res.render('comments/new', { parent: post, id: parentId, type: type });
      })
      .catch((e) => res.status(500).send(e.stack));

   } else if (type === 'comment') {
      Comment.findById(parentId)
      .then((comment) => {
         res.render('comments/new', { parent: comment, id: parentId, type: type });
      })
      .catch((e) => res.status(500).send(e.stack));
   } else {
      res.write("Undefined parent type");
   }
   
});

// Save new comment
router.post('/new/:id/:type', (req, res) => {
   let parentId = req.params.id;
   let parentType = req.params.type;
   let _id = req.session.databaseId;
   let comment = req.body.comment;
   
   let commentParams = {
      text: comment.text,
      rating: 0,
      author: _id,
      comments: []
   };


   const saveCommentToPost = () => {
      let newComment = Comment.create(commentParams);
      let parentPost = newComment.then((comment) => {
         return Post.findById(parentId);
      });

      return Promise.all([newComment, parentPost]).then(([comment, post]) => {
         console.log(`Comment: ${comment}`);
         console.log(`Post: ${post}`);

         let currentPostComments = post.comments || [];
         currentPostComments.push(comment._id);
         console.log(currentPostComments);

         return Post.findByIdAndUpdate(post._id, { comments: currentPostComments });
      })
      .then((post) => {
         console.log('Updated post' + post);
         res.redirect('/');
         // retrieve comment author
         // return User.findById(commentParams.author);
      })
      .catch((e) => res.status(500).send(e.stack));
   };

   saveCommentToPost();


   // Comment.create(commentParams)
   // .then((comment) => {
   //    var parentPost = Post.findById(parentId);

   //    console.log(parentPost);

   //    console.log('New comment: ' + comment);
   //    // Retrieve parent post
   //    return Post.findById(parentId);
   // })
   // .then((post) => {
   //    console.log(`Retrieved post: ${post}`);
   //    // save new comment to parent post
   //    let currentPostComments = post.comments || [];
      
   //    currentPostComments.push(comment._id);
   //    // do I need to return this if I don't need it in next .then() call?
   //    return Post.findByIdAndUpdate(post._id, { comments: currentPostComments });
   // })
   // .then((post) => {
   //    console.log('Updated post' + post);
   //    // retrieve comment author
   //    return User.findById(commentParams.author);
   // })
   // .then((user) => {
   //    let currentComments = user.comments || [];
   //    currentComments.push(comment._id);
   //    return User.findByIdAndUpdate(user._id, { comments: currentComments})
   // })
   // .then((user) => {
   //    console.log('Updated user' + user);
   //    res.redirect('/');
   // })
   // .catch((e) => res.status(500).send(e.stack));

});

module.exports = router;