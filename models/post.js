let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    body: String,
    userId: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

let Post = mongoose.model('Post', PostSchema);

module.exports = Post;
