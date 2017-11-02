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
		}
	},
	{
		timestamps: true,
		discriminatorKey: "kind"
	}
);

var Meme = mongoose.model("Meme", MemeSchema);

module.exports = Meme;
