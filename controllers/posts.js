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
  const user = req.session.currentUser.id;
  Post.find()
    .populate('author')
    .then(posts => {
      const formattedPosts = formatPosts(posts, user);
      res.render('posts/index', {
        posts: formattedPosts
      });
    })
    .catch(e => res.status(500).send(e.stack));
});

// New
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// Edit
router.get('/:id/edit', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.render('posts/edit', { post });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
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

// Update
router.put('/:id', (req, res) => {
  const postParams = req.body.post;

  Post.findByIdAndUpdate(req.params.id, {
    title: postParams.title,
    body: postParams.body
  })
    .then(post => {
      req.method = 'GET';
      res.redirect(`/posts/${post.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// Delete
router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => {
      req.method = 'GET';
      res.redirect('/posts');
    })
    .catch(e => res.status(500).send(e.stack));
});

// Upvote
router.get(
  '/:id/up',
  (req, res, next) => {
    Vote.findOne({
      user: req.session.currentUser.id,
      post: req.params.id
    })
      .then(vote => {
        if (vote) {
          if (vote.count === 1) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              post: req.params.id,
              count: 0
            })
              .then(() => {
                return Post.findByIdAndUpdate(req.params.id, {
                  $inc: { score: -1 }
                });
              })
              .then(() => {
                next();
              });
          } else if (vote.count === 0) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              post: req.params.id,
              count: 1
            })
              .then(() => {
                return Post.findByIdAndUpdate(req.params.id, {
                  $inc: { score: 1 }
                });
              })
              .then(() => {
                next();
              });
          } else if (vote.count === -1) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              post: req.params.id,
              count: 1
            })
              .then(() => {
                return Post.findByIdAndUpdate(req.params.id, {
                  $inc: { score: 2 }
                });
              })
              .then(() => {
                next();
              });
          }
        } else {
          const vote = new Vote({
            user: req.session.currentUser.id,
            post: req.params.id,
            count: 1
          });

          vote.save().then(() => {});
          return Post.findByIdAndUpdate(req.params.id, {
            $inc: { score: 1 }
          });
        }
      })
      .then(() => {
        next();
      });
  },
  (req, res) => {
    res.redirect('back');
  }
);

// Downvote
router.get(
  '/:id/down',
  (req, res, next) => {
    Vote.findOne({
      user: req.session.currentUser.id,
      post: req.params.id
    })
      .then(vote => {
        if (vote) {
          if (vote.count === -1) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              post: req.params.id,
              count: 0
            })
              .then(() => {
                return Post.findByIdAndUpdate(req.params.id, {
                  $inc: { score: 1 }
                });
              })
              .then(() => {
                next();
              });
          } else if (vote.count === 0) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              post: req.params.id,
              count: -1
            })
              .then(() => {
                return Post.findByIdAndUpdate(req.params.id, {
                  $inc: { score: -1 }
                });
              })
              .then(() => {
                next();
              });
          } else if (vote.count === 1) {
            Vote.findByIdAndUpdate(vote.id, {
              user: req.session.currentUser.id,
              post: req.params.id,
              count: -1
            })
              .then(() => {
                return Post.findByIdAndUpdate(req.params.id, {
                  $inc: { score: -2 }
                });
              })
              .then(() => {
                next();
              });
          }
        } else {
          const vote = new Vote({
            user: req.session.currentUser.id,
            post: req.params.id,
            count: -1
          });

          vote.save().then(() => {});
          return Post.findByIdAndUpdate(req.params.id, {
            $inc: { score: -1 }
          });
        }
      })
      .then(() => {
        next();
      });
  },
  (req, res) => {
    res.redirect('back');
  }
);

module.exports = router;
