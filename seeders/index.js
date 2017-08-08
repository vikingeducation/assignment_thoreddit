const mongoose = require("mongoose");
const mongooseeder = require("mongooseeder");
var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];
const models = require("../models");
const { User, Post } = models;
const mongodbUrl =
  process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;

const seeds = () => {
  var promises = [];
  [users, posts].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {
    // Run your seeds here
    // Example:
    return models.User.create({ email });
    return models.Post.create({ email });
  }
});
