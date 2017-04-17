var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Commentable = require("./commentable");

let PostSchema = new Schema(
  {
    title: String
  },
  {
    discriminatorKey: "kind"
  }
);

const Post = Commentable.discriminator("Post", PostSchema);

module.exports = Post;
