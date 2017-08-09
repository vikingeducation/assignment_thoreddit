const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Scorable = require("./scorable");

var CommentSchema = new Schema(
  {},
  {
    discriminatorKey: "kind"
  }
);

var Comment = Scorable.discriminator("Comment", CommentSchema);

module.exports = Comment;
