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

ScorableSchema.methods.upvote = function() {
  return (this.score += 1);
};

ScorableSchema.methods.downvote = function() {
  return (this.score -= 1);
};

let Scorable = mongoose.model("Scorable", ScorableSchema);
module.exports = Scorable;
