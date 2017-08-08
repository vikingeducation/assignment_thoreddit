const { Post, User } = require("../models");
const UserController = require("./UserController");

let PostController = {
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
    let post;
    return Post.create({
      title: params.title,
      body: params.body,
      user: params.userId
    });
    // .then(p => {
    //   post = p;
    //   return User.findById(params.userId);
    // })
    // .then(user => {
    //   console.log("user: ", user);
    //   console.log("post: ", post);
    //   user.posts.push(post._id);
    //   return user.save();
    // })
    // .then(() => {
    //   return post;
    // });
  },

  addComment: params => {
    return Post.findById(params.postId).then(post => {
      post.comments.push(params.comment);
      return post.save();
    });
  },

  deleteById: id => {
    return Post.findByIdAndRemove(id);
  }
};

module.exports = PostController;
