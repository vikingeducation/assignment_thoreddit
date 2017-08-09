const mongoose = require("mongoose");
const Scorable = require("./Scorable");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    body: String
  },
  {
    discriminatorKey: "scorableKind"
  }
);

CommentSchema.virtual("summary").get(function() {
  return this.body.slice(0, 100) + "...";
});

CommentSchema.post("save", function() {
  mongoose
    .model("User")
    .update({ _id: this.user }, { $pullAll: { comments: [this._id] } })
    .exec();
  mongoose
    .model("User")
    .update({ _id: this.user }, { $push: { comments: this._id } })
    .exec();
  mongoose
    .model("Post")
    .update({ _id: this.post }, { $pullAll: { comments: [this._id] } })
    .exec();
  mongoose
    .model("Post")
    .update({ _id: this.post }, { $push: { comments: this._id } })
    .exec();
});

CommentSchema.pre("remove", function(next) {
  mongoose
    .model("User")
    .update({ _id: this.user }, { $pullAll: { comments: [this._id] } })
    .exec();
  mongoose
    .model("Post")
    .update({ _id: this.post }, { $pullAll: { comments: [this._id] } })
    .exec();
  next();
});

let Comment = Scorable.discriminator("Comment", CommentSchema);
module.exports = Comment;
