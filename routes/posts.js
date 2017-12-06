var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var models = require('../models');
var cp = require('child_process');

const mongooseeder = require('mongooseeder');


const mongodbUrl = 'mongodb://localhost/THOREDDIT_development';

const {
  User,
  Post,
  UserPost,
} = models

Object.keys(models).forEach((modelName) => {
  global[modelName] = mongoose.model(modelName);
});


// ----------------------------------------
// Mongoose Queries
// ----------------------------------------

var _num = 0;
function _lg(name) {
  return (results) => {
    console.log(`${ ++_num }. *****************`);
    console.log(name);
    console.log('********************');
    console.log(results);
    console.log('********************');
    console.log();
    return results;
  };
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Post.find()
  .then(_lg('Post.find'))
  .then(posts=>{
    res.render("posts", {posts})
  });
});




module.exports = router;
