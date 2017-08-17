module.exports = {
  usersPath: () => "/users",
  userPath: id => `/users/${id}`,
  newUserPath: () => "/users/new",
  editUserPath: id => `/users/${id}/edit`,
  destroyUserPath: id => `/users/${id}/?_method=delete`
};
