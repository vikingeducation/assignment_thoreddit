const mongoose = require('mongoose');
const bluebird = require('bluebird');


mongoose.Promise = bluebird;


const models = {};


// Load models and attach to models object here
models.User = require('./user'); 
models.Post = require('./post');
models.Comment = require('./comment');
models.Vote = require('./vote');



module.exports = models;





