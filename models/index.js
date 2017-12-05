const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

let models = {};

// Load models and attach to models here
models.User = require('./user');

module.exports = models;
