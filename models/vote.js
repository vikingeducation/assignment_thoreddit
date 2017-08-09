const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const VoteSchema = new Schema({
  user:  {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  voteType: Boolean
});


const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;
