const { Comment } = require("../models");
const PostController = require("./PostController");
const UserController = require("./UserController");

module.exports = {
  new: params => {
    return Comment.create({
      body: params.body,
      user: params.userId,
      post: params.postId
    });
  }
};
