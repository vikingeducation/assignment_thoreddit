const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Scoreable = require('./Scoreable');

const CommentSchema = new Schema(
	{
		message: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: 'Post'
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		],
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

module.exports = Scoreable.discriminator('Comment', CommentSchema);
