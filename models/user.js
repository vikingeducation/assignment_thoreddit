const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

//maybe include timestamps later
let UserSchema = new Schema({
  fname: String,
  lName: String,
  username: String,
  email: String
});
