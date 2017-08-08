const { User } = require("../models");

module.exports = {
  getAll: () => {
    return User.find({}, {}, { sort: { createdAt: -1 } }).populate(
      "comment post"
    );
  },
  new: params => {
    return User.create({ username: params.username, email: params.email });
  },
  getById: id => {
    return User.findById(id).populate("comment post");
  }
};
