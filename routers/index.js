const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;

router.get('/', (req, res) => {
  const currentUserId = req.cookies.currentUser;

  User.findById(currentUserId)
    .then(user => {
      res.render('welcome', { name: user.name() });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/login', (req, res) => {
  res.render('sessions/login', { loginPage: true });
});

router.post('/login', (req, res) => {
  let username = req.body.username;
  let email = req.body.email;

  User.findOne({ username, email})
    .then(user => {
      if (!user) throw 'Invalid login credentials';
      res.cookie('currentUser', user.id);
      res.redirect('/');
    })
    .catch(e => {
      if (e === "Invalid login credentials") {
        req.flash('error', e);
        res.redirect('/login');
      } else {
        res.status(500).send(e.stack);
      }
    });
});

router.post('/logout', (req, res) => {
  res.clearCookie("currentUser");
  res.redirect('/login');
});

module.exports = router;
