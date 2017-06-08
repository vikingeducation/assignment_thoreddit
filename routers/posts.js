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



module.exports = router;