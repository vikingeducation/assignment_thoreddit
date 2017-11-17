const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Votable = require('./votable');

var ChildCommentSchema = new Schema(
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

// var Comment = mongoose.model('Comment', CommentSchema);
var ChildComment = Votable.discriminator('ChildComment', ChildCommentSchema);

module.exports = ChildComment;
