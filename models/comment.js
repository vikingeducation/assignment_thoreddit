const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Ratable = require("./ratable");

var CommentSchema = new Schema(
  {},
  {
    discriminatorKey: "kind"
  }
);

var Comment = Ratable.discriminator("Comment", CommentSchema);

module.exports = Comment;
