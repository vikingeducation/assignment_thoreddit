var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', (req, res) => {
  User.find({})
    .then(users => {
      res.render('users/user_index', { users });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/new', (req, res) => {
  res.render('users/new');
});

router.put('/:id', (req, res) => {
  var userParams = {
    username: req.body['user[username]'],
    email: req.body['user[email]']
  };

  User.findByIdAndUpdate(req.params.id, userParams)
    .then((user) => {
      req.method = 'GET';
      res.redirect(`/users/${ user.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});
router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render('users/edit', { user });
    })
    .catch((e) => res.status(500).send(e.stack));
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render('users/show', { user });
    })
    .catch((e) => res.status(500).send(e.stack));
});



router.post('/', (req, res) => {
  console.log(req.body);
  console.log(typeof req.body);
  var user = new User({
    username: req.body['user[username]'],
    email: req.body['user[email]']
  });

  user.save()
    .then((user) => {
      res.redirect(`/users/${ user.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});




router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      req.method = 'GET';
      res.redirect('/users');
    })
    .catch((e) => res.status(500).send(e.stack));
});



module.exports = router;