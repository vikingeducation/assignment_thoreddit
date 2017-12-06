var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var Post = mongoose.model('Post');

router.get('/', (req, res, next) => {
  Post.find().then(posts => {
      res.render('posts/postsIndex', { posts });
    })
    .catch((e) => res.status(500).send(e.stack));

})


router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.render('posts/show', { post });
    })
    .catch((e) => res.status(500).send(e.stack));
});


module.exports = router;