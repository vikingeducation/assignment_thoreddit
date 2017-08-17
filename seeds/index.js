const models = require("../models");
const faker = require("faker");
const voca = require("voca");
const mongoseeder = require("mongooseeder");

let { Comment, User, Post } = models;

function seeds() {
  let users = [];
  for (let i = 0; i < 10; i++) {
    let user = new User({
      username: faker.random.words(2).split(" ").join(""),
      email: faker.internet.email()
    });
    users.push(user);
  }

  let posts = [];
  for (let i = 0; i < 20; i++) {
    let post = new Post({
      title: voca.titleCase(faker.random.words(6)),
      body: faker.random.words(100),
      user: users[i % 10],
      score: faker.random.number({ min: -100, max: 100 })
    });
    users[i % 10].posts.push(post);
    posts.push(post);
  }

  let comments = [];
  for (let i = 0; i < 200; i++) {
    let comment = new Comment({
      body: faker.random.words(50),
      user: users[i % 10],
      post: posts[i % 20]
    });
    users[i % 10].comments.push(comment);
    posts[i % 20].comments.push(comment);
    comments.push(comment);
  }

  let promises = [];
  [posts, users, comments].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
}

mongoseeder.seed({
  mongodbUrl: require("../config/mongoUrl"),
  models: models,
  clean: true,
  mongoose: require("mongoose"),
  seeds: seeds
});
