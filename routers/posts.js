const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
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
// Show
// ----------------------------------------
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.render('posts/show', { post });
    })
    .catch((e) => res.status(500).send(e.stack));
});


module.exports = router;