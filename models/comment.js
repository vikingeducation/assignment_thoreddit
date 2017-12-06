let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema(
  {
    body: String,
    childIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
   ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  },
  {
    timestamps: true,
  },
);

let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
