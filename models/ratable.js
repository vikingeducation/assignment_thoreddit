const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RatableSchema = new Schema(
  {
    text: String,
    rating: {
      type: Schema.Types.ObjectId,
      ref: "Rating"
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

var Ratable = mongoose.model("Ratable", RatableSchema);

module.exports = Ratable;
