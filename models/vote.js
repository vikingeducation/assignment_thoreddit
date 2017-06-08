const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  amount: Number
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;