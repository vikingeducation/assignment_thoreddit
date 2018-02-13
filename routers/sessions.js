const express = require('express');
const router = express.Router();
// can I destructure models?
const models = require('./../models');
const User = models.User;

// LOG IN
// GET log in form
router.get('/login', (req, res) => {
   let session = req.session;
   console.log(session);
   res.render('sessions/login');
});

// POST log in form information
router.post('/login', (req, res) => {
   let session = req.session;
   console.log(session);
   // confirm that user information is correct
   // redirect to main index
   res.redirect('/');
});

// Log out given user
router.get('/logout', (req, res) => {
   // remove session information
   res.redirect('/login');
});


module.exports = router;
