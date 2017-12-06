var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models');
let Post = mongoose.model('Post');

/* GET posts listing. */
router.get('/', function(req, res) {
  Post.find({})
    .then(posts => {
      res.render('posts/index', {posts});
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/new', (req, res) => {
  res.render('posts/new');
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.render('posts/show', {post});
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post('/', (req, res) => {
	console.log(req.body);
  var post = new Post({
    postname: req.body['post[postname]'],
  });

  post
    .save()
    .then(post => {
      res.redirect(`/posts/${post.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => {
      req.method = 'GET';
      res.redirect('/posts');
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/:id/edit', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.render('posts/edit', {post});
    })
    .catch(e => res.status(500).send(e.stack));
});

router.put('/:id', (req, res) => {
	console.log(req.body, postParams);
  var postParams = {
    postname: req.body['post[postname]'],
  };

  Post.findByIdAndUpdate(req.params.id, postParams)
    .then(post => {
      req.method = 'GET';
      res.redirect(`/posts/${post.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
