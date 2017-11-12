const express = require('express');
const router = express.Router();
const models = require('../models');
const Post = models.Post;
const User = models.User;

// Index
router.get('/', (req, res) => {
  Post.find().populate('user')
    .then(posts => {
      res.render('posts/index', { posts });
    })
    .catch(e => res.status(500).send(e.stack));
});


// Show
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .populate('user votes')
    .populate({
      path: 'comments',
      populate: {
        path: 'votes user',
        populate: {
          path: 'user'
        }
      }
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'comments',
        populate: {
          path: 'user votes'
        }
      }
    })

    .then(post => {
      if (!post) throw "No Post Found";
      res.render('posts/show', { post });
    })
    .catch(e => {
      if (e === "No Post Found") {
        res.status(404).send(e);
      } else {
        res.status(500).send(e.stack);
      }
    });
});

module.exports = router;
