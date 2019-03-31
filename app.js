const express = require('express');
const app = express();

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// mongoose
const mongoose = require('mongoose');
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});

// session
const session = require("express-session");
app.use(
  session({
    secret: "123456",
    resave: false,
    saveUninitialized: true
  })
);

// method override
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

app.use(methodOverride(
  getPostSupport.callback,
  getPostSupport.options
));

//logging
const morgan = require('morgan');
app.use(morgan('tiny'));

app.use((req, res, next) => {
  ['query', 'params', 'body'].forEach((key) => {
    if (req[key]) {
      var capKey = key[0].toUpperCase() + key.substr(1);
      var value = JSON.stringify(req[key], null, 2);
      console.log(`${ capKey }: ${ value }`);
    }
  });
  next();
});

// hbs
const expressHandlebars = require('express-handlebars');
const hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// routes
const userRouter = require('./routers/users');
app.use('/', userRouter);

// server
var port = process.env.PORT ||
  process.argv[2] ||
  3000;
var host = 'localhost';

var args;
process.env.NODE_ENV === 'production' ?
  args = [port] :
  args = [port, host];

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }`);
});

app.listen.apply(app, args);

module.exports = app;
