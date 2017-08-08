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
  },

  addComment: params => {
    return UserController.getById(params.userId).then(user => {
      user.comments.push(params.comment);
    });
  }
};

module.exports = UserController;
