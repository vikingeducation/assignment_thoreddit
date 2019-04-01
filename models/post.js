const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  body: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
