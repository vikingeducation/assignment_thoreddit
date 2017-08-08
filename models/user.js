const mongoose = require("mongoose");
var Schema = mongoose.Schema;

//maybe include timestamps later
let UserSchema = new Schema({
  fname: String,
  lname: String,
  username: String,
  email: String
});

//instance method or virtual
UserSchema.methods.name = function() {
  return `${this.fname} ${this.lname}`;
};

UserSchema.virtual("fullname").set(function(name) {
  console.log("Setting the name of the user");
  name = name.toString();
  var splat = name.split(" ");
  var fname = splat[0] || this.fname;
  var lname = splat[1] || this.lname;
  this.fname = fname;
  this.lname = lname;
  return this.name();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
