var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ratable = require('./ratable');


var MotelSchema = new Schema({
  name: String
}, {
  discriminatorKey: 'kind'
});


var Motel = Ratable.discriminator('Motel', MotelSchema);




module.exports = Motel;






