const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
  body: String,
  title: String,
  score: Number,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, {
  timestamps: true,
  discriminatorKey: 'scorableKind'
});

// let Post = mongoose.model("Post", PostSchema);

module.exports = PostSchema;
