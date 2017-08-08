const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Scoreable = require('./Scoreable');

const PostSchema = new Schema(
	{
		title: String,
		body: String,
		comment: {
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	},
	{
		discriminatorKey: 'kind',
		timestamps: true
	}
);

module.exports = Scoreable.discriminator('Post', PostSchema);
