const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var findOrCreate = require("mongoose-findorcreate");

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

ScoreSchema.plugin(findOrCreate);

var Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;
