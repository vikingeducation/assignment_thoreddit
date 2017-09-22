const mongoose = require("mongoose");
const models = require("./../models");
var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];
const mongooseeder = require("mongooseeder");

const { User } = models;

const seeds = () => {
  console.log("Creating Users");
  var users = [];
  for (var i = 0; i < 5; i++) {
    var user = new User({
      fname: `Foo${i}`,
      lname: `Bar${i}`,
      username: `Foobar${i}`,
      email: `Foobar${i}@gmail.com`
    });
    users.push(user);
  }

  console.log("Saving...");
  var promises = [];
  [users].forEach(collection => {
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
