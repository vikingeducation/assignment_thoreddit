var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    posted: { type: Date, default: Date.now },
    title: String,
    body: String,
    score: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    comment: Object
  },
  {
    timestamps: true
  }
);

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
