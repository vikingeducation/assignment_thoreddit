const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Vote = mongoose.model('Vote');
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

// ----------------------------------------
// Upvote
// ----------------------------------------
router.get('/:id/upvote', (req, res, next) => {

  Vote.findOne({
    commentId: req.params.id,
    userId: req.session.currentUser.id
    })
    // first tries to match a pre-existing vote
    .then(vote => {
      if (vote) {
        let amount = vote.amount;
        if (amount === 1) {
          next();
        } else if (amount === 0) {
          // if 0, update to 1, then find related comment and increase score by 1
          Vote.findOneAndUpdate({
            commentId: req.params.id,
            userId: req.session.currentUser.id,
            amount: 1
          })
          .then(() => {
            return Comment.findByIdAndUpdate(req.params.id, {
              $inc: { score: 1}
            });
          })
          .then(() => {
            next();
          });
        } else if (amount === -1) {
          // if -1, update to 1, then find related comment and increase score by 2
          Vote.findOneAndUpdate({
            commentId: req.params.id,
            userId: req.session.currentUser.id,
            amount: 1
          })
          .then(() => {
            return Comment.findByIdAndUpdate(req.params.id, {
              $inc: { score: 2}
            });
          })
          .then(() => {
            next();
          });
        }
      } else {
        // if no match, create new vote
        let vote = new Vote({
                commentId: req.params.id,
                userId: req.session.currentUser.id,
                amount: 1
        }).save()
          .then(() => {});
            return Comment.findByIdAndUpdate(req.params.id, {
              $inc: { score: 1}
          });
      }
    })
    .then(() => {
      next();
    });
    
}, (req, res) => {
  res.redirect("back");
});

// ----------------------------------------
// Downvote
// ----------------------------------------
router.get('/:id/downvote', (req, res, next) => {

  Vote.findOne({
    commentId: req.params.id,
    userId: req.session.currentUser.id
    })
    // first tries to match a pre-existing vote
    .then(vote => {
      if (vote) {
        let amount = vote.amount;
        if (amount === -1) {
          next();
        } else if (amount === 0) {
          // if 0, update to 1, then find related comment and increase score by 1
          Vote.findOneAndUpdate({
            commentId: req.params.id,
            userId: req.session.currentUser.id,
            amount: -1
          })
          .then(() => {
            return Comment.findByIdAndUpdate(req.params.id, {
              $inc: { score: -1}
            });
          })
          .then(() => {
            next();
          });
        } else if (amount === 1) {
          // if -1, update to 1, then find related comment and increase score by 2
          Vote.findOneAndUpdate({
            commentId: req.params.id,
            userId: req.session.currentUser.id,
            amount: -1
          })
          .then(() => {
            return Comment.findByIdAndUpdate(req.params.id, {
              $inc: { score: -2}
            });
          })
          .then(() => {
            next();
          });
        }
      } else {
        // if no match, create new vote
        let vote = new Vote({
                commentId: req.params.id,
                userId: req.session.currentUser.id,
                amount: -1
        }).save()
          .then(() => {});
            return Comment.findByIdAndUpdate(req.params.id, {
              $inc: { score: -1}
          });
      }
    })
    .then(() => {
      next();
    });
    
}, (req, res) => {
  res.redirect("back");
});

module.exports = router;