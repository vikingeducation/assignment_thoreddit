const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fname: String,
  lname: String,
  username: String,
  email: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true
});

UserSchema.methods.name = function() {
  return `${ this.fname } ${ this.lname }`;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
