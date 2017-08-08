const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScorableSchema = new Schema(
  {
    score: Number
  },
  {
    timestamps: true,
    discriminatorKey: "scorableKind"
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
