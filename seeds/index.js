const mongoose = require("mongoose");
const mongooseeder = require("mongooseeder");
const models = require("./../models/index.js");

var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];

const mongodbUrl =
  process.env.NODE_ENV === "production" ?
  process.env[config.use_env_variable] :
  `mongodb://${config.host}/${config.database}`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {
    // --------------------------------------
    // Create Users
    // --------------------------------------

    var records = [];
    for (let i = 0; i < 10; i++) {
      var user = {
        username: `foobar${i}`,
        email: `foobar${i}@gmail.com`
      };
      records.push(models.User.create(user));
    };

    for (let i = 0; i < 10; i++) {
      var post = {
        title: `Title for Post ${i}`,
        body: `Body for Post ${i}`,
        children: []
      };
      records.push(models.Post.create(post));
    };

    for (let i = 0; i < 10; i++) {
      var comment = {
        title: `Title for Comment ${i}`,
        body: `Body for Comment ${i}`,
        children: []
      };
      records.push(models.Comment.create(post));
    };


    return Promise.all(records);
  }
});