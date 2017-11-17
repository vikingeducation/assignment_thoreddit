var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var models = require('./../models');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var ChildComment = mongoose.model('ChildComment');
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
      Comment.find({
        parent: new ObjectId(post._id)
      })
        .populate('author')
        .populate('parent')
        .sort({ score: -1 })
        .then(async comments => {
          for (let comment of comments) {
            const childComments = await ChildComment.find({
              parent: comment._id
            })
              .populate('author')
              .populate('comment');
            comment.children = childComments;
          }
          console.log('Comments: ' + comments);
          res.render('posts/show', { post, comments });
        });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get('/:id/comment', (req, res) => {
  var parentType = 'Post';
  Post.findById(req.params.id).populate('parent_post').then(parent => {
    console.log('Parent post: ' + parent.id);
    // parent.parent_post.id = parent.id;
    res.render('comments/new', { parentType, parent });
  });
});

router.get('/:id/comment/:commentID', (req, res) => {
  var parentType = 'Comment';
  Comment.findById(req.params.commentID)
    .populate('parent_post')
    .then(parent => {
      console.log('Parent id: ' + parent.parent_post.id);
      res.render('comments/new', { parentType, parent });
    });
});

router.post('/:id', (req, res) => {
  //save comment to db

  //redirect to post page
  res.render('posts/show');
});

module.exports = router;
