const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Scorable = require("./scorable");

var PostSchema = new Schema(
  {
    title: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  {
    discriminatorKey: "kind"
  }
);

var Post = Scorable.discriminator("Post", PostSchema);

module.exports = Post;
