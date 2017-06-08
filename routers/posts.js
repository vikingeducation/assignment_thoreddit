const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const Vote = mongoose.model('Vote');
const { trimPostInfo } = require('../services/post-helpers');

// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {
  Post.find({})
    .populate('user')
    .lean()
    .then((posts) => {
      let modPosts = trimPostInfo(posts);
      res.render('posts/index', { posts:modPosts });
    })
    .catch((e) => res.status(500).send(e.stack));
});

// ----------------------------------------
// New
// ----------------------------------------
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get('/:id', (req, res) => {
  let post = Post.findById(req.params.id).populate('user');
  let comments = Comment.find({
    post: req.params.id
    })
    // this populates query with all nested children and users
    .populate([{
      path: 'children',
      populate: [{
        path:'children',
        populate: {
          path: 'user'
        }
      }, {
        path:'user' 
      }]}, {
      path: 'user'
    }]);

  Promise.all([post, comments])
    .then(values => {
      // console.log(values[1]);
      // console.log(values[1][0]['children'][0]);
      res.render('posts/show', { 
        post: values[0], 
        comments: values[1]
      });
    })
    .catch((e) => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post('/', (req, res) => {
  let post = new Post({
    title: req.body.post.title,
    body: req.body.post.body,
    user: req.body.post.user,
  });

  post.save()
    .then(post => {
      res.redirect(`/posts/${ post.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});

// ----------------------------------------
// Upvote
// ----------------------------------------
router.get('/:id/upvote', (req, res, next) => {

  Vote.findOne({
    postId: req.params.id,
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
            postId: req.params.id,
            userId: req.session.currentUser.id,
            amount: 1
          })
          .then(() => {
            return Post.findByIdAndUpdate(req.params.id, {
              $inc: { score: 1}
            });
          })
          .then(() => {
            next();
          });
        } else if (amount === -1) {
          // if -1, update to 1, then find related comment and increase score by 2
          Vote.findOneAndUpdate({
            postId: req.params.id,
            userId: req.session.currentUser.id,
            amount: 1
          })
          .then(() => {
            return Post.findByIdAndUpdate(req.params.id, {
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
                postId: req.params.id,
                userId: req.session.currentUser.id,
                amount: 1
        }).save()
          .then(() => {});
            return Post.findByIdAndUpdate(req.params.id, {
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
    postId: req.params.id,
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
            postId: req.params.id,
            userId: req.session.currentUser.id,
            amount: -1
          })
          .then(() => {
            return Post.findByIdAndUpdate(req.params.id, {
              $inc: { score: -1}
            });
          })
          .then(() => {
            next();
          });
        } else if (amount === 1) {
          // if -1, update to 1, then find related comment and increase score by 2
          Vote.findOneAndUpdate({
            postId: req.params.id,
            userId: req.session.currentUser.id,
            amount: -1
          })
          .then(() => {
            return Post.findByIdAndUpdate(req.params.id, {
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
                postId: req.params.id,
                userId: req.session.currentUser.id,
                amount: -1
        }).save()
          .then(() => {});
            return Post.findByIdAndUpdate(req.params.id, {
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