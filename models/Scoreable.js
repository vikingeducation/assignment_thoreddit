const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScorableSchema = new Schema(
  {
    scores: [
      {
        types: Schema.Types.ObjectId,
        ref: "Score"
      }
    ]
  },
  {
    timestamps: true,
    discriminatorKey: "kind"
  }
);

module.exports = mongoose.model("Scoreable", ScorableSchema);
