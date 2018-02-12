const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ScorableSchema = new Schema(
  {
    text: String,
    score: {
      type: Schema.Types.ObjectId,
      ref: "Score"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    discriminatorKey: "kind"
  }
);

var Scorable = mongoose.model("Scorable", ScorableSchema);

module.exports = Scorable;
