var express = require('express');
var router = express.Router();
var models = require('./../models');
var { User, Post, Comment } = models;

router.get('/users', (req, res) => {
	User.find()
		.then(users => {
			res.render('users/index', { users });
		})
		.catch(e => res.status(500).send(e.stack));
});

router.get('/users/:id', (req, res) => {
	let id = req.params.id;
	User.findById(id)
		.then(user => {
			res.render('users/show', { user });
		})
		.catch(e => res.status(500).send(e.stack));
});

module.exports = router;
