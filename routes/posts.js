var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

/* GET users listing. */
router.get('/', (req, res) => {
  if (req.session.username) {
    Post.find({})
      .populate('_author')
      .then((posts) => {
        res.render('posts/index', {
          posts
        });
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

// must be before the /:id route
router.get('/new', (req, res) => {
  if (req.session.username) {
    res.render('posts/new');
  } else {
    res.redirect('/login');
  }
});

router.post('/', (req, res) => {
  if (req.session.username) {
    var post = new Post({
      title: req.body.post.title,
      body: req.body.post.body,
      _author: req.session._id
    });

    post.save()
      .then((post) => {
        res.redirect(`/posts/${ post._id }`);
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

router.get('/:id', (req, res) => {
  if (req.session.username) {
    Post.findById(req.params.id)
      .populate('_author')
      .then((post) => {
        res.render('posts/show', {
          post
        });
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

router.get('/:id/edit', (req, res) => {
  if (req.session.username) {
    Post.findById(req.params.id)
      .then((post) => {
        res.render('posts/edit', {
          post
        });
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

router.get('/:id/up', (req, res) => {
  if (req.session.username) {
    Post.findById(req.params.id)
      .then((post) => {
        post.voteUp(req.session.username);
        res.redirect(`/posts/${ post._id }`);
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

router.get('/:id/down', (req, res) => {
  if (req.session.username) {
    Post.findById(req.params.id)
      .then((post) => {
        post.voteDown(req.session.username);
        res.redirect(`/posts/${ post._id }`);
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

router.put('/:id', (req, res) => {
  if (req.session.username) {
    var params = {
      title: req.body.post.title,
      body: req.body.post.body
    };

    Post.findByIdAndUpdate(req.params.id, params)
      .then((post) => {
        req.method = 'GET';
        res.redirect(`/posts/${ post._id }`);
      })
      .catch((e) => res.status(500)
        .send(e.stack));

  } else {
    res.redirect('/login');
  }


});

module.exports = router;
