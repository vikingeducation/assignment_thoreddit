const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Interactable = require('./interactable');

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalPost: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

const Comment = Interactable.discriminator('Comment', CommentSchema);

module.exports = Comment;
