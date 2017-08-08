const express = require('express');
const router = express.Router();
var models = require('./../models');
var { Post, Comment } = models;

router.get('/posts', (req, res) => {
	Post.find()
		.populate('user', 'username')
		.then(posts => {
			console.log(posts);
			res.render('posts/index', { posts });
		})
		.catch(e => res.status(500).send(e.stack));
});

router.get('/posts/:id', (req, res) => {
	let id = req.params.id;
	Post.findById(id)
		.populate([
			'user',
			'score',
			{
				path: 'comments',
				populate: [
					'user',
					'score',
					{
						path: 'comments',
						populate: [
							'user',
							'score',
							{
								path: 'comments',
								populate: ['user', 'score']
							}
						]
					}
				]
			}
		])
		.then(post => {
			res.render('posts/show', { post });
		})
		.catch(e => res.status(500).send(e.stack));
});

router.get('/comments/:id', (req, res) => {
	let id = req.params.id;
	Comment.findById(id)
		.populate([
			'user',
			'score',
			{
				path: 'comments',
				populate: ['user', 'score']
			}
		])
		.then(comment => {
			res.render('comments/loadAsync', {
				comments: comment.comments.length > 0 ? comment.comments : null,
				layout: false
			});
		});
});

module.exports = router;
