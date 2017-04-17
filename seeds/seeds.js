// var faker = require('faker');
// var voca = require('voca');

// const MULTIPLIER = 1;

// function randomRating() {
//   return Math.floor(Math.random() * 6);
// }

// function randomLodgingName(type) {
//   type = voca.titleCase(type);
//   var randomWord = faker.random.word();
//   randomWord = voca.titleCase(randomWord);
//   var names = [
//     `The ${ randomWord } Inn`,
//     `${ type } ${ randomWord }`,
//     `${ randomWord } ${ type }`
//   ];
//   var index = Math.floor(Math.random() * names.length);
//   return names[index];
// }

module.exports = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log("Creating Users");
  var users = [];
  for (let i = 0; i < 6; i++) {
    var user = new User({
      fname: "Foo",
      lname: "Bar",
      username: `foobar${i}`,
      email: `foobar${i}@gmail.com`
    });
    users.push(user);
  }

  //   // ----------------------------------------
  //   // Hotels
  //   // ----------------------------------------
  //   console.log('Creating Hotels');
  //   var hotels = [];
  //   for (let i = 0; i < MULTIPLIER * 100; i++) {
  //     var hotel = new Hotel({
  //       name: randomLodgingName('hotel')
  //     });
  //     hotels.push(hotel);
  //   }

  //   // ----------------------------------------
  //   // Motels
  //   // ----------------------------------------
  //   console.log('Creating Motels');
  //   var motels = [];
  //   for (let i = 0; i < MULTIPLIER * 100; i++) {
  //     var motel = new Motel({
  //       name: randomLodgingName('motel')
  //     });
  //     motels.push(motel);
  //   }

  //   // ----------------------------------------
  //   // Ratings
  //   // ----------------------------------------
  //   console.log('Creating Ratings');
  //   var ratings = [];
  //   for (let i = 0; i < MULTIPLIER * 1000; i++) {
  //     var hotel = hotels[i % hotels.length];
  //     var motel = motels[i % motels.length];
  //     var user = users[1];
  //     var hotelRating = new Rating({
  //       ratable: hotel,
  //       user: user,
  //       value: randomRating()
  //     });
  //     var motelRating = new Rating({
  //       ratable: motel,
  //       user: user,
  //       value: randomRating()
  //     });
  //     hotel.ratings.push(hotelRating);
  //     motel.ratings.push(motelRating);
  //     ratings.push(hotelRating);
  //     ratings.push(motelRating);
  //   }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log("Saving...");
  var promises = [];
  [
    users
    // hotels,
    // motels,
    // ratings
  ].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
