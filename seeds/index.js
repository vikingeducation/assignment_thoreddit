const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const faker = require('faker');
const voca = require('voca');
const models = require('./../models');
const env = process.env.NODE_ENV || 'development';
const config = require('./../config/mongo')[env];

const { User } = models;
const MULTIPLIER = 1;

const seeds = () => {
  // Users
  console.log('Creating Users');
  const users = [];
  for (let i = 0; i < MULTIPLIER * 5; i++) {
    const user = new User({
      fname: 'Foo',
      lname: 'Bar',
      username: `foobar${i}`,
      email: `foobar${i}@gmail.com`
    });
    users.push(user);
  }
  // Posts
  // console.log('Creating Posts');
  // const posts = [];
  // for (let i = 0; i < MULTIPLIER * 5; i++) {
  //   const post = new Post({
  //     title:
  //     body:
  //
  //   })
  // }

  // Finish
  console.log('Saving...');
  const promises = [];
  [users].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};

const mongodbUrl =
  process.env.NODE_ENV === 'production'
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  seeds: seeds,
  clean: true,
  models: models,
  mongoose: mongoose
});
