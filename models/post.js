const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vote"
      }
    ],
    body: String,
    title: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
