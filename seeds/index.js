const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
const mongooseeder = require('mongooseeder');
const models = require('../models');

const { User, Scoreable, Post, Comment, Score } = models;

const env = process.env.NODE_ENV || 'development';
const config = require('../config/mongo')[env];
const envUrl = process.env[config.use_env_constiable];
const localUrl = `mongodb://${config.host}/${config.database}`;
const mongoUrl = envUrl ? envUrl : localUrl;
var _depth = 0;
const seeds = () => {
	// ----------------------------------------
	// Create Users
	// ----------------------------------------
	process.stdout.write('Generating Data Structure');

	const users = [];
	const posts = [];
	const comments = [];
	const scores = [];
	for (let i = 0; i < 1; i++) {
		const newUser = new User({
			username: `foobar${i}`,
			email: `foobar${i}@gmail.com`
		});
		let userPosts = createPosts(newUser);
		newUser.posts = userPosts;
		users.push(newUser);
	}

	// ----------------------------------------
	// Posts
	// ----------------------------------------
	function createPosts(user) {
		const userPosts = [];
		for (let i = 0; i < 1; i++) {
			const newPost = new Post({
				title: 'An Awesome Post',
				body:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			});
			const newScore = new Score({
				value: 0,
				upVotes: 0,
				downVotes: 0
			});
			scores.push(newScore);

			newPost.score = newScore;
			newPost.comments = seedComments(user, newPost, 3);
			_depth = 0;

			posts.push(newPost);
			userPosts.push(newPost);
		}
		return userPosts;
	}

	// ----------------------------------------
	// Comments
	// ----------------------------------------
	function seedComments(user, post, maxDepth) {
		process.stdout.write('.');
		_depth++;
		let max = Math.floor(1 + Math.random() * 10);
		let postComments = [];
		for (let i = 0; i < max; i++) {
			let newComment = new Comment({
				user: user,
				message:
					'111Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			});
			let newScore = new Score({
				value: 0,
				upVotes: 0,
				downVotes: 0
			});
			scores.push(newScore);
			newComment.score = newScore;
			comments.push(newComment);
			postComments.push(newComment);
		}
		if (_depth === maxDepth) {
			_depth--;
			return postComments;
		} else {
			postComments.forEach(comment => {
				comment.comments = seedComments(user, post, maxDepth);
			});
		}
	}

	// ----------------------------------------
	// Finish
	// ----------------------------------------
	console.log('\nSaving...');
	const promises = [];
	users.forEach(user => console.log(user.posts));
	[users, posts, comments, scores].forEach(collection => {
		collection.forEach(model => {
			promises.push(model.save());
		});
	});
	return Promise.all(promises);
};

mongooseeder.seed({
	mongodbUrl: mongoUrl,
	models: models,
	clean: true,
	mongoose: mongoose,
	seeds: seeds
});
