var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = (
	{
		username: String,
		email: String,
		posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
	},
	{ timestamps: true }
);

var User = mongoose.model("User", UserSchema);

module.exports = User;
