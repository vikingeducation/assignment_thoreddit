const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var findOrCreate = require("mongoose-findorcreate");

var UserSchema = new Schema(
  {
    username: String,
    email: String,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post"
      }
    ]
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(findOrCreate);

var User = mongoose.model("User", UserSchema);

module.exports = User;
