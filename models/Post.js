var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: String,
    body: String,
    score: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", PostSchema);
