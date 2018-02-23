const express = require('express');
const router = express.Router();
// can I destructure models?
const models = require('./../models');
const User = models.User;

// LOG IN
// GET log in form
router.get('/login', (req, res) => {
   if (req.session.databaseId) {
      res.redirect('/');
   } else {
      res.render('sessions/login');
   }
   
});

// POST log in form information
router.post('/login', (req, res) => {
   if (req.session.databaseId) {
      res.redirect('/');
   } else {
      let username = req.body.user.username;
      let email = req.body.user.email;

      // confirm that user information is correct
      User.findOne({ "username": username, "email": email })
      .then((user) => {
         req.session.databaseId = JSON.stringify(user._id).slice(1, -1);
         res.redirect('/');
      })
      .catch((e) => {
         // change to error for user
         console.log("Incorrect username or email, please try again.");
         res.status(500).send(e.stack);
      });
   }
});

// Log out given user
router.get('/logout', (req, res) => {
   // remove session information
   req.session.databaseId = null;
   res.redirect('/sessions/login');
});


module.exports = router;
