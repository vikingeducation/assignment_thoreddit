const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Votable = require('./votable');

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

// var Comment = mongoose.model('Comment', CommentSchema);
var Comment = Votable.discriminator('Comment', CommentSchema);

module.exports = Comment;
