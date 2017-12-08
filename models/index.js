let mongoose = require('mongoose');
let bluebird = require('bluebird');

mongoose.Promise = bluebird;

let models = {};

models.User = require('./user');
models.Post = require('./post');
models.Comment = require('./comment');

module.exports = models;
