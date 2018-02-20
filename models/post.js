const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   title: String,
   text: String,
   author: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
   comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
   }]
}, {
   timestamps: true
});

// PostSchema.statics.handleVotes = function()

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;