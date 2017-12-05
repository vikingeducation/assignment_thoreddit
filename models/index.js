const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

let models = {};

models.User = require('./user');
models.Post = require('./post');

module.exports = models;
