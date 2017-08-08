const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post"
      }
    ],
    username: String,
    email: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  {
    timestamps: true
  }
);

let User = mongoose.model("User", UserSchema);
module.exports = User;
