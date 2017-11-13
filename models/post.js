const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: String,
    body: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    discriminatorKey: 'kind'
  }
);

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;