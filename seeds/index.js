const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/mongo')[env];

const envUrl = process.env[config.use_env_variable];
const localUrl = `mongodb://${ config.host }/${ config.database }`;
const mongodbUrl =  envUrl ? envUrl : localUrl;

const models = require('../models');
const User = models.User;
const Post = models.Post;
const Comment = models.Comment;
const Vote = models.Vote;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {

    var users = [];
    for (let i = 0; i < 10; i++) {
      let user = new User ({
        fname: `Foo${ i }`,
        lname: `Bar${ i }`,
        username: `foobar${ i }`,
        email: `foobar${ i }@example.com`
      });
      users.push(user);
    }

    var posts = [];
    var comments = [];
    var postComments = [];

    for (let user of users) {
      for (let i = 0; i < 3; i++) {

        for (let j = 0; j < 2; j++) {
          let comment = new Comment({
            user: user,
            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
          });
          postComments.push(comment);
          comments.push(comment);
        }

        let post = new Post({
          title: `Foo and Bar ${ i }`,
          body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"+
                "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
                "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
                "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"+
                "cillum dolore eu fugiat nulla pariatur.",
          user: user,
          comments: postComments
        });
        posts.push(post);
        postComments = [];
        comments.forEach(comment => {
          if (!comment.originalPost) {
            comment.originalPost = post;
          }
        });
      }
    }

    var votes = [];
    for (let i = 0; i < posts.length; i++) {
      let vote = new Vote({
        user: users[i],
        upvote: true
      });
      posts[i].votes.push(vote);
      votes.push(vote);
    }

    var promises = [];

    [users, posts, comments, votes].forEach(models => {
      for (let model of models) {
        promises.push(model.save());
      }
    });

    return Promise.all(promises);
  }
});
