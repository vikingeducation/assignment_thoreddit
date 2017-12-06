var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Commentable = require('./commentable.js');
var CommentSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Commentable'
  }
}, {
  discriminatorKey: 'kind'
});

var Comment = Commentable.discriminator('Comment', CommentSchema);
module.exports = Comment;