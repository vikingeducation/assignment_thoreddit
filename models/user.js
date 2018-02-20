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
   }],
   comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
   }],
   votes: [{
      type: Schema.Types.ObjectId,
      ref: 'Vote'
   }]
}, {
   timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;