const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Commentable = require('./commentable');

const PostSchema = new Schema(
  {
    title: String
  },
  {
    discriminatorKey: 'kind'
  }
);

const Post = Commentable.discriminator('Post', PostSchema);

module.exports = Post;
