var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var Hotel = mongoose.model('Hotel');
var Motel = mongoose.model('Motel');


// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {
  var hotels;
  var motels;
  Hotel.find({}).populate('ratings')
    .then((results) => {
      hotels = results;
      return Motel.find({}).populate('ratings');
    })
    .then((results) => {
      motels = results;
      res.render('ratables/index', { hotels, motels });
    })
    .catch((e) => res.status(500).send(e.stack));
});




module.exports = router;











