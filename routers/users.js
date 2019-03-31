var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var User = mongoose.model('User');

const session = require("express-session");

let onIndex = () => {

}


router.get('/logout', (req, res) => {
  req.session.username = '';
  req.session.email = '';
  res.redirect('/');
});

router.post('/', (req, res) => {
  req.session.username = req.body.username;
  req.session.email = req.body.email;
  res.redirect('/');
});

router.get('/', (req, res) => {
  if (req.session.username && req.session.email) {
    // res.render('users/index', {users})
    User.find()
      .then(users => {
        res.render('users/index', { users });
      })
      .catch(e => res.status(500).send(e.stack));
  } else {
    res.render('users/login');
  }
});

router.get('/users/:id/edit', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.render('users/edit', { user });
    })
    .catch(e => e.status(500).send(e.stack));
});


router.put('/users/:id', (req, res) => {
  let userParams = {
    fname: req.body.firstname,
    lname: req.body.lastname,
    username: req.body.username,
    email: req.body.email
  };

  User.findByIdAndUpdate(req.params.id, userParams)
    .then(user => {
      req.method = 'GET';
      res.redirect(`/users/${user.id}`);
    })
    .catch(e => e.status(500).send(e.stack));
});

router.get('/users/new', (req, res) => {
  res.render('users/new');
});

router.post('/users', (req, res) => {
  let userParams = {
    fname: req.body.firstname,
    lname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
  };

  let user = new User(userParams);

  user.save()
    .then(user => {
      res.redirect(`/users/${user.id}`)
    })
    .catch(e=> e.status(500).send(e.stack));
});

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.render('users/show', { user });
    })
    .catch(e => e.status(500).send(e.stack));
});

router.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      req.method = "GET";
      res.redirect("/");
    })
    .catch(e => e.status(500).send(e.stack));
});

module.exports = router;
