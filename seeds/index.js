var faker = require('faker');
var voca = require('voca');
const mongoose = require('mongoose');
const models = require('./../models');
var env = process.env.NODE_ENV || 'development';
var config = require('./../config/mongo')[env];
const mongooseeder = require('mongooseeder');

const {
  User,
  Commentable,
  Post,
  Comment
} = models;


const MULTIPLIER = 5;

function randomText() {
  return faker.lorem.sentence();
}
function randomTitle() {
  return voca.titleCase(faker.random.word());
}

function randomScore() {
  return Math.floor(Math.random() * MULTIPLIER);
}

const seeds = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users');
  var users = [];
  for (let i = 0; i < MULTIPLIER * 2; i++) {
    var user = new User({
      fname: 'Foo',
      lname: 'Bar',
      username: `foobar${ i }`,
      email: `foobar${ i }@gmail.com`
    });
    users.push(user);
  }


  function randomUserIndex() {
    return Math.floor(Math.random() * users.length);
  }


  // ----------------------------------------
  // Posts
  // ----------------------------------------
  console.log('Creating Posts');
  var posts = [];
  for (let i = 0; i < MULTIPLIER * 2; i++) {
    var post = new Post({
      title: randomTitle(),
      body: randomText(),
      score: randomScore(),
      author: users[randomUserIndex()]
    });

    posts.push(post);
  }


  // ----------------------------------------
  // Comments
  // ----------------------------------------
  console.log('Creating Comments');
  var comments = [];

  for (let i = 0; i < MULTIPLIER * 10; i++) {

    var comment = new Comment({
      body: randomText(),
      score: randomScore(),
      author: users[randomUserIndex()]
    });

    for (let i = 0; i < 2; i++) {
      var nestedComment = new Comment({
        body: randomText(),
        author: users[randomUserIndex()],
        score: randomScore()
      });
      
      comment.comments.push(nestedComment);
    }

    comments.push(comment);
    post.comments.push(comment);
  }
  

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');
  var promises = [];
  [
    users,
    posts,
    comments
  ].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};


// Always use the MongoDB URL to allow
// easy connection in all environments
const mongodbUrl = process.env.NODE_ENV === 'production' ?
  process.env[config.use_env_variable] :
  `mongodb://${ config.host }/${ config.database }`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  seeds: seeds,
  clean: true,
  models: models,
  mongoose: mongoose
});