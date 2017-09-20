var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let CommentableSchema = new Schema(
  {
    body: String,
    score: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  {
    timestamps: true,
    discriminatorKey: "kind"
  }
);

const Commentable = mongoose.model("Commentable", CommentableSchema);

module.exports = Commentable;
