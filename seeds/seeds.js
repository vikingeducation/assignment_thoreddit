var faker = require("faker");
var voca = require("voca");

const MULTIPLIER = 7;

function randomRating() {
  return Math.floor(Math.random() * 6);
}

function randomLodgingName(type) {
  type = voca.titleCase(type);
  var randomWord = faker.random.word();
  randomWord = voca.titleCase(randomWord);
  var randomVerb = faker.hacker.ingverb();
  randomVerb = voca.titleCase(randomVerb);
  var randomWord2 = faker.hacker.noun();
  randomWord2 = voca.titleCase(randomWord2);
  var randomVerb2 = faker.hacker.ingverb();
  randomVerb2 = voca.titleCase(randomVerb2);
  var title = [
    `The ${randomWord} is ${randomVerb} ${randomWord2}`,
    `The ${randomWord2} is ${randomVerb2} the ${randomWord}`
  ];
  var index = Math.floor(Math.random() * title.length);
  return title[index];
}

module.exports = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log("Creating Users");
  var users = [];

  var user = new User({
    fname: "Will",
    lname: "Whitworth",
    username: `Will`,
    email: `will@gmail.com`
  });
  users.push(user);

  for (let i = 1; i < MULTIPLIER * 2; i++) {
    let first_name = faker.name.firstName();
    var user = new User({
      fname: first_name,
      lname: faker.name.lastName(),
      username: `${first_name}${i}`,
      email: `${first_name}${i}@gmail.com`
    });
    users.push(user);
  }

  // ----------------------------------------
  // Posts
  // ----------------------------------------
  console.log("Creating Posts");

  var posts = [];
  for (let i = 0; i < MULTIPLIER * 100; i++) {
    var post = new Post({
      title: randomLodgingName("post"),
      author_id: users[Math.floor(Math.random() * users.length)].email,
      body: faker.lorem.paragraph(),
      score: Math.floor(Math.random() * 500)
    });
    posts.push(post);
  }

  // ----------------------------------------
  // Ratings
  // ----------------------------------------

  console.log("Creating Comments");

  var comments = [];
  for (let i = 0; i < MULTIPLIER * 1; i++) {
    var comment = new Comment({
      author_id: users[Math.floor(Math.random() * users.length)].email,
      body: faker.lorem.paragraph(),
      score: Math.floor(Math.random() * 500)
    });
    comments.push(comment);
  }
  // console.log("Creating Ratings");
  // var ratings = [];
  // for (let i = 0; i < MULTIPLIER * 1000; i++) {
  //   var hotel = hotels[i % hotels.length];
  //   var motel = motels[i % motels.length];
  //   var user = users[1];
  //   var hotelRating = new Rating({
  //     ratable: hotel,
  //     user: user,
  //     value: randomRating()
  //   });
  //   var motelRating = new Rating({
  //     ratable: motel,
  //     user: user,
  //     value: randomRating()
  //   });
  //   hotel.ratings.push(hotelRating);
  //   motel.ratings.push(motelRating);
  //   ratings.push(hotelRating);
  //   ratings.push(motelRating);
  // }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log("Saving...");
  var promises = [];
  [users, posts, comments].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
