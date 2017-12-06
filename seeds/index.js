const mongoose = require("mongoose");
const mongooseeder = require("mongooseeder");
const models = require("./../models/index.js");

var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];

const mongodbUrl =
  process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {
    // --------------------------------------
    // Create Users
    // --------------------------------------
    console.log("Creating Users");
    var users = [];
    for (let i = 0; i < 10; i++) {
      var user = {
        username: `foobar${i}`,
        email: `foobar${i}@gmail.com`
      };
      users.push(models.User.create(user));
    }
    return Promise.all(users);
  }
});
