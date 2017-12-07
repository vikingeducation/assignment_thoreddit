const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Session/Cookies
const cookieSession = require('cookie-session');
app.use(
  cookieSession({
    name: 'session',
    keys: ['asdf1234']
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.currentUser = req.session.currentUser;
  next();
});

// Method Override
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');
app.use(methodOverride(getPostSupport.callback, getPostSupport.options));

// Referrer
app.use((req, res, next) => {
  req.session.backUrl = req.header('Referer') || '/';
  next();
});

// Logging
const morgan = require('morgan');
app.use(morgan('tiny'));

// Mongoose
const mongoose = require('mongoose');
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});

// Routes
const sessionsRoutes = require('./controllers/sessions')(app);
const usersRoutes = require('./controllers/users');
const postsRoutes = require('./controllers/posts');
const commentsRoutes = require('./controllers/comments');

app.use('/', sessionsRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

// Template Engine
const expressHandlebars = require('express-handlebars');

const hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Server
const port = process.env.PORT || process.argv[2] || 3000;
const host = 'localhost';

let args;
process.env.NODE_ENV === 'production' ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen.apply(app, args);

module.exports = app;
