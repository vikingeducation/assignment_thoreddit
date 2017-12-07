const express = require('express');
const mongoose = require('mongoose');
const models = require('./../models');

const router = express.Router();
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

// New
router.get('/:id/new', (req, res) => {
  let parentType;
  Comment.findById(req.params.id)
    // .populate('author')
    // .populate('parent')
    .then(comment => {
      if (comment) {
        parentType = 'comment';
        res.render('comments/new', { comment, parentType });
      } else {
        Post.findById(req.params.id)
          // .populate('author')
          .then(post => {
            let comment = {
              body: post.body,
              author: post.author,
              post: post.id
            };
            parentType = 'post';
            res.render('comments/new', { comment, parentType });
          });
      }
    });
});

// Create
router.post('/', (req, res) => {
  let comment;

  User.findOne({ username: req.session.currentUser.username }).then(user => {
    if (req.body.comment.parent) {
      comment = new Comment({
        body: req.body.comment.body,
        author: user,
        post: req.body.comment.post,
        parent: req.body.comment.parent,
        score: 0
      });
    } else {
      comment = new Comment({
        body: req.body.comment.body,
        author: user,
        post: req.body.comment.post,
        score: 0
      });
    }

    comment
      .save()
      .then(comment => {
        if (req.body.comment.parent) {
          return Comment.findByIdAndUpdate(req.body.comment.parent, {
            $push: { children: comment }
          });
        }
      })
      .then(() => {
        res.redirect(`/posts/${req.body.comment.post}`);
      })
      .catch(e => res.status(500).send(e.stack));
  });
});

module.exports = router;
