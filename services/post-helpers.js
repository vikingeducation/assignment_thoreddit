const trimPostInfo = posts => {
  let results = posts.map(post => {
    post.createdAt = post.createdAt.toString().slice(0, 24);
    post.body = post.body.toString().slice(0, 100) + "...";
    post.user.id = post.user._id;
    post.id = post._id;
    return post;
  });

  return results;
};

module.exports = {
  trimPostInfo
};