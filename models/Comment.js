const mongoose = require("mongoose");
const Scorable = require("./Scorable");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    body: String,
    title: String
  },
  {
    timestamps: true,
    discriminatorKey: "scorableKind"
  }
);

let Comment = Scorable.discriminator("Comment", CommentSchema);
module.exports = Comment;
