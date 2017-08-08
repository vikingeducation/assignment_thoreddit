const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vote"
      }
    ],
    body: String,
    title: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  {
    timestamps: true
  }
);

// Virtual method for returning short body
PostSchema.virtual("shortBody").get(function() {
  let bodyShort = [];
  let bodyArray = this.body.split(" ");
  for (let i = 0; i < 5; i++) {
    bodyShort.push(bodyArray[i]);
  }
  return bodyShort.join(" ");
});

// Virtual method for returning short title
PostSchema.virtual("shortTitle").get(function() {
  let titleShort = [];
  let titleArray = this.title.split(" ");
  for (let i = 0; i < 3; i++) {
    titleShort.push(titleArray[i]);
  }

  return titleShort.join(" ");
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
