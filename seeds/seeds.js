const MULTIPLIER = 1;

module.exports = () => {

  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users');
  var users = [];
  for (let i = 0; i < MULTIPLIER * 2; i++) {
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
  let promises = [];
  [
    // each model, aka users, hotels, etc.
    users
  ].forEach((collection) => {
    collection.forEach((model) => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};