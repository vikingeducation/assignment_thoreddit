const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var findOrCreate = require("mongoose-findorcreate");

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

ScorableSchema.plugin(findOrCreate);

var Scorable = mongoose.model("Scorable", ScorableSchema);

module.exports = Scorable;
