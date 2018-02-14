const express = require('express');
const app = express();
const path = require('path');

// ----------------------------------------
// ENV
// ----------------------------------------
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

// ----------------------------------------
// Static Resources
// Serve public folder
// ----------------------------------------
app.use('/public', express.static(__dirname + '/public'));
// ----------------------------------------
// Body Parser
// Must set up before logging package
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
const session = require("express-session");

app.use(
  session({
    secret: "123456",
    resave: false,
    saveUninitialized: true
  })
);


// ----------------------------------------
// HTTP Method Overriding
// ----------------------------------------
// Require the two packages
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

// Pass the callback and options from the support package
app.use(methodOverride(
  getPostSupport.callback,
  getPostSupport.options // { methods: ['POST', 'GET']}
));

// ----------------------------------------
// Referrer
// ----------------------------------------
// app.use((req, res, next) => {
//    req.session.backUrl = req.header('Referer') || '/';
//    next();
//  });

// ----------------------------------------
// Mongoose
// ----------------------------------------
const mongoose = require('mongoose');
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});

// ----------------------------------------
// Routes
// ----------------------------------------
const posts = require('./routers/posts');
app.use('/', posts);

const users = require('./routers/users');
app.use('/users', users);

// is there a way to split routes between
// files without overwriting a previous route?
// aka could i use '/' for sessions and 
// just put different routes in the other file
const sessions = require('./routers/sessions');
app.use('/sessions', sessions);



// ----------------------------------------
// Template Engine
// ----------------------------------------
const expressHandlebars = require('express-handlebars');

const hbs = expressHandlebars.create({
//   helpers: helpers,
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// ----------------------------------------
// Server
// ----------------------------------------
app.listen(3000, 'localhost', () => {
   console.log(`Listening on port 3000. \n`);
});
// const port = process.env.PORT ||
//   process.argv[2] ||
//   3000;
// const host = 'localhost';

// let args;
// process.env.NODE_ENV === 'production' ?
//   args = [port] :
//   args = [port, host];

// args.push(() => {
//   console.log(`Listening: http://${ host }:${ port }\n`);
// });

// if (require.main === module) {
//   app.locals.baseUrl = `http://${ host }:${ port }`;
//   server.listen.apply(server, args);
// }


// ----------------------------------------
// Logging
// ----------------------------------------
var morgan = require('morgan');
app.use(morgan('tiny'));

// Output value of req.query, req.params, and req.body
app.use((req, res, next) => {
   ['query', 'params', 'body'].forEach((key) => {
      if(req[key]) {
         var capKey = key[0].toUpperCase() + key.substr(1);
         var value = JSON.stringify(req[key], null, 2);
         console.log(`${ capKey }: ${ value }`);
      }
   });
   next();
});

// ----------------------------------------
// Error Handling
// ----------------------------------------
// app.use((err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }

//   if (err.stack) {
//     err = err.stack;
//   }
//   res.status(500).render('errors/500', { error: err });
// });


module.exports = app;
