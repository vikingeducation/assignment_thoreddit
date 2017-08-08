const mongoose = require("mongoose");
const models = require("./../models");
var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];
const mongooseeder = require("mongooseeder");

const { User, Scorable, Score, Post, Comment } = models;

const seeds = () => {
  let j;
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log("Creating Users");
  var users = [];
  for (let i = 0; i < 5; i++) {
    var user = new User({
      username: `foobar${i}`,
      email: `foobar${i}@gmail.com`,
      posts: []
    });
    users.push(user);
  }

  // ----------------------------------------
  // Posts
  // ----------------------------------------
  console.log("Creating Posts");
  var posts = [];
  for (let i = 0; i < 10; i++) {
    i > 4 ? (j = i - 5) : (j = i);
    var post = new Post({
      title: `Post ${i}`,
      text: `I have ${i} cats.`,
      user: users[j],
      comments: [],
      score: {}
    });
    users[j].posts.push(post);
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
      user: users[i],
      score: {}
    });
    posts[i].comments.push(comment);
    comments.push(comment);
  }

  // ----------------------------------------
  // Scores
  // ----------------------------------------
  console.log("Creating Scores");
  var scores = [];
  for (let i = 0; i < 10; i++) {
    i > 4 ? (j = i - 5) : (j = i);
    var score = new Score({
      value: 1,
      users: [users[j]],
      scorable: posts[i]
    });
    posts[i].score = score;
    scores.push(score);
  }
  for (let i = 0; i < 5; i++) {
    var score = new Score({
      value: 1,
      users: [users[j]],
      scorable: comments[i]
    });
    comments[i].score = score;
    scores.push(score);
  }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log("Saving...");
  var promises = [];
  [users, posts, comments, scores].forEach(collection => {
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
