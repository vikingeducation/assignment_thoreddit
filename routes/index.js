const express = require("express");
const router = express.Router();
const models = require("../models");
const Commentable = models.Commentable;
const mongoose = require("mongoose");

/* GET home page. */
router.get("/", function(req, res, next) {
  Commentable.find({ parentId: 0 }).then(posts => {
    res.render("index", { posts });
  });
});

router.get("/posts/:id", (req, res, next) => {
  Commentable.find({ _id: req.params.id })
    .populate("user")
    .then(posts => {
      res.render("post", { post: posts[0] });
    });
});

module.exports = router;
