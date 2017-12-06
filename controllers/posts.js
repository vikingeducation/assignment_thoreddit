const express = require('express');
const mongoose = require('mongoose');
const models = require('./../models');

const router = express.Router();
const User = mongoose.model('User');
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
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .populate('author')
    .then(post => {
      res.render('posts/show', { post });
    })
    .catch(e => res.status(500).send(e.stack));
});

// Create
router.post('/', (req, res) => {
  User.findOne({ username: req.session.currentUser.username }).then(user => {
    const post = new Post({
      title: req.body.post.title,
      body: req.body.post.body,
      author: user,
      score: 0
    });

    post
      .save()
      .then(post => {
        res.redirect(`/posts/${post.id}`);
      })
      .catch(e => res.status(500).send(e.stack));
  });
});

module.exports = router;
