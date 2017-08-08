const router = require("express").Router();
const { PostController, UserController } = require("../controllers");
const h = require("../helpers");

router.get("/", (req, res) => {
  PostController.getAll()
    .then(posts => {
      res.render("posts/index", { posts });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/new", (req, res) => {
  UserController.getAll().then(users => {
    res.render("posts/new", { users });
  });
});

router.post("/new", (req, res) => {
  if (!req.body.title) {
    req.flash("alert", "You must include a title!");
    res.redirect(h.newPostPath());
  } else {
    PostController.new(req.body)
      .then(post => res.redirect(h.postPath(post._id)))
      .catch(e => res.status(500).send(e.stack));
  }
});

router.get("/:id", (req, res) => {
  PostController.getById(req.params.id).then(post => {
    console.log(post.comments);
    if (post) {
      return UserController.getAll().then(users => {
        res.render("posts/single", { post, users });
      });
    } else {
      req.flash("alert", "Post not found");
      res.redirect(h.postPath());
    }
  });
});

module.exports = router;
