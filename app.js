var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var url = require('url');



var app = express();

// view engine setup
var expressHandlebars = require('express-handlebars');
app.engine('.hbs', expressHandlebars({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

var sess = {
    secret: 'keyboard cat',
    cookie: {},
    resave: false,
    saveUninitialized: true
};

app.use(session(sess));
app.use(function(req, res, next) {
    var reqUrl = url.parse(req.url);
    if (!req.session.currentUser &&
        !['/login', '/sessions'].includes(reqUrl.pathname)) {
        res.redirect('/login');
    }
    else {
        next();
    }
});

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.currentUser = req.session.currentUser;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));


// Set up logging with Morgan
var morgan = require('morgan');
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

// Mongoose middleware
var mongoose = require('mongoose');
app.use((req, res, next) => {
    if (mongoose.connection.readyState) {
        next();
    }
    else {
        require('./mongo')(req).then(() => next());
    }
});

// HTTP method overriding
app.use((req, res, next) => {
    var method;
    // Allow method overriding in
    // the query string and POST data
    // and remove the key after found
    if (req.query._method) {
        method = req.query._method;
        delete req.query._method;
    }
    else if (typeof req.body === 'object' && req.body._method) {
        method = req.body._method;
        delete req.body._method;
    }
    // Upcase the method name
    // and set the request method
    // to override it from GET to
    // the desired method
    if (method) {
        method = method.toUpperCase();
        req.method = method;
    }
    next();
});



//  Include routes
var index = require('./routes/index');
var sessions = require('./routes/sessions');
app.use('/', index);
app.use('/', sessions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});










// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
