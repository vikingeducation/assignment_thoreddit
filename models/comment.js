const mongoose = require("mongoose");
var Schema = mongoose.Schema;


const CommentSchema = new Schema({
  votes: [{
    type: Schema.Types.ObjectId,
    ref: "Vote"
  }],
  body: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  username: String,
}, {
  timestamps: true
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
