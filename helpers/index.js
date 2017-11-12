const HelperLoader = require('load-helpers');
const helperLoader = new HelperLoader();

const helpers = helperLoader.load('helpers/*Helper.js').cache;

module.exports = helpers;
