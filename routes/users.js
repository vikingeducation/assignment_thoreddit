var express = require("express");
var router = express.Router();
var models = require("./../models");
var { User, Post, Comment } = models;

router.get("/users", (req, res) => {
  User.find()
    .then(users => {
      res.render("users/index", { users });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/users/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id)
    .then(user => {
      res.render("users/show", { user });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post("/users", (req, res) => {
  let searchParams = {
    include: {
      model: Profile,
      include: {
        model: BasicInfo,
        where: {
          age: +req.body.basics.age
        },
        include: {
          model: Location
        }
      }
    }
  };
  console.log(searchParams);
  User.findAll({ include: { all: true, nested: true } }).then(user => {
    console.log(user);
  });
});

// router.get("/users/:id/edit", (req, res) => {
//   let id = req.params.id;
//   User.findById(id)
//     .then(user => {
//       res.render("users/edit", { user });
//     })
//     .catch(e => res.status(500).send(e.stack));
// });

module.exports = router;
