let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    body: String,
    title: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    childIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      },
    ],
    score: Number
  },
  {
    timestamps: true,
  }
);

let Post = mongoose.model('Post', PostSchema);

module.exports = Post;
