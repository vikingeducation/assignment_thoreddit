const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../models');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

router.get('/', (req, res) => {
  Post.find().populate('user')
    .then(posts => {
      res.render('posts/index', {posts})
    })
})

router.get('/new', (req, res) => {
  res.render('posts/new');
});

router.post('/', (req, res) => {
  User.find().limit(1)
    .then(user => {
      user = user[0]
      Post.create({
        user: user,
        title: req.body.title,
        body: req.body.body
      })
          res.redirect('/posts')
    })
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id).populate('user')
    .then(post => {
      res.render('posts/show', { post });
    })
});


module.exports = router;
