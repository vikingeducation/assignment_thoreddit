var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentableSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: String,
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Commentable'
  }],
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

var Commentable = mongoose.model('Commentable', CommentableSchema);
module.exports = Commentable;