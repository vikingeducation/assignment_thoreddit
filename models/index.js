const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

const models = {};

// Load models and attach to models here
models.User = require("./user");
models.Ratable = require("./ratable");
models.Post = require("./post");
models.Comment = require("./comment");
models.Rating = require("./rating");

module.exports = models;
