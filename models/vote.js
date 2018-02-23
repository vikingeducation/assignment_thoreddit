const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');

const VoteSchema = new Schema({
   // 1 - Upvote, -1 - Downvote, 0 - No Vote
   status: { type: Number, default: 0 },
   user: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
   post: String,
   comment: String
}, {
   timestamps: true
});

VoteSchema.plugin(findOrCreate);

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;