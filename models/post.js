var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Commentable = require("./commentable");

var PostSchema = new Schema(
  {
    title: String
  },
  {
    discriminatorKey: "kind"
  }
);

var Post = Commentable.discriminator("Post", PostSchema);

module.exports = Post;
