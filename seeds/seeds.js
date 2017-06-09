module.exports = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users');
  var users = [];
  for (let i = 0; i < 20; i++) {
    var user = new User({
      fname: 'Foo',
      lname: 'Bar',
      username: `foobar${ i }`,
      email: `foobar${ i }@gmail.com`
    });
    users.push(user);
  }



  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');
  var promises = [];
  [
    users,
    // Other models...
  ].forEach((collection) => {
    collection.forEach((model) => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
