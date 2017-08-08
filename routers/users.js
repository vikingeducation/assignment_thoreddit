const router = require("express").Router();
const { UserController } = require("../controllers");
const h = require("../helpers");

router.get("/", (req, res) => {
  UserController.getAll()
    .then(users => res.render("users/index", { users }))
    .catch(e => res.status(500).send(e.stack));
});

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/new", (req, res) => {
  UserController.new(req.body)
    .then(user => res.redirect(h.userPath(user._id)))
    .catch(e => res.status(500).send(e.stack));
});

router.get("/:id", (req, res) => {
  UserController.getById(req.params.id).then(user => {
    if (user) res.render("users/single", { user });
    else {
      req.flash("alert", "User not found");
      res.redirect(h.usersPath());
    }
  });
});

module.exports = router;
