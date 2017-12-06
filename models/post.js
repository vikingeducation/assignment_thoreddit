var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Commentable = require('./commentable.js');

var PostSchema = new Schema({
  title: String
}, {
  discriminatorKey: 'kind'
});

var Post = Commentable.discriminator('Post', PostSchema);
module.exports = Post;