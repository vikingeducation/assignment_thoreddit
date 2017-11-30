const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InteractableSchema = new Schema({
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }]
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

InteractableSchema.methods.totalScore = function() {
  var score = 0;

  for (let vote of this.votes) {
    if (!vote.id) throw 'Votes have not been populated';
    vote.upvote ? score += 1 : score -= 1;
  }
  return score;
};

InteractableSchema.methods.removeVote = function(vote) {
  var index = this.votes.indexOf(vote.id);
  this.votes.splice(index, 1);
  this.save();
};

const Interactable = mongoose.model('Interactable', InteractableSchema);

module.exports = Interactable;
