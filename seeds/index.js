// seeds/index.js

const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const models = require('../models');

const mongodbUrl = 'mongodb://localhost/please_discuss_development';

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: false,
  mongoose: mongoose,
  seeds: () => {

   let i = 0;
   let text = `This is the text of comment ${ i }.`;
   let rating = i;
   // supplying _id property of each
   let author = "5a811544ab9cb411d4c79da2";
   let comments = '';

   // Run your seeds here
   return models.Comment.create({ text, rating, author });
 }
});