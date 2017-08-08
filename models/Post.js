const mongoose = require("mongoose");
const Scorable = require("./Scorable");
const User = require("./User");
const Comment = require("./Comment");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    body: String,
    title: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  {
    discriminatorKey: "scorableKind"
  }
);

PostSchema.post("save", function(error, next) {
  console.log("next: ", next);
  User.update(
    { _id: this.user },
    { $push: { posts: this._id } },
    { multi: true }
  ).exec();
  next();
});

PostSchema.pre("remove", function(next) {
  User.update(
    { posts: this._id },
    { $pull: { posts: this._id } },
    { multi: true }
  ).exec();
  Comment.update(
    { post: this._id },
    { $pull: { posts: this._id } },
    { multi: true }
  ).exec();
  next();
});

let Post = Scorable.discriminator("Post", PostSchema);

module.exports = Post;
