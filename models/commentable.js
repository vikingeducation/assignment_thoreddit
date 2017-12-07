var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentableSchema = new Schema(
  {
    title: String,
    text: String,
    score: Number,
    parentId: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },

  {
    timestamps: true
  }
);

let Commentable = mongoose.model("Commentable", CommentableSchema);

module.exports = Commentable;
