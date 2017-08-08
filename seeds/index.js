const mongoose = require("mongoose");
const models = require("./../models");
var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];
const mongooseeder = require("mongooseeder");

const { User, Ratable, Rating, Post, Comment } = models;

const seeds = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log("Creating Users");
  var users = [];
  for (let i = 0; i < 5; i++) {
    var user = new User({
      username: `foobar${i}`,
      email: `foobar${i}@gmail.com`
    });
    users.push(user);
  }

  // ----------------------------------------
  // Posts
  // ----------------------------------------
  console.log("Creating Posts");
  var posts = [];
  for (let i = 0; i < 5; i++) {
    var post = new Post({
      title: `Post ${i}`,
      text: `I have ${i} cats.`,
      rating: new Rating({value:0, user:users[i], ratable: posts[i]}),
      user: users[i]
    });
    posts.push(post);
  }

  // ----------------------------------------
  // Comments
  // ----------------------------------------
  console.log("Creating Comments");
  var comments = [];
  for (let i = 0; i < 5; i++) {
    var comment = new Comment({
      text: `Wow, I have ${i} cats also!`,
      rating: new Rating({value:0, user:users[i], ratable: comments[i]}),
      user: users[i]
    });
    comments.push(comment);
  }


  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log("Saving...");
  var promises = [];
  [users, posts, comments].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};

// Always use the MongoDB URL to allow
// easy connection in all environments
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
