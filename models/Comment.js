const mongoose = require("mongoose");
const Scorable = require("./Scorable");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    body: String
  },
  {
    discriminatorKey: "scorableKind"
  }
);

let Comment = Scorable.discriminator("Comment", CommentSchema);
module.exports = Comment;
