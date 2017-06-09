var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a new schema for
// the user model
var PostSchema = new Schema({
  title: String,
  body: String,
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  vote: {
    up: [String],
    down: [String]
  }
}, {
  timestamps: true
});

PostSchema.virtual('score')
  .get(function() {
    return this.vote.up.length - this.vote.down.length;
  });

PostSchema.virtual('upvote')
  .get(function() {
    return this.vote.up.length;
  });

PostSchema.virtual('downvote')
  .get(function() {
    return this.vote.down.length;
  });

PostSchema.virtual('preview')
  .get(function() {
    return this.body.substring(0, 200) + (this.body.length < 200 ? "" :
      "...(more)");
  });

PostSchema.methods.voteUp = function(username) {
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

PostSchema.methods.voteDown = function(username) {
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

// Create the model with a defined schema
var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
