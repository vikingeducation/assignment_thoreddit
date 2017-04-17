var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;





router.get('/', function(req, res, next) {
  User.find().then((users) => {
    res.render('users/index', {
      title: 'Thoreddit',
      users
    });
  })
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Thoreddit'
    });
});
router.post('/login', function(req, res, next) {
    res.render('login', {
        title: 'Thoreddit'
    });
});



// router.get('/logout', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
// });

module.exports = router;
