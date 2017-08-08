const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Scoreable = require('./Scoreable');

const PostSchema = new Schema(
	{
		title: String,
		body: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		comment: {
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		},
		score: {
			type: Schema.Types.ObjectId,
			ref: 'Score'
		}
	},
	{
		discriminatorKey: 'kind',
		timestamps: true
	}
);

module.exports = Scoreable.discriminator('Post', PostSchema);
