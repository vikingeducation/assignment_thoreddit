const mongoose = require("mongoose");
const mongooseeder = require("mongooseeder");
var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];
const models = require("./../models");
const { User, Post } = models;
const mongodbUrl =
  process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;

const seeds = () => {
  console.log("Creating Users");
  var users = [];
  for (let i = 1; i < 11; i++) {
    var user = new User({
      username: `foobar${i}`,
      email: `foobar${i}@gmail.com`,
      posts: []
    });
    users.push(user);
  }

  console.log("Creating Posts");
  var posts = [];
  var authorId;

  for (let i = 1; i < 21; i++) {
    authorId = i - 1;

    if (i > 9) {
      authorId -= 10;
    }

    var post = new Post({
      title: `Title of ${i}`,
      author: users[authorId],
      body: `Blah blah blah blah ${i}`,
      votes: 0,
      topLevel: true,
      subPosts: []
    });
    users[authorId].posts.push(post);
    posts.push(post);
  }

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
  seeds: seeds
});
