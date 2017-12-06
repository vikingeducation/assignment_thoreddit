var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  body: String,
  username: String,
  postedAt: Date
},
{timestamps:true}
);

var Post = mongoose.model('Post', PostSchema);


module.exports = Post;
