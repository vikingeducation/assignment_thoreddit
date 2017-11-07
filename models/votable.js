const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VotableSchema = new Schema(
  {
    score: Number
  },
  {
    timestamps: true,
    discriminatorKey: 'kind'
  }
);

var Votable = mongoose.model('Votable', VotableSchema);

module.exports = Votable;
