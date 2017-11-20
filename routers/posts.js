var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var models = require('./../models');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Votable = mongoose.model('Votable');
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
              .populate('parent')
              .sort({ score: -1 });
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

router.post('/:id', async (req, res) => {
  //save comment to db
  const parentComment = await Votable.findById(req.params.id)
    .populate('author')
    .populate('parent_post');

  console.log('Parent Comment' + parentComment);

  var commentText = req.body.comment;
  console.log('Comment Text: ' + req.body.comment);

  const user = await User.find({
    username: req.session.currentUser.username
  });
  console.log('Current User: ' + user);
  // console.log('User: ' + req.session.currentUser.username);

  //parent is votable ObjectId
  //parent_post is votable parent_post
  //author is from session

  //make comment or childcomment depending on level
  var comment;
  if (parentComment.id === parentComment.parent_post.id) {
    comment = new Comment({
      body: req.body.comment,
      author: new ObjectId(user.id),
      parent: new ObjectId(parentComment.id),
      score: 50,
      parent_post: parentComment.parent_post
    });
  } else {
    comment = new ChildComment({
      body: req.body.comment,
      author: new ObjectId(user.id),
      parent: new ObjectId(parentComment.id),
      score: 50,
      parent_post: parentComment.parent_post
    });
  }

  // comment.parent_post = comment.parentComment.parent_post;
  //redirect to post page
  comment
    .save()
    .then(comment => {
      res.redirect(`${comment.parent_post.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
  // res.render('posts/show');
  // res.redirect(`posts/${comment.parent_post.id}`);
});

module.exports = router;
