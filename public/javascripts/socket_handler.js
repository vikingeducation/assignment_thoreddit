$(document).ready(() => {
  var socket = io.connect();

  $('.vote-link').click(e => {
    e.preventDefault();
    // Get vote data from id => Example: ['upvote', 'post', "5a0291306c5368ab58397271"]
    let data = e.target.id.split('-');
    let currentUserId = document.cookie.replace(/(?:(?:^|.*;\s*)currentUser\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    socket.emit('registerVote', { voteType: data[0], model: data[1], docId: data[2], currentUserId });
  });

  socket.on('score-update', scoreInfo => {
    $(`#${ scoreInfo.model }-score-${ scoreInfo.docId }`).text(`${ scoreInfo.score }`);
  });
});
