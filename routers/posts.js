var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var models = require('./../models');
var Post = mongoose.model('Post');
var ObjectId = require('mongoose').Types.ObjectId;

// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {
  Post.find()
    .populate('author')
    .then(posts => {
      res.render('posts/index', { posts });
    })
    .catch(e => res.status(500).send(e.stack));
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
  Post.findById(req.params.id)
    .populate('author')
    .then(post => {
      res.render('posts/show', { post });
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Create
// ----------------------------------------
router.post('/', (req, res) => {
  var post = new Post({
    title: req.body.post.title,
    body: req.body.post.body,
    author: req.session.currentUser.id
  });

  post.save()
    .then(post => {
      res.redirect(`/posts/${ post.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});

module.exports = router;