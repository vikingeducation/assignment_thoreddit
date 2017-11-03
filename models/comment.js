const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    body: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Votable'
    }
  },
  {
    timestamps: true,
    discriminatorKey: 'kind'
  }
);

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
