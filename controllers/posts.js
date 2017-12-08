const express = require('express');
const mongoose = require('mongoose');
const models = require('./../models');
const { formatPosts } = require('./../helpers/post-helper');

const router = express.Router();
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const Vote = mongoose.model('Vote');

// Index
router.get('/', (req, res) => {
  Post.find()
    .populate('author')
    .then(posts => {
      const formattedPosts = formatPosts(posts);
      res.render('posts/index', { posts: formattedPosts });
    })
    .catch(e => res.status(500).send(e.stack));
});

// New
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// Show
router.get('/:id', (req, res) => {
  const p1 = Post.findById(req.params.id).populate('author');
  const p2 = Comment.find({
    post: req.params.id
  }).populate([
    {
      path: 'children',
      populate: [
        {
          path: 'children',
          populate: {
            path: 'author'
          }
        },
        {
          path: 'author'
        }
      ]
    },
    {
      path: 'author'
    }
  ]);

  Promise.all([p1, p2])
    .then(values => {
      const post = values[0];
      const comments = values[1];
      res.render('posts/show', { post, comments });
    })
    .catch(e => res.status(500).send(e.stack));
});

// Create
router.post('/', (req, res) => {
  User.findOne({ username: req.session.currentUser.username }).then(user => {
    const post = new Post({
      title: req.body.post.title,
      body: req.body.post.body,
      author: user,
      score: 0
    });

    post
      .save()
      .then(post => {
        res.redirect(`/posts/${post.id}`);
      })
      .catch(e => res.status(500).send(e.stack));
  });
});

module.exports = router;
