const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentableSchema = new Schema(
  {
    body: String,
    score: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    timestamps: true,
    discriminatorKey: 'kind'
  }
);

const Commentable = mongoose.model('Commentable', CommentableSchema);

module.exports = Commentable;
