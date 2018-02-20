var mongoose = require('mongoose');
var bluebird = require('bluebird');

// Set bluebird as the promise
// library for mongoose
mongoose.Promise = bluebird;

var models = {};

// Load models and attach to models here
models.User = require('./user');
models.Comment = require('./comment');
models.Post = require('./post');
models.Vote = require('./vote');

module.exports = models;