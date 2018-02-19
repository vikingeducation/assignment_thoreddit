const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatableSchema = new Schema({
   rating: [{
      type: Schema.Types.ObjectId,
      ref: "Rating"
   }]
}, {
   timestamps: true,
   discriminatorKey: 'kind'
});

const Ratable = mongoose.model('Ratable', RatableSchema);

module.exports = Ratable;