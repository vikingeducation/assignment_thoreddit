const express = require('express');
const mongoose = require('mongoose');
const models = require('./../models');

const router = express.Router();
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const Vote = mongoose.model('Vote');

// New
router.get('/:id/new', (req, res) => {
  let parentType;
  Comment.findById(req.params.id).then(comment => {
    if (comment) {
      parentType = 'comment';
      res.render('comments/new', { comment, parentType });
    } else {
      Post.findById(req.params.id).then(post => {
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

// Upvote
router.get(
  '/:id/up',
  (req, res, next) => {
    Vote.findOne({
      user: req.session.currentUser.id,
      comment: req.params.id
    })
      .then(vote => {
        if (vote) {
          if (vote.count === 1) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              comment: req.params.id,
              count: 0
            })
              .then(() => {
                return Comment.findByIdAndUpdate(req.params.id, {
                  $inc: { score: -1 }
                });
              })
              .then(() => {
                next();
              });
          } else if (vote.count === 0) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              comment: req.params.id,
              count: 1
            })
              .then(() => {
                return Comment.findByIdAndUpdate(req.params.id, {
                  $inc: { score: 1 }
                });
              })
              .then(() => {
                next();
              });
          } else if (vote.count === -1) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              comment: req.params.id,
              count: 1
            })
              .then(() => {
                return Comment.findByIdAndUpdate(req.params.id, {
                  $inc: { score: 2 }
                });
              })
              .then(() => {
                next();
              });
          }
        } else {
          const vote = new Vote({
            user: req.session.currentUser.id,
            comment: req.params.id,
            count: 1
          });

          vote.save().then(() => {});
          return Comment.findByIdAndUpdate(req.params.id, {
            $inc: { score: 1 }
          });
        }
      })
      .then(() => {
        next();
      });
  },
  (req, res) => {
    res.redirect('back');
  }
);

// Downvote
router.get(
  '/:id/down',
  (req, res, next) => {
    Vote.findOne({
      user: req.session.currentUser.id,
      comment: req.params.id
    })
      .then(vote => {
        if (vote) {
          if (vote.count === -1) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              comment: req.params.id,
              count: 0
            })
              .then(() => {
                return Comment.findByIdAndUpdate(req.params.id, {
                  $inc: { score: 1 }
                });
              })
              .then(() => {
                next();
              });
          } else if (vote.count === 0) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              comment: req.params.id,
              count: -1
            })
              .then(() => {
                return Comment.findByIdAndUpdate(req.params.id, {
                  $inc: { score: -1 }
                });
              })
              .then(() => {
                next();
              });
          } else if (vote.count === 1) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              comment: req.params.id,
              count: -1
            })
              .then(() => {
                return Comment.findByIdAndUpdate(req.params.id, {
                  $inc: { score: -2 }
                });
              })
              .then(() => {
                next();
              });
          }
        } else {
          const vote = new Vote({
            user: req.session.currentUser.id,
            comment: req.params.id,
            count: -1
          });

          vote.save().then(() => {});
          return Comment.findByIdAndUpdate(req.params.id, {
            $inc: { score: -1 }
          });
        }
      })
      .then(() => {
        next();
      });
  },
  (req, res) => {
    res.redirect('back');
  }
);

module.exports = router;
