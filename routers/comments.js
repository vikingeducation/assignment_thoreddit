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

   const saveCommentToPost = (commentParams) => {
      let newComment = Comment.create(commentParams);
      let parentPost = newComment.then((comment) => {
         return Post.findById(parentId);
      });
   
      return Promise.all([newComment, parentPost]).then(([comment, post]) => {
         let currentPostComments = post.comments || [];
         currentPostComments.push(comment._id);
   
         return Post.findByIdAndUpdate(post._id, { comments: currentPostComments });
      })
      .then((post) => {
         // retrieve comment author and update from post comments
         // not great from a modular perspective
         console.log('Updated post' + post);
         return User.findByIdAndUpdate(commentParams.author,
         { comments: post.comments });
         
      })
      .then((user) => {
         console.log('Updated user: ' + user);
         res.redirect('/');
      })
      .catch((e) => res.status(500).send(e.stack));
   };

   if (parentType === "post") {
      saveCommentToPost(commentParams);
   } 
   if (parentType === "comment") {
      // saveCommentToComment()
   }

});

module.exports = router;