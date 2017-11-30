var UsersHelper = {};

UsersHelper.usersPath = () => '/users';
UsersHelper.userPath = (id) => `/users/${ id }`;
UsersHelper.newUserPath = () => '/users/new';
UsersHelper.editUserPath = (id) => `/users/${ id }/edit`;
UsersHelper.destroyUserPath = (id) => `/users/${ id }?_method=delete`;

UsersHelper.userFormAction = (user) => {
  if (user) {
    return `/users/${ user.id }`;
  } else {
    return '/users';
  }
};

module.exports = UsersHelper;
