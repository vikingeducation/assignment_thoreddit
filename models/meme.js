const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MemeSchema = new Schema(
	{
		title: String,
		description: String,
		url: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		comments: {
			type: Schema.Types.ObjectId,
			ref: "Comment"
		},
		score: Number
	},
	{
		timestamps: true
	}
);

var Meme = mongoose.model("Meme", MemeSchema);

module.exports = Meme;
