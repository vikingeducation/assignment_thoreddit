const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

const models = {};

// Load models and attach to models here
models.User = require("./user");
models.Scorable = require("./scorable");
models.Post = require("./post");
models.Comment = require("./comment");
models.Score = require("./score");

module.exports = models;
