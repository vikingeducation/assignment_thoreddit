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
  let postid = req.params.postid;
  let parentid = req.params.parentid;
  if (postid === parentid) {
    Post.findById(postid).then(commentable => {
      let parentType = 'post';
      res.render('comments/new', { commentable, postid, parentid, parentType });
    });
  } else {
    Comment.findById(parentid).then(commentable => {
      let parentType = 'comment';
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

  var post = new Post({
    title: req.body.post.title,
    body: req.body.post.body,
    author: req.session.currentUser,
    score: 0
  });

  post.save()
    .then(post => {
      res.redirect(`/posts/${ post.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});


// ----------------------------------------
// Post new comment
// ----------------------------------------
router.post('/newcomment', (req, res) => {
  let postid = req.body.postid;
  let parentid = req.body.parentid;

  var comment = new Comment({
    body: req.body.body,
    author: req.session.currentUser,
    score: 0
  });
  comment.save().then(() => {
    if (postid === parentid) {
      Post.findById(postid).then(post => {
        post.comments.push(comment);
        post.save().then(() => {
          res.redirect(`${postid}`);
        });
      });
    } else {
      Comment.findById(parentid).then(parentComment => {
        parentComment.comments.push(comment);
        parentComment.save().then(() => {
          res.redirect(`${postid}`);
        });
      });
    }
  });
});

module.exports = router;