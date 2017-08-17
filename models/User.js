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

UserSchema.statics.getAll = function() {
  return this.find({}, {}, { sort: { createdAt: -1 } })
    .populate({ path: "comments", options: { sort: { createdAt: -1 } } })
    .populate({ path: "posts", options: { sort: { createdAt: -1 } } });
};

UserSchema.statics.getById = function(id) {
  return this.findById(id)
    .populate({ path: "comments", options: { sort: { createdAt: -1 } } })
    .populate({ path: "posts", options: { sort: { createdAt: -1 } } });
};

UserSchema.statics.new = function(params) {
  return this.create({ username: params.username, email: params.email });
};

UserSchema.pre("remove", function(next) {
  mongoose.model("Post").remove({ user: this._id }).exec();
  mongoose.model("Comment").remove({ user: this._id }).exec();
  next();
});

let User = mongoose.model("User", UserSchema);
module.exports = User;
