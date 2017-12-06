var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostsSchema = new Schema({
  title: String,
  body: String,
  username: String,
  postedAt: Date
},
{timestamps:true}
);

var Posts = mongoose.model('Posts', PostsSchema);


module.exports = Posts;
