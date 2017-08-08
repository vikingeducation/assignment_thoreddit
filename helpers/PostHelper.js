module.exports = {
  postsPath: () => "/posts",
  postPath: id => `/posts/${id}`,
  newPostPath: () => "/posts/new",
  editPostPath: id => `/posts/${id}/edit`,
  destroyPostPath: id => `/posts/${id}/?_method=delete`
};
