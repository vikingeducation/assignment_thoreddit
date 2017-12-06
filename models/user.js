let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: String,
  },
  {
    timestamps: true,
  },
);

let User = mongoose.model('User', UserSchema);

module.exports = User;
