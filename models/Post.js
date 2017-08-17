const mongoose = require("mongoose");
const Scorable = require("./Scorable");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    body: String,
    title: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  {
    discriminatorKey: "scorableKind"
  }
);

PostSchema.statics.getAll = function() {
  return this.find({}, {}, { sort: { createdAt: -1 } }).populate("user");
};

PostSchema.statics.getById = function(id) {
  return this.findById(id).populate("user").populate({
    path: "comments",
    populate: { path: "user", model: "User" },
    options: { sort: { createdAt: -1 } }
  });
};

PostSchema.statics.new = function(params) {
  return this.create({
    title: params.title,
    body: params.body,
    user: params.userId
  });
};

PostSchema.post("save", function() {
  mongoose
    .model("User")
    .update({ _id: this.user }, { $pull: { posts: this._id } }, { multi: true })
    .exec();
  mongoose
    .model("User")
    .update({ _id: this.user }, { $push: { posts: this._id } })
    .exec();
});

PostSchema.pre("remove", function(next) {
  mongoose
    .model("User")
    .update(
      { posts: this._id },
      { $pull: { posts: this._id } },
      { multi: true }
    )
    .exec();
  mongoose.model("Comment").remove({ post: this._id }).exec();
  next();
});

let Post = Scorable.discriminator("Post", PostSchema);

module.exports = Post;
