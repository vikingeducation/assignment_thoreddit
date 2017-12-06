const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const models = require('../models');
const User = models.User;
const Comment = models.Comment;
const Post = models.Post;

const mongodbUrl = 'mongodb://localhost/assignment_thoreddit_development';

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {
    const users = [];

    for (let i = 0; i < 10; i++) {
      const user = new User({
        username: `foobar${i}`,
      });
      users.push(user);
    }

    const posts = [];

    for (let i = 0; i < 10; i++) {
      const post = new Post({
        childIds: [],
        title: `title${i}`,
        body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        userId: users[i].id
      });
      posts.push(post);
    }

      const comments = [];
      

     for (var i = 0, len = 50; i < len; i++) {
        const comment = new Comment({
          body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          childIds: []
        })
        posts[Math.floor(i/5)].childIds.push(comment.id);
        comments.push(comment);
     }
       
    const promises = [];
    const collections = [users, posts, comments];
   
    collections.forEach(collection => {
      collection.forEach(model => {
        const promise = model.save();
        promises.push(promise);
      });
    });

    return Promise.all(promises);
  }
});
