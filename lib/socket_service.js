const models = require('../models');
const Post = models.Post;
const Comment = models.Comment;
const Vote = models.Vote;

var Socket = {};

Socket.setup = (io) => {
  io.on('connection', client => {
    console.log('Socket connected');

    client.on('registerVote', voteData => {
      const Model = voteData.model === 'post' ? Post : Comment;

      Model.findById(voteData.docId)
        .populate('votes')
        .then(doc => {
          // Check if the user has already voted
          var votes = doc.votes;
          var currentUserVote, newVote;

          for (let vote of votes) {
            if (vote.user == voteData.currentUserId) {
              currentUserVote = vote;
            }
          }

          var totalScore = doc.totalScore();

          if (!currentUserVote) {
            // if there is no vote, create a vote
            createNewVote(doc, voteData.currentUserId, voteData.voteType);
            voteData.voteType === 'upvote' ? totalScore += 1 : totalScore -= 1;
          } else {

            // if user clicked upvote
            if (voteData.voteType === 'upvote') {
              if (currentUserVote.upvote === true) {
                deleteVote(currentUserVote, doc);
                totalScore -= 1;
              } else {
                currentUserVote.upvote = true;
                currentUserVote.save();
                totalScore += 2;
              }
            } else {

              // if user clicked downvote
              if (currentUserVote.upvote === true) {
                currentUserVote.upvote = false;
                currentUserVote.save();
                totalScore -= 2;
              } else {
                deleteVote(currentUserVote, doc);
                totalScore += 1;
              }
            }
          }

          const scoreInfo = { score: totalScore, model: voteData.model, docId: doc.id };

          io.emit('score-update', scoreInfo);
        });
    });
  });
};

const createNewVote = (post, userId, voteType) => {
  var type = voteType === 'upvote' ? true : false;
  newVote = new Vote({ user: userId, upvote: type });
  post.votes.push(newVote);
  newVote.save();
  post.save();
};

const deleteVote = (vote, parentDoc) => {
  parentDoc.removeVote(vote);
  vote.remove();
};

module.exports = Socket;
