import Commentable from './Commentable';

var VoteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' }, //just have user vote once. Query vote collection for already submitted user
    votetype: Number,
    commentable: {
      type: Schema.Types.ObjectId,
      ref: 'Commentable'
    }
  },
  {
    discriminatorKey: 'kind'
  }
);

var Vote = Commentable.discriminator('Vote', VoteSchema);
module.exports = Vote;
