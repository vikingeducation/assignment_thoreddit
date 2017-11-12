var PostsHelper = {};

PostsHelper.postsPath = () => '/posts';
PostsHelper.postPath = (id) => `/posts/${ id }`;
PostsHelper.newPostPath = () => '/posts/new';
PostsHelper.editPostPath = (id) => `/posts/${ id }/edit`;
PostsHelper.destroyPostPath = (id) => `/posts/${ id }?_method=delete`;

PostsHelper.postFormAction = (post) => {
  if (post) {
    return `/posts/${ post.id }`;
  } else {
    return '/posts';
  }
};

module.exports = PostsHelper;
