const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Interactable = require('./interactable');

const PostSchema = new Schema({
  title: String,
  body: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

const Post = Interactable.discriminator('Post', PostSchema);

module.exports = Post;
