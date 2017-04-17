var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Commentable = require('./commentable');

var CommentSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Commentable"
  },
  score: Number,
}, {
  timestamps: true
});

// Create the model with a defined schema
var Comment = Commentable.discriminator('Comment', CommentSchema);

module.exports = Comment;
