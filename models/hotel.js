var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ratable = require('./ratable');


var HotelSchema = new Schema({
  name: String
}, {
  discriminatorKey: 'kind'
});


var Hotel = Ratable.discriminator('Hotel', HotelSchema);




module.exports = Hotel;






