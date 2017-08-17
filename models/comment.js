var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Commentable = require("./commentable");

var CommentSchema = new Schema(
  {
    parent_type: String,
    parent_id: String
  },
  {
    discriminatorKey: "kind"
  }
);

var Comment = Commentable.discriminator("Comment", CommentSchema);

module.exports = Comment;
