var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  body: String,
  username: String,
  postedAt: Date,
  postId: Number,
  commentRef: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
},
{timestamps:true}
);

var Post = mongoose.model('Post', PostSchema);


module.exports = Post;
