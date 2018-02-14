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
      console.log(req.session.databaseId);
      res.redirect('/');
   } else {
      console.log(req.session.databaseId);
      let username = req.body.user.username;
      let email = req.body.user.email;

      // confirm that user information is correct
      User.findOne({ "username": username, "email": email }, (err, user) => {
         if (err) {
            // Add some sort of error message
            res.redirect('/sessions/login');
            res.status(200).send(err);
         }
         // getting error that ._id is null - not sure why if (err) above isn't catching it
         // is it okay to save database variable in session?
         req.session.databaseId = user._id || [];

         // redirect to main index
         res.redirect('/');
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
