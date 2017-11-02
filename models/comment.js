const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Meme = require("./meme");

var CommentSchema = new Schema(
	{
		body: String,
		meme: {
			type: Schema.Types.ObjectId,
			ref: "Meme"
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true,
		discriminatorKey: "kind"
	}
);

var Comment = Meme.discriminator("Comment", CommentSchema);

module.exports = Comment;
