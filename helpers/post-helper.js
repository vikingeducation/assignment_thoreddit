const formatPosts = (posts, user) => {
  let formattedPosts = posts;
  formattedPosts.forEach(post => {
    post.editable = [];
    post.postedAt = post.createdAt.toString().slice(0, 24);
    if (post.body.toString().length > 25) {
      post.body = post.body.toString().slice(0, 50) + '[...]';
    }
    if (post.author.id === user) {
      post.editable.push([true]);
    }
  });
  return formattedPosts;
};

module.exports = { formatPosts };
