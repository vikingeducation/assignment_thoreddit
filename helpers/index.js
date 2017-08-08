const LoadHelpers = require("load-helpers");
const helperLoader = new LoadHelpers();
const helpers = helperLoader.load("helpers/*Helper.js").cache;

module.exports = helpers;
