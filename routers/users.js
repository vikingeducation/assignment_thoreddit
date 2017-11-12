const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;


// Index
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.render('users/index', { users });
    })
    .catch(e => res.status(500).semd(e.stack));
});


// New
router.get('/new', (req, res) => {
  res.render('shared/_userForm');
});


// Create
router.post('/', (req, res) => {
  var userParams = getUserParams(req);
  var user = new User(userParams);

  user.save()
    .then(user => {
      req.flash('success', `User: ${user.name()} was created successfully`);
      res.redirect(`/users/${ user.id }`);
    })
    .catch(e => res.status(500).send(e.stack));
});


// Show
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) throw "No User Found";

      res.render('users/show', { user });
    })
    .catch(e => {
      if (e === "No User Found") {
        req.flash('error', e);
        res.redirect('back');
      } else {
        res.status(500).send(e.stack);
      }
    });
});


// Edit
router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render('shared/_userForm', { user });
    })
    .catch((e) => res.status(500).send(e.stack));
});


// Update
router.put('/:id', (req, res) => {
  var userParams = getUserParams(req);

  User.findByIdAndUpdate(req.params.id, userParams, {new: true})
    .then(user => {
      req.flash('success', 'User successfully updated');
      res.redirect(`/users/${ user.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});


// Destroy
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      req.flash('success', 'User deleted updated');
      res.redirect('/users');
    })
    .catch((e) => res.status(500).send(e.stack));
});


// Functions
const getUserParams = (req) => {
  let userBody = req.body.user;

  return {
    fname: userBody.fname,
    lname: userBody.lname,
    username: userBody.username,
    email: userBody.email
  };
};

module.exports = router;
