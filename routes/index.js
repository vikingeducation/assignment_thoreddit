var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', (req, res, next) => {
    console.log('here1');
    req.session.username = req.body.username;
    console.log('here2');
    res.redirect('/posts');
});

module.exports = router;
