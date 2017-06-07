const url = require('url');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const User = mongoose.model('User');


module.exports = (app) => {

  // Auth
  app.use((req, res, next) => {
    let reqUrl = url.parse(req.url);
    if (!req.session.currentUser &&
        !['/', '/login', '/sessions'].includes(reqUrl.pathname)) {
      res.redirect('/login');
    } else {
      next();
    }
  });


  // New
  const onNew = (req, res) => {
    if (req.session.currentUser) {
      res.redirect('/users');
    } else {
      res.render('sessions/new');
    }
  };
  router.get('/', onNew);
  router.get('/login', onNew);


  // Check user
  router.post('/sessions', (req, res) => {
    // checks database to see if user from post data exists
    User.findOne({
      username: req.body.username,
      email: req.body.email
    })
      .then((user) => {
        // if user is found, sets session.currentUser to this information and redirects to /users
        if (user) {
          req.session.currentUser = {
            username: user.username,
            email: user.email,
            id: user.id,
            _id: user._id
          };
          res.redirect('/users');
        } else {
        // else sends them back to login
          res.redirect('/login');
        }
      })
      .catch((e) => res.status(500).send(e.stack));
  });


  // Destroy
  const onDestroy = (req, res) => {
    req.session.currentUser = null;
    res.redirect('/login');
  };
  router.get('/logout', onDestroy);
  router.delete('/logout', onDestroy);

  return router;
};











