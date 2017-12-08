var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models');
let User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res) {
  User.find({})
    .then(users => {
      res.render('users/index', {users});
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/new', (req, res) => {
  res.render('users/new');
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.render('users/show', {user});
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post('/', (req, res) => {
	console.log(req.body);
  var user = new User({
    username: req.body['user[username]'],
  });

  user
    .save()
    .then(user => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      req.method = 'GET';
      res.redirect('/users');
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.render('users/edit', {user});
    })
    .catch(e => res.status(500).send(e.stack));
});

router.put('/:id', (req, res) => {
	console.log(req.body, userParams);
  var userParams = {
    username: req.body['user[username]'],
  };

  User.findByIdAndUpdate(req.params.id, userParams)
    .then(user => {
      req.method = 'GET';
      res.redirect(`/users/${user.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
