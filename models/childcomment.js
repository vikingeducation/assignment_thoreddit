const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Votable = require('./votable');

var ChildCommentSchema = new Schema(
  {
    body: String,
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Votable'
    },
    author: {
      type: Schema.Types.ObjectId,
      red: 'User'
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
