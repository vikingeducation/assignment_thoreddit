const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VotableSchema = new Schema(
  {
    score: Number,
    parent_post: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    hasUpvoted: [String],
    hasDownvoted: [String]
  },
  {
    timestamps: true,
    discriminatorKey: 'kind'
  }
);

VotableSchema.methods.upvote = function(username) {
  if (this.hasUpvoted.includes(username)) {
    this.score = this.score - 1;
    remove(this.hasUpvoted, username);
    this.save();
  } else if (this.hasDownvoted.includes(username)) {
    this.score = this.score + 2;
    remove(this.hasDownvoted, username);
    this.hasUpvoted.push(username);
    this.save();
  } else {
    this.hasUpvoted.push(username);
    this.score = this.score + 1;
    this.save();
  }
};

VotableSchema.methods.downvote = function(username) {
  if (this.hasDownvoted.includes(username)) {
    this.score = this.score + 1;
    remove(this.hasDownvoted, username);
    this.save();
  } else if (this.hasUpvoted.includes(username)) {
    this.score = this.score - 2;
    remove(this.hasUpvoted, username);
    this.hasDownvoted.push(username);
    this.save();
  } else {
    this.hasDownvoted.push(username);
    this.score = this.score - 1;
    this.save();
  }
};

function remove(array, element) {
  const index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

var Votable = mongoose.model('Votable', VotableSchema);

module.exports = Votable;
