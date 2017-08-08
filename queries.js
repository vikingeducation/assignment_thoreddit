const mongoose = require("mongoose");
var models = require("./models");
var cp = require("child_process");

Object.keys(models).forEach(modelName => {
  global[modelName] = mongoose.model(modelName);
});

// ----------------------------------------
// Mongoose Queries
// ----------------------------------------

var _num = 0;

require("./mongo")()
  // ----------------------------------------
  // Seed
  // ----------------------------------------

  // ----------------------------------------
  // Find
  // ----------------------------------------
  .then(() => {
    return User.find().then(_lg("User.find"));
  })
  // .then(() => {
  //   return User.findOne().then(_lg("User.findOne"));
  // })
  // .then(user => {
  //   return User.findById(user.id).then(_lg("User.findById"));
  // })
  // .then(user => {
  //   return User.findByIdAndUpdate(user.id, {
  //     fname: "Updated!",
  //     lname: "Updated!"
  //   }).then(_lg("User.findByIdAndUpdate"));
  // })
  // .then(user => {
  //   return User.findByIdAndRemove(user.id).then(_lg("User.findByIdAndRemove"));
  // })
  // .then(user => {
  //   return User.findOne({}, { _id: 0, fname: 1, lname: 1 }).then(
  //     _lg("User.findOne Projection")
  //   );
  // })
  // // ----------------------------------------
  // // Filtering Documents
  // // ----------------------------------------
  // .then(() => {
  //   return Rating.find({
  //     value: { $gte: 2 }
  //   })
  //     .limit(10)
  //     .then(_lg("Rating.find"));
  // })
  // // ----------------------------------------
  // // $where
  // // ----------------------------------------
  // .then(() => {
  //   return Rating.$where("this.value >= 2")
  //     .limit(10)
  //     .then(_lg("Rating.$where"));
  // })
  // // ----------------------------------------
  // // where
  // // ----------------------------------------
  // .then(() => {
  //   return Rating.where("value").gte(2).limit(10).then(_lg("Rating.where"));
  // })
  // // ----------------------------------------
  // // Limiting and Offsetting
  // // ----------------------------------------
  // .then(() => {
  //   return Rating.find(
  //     {},
  //     {},
  //     {
  //       limit: 10,
  //       skip: 10
  //     }
  //   ).then(_lg("Rating.skip.limit"));
  // })
  // .then(() => {
  //   return Rating.find().limit(10).skip(10).then(_lg("Rating.skip.limit"));
  // })
  // // ----------------------------------------
  // // Create
  // // ----------------------------------------
  // .then(() => {
  //   return User.create({
  //     fname: "Just",
  //     lname: "Created",
  //     username: "justcreated",
  //     email: "just@created.com"
  //   }).then(_lg("User.create"));
  // })
  // // ----------------------------------------
  // // Update
  // // ----------------------------------------
  // .then(() => {
  //   return User.update({
  //     fname: "Update",
  //     lname: "Again!"
  //   }).then(_lg("User.update"));
  // })
  // .then(() => {
  //   return User.updateMany({
  //     fname: "All",
  //     lname: "Same"
  //   }).then(_lg("User.updateMany"));
  // })
  // // ----------------------------------------
  // // Destroy
  // // ----------------------------------------
  // .then(() => {
  //   return User.remove({
  //     username: "justcreated"
  //   })
  //     .then(r => (r ? 1 : 0))
  //     .then(_lg("User.remove"));
  // })
  // // ----------------------------------------
  // // Sorting
  // // ----------------------------------------
  // .then(() => {
  //   return Rating.find(
  //     {},
  //     {
  //       _id: 0,
  //       value: 1
  //     },
  //     {
  //       sort: { value: -1 }
  //     }
  //   ).then(_lg("Rating.find.sort"));
  // })
  // .then(() => {
  //   return Rating.find(
  //     {},
  //     {
  //       _id: 0,
  //       value: 1
  //     }
  //   )
  //     .sort({ value: -1 })
  //     .then(_lg("Rating.find.sort"));
  // })
  // // ----------------------------------------
  // // Instances
  // // ----------------------------------------
  // .then(() => {
  //   return Motel.findOne().then(_lg("Motel.findOne"));
  // })
  // .then(motel => {
  //   motel.name = "Bates Motel";
  //   return motel.save().then(_lg("motel.save"));
  // })
  // // ----------------------------------------
  // // Populate
  // // ----------------------------------------
  // .then(() => {
  //   return Rating.find()
  //     .limit(10)
  //     .populate("user")
  //     .then(_lg("Rating.find.populate"));
  // })
  // .then(() => {
  //   return Rating.find()
  //     .limit(10)
  //     .populate({
  //       path: "user",
  //       select: ["fname", "lname"]
  //     })
  //     .then(_lg("Rating.find.populate({ path, select })"));
  // })
  // // ----------------------------------------
  // // Map Reduce
  // // ----------------------------------------
  // .then(() => {
  //   return Rating.mapReduce({
  //     map: function() {
  //       emit(this.ratable, this.value);
  //     },
  //     reduce: function(key, values) {
  //       if (values.length) {
  //         var total = values.reduce((sum, value) => {
  //           return (sum += value);
  //         }, 0);
  //         return total / values.length;
  //       }
  //
  //       return 0;
  //     }
  //   }).then(_lg("Rating.mapReduce"));
  // })
  // // ----------------------------------------
  // // Aggregate Pipeline
  // // ----------------------------------------
  // .then(() => {
  //   return Rating.aggregate([
  //     { $group: { _id: "$ratable", rating: { $avg: "$value" } } },
  //     { $sort: { rating: -1 } }
  //   ]).then(_lg("Rating.aggregate"));
  // })
  // // ----------------------------------------
  // // Finish
  // ----------------------------------------
  .catch(e => console.error(e.stack))
  .then(() => mongoose.disconnect());
