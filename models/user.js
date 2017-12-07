var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: String,
  email: String

}, {
  timestamps: true
});

// Create the model with a defined schema
var User = mongoose.model('User', UserSchema);

module.exports = User;