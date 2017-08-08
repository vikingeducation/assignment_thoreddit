const mongoose = require('mongoose');
const models = require('./../models');


let env = process.env.NODE_ENV || 'development';
let config = require('./../config/mongo')[env];
const mongooseeder = require('mongooseeder');

const {
  User
} = models;


const seeds = () => {

  console.log('Creating Users');
  const users = [];
  for (let i = 0; i < 5; i++) {
    let user = new User({
      fname: 'Foo',
      lname: 'Bar',
      username: `foobar${ i }`,
      email: `foobar${ i }@gmail.com`
    });
    users.push(user);
  }

  console.log('Creating Votes');
  votes = [];
  for(let i = 0; i < 1000; i++) {
    let vote = new Vote({
      let vote = new Vote({
        user: users[i % (users.length - 1)];
        vote: Math.round(Math.random()) ? true : false;
    })
  }


  console.log('Saving...');
  const promises = [];
  [
    users
  ].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};

// store url for seeding
const mongodbUrl = process.env.NODE_ENV === 'production' ?
  process.env[config.use_env_variable] :
  `mongodb://${ config.host }/${ config.database }`;

// Actual seeding process is happening here
mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  seeds: seeds,
  clean: true,
  models: models,
  mongoose: mongoose
});
