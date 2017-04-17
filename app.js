var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
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
}

app.use(session(sess))
app.use(function(req, res, next) {
    if (!req.session.currentUser) {
        res.redirect('/login');
    }
    else {
        next();
    }
});

app.use(express.static(path.join(__dirname, 'public')));




app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
