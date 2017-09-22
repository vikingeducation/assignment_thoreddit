var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    posted: { type: Date, default: Date.now },
    title: String,
    body: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
