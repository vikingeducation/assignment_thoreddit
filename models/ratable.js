var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RatableSchema = new Schema({
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: "Rating"
  }]
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});


RatableSchema.virtual('rating').get(function() {
  if (this.ratings.length) {
    var total = this.ratings.reduce((sum, rating) => {
      return sum += rating.value;
    }, 0);
    return total / this.ratings.length;
  }

  return 0;
});


var Ratable = mongoose.model('Ratable', RatableSchema);




module.exports = Ratable;












