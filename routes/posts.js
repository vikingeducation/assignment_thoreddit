var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

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

// must be before the /:id route
// this is to block people going to page directly with no post ID'd
router.get('/comment', (req, res) => {
  if (req.session.username) {
    res.redirect('/posts');
  } else {
    res.redirect('/login');
  }
});

// this is the path to add a comment to a comment
// keep before adding to post due to routes
router.get('/comment/add/:post_id/:comment_id', (req, res) => {
  if (req.session.username) {
    Post.findById(req.params.post_id)
      .populate('_author')
      .then((post) => {
        res.render('posts/comment', {
          post: post,
          target: `/posts/comment/add/${req.params.post_id}/${req.params.comment_id}`
        });
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

// this is the correct path to add a comment to a post
router.get('/comment/:post_id', (req, res) => {
  if (req.session.username) {
    Post.findById(req.params.post_id)
      .populate('_author')
      .then((post) => {
        res.render('posts/comment', {
          post: post,
          target: `/posts/comment/add/${req.params.post_id}/${req.params.comment_id}`
        });
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

// comment on a comment
// keep before comment on post due to routes
router.post('/comment/add/:post_id/:comment_id', (req, res) => {
  if (req.session.username) {
    var comment = new Comment({
      body: req.body.comment_text,
      post: req.params.post_id
    });
    comment.save()
      .then((comment) => {
        Comment.findById(req.params.comment_id)
          .then((commentParent) => {
            commentParent.addComment(comment._id);
            req.method = 'GET';
            res.redirect(`/posts/${ req.params.post_id }`);
          })
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

// comment on a post
router.post('/comment/:post_id', (req, res) => {
  if (req.session.username) {
    var comment = new Comment({
      body: req.body.comment_text,
      post: req.params.post_id
    });
    comment.save()
      .then((comment) => {
        Post.findById(req.params.post_id)
          .then((post) => {
            post.addComment(comment._id);
            req.method = 'GET';
            res.redirect(`/posts/${ post._id }`);
          })
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});



router.get('/comment/up/:post_id/:comment_id/', (req, res) => {
  if (req.session.username) {
    Comment.findById(req.params.comment_id)
      .then((comment) => {
        comment.voteUp(req.session.username);
        res.redirect(`/posts/${ req.params.post_id }`);
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

router.get('/comment/down/:post_id/:comment_id/', (req, res) => {
  if (req.session.username) {
    Comment.findById(req.params.comment_id)
      .then((comment) => {
        comment.voteDown(req.session.username);
        res.redirect(`/posts/${ req.params.post_id }`);
      })
      .catch((e) => res.status(500)
        .send(e.stack));
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
    Post.findOne({
        _id: req.params.id
      })
      .populate({
        path: '_comments',
        populate: {
          path: '_comments'
        }
      })
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

router.delete('/:id', (req, res) => {
  if (req.session.username) {
    Post.findByIdAndRemove(req.params.id)
      .then(() => {
        req.method = 'GET';
        res.redirect('/posts');
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
