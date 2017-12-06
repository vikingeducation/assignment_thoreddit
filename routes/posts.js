var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models');
let User = mongoose.model('User');
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

  let commentFinder = (commentable) => {
    if (commentable.childIds.length !== 0) {
      console.log(commentable);
      commentable.populate("childIds");
      commentable.childIds.map(comment => {
        return commentFinder(comment)
      })
    }
    return commentable;
  }

  Post.findById(req.params.id)
    .populate("childIds")
    .then(post => {
      // post = commentFinder(post);
      console.log(post);
      res.render('posts/show', {post});
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post('/', (req, res) => {
	console.log(req.body);
    
    let user = User.find({
        $where: `this.username === ${req.session.username}`
    });
    user
        .then(user => {
  var post = new Post({
    title: req.body['post[title]'],
      body: req.body['post[body]'],
      userId: user.id,
      childIds: []
  });

  post
    .save()
      .then(post => {
      res.redirect(`/posts/${post.id}`);
    })
      .catch(e => res.status(500).send(e.stack));
    })
    .catch(e=> res.status(500).send(e.stack));
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
