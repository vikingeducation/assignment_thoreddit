var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = (
  {
    title: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    body: String,
    votes: Number,
    topLevel: Boolean,
    subPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
  },
  { timestamps: true }
);

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
