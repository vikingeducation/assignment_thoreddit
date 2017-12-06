const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const models = require('../models');

const mongodbUrl = 'mongodb://localhost/THOREDDIT_development';


const {
  User,
  Post,

} = models




const seeds = () => {
  const users = [];

  for (let i = 0; i < 10; i++) {
    const user = new User({fname: `foobar${i}`, lname: `eliasbar${i}`, username: `laksmi${i}`, email: `pikachupower${i}@aol.com`} );
    users.push(user);
  }

  const posts = [];

  for (let i = 0; i < 10; i++) {
    const post = new Post({title: `I'm ${i}!`, body: `i like to talk${i} times a day`, postId:`post${i}`});
    posts.push(post);
  }


  const promises = [];
  const collections = [
    users,
    posts,

  ];

  collections.forEach(collection => {
    collection.forEach(model => {
      const promise = model.save();
      promises.push(promise);
    });
  });
  console.log(Promise.all(promises))
  return Promise.all(promises);
};

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  seeds: seeds,
  mongoose: mongoose

});
