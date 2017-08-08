const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./Post");
const CommentSchema = require("./Comment");

const ScorableSchema = new Schema(
  {
    score: Number
  },
  {
    timestamps: true
  }
);

ScorableSchema.method.upvote = function() {
  return (this.score += 1);
};

ScorableSchema.method.downvote = function() {
  return (this.score -= 1);
};

let Scorable = mongoose.model("Scorable", ScorableSchema);
module.exports = Scorable;
