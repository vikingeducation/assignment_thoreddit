var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var models = require('./../models');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Votable = mongoose.model('Votable');
var ChildComment = mongoose.model('ChildComment');
var ObjectId = require('mongoose').Types.ObjectId;

// ----------------------------------------
// Index
// ----------------------------------------
module.exports = app => {
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
                .populate('comment')
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

  router.post('/:id', (req, res) => {
    //save comment to db
    var parentComment = Votable.findById(req.params.id)
      .populate('author')
      .populate('parent_post')
      .then(parent => {
        console.log(parent);
      });

    var commentText = req.body.comment;
    console.log('Comment Text: ' + req.body.comment);

    console.log('User: ' + req.session.currentUser);

    //parent is votable ObjectId
    //parent_post is votable parent_post
    //author is from session

    // var comment = new Comment({
    //   body: req.body.comment_text,
    //   author: users[Math.floor(Math.random() * users.length)],
    //   parent: posts[Math.floor(Math.random() * posts.length)],
    //   score: 5
    // });
    // comment.parent_post = comment.parent;
    //redirect to post page
    res.render('posts/show');
  });

  return router;
};
