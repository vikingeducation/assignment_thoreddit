const User = require('../models').User;

const AuthRedirection = (req, res, next) => {
  var userId = req.cookies.currentUser;

  if (req.url !== '/login') {
    User.findById(userId)
      .then(user => {
        if (!user) throw 'No Current User';
        next();
      })
      .catch(e => {
        res.redirect('/login');
      });
  } else {
    User.findById(userId)
      .then(user => {
        if (user) throw 'Already Logged in';
        next();
      })
      .catch(e => {
        if (e === 'Already Logged in') {
          res.redirect('/');
        } else {
          res.redirect('/login');
        }
      });
  }
};

module.exports = AuthRedirection;
