const router = require("express").Router();
const User = require("../models/User");
const h = require("../helpers");
const Post = require("../models/Post");

router.get("/", (req, res) => {
  Post.getAll()
    .then(posts => {
      res.render("posts/index", { posts });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/new", (req, res) => {
  User.getAll().then(users => {
    res.render("posts/new", { users });
  });
});

router.post("/new", (req, res) => {
  if (!req.body.title || !req.body.userId) {
    req.flash("alert", "You must include a title!");
    res.redirect(h.newPostPath());
  } else {
    Post.new(req.body)
      .then(post => res.redirect(h.postPath(post._id)))
      .catch(e => res.status(500).send(e.stack));
  }
});

router.get("/:id", (req, res) => {
  Post.getById(req.params.id)
    .then(post => {
      if (post) {
        return User.getAll().then(users => {
          res.render("posts/single", { post, users });
        });
      } else {
        req.flash("alert", "Post not found");
        res.redirect(h.postsPath());
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

router.delete("/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("back"))
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
