const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CommentableSchema = new Schema({
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Rating"
  }]
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});


var Commentable = mongoose.model('Commentable', CommentableSchema);




module.exports = Commentable;
