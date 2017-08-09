const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  {
    timestamps: true
  }
);

UserSchema.pre("remove", function(next) {
  mongoose.model("Post").remove({ user: this._id }).exec();
  mongoose.model("Comment").remove({ user: this._id }).exec();
  next();
});

let User = mongoose.model("User", UserSchema);
module.exports = User;
