const router = require("express").Router();
const { PostController } = require("../controllers");

router.get("/", (req, res) => {
  PostController.getAll()
    .then(posts => {
      res.render("posts/index", { posts });
    })
    .catch(e => res.status(500).send(e.stack));
});
