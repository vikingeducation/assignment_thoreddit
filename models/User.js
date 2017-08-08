const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: String,
		email: String,
		post: {
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', UserSchema);
