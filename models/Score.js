const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema(
	{
		value: Number,
		upVotes: Number,
		downVotes: Number
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Score', ScoreSchema);
