const mongoose = require('mongoose');
const models = require('./../models');
var env = process.env.NODE_ENV || 'development';
var config = require('./../config/mongo')[env];
const mongooseeder = require('mongooseeder');

const { User, Votable, Post, Comment, ChildComment } = models;

const MULTIPLIER = 5;

function randomRating() {
  return Math.floor(Math.random() * 6);
}

const seeds = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users');
  var users = [];
  var user = new User({
    fname: 'Tyler',
    lname: 'Ketron',
    username: 'tketron',
    email: 'tketron@gmail.com'
  });
  users.push(user);
  for (let i = 0; i < MULTIPLIER * 2; i++) {
    var user = new User({
      fname: `Foo${i}`,
      lname: `Bar${i}`,
      username: `foobar${i}`,
      email: `foobar${i}@gmail.com`
    });
    users.push(user);
  }

  // ----------------------------------------
  // Posts
  // ----------------------------------------
  console.log('Creating Posts');
  var posts = [];
  for (let i = 0; i < MULTIPLIER * 1; i++) {
    var post = new Post({
      title: 'A Post',
      body: 'This is an example post on Thoreddit',
      author: users[Math.floor(Math.random() * users.length)],
      score: Math.floor(Math.random() * 100)
    });
    post.parent_post = post;
    posts.push(post);
  }
  // ----------------------------------------
  // Comments
  // ----------------------------------------
  console.log('Creating Comments');
  var comments = [];
  var childComments = [];
  for (let i = 0; i < MULTIPLIER * 5; i++) {
    var comment = new Comment({
      body: 'This is an example comment.',
      author: users[Math.floor(Math.random() * users.length)],
      parent: posts[Math.floor(Math.random() * posts.length)],
      score: Math.floor(Math.random() * 100)
    });
    comment.parent_post = comment.parent;
    var childComment = new ChildComment({
      body: 'This is a child comment.',
      author: users[Math.floor(Math.random() * users.length)],
      parent: comment,
      parent_post: comment.parent,
      score: Math.floor(Math.random() * 100)
    });
    comment.children.push(comment);
    childComments.push(childComment);
    comments.push(comment);
  }

  // // ----------------------------------------
  // // Ratings
  // // ----------------------------------------
  // console.log('Creating Ratings');
  // var ratings = [];
  // for (let i = 0; i < MULTIPLIER * 1000; i++) {
  //   var hotel = hotels[i % hotels.length];
  //   var motel = motels[i % motels.length];
  //   var user = users[1];
  //   var hotelRating = new Rating({
  //     ratable: hotel,
  //     user: user,
  //     value: randomRating()
  //   });
  //   var motelRating = new Rating({
  //     ratable: motel,
  //     user: user,
  //     value: randomRating()
  //   });
  //   hotel.ratings.push(hotelRating);
  //   motel.ratings.push(motelRating);
  //   ratings.push(hotelRating);
  //   ratings.push(motelRating);
  // }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');
  var promises = [];
  [users, posts, comments, childComments].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};

// Always use the MongoDB URL to allow
// easy connection in all environments
const mongodbUrl = process.env.NODE_ENV === 'production'
  ? process.env[config.use_env_variable]
  : `mongodb://${config.host}/${config.database}`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  seeds: seeds,
  clean: true,
  models: models,
  mongoose: mongoose
});
