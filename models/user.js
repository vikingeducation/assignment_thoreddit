var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    fname: String,
    lname: String,
    username: String,
    email: String
  },
  {
    timestamps: true,
    discriminatorKey: "kind"
  }
);

var User = mongoose.model("User", UserSchema);

module.exports = User;
