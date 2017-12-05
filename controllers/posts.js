const express = require('express');
const mongoose = require('mongoose');
const models = require('./../models');

const router = express.Router();
// const User = mongoose.model('User');
const Post = mongoose.model('Post');

// Index
router.get('/', (req, res) => {
  Post.find()
    .populate('author')
    .then(posts => {
      res.render('posts/index', { posts });
    })
    .catch(e => res.status(500).send(e.stack));
});

// New
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// Show

// Create
router.post('/', (req, res) => {
  const post = new Post({
    title: req.body.post.title,
    body: req.body.post.body,
    author: req.body.post.author
  });

  post
    .save()
    .then(post => {
      res.redirect('/posts');
      // res.redirect(`/posts/${post.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
