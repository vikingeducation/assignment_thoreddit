const lorem = require('lorem-ipsum');
const MULTIPLIER = 1;

const capitalize = (string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = () => {

  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users');
  let users = [];
  for (let i = 0; i < MULTIPLIER * 10; i++) {
    let fname = lorem({count: 1, units: 'words'});
    let lname = lorem({count: 1, units: 'words'});

    let user = new User({
      fname: capitalize(fname),
      lname: capitalize(lname),
      username: `${ fname }${ lname }${ i }`,
      email: `${ fname }${ lname }${ i }@gmail.com`
    });
    users.push(user);
  }

  // ----------------------------------------
  // Create Posts
  // ----------------------------------------
  console.log('Creating Posts');
  let posts = [];
  for (let i = 0; i < MULTIPLIER * 10; i++) {
    let user = users[i % users.length];
    let post = new Post({
      title: lorem({
              count: 1,
              units: 'sentences' 
            }),
      body: lorem({
              count: 3,
              units: 'sentences' 
            }),
      user: user
    });
    posts.push(post);
  }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');
  let promises = [];
  [
    users,
    posts
  ].forEach((collection) => {
    collection.forEach((model) => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};