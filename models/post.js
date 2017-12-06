import Commentable from './Commentable';

var PostSchema = new Schema(
  {
    name: String
  },
  {
    discriminatorKey: 'kind'
  }
);

var Post = Commentable.discriminator('Post', PostSchema);
module.exports = Post;
