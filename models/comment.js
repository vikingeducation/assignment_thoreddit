import Commentable from './Commentable';

var CommentSchema = new Schema(
  {
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Commentable'
    }
  },
  {
    discriminatorKey: 'kind'
  }
);

var Comment = Commentable.discriminator('Comment', CommentSchema);
module.exports = Comment;
