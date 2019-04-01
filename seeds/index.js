const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const models = require('../models');

var env = process.env.NODE_ENV || 'development';
var config = require('./../config/mongo')[env];

var mongodbUrl = process.env.NODE_ENV === 'production' ?
  process.env[config.use_env_variable] :
  `mongodb://${ config.host }/${ config.database }`;

// const mongodbUrl = 'mongodb://localhost/testrun_development';
// const User = require('../models/user')

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {

    var users = [];
    var promises = [];

    for(var i = 1; i <= 20; i++){
      var user = new models.User({
        fname: 'Jim' + i,
        lname: `smith`  + i,
        username: `mrbob`  + i,
        email: `bob@asdf.com`  + i
      })
      users.push(user)

    }

    users.forEach(model => {
      promises.push(model.save())
    })
    return Promise.all(promises)
    // return models.User.create(userParams);

  }
});
