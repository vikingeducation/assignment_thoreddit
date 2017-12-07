
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserPostSchema = new Schema({
	user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  value: String
}, {
  timestamps: true
});


var UserPost = mongoose.model('UserPost', UserPostSchema);

module.exports = UserPost;
