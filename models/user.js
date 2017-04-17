var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
}, {
    timestamps: true
});

// Create the model with a defined schema

let User = mongoose.model('User', UserSchema);

module.exports = User;
