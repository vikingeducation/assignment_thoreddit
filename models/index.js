var mongoose = require("mongoose");
var bluebird = require("bluebird");

// Set bluebird as the promise
// library for mongoose
mongoose.Promise = bluebird;

var models = {};

//hook up our models later
models.User = require("./user");
models.Vote = require("./vote");
models.Post = require("./post");
models.Comment = require("./comment");


module.exports = models;
