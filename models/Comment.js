var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    message: String,
    score: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
