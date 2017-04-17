var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  fname: String,
  lname: String,
  username: String,
  email: String
}, {
  timestamps: true
});


UserSchema.methods.name = function() {
  return `${ this.fname } ${ this.lname }`;
};


UserSchema.statics.findByFirstName = function (fname) {
  return User.find({ fname: fname });
};


UserSchema.virtual('fullname').set(function(name) {
  console.log('Setting the name of the user');
  name = name.toString();
  var splat = name.split(' ');
  var fname = splat[0] || this.fname;
  var lname = splat[1] || this.lname;
  this.fname = fname;
  this.lname = lname;
  return this.name;
});


var User = mongoose.model('User', UserSchema);




module.exports = User;




