const { Post } = require("../models");

module.exports = {
  getAll: () => {
    return Post.find({}, {}, { sort: { createdAt: -1 } }).populate("user");
  },
  getById: id => {
    return Post.findById(id).populate("user").populate({
      path: "comments",
      populate: { path: "user", model: "User" }
    });
  },
  new: params => {
    return Post.create({
      title: params.title,
      body: params.body,
      user: params.userId
    });
  }
};
