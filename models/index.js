const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

module.exports = {
	Comment: require("./Comment"),
	Post: require("./Post"),
	User: require("./User")
};
