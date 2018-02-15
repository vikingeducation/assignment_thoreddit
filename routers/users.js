const express = require('express');
const router = express.Router();
const { User } = require('./../models');

// Show all users
router.get('/', (req, res) => {
   User.find()
   .then((users) => {
      res.render('users/index', { users });
   })
   .catch((e) => res.status(500).send(e.stack));
});

// Create new user - FORM
router.get('/new', (req, res) => {
   res.render('users/new');
});

// Create new user - REQUEST
router.post('/new', (req, res) => {
   
   let newUser = {
      fname: req.body.user.fname,
      lname: req.body.user.lname,
      username: req.body.user.username,
      email: req.body.user.email
   };
  
   User.find().or([{ username: newUser.username }, { email: newUser.email }])

   .then((user) => {
      // if a user exists with either the same username or email,
      // notify user and retry
      if (user) {
         console.log('User already exists: ' + user);
         // show error message
         res.redirect('/users/new');

      } else {
         console.log('You can create your new user now.');
         res.redirect('/');
      }
   })
   .catch((e) => res.status(500).send(e.stack));
   

});

// Show an individual user
router.get('/:id', (req, res) => {
   User.findById(req.params.id)
   .then((user) => {
      user.id = req.params.id,
      res.render('users/show', { user })
   })
   .catch((e) => res.status(500).send(e.stack)); 
});   


// Edit user
// Get edit form
router.get('/:id/edit', (req, res) => {
   User.findById(req.params.id)
   .then((user) => {
      res.render('users/edit', { user });
   })
   .catch((e) => res.status(500).send(e.stack));
});

router.put('/:id', (req, res) => {
   let updatedUser = {
      fname: req.body.user.fname,
      lname: req.body.user.lname,
      username: req.body.user.username,
      email: req.body.user.email
   };

   User.findOneAndUpdate(req.params.id, updatedUser)
   .then(() => {
      res.redirect(`/users/${req.params.id}`);
   })
   .catch((e) => res.status(500).send(e.stack));
});


// Delete user
router.delete('/:id', (req, res) => {
   let userToDelete = req.params.id;

   User.findByIdAndRemove(userToDelete)
   .then(() => {
      console.log('User deleted.');
      res.redirect('/users');
   })
   .catch((e) => res.status(500).send(e.stack));
});



// testing
router.post('/insert-test', (req, res) => {
   User.findById(req.user._id, (err, user) => {
      if (err) throw new Error(err);

      // First, create post with assigned author
      const newPost = {
         title: req.body.title,
         text: req.body.text,
         rating: 0,
         author: req.user._id
      };

      Post.create(newPost, (err, post) => {
         if(err) {
            res.redirect('/');
            throw new Error(err);
         }

         // Once post is created, assign post
         // to user as well
         users.posts.push(newPost);
         user.save((err) => {
            if (err) throw new Error(err);
            return res.redirect(`/posts/${post.id}`);
         });
      });
   });
});

module.exports = router;