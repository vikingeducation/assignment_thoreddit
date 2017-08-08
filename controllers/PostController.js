const { Post } = require("../models");

module.exports = {
	getAll: () => {
		return Post.find().populate("user");
	}
};
