var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a new schema for
// the user model
var CommentSchema = new Schema({
  body: String,
  post: Schema.Types.ObjectId,
  _comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  vote: {
    up: [String],
    down: [String]
  }
}, {
  timestamps: true
});

CommentSchema.virtual('score')
  .get(function() {
    return this.vote.up.length - this.vote.down.length;
  });

CommentSchema.virtual('upvote')
  .get(function() {
    return this.vote.up.length;
  });

CommentSchema.virtual('downvote')
  .get(function() {
    return this.vote.down.length;
  });

CommentSchema.methods.voteUp = function(username) {
  // see if already in array
  var i = this.vote.up.indexOf(username);
  // if not found, then add the user
  if (i === -1) {
    this.vote.up.push(username);
    this.save();
    // if found, the user is changing their vote and they are removed
  } else {
    this.vote.up.splice(i, 1);
    this.save();
  }
  // now remove them from the down list if they are there
  var i = this.vote.down.indexOf(username);
  // if not found, then add the user
  if (i != -1) {
    this.vote.down.splice(i, 1);
    this.save();
  }
};

CommentSchema.methods.voteDown = function(username) {
  // see if already in array
  var i = this.vote.down.indexOf(username);
  // if not found, then add the user
  if (i === -1) {
    this.vote.down.push(username);
    this.save();
    // if found, the user is changing their vote and they are removed
  } else {
    this.vote.down.splice(i, 1);
    this.save();
  }
  // and remove them from the up list if they voted there
  var i = this.vote.up.indexOf(username);
  // if not found, then add the user
  if (i != -1) {
    this.vote.up.splice(i, 1);
    this.save();
  }
};

CommentSchema.methods.addComment = function(comment_id) {
  this._comments.push(comment_id);
  this.save();
}

var autoPopulateComments = function(next) {
  this.populate('_comments');
  next();
}

CommentSchema.pre('findOne', autoPopulateComments);

// Create the model with a defined schema
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
