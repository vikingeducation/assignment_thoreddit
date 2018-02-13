var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var Post = mongoose.model('Post');

router.get('/', (req, res) => {
   // if they don't have an active session, forward to sessions/login


   Post.find()
      .limit(10)
      .then((posts) => {
         console.log(`Posts: ${ posts }`);
         res.render('posts/index', { posts });
      });
   
   
});

module.exports = router;