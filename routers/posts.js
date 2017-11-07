var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var models = require('./../models');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
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
// Show
// ----------------------------------------
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .populate('author')
    .then(post => {
      console.log('Post: ' + post);
      Comment.find({
        parent: new ObjectId(post._id)
      })
        .populate('author')
        .then(comments => {
          console.log('Comments: ' + comments);
          res.render('posts/show', { post, comments });
        });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
