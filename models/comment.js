var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: String,
  body: String,
  username: String,
  postedAt: Date,
  CommentId: Number,
  postRef: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
},
{timestamps:true}
);

var Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment;
