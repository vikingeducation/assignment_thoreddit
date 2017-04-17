var express = require('express');
var router = express.Router();

let models = require('../models');
let Post = models.Post;




router.get('/', function(req, res, next) {
    //Query database for posts and send to template
    Post.find({}).populate('author').then(function(posts) {
        res.render('posts/index', {
            posts
        });
    });
});

router.get('/:id', function(req, res, next) {
    //Query database for posts and send to template
    let id = req.params.id;
    console.log("\n\nID: ", id)
    Post.findById(id).populate('comments').then((post) => {
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
