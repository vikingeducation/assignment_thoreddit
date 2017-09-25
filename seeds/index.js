const mongoose = require("mongoose");
const models = require("./../models");
var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];
const mongooseeder = require("mongooseeder");

const { User, Post } = models;

const seeds = () => {
  console.log("##Creating Users...");
  var users = [];
  for (var i = 0; i < 5; i++) {
    var user = new User({
      fname: `Foo${i}`,
      lname: `Bar${i}`,
      username: `Foobar${i}`,
      email: `Foobar${i}@gmail.com`,
      upVote: [],
      downVote: []
    });
    users.push(user);
  }

  console.log("##Creating Posts...");
  var posts = [];
  for (var i = 0; i < 5; i++) {
    var post = new Post({
      posted: new Date("2016-11-11"),
      title: `Title${i}`,
      body: `${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      score: 1234,
      user: users[i]._id,
      comment: [
        {
          id: 11,
          user: "Foo",
          body: "Comment 123",
          score: 123,
          comment: []
        },
        {
          id: 12,
          user: "Foo2",
          body: "Comment 123, 321",
          score: 122,
          comment: [
            {
              id: 1211,
              user: "Bar",
              body: "Comment on 123, 321",
              score: 121,
              comment: []
            }
          ]
        },
        {
          id: 13,
          user: "Foo2",
          body: "Comment 120",
          score: 115,
          comment: [
            {
              id: 1311,
              user: "Foo1",
              body: "Comment 120",
              score: 112,
              comment: [
                {
                  id: 131111,
                  user: "Bar2",
                  body: "Comment on 120, 321",
                  score: 111,
                  comment: []
                }
              ]
            }
          ]
        }
      ]
    });
    posts.push(post);
  }

  console.log("Saving...");
  var promises = [];
  [users, posts].forEach(collection => {
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
