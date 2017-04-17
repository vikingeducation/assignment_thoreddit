var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentableSchema = new Schema(
  {
    score: Number,
    author_id: String,
    body: String
  },
  {
    timestamps: true,
    discriminatorKey: "kind"
  }
);

var Commentable = mongoose.model("Commentable", CommentableSchema);

module.exports = Commentable;
