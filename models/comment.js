const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Commentable = require('./commentable');

const CommentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  },
  {
    discriminatorKey: 'kind'
  }
);

const Comment = Commentable.discriminator('Comment', CommentSchema);

module.exports = Comment;
