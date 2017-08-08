const { Comment } = require("../models");
const PostController = require("./PostController");
const UserController = require("./UserController");

module.exports = {
  // getAll: () => {
  //   return Comment.find({}, {}, { sort: { createdAt: -1 } }).populate("user");
  // },
  // getById: id => {
  //   return Comment.findById(id).populate("user").populate({
  //     path: "comments",
  //     populate: { path: "user", model: "User" }
  //   });
  // },
  new: params => {
    let comment;

    return Comment.create({
      body: params.body,
      user: params.userId,
      post: params.postId
    })
      .then(cmt => {
        comment = cmt;
        return PostController.addComment({
          postId: params.postId,
          comment: comment
        });
      })
      .then(post => {
        return UserController.addComment({
          userId: params.userId,
          comment: comment
        });
      })
      .then(user => {
        return Promise.resolve(comment);
      });
  }
};
