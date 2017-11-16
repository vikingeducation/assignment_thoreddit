var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');

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
// New comment
// ----------------------------------------
router.get('/:postid/newcomment/:parentid', (req, res) => {
  var postid = req.params.postid;
  var parentid = req.params.parentid;

  if (postid === parentid) {
    Post.findById(postid).then(commentable => {
      var parentType = 'post';
      res.render('comments/new', { commentable, postid, parentid, parentType });
    });
  } else {
    Comment.findById(parentid).then(commentable => {
      var parentType = 'comment';
      res.render('comments/new', { commentable, postid, parentid, parentType });
    });
  }
});



// ----------------------------------------
// Show
// ----------------------------------------
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .populate({
      path: 'comments author',
      populate: {
        path: 'comments author',
        populate: {
          path: 'comments author',
          populate: {
            path: 'author'
          }
        }
      }
    })
    .then(post => {
      res.render('posts/show', { post });
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Create new post
// ----------------------------------------
router.post('/', (req, res) => {

  User.findOne({ email: req.session.currentUser.email }).then(user => {
    var post = new Post({
    title: req.body.post.title,
    body: req.body.post.body,
    author: user,
    score: 0
  });

  post.save()
    .then(post => {
      res.redirect(`/posts/${ post.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
  })
});


// ----------------------------------------
// Create new comment
// ----------------------------------------
router.post('/newcomment', (req, res) => {
  var postid = req.body.postid;
  var parentid = req.body.parentid;

  User.findOne({ email: req.session.currentUser.email }).then(user => {
    var comment = new Comment({
      body: req.body.body,
      author: user,
      score: 0
    });
    comment.save().then(() => {
      if (postid === parentid) {
        Post.findById(postid).then(post => {
          post.comments.push(comment);
          post.save().then(() => {
            res.redirect(`/posts/${postid}`);
          });
        });
      } else {
        Comment.findById(parentid).then(parentComment => {
          parentComment.comments.push(comment);
          parentComment.save().then(() => {
            res.redirect(`/posts/${postid}`);
          });
        });
      }
    });
  });
});

module.exports = router;