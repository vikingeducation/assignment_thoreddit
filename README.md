# assignment_thorredit
A social news web application for Viking thunder Gods

Name: Christian Florez

upvoting/downvoting sketch:

score should be a model with following attributes:
commentId: (if blank is a comment on post)
postId:
userId:
amount: (-1, 0, or 1)

Then the ideal would be to simply include this as a reference like this:
// in comments model
score: [{
  type: Schema.Types.ObjectId,
  ref: "Votes"
}]

But then aggregation becomes a pain in the ass

So easier solution is to simply have score be an integer, and have it be evaluated/updated
when posting to votes

This should work FINE