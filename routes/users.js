var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', (req, res) => {
  if (req.session.username) {
    User.find({})
      .then((users) => {
        res.render('users/index', {
          users
        });
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }
});

// must be before the /:id route
router.get('/new', (req, res) => {
  if (req.session.username) {
    res.render('users/new');
  } else {
    res.redirect('/login');
  }
});

router.post('/', (req, res) => {
  if (req.session.username) {
    var user = new User({
      fname: req.body.user.fname,
      lname: req.body.user.lname,
      username: req.body.user.username,
      email: req.body.user.email
    });

    user.save()
      .then((user) => {
        res.redirect(`/users/${ user.id }`);
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }

});

router.get('/:id', (req, res) => {
  if (req.session.username) {
    User.findById(req.params.id)
      .then((user) => {
        res.render('users/show', {
          user
        });
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }

});



router.delete('/:id', (req, res) => {
  if (req.session.username) {
    User.findByIdAndRemove(req.params.id)
      .then(() => {
        req.method = 'GET';
        res.redirect('/users');
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }


});

router.get('/:id/edit', (req, res) => {
  if (req.session.username) {
    User.findById(req.params.id)
      .then((user) => {
        res.render('users/edit', {
          user
        });
      })
      .catch((e) => res.status(500)
        .send(e.stack));
  } else {
    res.redirect('/login');
  }


});

router.put('/:id', (req, res) => {
  if (req.session.username) {
    var userParams = {
      fname: req.body.user.fname,
      lname: req.body.user.lname,
      username: req.body.user.username,
      email: req.body.user.email
    };

    User.findByIdAndUpdate(req.params.id, userParams)
      .then((user) => {
        req.method = 'GET';
        res.redirect(`/users/${ user.id }`);
      })
      .catch((e) => res.status(500)
        .send(e.stack));

  } else {
    res.redirect('/login');
  }


});

module.exports = router;
