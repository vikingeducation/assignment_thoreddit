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
  const parentComment = await Votable.findById(req.params.id)
    .populate('author')
    .populate('parent_post');

  const user = await User.find({
    username: req.session.currentUser.username
  });
  console.log('commenting user: ' + user);

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

  comment
    .save()
    .then(comment => {
      res.redirect(`${comment.parent_post.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/upvote/:id', async (req, res) => {
  const votableTarget = await Votable.findById(req.params.id);

  votableTarget.upvote(req.session.currentUser.username);
  res.redirect('back');
});

router.get('/downvote/:id', async (req, res) => {
  const votableTarget = await Votable.findById(req.params.id);
  votableTarget.downvote(req.session.currentUser.username);
  res.redirect('back');
});

module.exports = router;
