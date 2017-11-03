const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Meme = require("./meme");

var CommentSchema = new Schema(
	{
		body: String,
		parent: {
			type: Schema.Types.ObjectId
		},
		meme: {
			type: Schema.Types.ObjectId,
			ref: "Meme"
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		score: Number
	},
	{
		timestamps: true
	}
);

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

// recursive
