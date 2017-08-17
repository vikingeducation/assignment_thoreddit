var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RatingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  ratable: {
    type: Schema.Types.ObjectId,
    ref: "Ratable"
  },
  value: Number
}, {
  timestamps: true
});


var Rating = mongoose.model('Rating', RatingSchema);




module.exports = Rating;




