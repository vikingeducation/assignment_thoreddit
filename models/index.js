var mongoose = require('mongoose');
var bluebird = require('bluebird');


mongoose.Promise = bluebird;

var models = {};
models.User = require('./user');


module.exports = models;
