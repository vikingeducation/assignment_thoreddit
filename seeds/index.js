const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const models = require('../models'); 

const mongodbUrl = 'mongodb://localhost/THOREDDIT_development';

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {

    // Run your seeds here
    // Example:
    return models.User.create({ email :"elias@gmail.com"});
  }
});
