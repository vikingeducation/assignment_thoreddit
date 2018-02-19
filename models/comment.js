// const Ratable = require('./ratable');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
   text: String,
   rating: Number,
   author: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
   comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
   }]
}, {
   timestamps: true,
   // discriminatorKey: 'kind'
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;