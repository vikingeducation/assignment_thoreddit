var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentableSchema = new Schema({
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true,
    discriminatorKey: 'kind'
});

module.exports = mongoose.model('Commentable', CommentableSchema);
