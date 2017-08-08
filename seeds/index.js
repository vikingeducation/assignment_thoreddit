const models = require("../models");
const faker = require("faker");
const mongoseeder = require("mongooseeder");

function seeds() {
  let users = [];
  for (let i = 0; i < 10; i++) {
    let user = new models.User({
      username: faker.random.words(2).split(" ").join(""),
      email: faker.random.email()
    });
    users.push(user);
  }
}

mongoseeder.seed({
  mongodbUrl: process.env.DB_URL,
  models: models,
  clean: true,
  mongoose: require("mongoose"),
  seeds: seeds
});
