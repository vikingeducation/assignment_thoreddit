const mongoose = require('mongoose');
const models = require('./../models');
var env = process.env.NODE_ENV || 'development';
var config = require('./../config/mongo')[env];
const mongooseeder = require('mongooseeder');

const { User, Post } = models;

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
  for (let i = 0; i < MULTIPLIER * 2; i++) {
    var user = new User({
      fname: 'Foo',
      lname: 'Bar',
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
      author: users[i]
    });
    posts.push(post);
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
  [users, posts].forEach(collection => {
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
