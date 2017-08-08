const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Ratable = require("./ratable");

var PostSchema = new Schema(
  { title: String },
  {
    discriminatorKey: "kind"
  }
);

var Post = Ratable.discriminator("Post", PostSchema);

module.exports = Post;
