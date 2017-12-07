const formatPosts = posts => {
  let formattedPosts = posts;
  formattedPosts.forEach(post => {
    post.postedAt = post.createdAt.toString().slice(0, 24);
    if (post.body.toString().length > 25) {
      post.body = post.body.toString().slice(0, 50) + '[...]';
    }
  });
  return formattedPosts;
};

module.exports = { formatPosts };
