const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const models = require('../models');

const { User, Scoreable, Post, Comment, Score } = models;

const env = process.env.NODE_ENV || 'development';
const config = require('./config/mongo')[env];
const envUrl = process.env[config.use_env_constiable];
const localUrl = `mongodb://${config.host}/${config.database}`;
const mongoUrl = envUrl ? envUrl : localUrl;

const seeds = () => {
	// ----------------------------------------
	// Create Users
	// ----------------------------------------
	console.log('Creating Users');

	const users = [];
	const posts = [];
	const comments = [];
	for (let i = 0; i < 10; i++) {
		const user = new User({
			username: `foobar${i}`,
			email: `foobar${i}@gmail.com`,
			post: createPosts()
		});

		users.push(user);
	}

	// ----------------------------------------
	// Posts
	// ----------------------------------------
	console.log('Creating Posts');

	function createPosts() {
		const userPosts = [];
		for (let i = 0; i < 20; i++) {
			const post = new Post({
				title: 'An Awesome Post',
				body:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				score: new Score({
					value: 0,
					upVotes: 0,
					downVotes: 0
				}),
				comments: seedComments(3)
			});
			posts.push(post);
			userPosts.push(post);
		}
		return userPosts;
	}

	// ----------------------------------------
	// Comments
	// ----------------------------------------
	let _depth = 0;
	function seedComments(depth) {
		let max = Math.floor(1 + Math.random() * 10);
		let postComments = [];
		for (let i = 0; i < max; i++) {
			let newComment = new Comment({
				message:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				score: new Score({
					value: 0,
					upVotes: 0,
					downVotes: 0
				})
			});
			comments.push(newComment);
			postComments.push(newComment);
		}

		if (++_depth === depth) {
			return postComments;
		} else {
			postComments.forEach(comment => {
				comment.comments = seedComments(depth);
			});
		}
	}

	// ----------------------------------------
	// Finish
	// ----------------------------------------
	console.log('Saving...');
	const promises = [];
	[users, posts, comments].forEach(collection => {
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
