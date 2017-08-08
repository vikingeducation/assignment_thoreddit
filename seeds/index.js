const mongoose = require("mongoose");
const models = require("./../models");
const randomWords = require("random-words");

let env = process.env.NODE_ENV || "development";
let config = require("./../config/mongo")[env];
const mongooseeder = require("mongooseeder");

const { User, Post, Comment, Vote } = models;

let votes = [];
let users = [];
let comments = [];
//helper function
function getVotes(amount) {
  let newVotes = [];
  for (let i = 0; i < amount; i++) {
    let vote = new Vote({
      user: users[i % (users.length - 1)],
      voteType: Math.round(Math.random()) ? true : false
    });
    votes.push(vote);
    newVotes.push(vote);
  }
  return newVotes;
}
function getComments(amount) {
  //creating comments
  let newComments = [];
  for (let i = 0; i < amount; i++) {
    let commentAuthor = users[i % (users.length - 1)];
    let comment = new Comment({
      votes: getVotes(3),
      body: randomWords(22).join(" "),
      user: commentAuthor,
      username: commentAuthor.name()
    });
    // console.log(`Comment = ${comment}`);
    newComments.push(comment);
    comments.push(comment);
  }
  // console.log(`Comments = ${newComments}`);
  //console.log(`isArray? = ${Array.isArray(newComments)}`);
  //console.log(`===========================================`);
  return newComments;
}

const seeds = () => {
  //creating users
  console.log("Creating Users");
  for (let i = 0; i < 5; i++) {
    let user = new User({
      fname: "Foo",
      lname: "Bar",
      username: `foobar${i}`,
      email: `foobar${i}@gmail.com`
    });
    users.push(user);
  }

  //creating votes
  console.log("Creating Votes");

  //creating posts
  let posts = [];
  for (let i = 0; i < 10; i++) {
    let postAuthor = users[i % (users.length - 1)];
    let post = new Post({
      votes: getVotes(1),
      user: postAuthor,
      title: randomWords(10).join(" "),
      body: randomWords(100).join(" "),
      username: postAuthor.name(),
      children: getComments(Math.round(Math.random() * 10))
    });
    posts.push(post);
  }

  //creating comments
  // let comments = [];
  // for (let i = 0; i < 5; i++) {
  //   let commentAuthor = users[i % (users.length - 1)];
  //   let comment = new Comment({
  //     votes: getVotes(3),
  //     body: randomWords(22).join(" "),
  //     user: commentAuthor,
  //     username: commentAuthor.name()
  //   });
  //   comments.push(comment);
  // }
  //Post.find().populate('children').then(lg)

  console.log("Saving...");
  const promises = [];
  [users, posts, votes, comments].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};

// store url for seeding
const mongodbUrl =
  process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;

// Actual seeding process is happening here
mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  seeds: seeds,
  clean: true,
  models: models,
  mongoose: mongoose
});
