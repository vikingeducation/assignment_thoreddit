const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreableSchema = new Schema(
	{
		scores: {
			type: Schema.Types.ObjectId,
			ref: 'Score'
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'kind'
	}
);

module.exports = mongoose.model('Scoreable', ScoreableSchema);
