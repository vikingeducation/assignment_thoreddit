const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

const models = {};

models.User = require('./user');
models.Post = require('./post');
models.Comment = require('./comment');
models.Vote = require('./vote');

module.exports = models;
