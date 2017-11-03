const mongoose = require("mongoose");
const models = require("./../models");

var faker = require("faker");

var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];
const mongooseeder = require("mongooseeder");

const { User, Meme, Comment } = models;

const seeds = () => {
	//users
	console.log("Creating Users");
	var users = [];
	for (let i = 0; i < 10; i++) {
		var user = new User({
			username: `foobar${i}`,
			email: `foobar${i}@gmail.com`
		});

		users.push(user);
	}

	// MEMES
	console.log("Creating MEMES yall");
	var memes = [];
	for (let i = 0; i < 10; i++) {
		var title = faker.lorem.words(2);
		var description = faker.lorem.sentence();
		var url = faker.internet.url();

		var meme = new Meme({
			title: title,
			description: description,
			url: url,
			user: users[i],
			score: i * 111
		});

		memes.push(meme);
	}

	// Comments
	console.log("Creating comments");
	var comments = [];
	for (let i = 0; i < 100; i++) {
		var body = faker.random.words(30);

		var comment = new Comment({
			body: body,
			meme: memes[i % 10],
			user: users[i % 10],
			score: i * 11
		});

		comments.push(comment);
	}

	// saving
	console.log("Saving...");
	var promises = [];
	[users, memes, comments].forEach(collection => {
		collection.forEach(model => {
			promises.push(model.save());
		});
	});

	return Promise.all(promises);
};

const mongodbUrl =
	process.env.NODE_ENV === "production"
		? process.env[config.use_env_variable]
		: `mongodb://${config.host}/${config.database}`;

mongooseeder.seed({
	mongodbUrl: mongodbUrl,
	seeds: seeds,
	clean: true,
	models: models,
	mongoose: mongoose
});

//
