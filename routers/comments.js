const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');

// Form for creating a comment
router.get('/new/:id', (req, res) => {
   
   res.render('comments/new', {});
});

module.exports = router;