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

// let PostController = {
// 	index: (req, res) => {
// 		// Fetch data from model.
// 		...
// 		// Render view with data.
// 	},
// 	view: (req, res) => {
// 		// Fetch data from model.
// 		...
// 		// Render view with data.
// 	},
// 	create: (req, res) => {
// 		// add data to database.
// 		...
// 		// Redirect
// 	},
// 	delete: (req, res) => {
// 		// delete data from database.
// 		...
// 		// Redirect
// 	}
// }
//
// router.get("/", PostController.index);
// router.get("/:id", PostController.view);
// router.post("/", PostController.create);
// router.get('/delete', PostController.delete);
