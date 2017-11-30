const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;
const Post = models.Post;
const Comment = models.Comment;


// New
router.get('/new', (req, res) => {
  if (req.query.commentType === 'post') {
    Post.findById(req.query.originalPost)
      .then(post => {
        if (!post) throw 'No Post Found';

        res.render('comments/new', {
          commentType: 'Post',
          body: post.body,
          title: post.title,
          originalPost: req.query.originalPost
        });
      })
      .catch(e => res.status(500).send(e.stack));
  } else {
    Comment.findById(req.query.comment)
      .then(comment => {
        if (!comment) throw 'No Comment Found';

        res.render('comments/new', {
            commentType: 'Comment',
            body: comment.body,
            originalComment: comment.id,
            originalPost: req.query.originalPost
        });
      })
      .catch(e => res.status(500).send(e.stack));
  }
});


// Create
router.post('/', (req, res) => {
  let userId = req.cookies.currentUser;

  User.findById(userId)
    .then(user => {
      if (!user) throw 'No Current User - Try logging in';

      if (req.body.commentType == 'Post') {
        return Post.findById(req.body.originalPost);
      } else {
        return Comment.findById(req.body.originalComment);
      }
    })
    .then(commentable => {
      if (!commentable) throw 'Application Error - no object found';

      var comment = new Comment({
        body: req.body.body,
        user: req.cookies.currentUser,
        originalPost: req.body.originalPost
      });
      comment.save()
        .then(() => {
          commentable.comments.push(comment);
          commentable.save()
            .then(() => {
              res.redirect(`/posts/${ req.body.originalPost }`);
            });
        });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
