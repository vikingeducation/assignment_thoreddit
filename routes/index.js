var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.username) {
    res.render('index', {
      title: 'Thorredit',
      user: req.session.username,
      email: req.session.email
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/login', function(req, res, next) {
  if (req.session.username) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'Thorredit Login',
    });
  }
});

router.post('/login', function(req, res, next) {
  if (req.body.username && req.body.email) {
    req.session.username = req.body.username;
    req.session.email = req.body.email;
  } else {
    res.redirect('/login');
  }
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.session.username = null;
  req.session.email = null;
  res.redirect('/login');
});


module.exports = router;
