const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment;