const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  upvote: Boolean
}, {
  timestamps: true
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;




