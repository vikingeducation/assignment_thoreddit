var express = require('express');
var router = express.Router();

let models = require('../models');
let Post = models.Post;




router.get('/posts', function(req, res, next) {
    //Query database for posts and send to template
    Post.find({}).populate('author').then(function(posts) {
        res.render('posts/index', {
            posts
        });
    });
});



router.get('/posts/:id', function(req, res, next) {
    let id = req.params.id;
    Post.findById(id)
        .populate('author')
        .populate('comments').then((post) => {
            if (post) {
                res.render('posts/show', {
                    title: 'Thoreddit',
                    post
                });
            }
            else {
                res.redirect('/post');
            }
    })
});




module.exports = router;
