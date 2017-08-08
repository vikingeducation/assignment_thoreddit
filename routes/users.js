var express = require('express');
var router = express.Router();
var models = require('./../models');
var { User, Post, Comment } = models;

router.get('/users', (req, res) => {
	Comment.find()
		.populate('user')
		.then(users => {
			console.log(users);
			res.render('users/index', { users });
		})
		.catch(e => res.status(500).send(e.stack));
});

router.post('/users', (req, res) => {
	let searchParams = {
		include: {
			model: Profile,
			include: {
				model: BasicInfo,
				where: {
					age: +req.body.basics.age
				},
				include: {
					model: Location
				}
			}
		}
	};
	console.log(searchParams);
	User.findAll({ include: { all: true, nested: true } }).then(user => {
		console.log(user);
	});
});

module.exports = router;
