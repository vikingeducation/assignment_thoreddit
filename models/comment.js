let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema(
  {
    body: String,
    parentId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
