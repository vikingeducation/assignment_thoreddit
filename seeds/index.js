const mongoose = require("mongoose");
const models = require("./../models");

var faker = require("faker");

var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];
const mongooseeder = require("mongooseeder");

const { User, Meme } = models;

const seeds = () => {
	//users
	console.log("Creating Users");
	var users = [];
	for (let i = 0; i < 20; i++) {
		var user = new User({
			username: `foobar${i}`,
			email: `foobar${i}@gmail.com`
		});
		users.push(user);
	}

	// MEMES
	console.log("Creating MEMES yall");
	var memes = [];

	for (let i = 0; i < 5; i++) {
		var title = faker.lorem.word();
		var description = faker.lorem.sentence();
		var url = faker.internet.url();

		var meme = new Meme({
			title: title,
			description: description,
			url: url,
			user: users[i]
		});

		memes.push(meme);
	}

	// saving
	console.log("Saving...");
	var promises = [];
	[users, memes].forEach(collection => {
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
