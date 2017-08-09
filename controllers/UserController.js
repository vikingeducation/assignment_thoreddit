const { User } = require("../models");

const UserController = {
  getAll: () => {
    return User.find({}, {}, { sort: { createdAt: -1 } }).populate(
      "comment post"
    );
  },

  getById: id => {
    return User.findById(id).populate("comments posts");
  },

  new: params => {
    return User.create({ username: params.username, email: params.email });
  }
};

module.exports = UserController;
