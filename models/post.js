const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Votable = require('./votable');

var PostSchema = new Schema(
  {
    title: String,
    body: String,
    author: {
      type: Schema.Types.ObjectId,
      red: 'User'
    }
  },
  {
    timestamps: true,
    discriminatorKey: 'kind'
  }
);

// var Post = mongoose.model('Post', PostSchema);
var Post = Votable.discriminator('Post', PostSchema);

module.exports = Post;
