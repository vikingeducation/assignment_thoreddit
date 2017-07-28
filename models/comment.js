const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: String,
  score: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, {
  timestamps: true
});

// var autoPopulateChildren = function(next) {
//     this.populate('children');
//     next();
// };

// CommentSchema.pre('findOne', autoPopulateChildren).pre('find', autoPopulateChildren)

const Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment;