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

// show dank memee
router.get("/meme/:id", (req, res) => {
	var meme, user, comments;

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
			res.render("frontpage/show", { meme, comments });
			console.log("meme", JSON.stringify(meme, 0, 2));
			console.log("comments", JSON.stringify(comments, 0, 2));
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
