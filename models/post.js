const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: String,
    body: String
    // author:
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
