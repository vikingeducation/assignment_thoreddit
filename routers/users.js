const router = require("express").Router();
const User = require("../models/User");
const h = require("../helpers");

router.get("/", (req, res) => {
  User.getAll()
    .then(users => res.render("users/index", { users }))
    .catch(e => res.status(500).send(e.stack));
});

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/new", (req, res) => {
  if (!req.body.username || !req.body.email) {
    req.flash("alert", "You must fill out both fields!");
    res.redirect(h.newUserPath());
  } else {
    User.new(req.body)
      .then(user => res.redirect(h.userPath(user._id)))
      .catch(e => res.status(500).send(e.stack));
  }
});

router.get("/:id", (req, res) => {
  User.getById(req.params.id).then(user => {
    if (user) res.render("users/single", { user });
    else {
      req.flash("alert", "User not found");
      res.redirect(h.usersPath());
    }
  });
});

module.exports = router;
