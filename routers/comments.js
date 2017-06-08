const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

// ----------------------------------------
// New comment
// ----------------------------------------
router.get('/:id/new', (req, res) => {
  Comment.findById(req.params.id)
    .populate('user')
    .then(comment => {
      if (comment) {
        res.render('comments/new', {comment});
      } else {
        Post.findById(req.params.id)
          .populate('user')
          .then(post => {
            res.render('comments/new', {
              comment: {
                body: post.body,
                user: post.user,
                post: post.id
              }
            });
          });
      }
    });
});

// ----------------------------------------
// Save comment
// ----------------------------------------
router.post('/', (req, res) => {
  let hasParent = req.body.comment.parent;
  let comment;

  if (hasParent) {
    comment = new Comment({
      body: req.body.comment.body,
      user: req.body.comment.user,
      post: req.body.comment.post,
      parent: req.body.comment.parent
    });
  } else {
    comment = new Comment({
      body: req.body.comment.body,
      user: req.body.comment.user,
      post: req.body.comment.post
    });
  }

  comment.save()
    .then((comment) => {
      if (hasParent) {
        return Comment.findByIdAndUpdate(req.body.comment.parent, {
          $push: {children: comment}
        });
      }
    })
    .then(() => {
      res.redirect(`/posts/${ req.body.comment.post }`);
    })
    .catch((e) => { res.status(500).send(e.stack); });
});

module.exports = router;