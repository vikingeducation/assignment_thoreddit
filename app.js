const express = require('express');
const app = express();


// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// Method Override
app.use((req, res, next) => {
  if (req.query._method || (typeof req.body === 'object' && req.body._method)) {
    let method = req.query._method || req.body._method;
    req.method = method.toUpperCase();
    req.url = req.path;
  }
  next();
});


// Public
app.use(express.static(`${__dirname}/public`));


// Logging
const logger = require('morgan');
const morganToolkit = require('morgan-toolkit')(logger);

app.use(morganToolkit());


// Sessions/Cookies
var cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['asdf1234567890qwer']
}));


// Flash Messages
var flash = require('express-flash-messages');
app.use(flash());


// Database
const mongoose = require('mongoose');
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});


// Authentication Redirection
const authRedirect = require('./lib/auth_redirect');
app.use(authRedirect);


// Routes
const index = require('./routers/index');
const users = require('./routers/users');
const posts = require('./routers/posts');
const comments = require('./routers/comments');

app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);
app.use('/comments', comments);


// Template Engine
const expressHandlebars = require('express-handlebars');
const helpers = require('./helpers');

const hbs = expressHandlebars.create({
  helpers: helpers,
  partialsDir: 'views/',
  defaultLayout: 'application',
  extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// Server
var port = process.env.PORT ||
  process.argv[2] ||
  3000;
var host = 'localhost';

var args;
if (process.env.NODE_ENV === 'production') {
  args = [port];
} else {
  args = [port, host];
}

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }`);
});

const server = app.listen.apply(app, args);

// Web Socket
const io = require('socket.io').listen(server);
const socket = require('./lib/socket_service');
socket.setup(io);
