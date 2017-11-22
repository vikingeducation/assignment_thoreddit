const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

const models = {};

models.User = require("./user");
models.Meme = require("./meme");
models.Comment = require("./comment");

module.exports = models;
