var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  sess.views = (sess.views || 0) + 1;
  res.render('index', {
    title: 'Thorredit',
    views: sess.views
  });
});

module.exports = router;
