const router = require("express").Router();
const { UserController } = require("../controllers");

router.get("/", (req, res) => {
  UserController.getAll()
    .then(users => {
      res.render("users/index", { users });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
