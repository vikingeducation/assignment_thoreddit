const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
   // 1 - Upvote, 0 - Downvote, null/undefined - No Vote
   status: Number,
   user: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
   post: String,
   comment: String
}, {
   timestamps: true
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;