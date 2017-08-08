const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ScoreSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    scorable: {
      type: Schema.Types.ObjectId,
      ref: "Scorable"
    },
    value: Number
  },
  {
    timestamps: true
  }
);

var Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;
