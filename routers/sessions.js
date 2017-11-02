var url = require("url");
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

var tempUser, tempEmail;

module.exports = app => {
	//authorize
	app.use((req, res, next) => {
		var reqUrl = url.parse(req.url);
		if (
			!req.session.currentUser &&
			!["/", "/login", "/sessions"].includes(reqUrl.pathname)
		) {
			res.redirect("/login");
		} else {
			next();
		}
	});

	// new login
	var onNew = (req, res) => {
		if (req.session.currentUser) {
			res.redirect("/frontpage");
		} else {
			res.render("sessions/new");
		}
	};

	router.get("/", onNew);
	router.get("/login", onNew);

	//POST login
	router.post("/sessions", (req, res) => {
		User.findOne({
			username: req.body.username,
			email: req.body.email
		})
			.then(user => {
				if (user) {
					req.session.currentUser = {
						username: user.username,
						email: user.email,
						id: user.id,
						_id: user._id
					};
					res.redirect("/frontpage");
				} else {
					res.redirect("/login");
				}
			})
			.catch(e => res.status(500).send(e.stack));
	});

	//logout
	var onDestroy = (req, res) => {
		req.session.currentUser = null;
		res.redirect("/login");
	};

	router.get("/logout", onDestroy);
	router.delete("/logout", onDestroy);

	return router;
};
