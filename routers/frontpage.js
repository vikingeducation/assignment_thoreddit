var url = require("url");
var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
var models = require("../models");
var Meme = mongoose.model("Meme");
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");

var sortByScore = require("../helper/sort-by-score");

// index
router.get("/frontpage", (req, res) => {
	Meme.find()
		.populate("user")
		.sort({ score: -1 })
		.then(memes => {
			// memesByScore = sortByScore(memes);
			// console.log("memesByScore", JSON.stringify(memes, 0, 2));
			res.render("frontpage/index", { memes });
		})
		.catch(e => res.status(500).send(e.stack));
});

// show dank meme and comments
router.get("/meme/:id", (req, res) => {
	var meme, user, comments;
	var subcommentsArr = [];
	// first find the Meme of the page we are on
	Meme.findOne({ _id: req.params.id })
		.populate("user")
		.exec(function(err) {
			if (err) return handleError(err);
		})
		.then(memeFromQuery => {
			meme = memeFromQuery;
			return Comment.find({ meme: meme._id })
				.populate("user")
				.sort({ score: -1 })
				.exec(function(err) {
					if (err) return handleError(err);
				});
		})
		.then(commentsFromQuery => {
			comments = commentsFromQuery;

			comments.forEach(comment => {
				Comment.find({ parent: comment._id })
					.populate("user")
					.sort({ score: -1 })
					.exec(function(err) {
						if (err) return handleError(err);
					})
					.then(foundComments => {
						subcommentsArr.push(foundComments);
					})
					.catch(e => res.status(500).send(e.stack));
			});

			// console.log("meme", JSON.stringify(meme, 0, 2));
			// console.log("comments", JSON.stringify(comments, 0, 2));
		})
		.then(() => {
			setTimeout(() => {
				//filer out empty values

				var subcomments = subcommentsArr.filter(String);
				console.log("subcomments", JSON.stringify(subcommentsArr, 0, 2));
				res.render("frontpage/show", { meme, comments, subcomments });
			}, 1000);
		});
});

//show new comment form
router.get("/comment/:id/new", (req, res) => {
	//Find out if replying to a meme or a comment
	Meme.findById(req.params.id)
		.then(meme => {
			if (meme) {
				// console.log(meme);
				res.render("frontpage/new-comment", { meme });
			} else {
				Comment.findById(req.params.id)
					.then(comment => {
						// console.log(comment);
						res.render("frontpage/new-comment", { comment });
					})
					.catch(e => res.status(500).send(e.stack));
			}
		})
		.catch(e => res.status(500).send(e.stack));
});

//post comment where replying to a meme (top level)
router.post("/post/:memeid", (req, res) => {
	var memeId = req.params.memeid;
	var body = req.body.meme.comment;
	var user = req.session.currentUser._id;
	// console.log("stuff", memeId, body, user);

	var comment = new Comment({
		body: body,
		parent: null,
		meme: memeId,
		user: user,
		score: 1
	});

	comment
		.save()
		.then(() => {
			res.redirect(`/meme/${memeId}`);
		})
		.catch(e => res.status(500).send(e.stack));
});

// post comment where replying to a comment (nested)
router.post("/post/:memeid/comment/:commentid", (req, res) => {
	var memeId = req.params.memeid;
	var commentId = req.params.commentid;
	var body = req.body.comment.comment;
	var user = req.session.currentUser._id;
	// console.log("stuff", memeId, commentId, body, user);

	var comment = new Comment({
		body: body,
		parent: commentId,
		meme: null,
		user: user,
		score: 1
	});

	comment
		.save()
		.then(() => {
			res.redirect(`/meme/${memeId}`);
		})
		.catch(e => res.status(500).send(e.stack));
});

// DELETE A COMMENT
router.delete("/meme/:memeid/comment/:commentid", (req, res) => {
	Comment.findByIdAndRemove(req.params.commentid)
		.then(() => {
			req.method = "GET";
			res.redirect(`/meme/${req.params.memeid}`);
		})
		.catch(e => res.status(500).send(e.stack));
});

// // first find the Meme of the page we are on
// Meme.findOne({ _id: req.params.id })
// 	.then(memeFromQuery => {
// 		meme = memeFromQuery;
//
// 		//then find the user for that meme
// 		return User.findOne({ _id: meme.user });
// 	})
// 	.then(userFromQuery => {
// 		user = userFromQuery;
// 		// console.log("user", JSON.stringify(user, 0, 2));
//
// 		// then find all the comments
// 		return Comment.find({ meme: meme._id });
// 	})
// 	.then(commentsFromQuery => {
// 		comments = commentsFromQuery;
// 		res.render("frontpage/show", { meme, user, comments });
// 	})
// 	.catch(e => res.status(500).send(e.stack));

module.exports = router;
