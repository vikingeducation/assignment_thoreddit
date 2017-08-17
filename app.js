var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

var cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["asdf1234567890qwer"]
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.currentUser = req.session.currentUser;
  next();
});

app.use((req, res, next) => {
  var method;
  if (req.query._method) {
    method = req.query._method;
    delete req.query._method;
    for (let key in req.query) {
      req.body[key] = decodeURIComponent(req.query[key]);
    }
  } else if (typeof req.body === "object" && req.body._method) {
    method = req.body._method;
    delete req.body._method;
  }

  if (method) {
    method = method.toUpperCase();
    req.method = method;
  }

  next();
});

app.use((req, res, next) => {
  req.session.backUrl = req.header("Referer") || "/";
  next();
});

app.use(express.static(`${__dirname}/public`));

var morgan = require("morgan");
app.use(morgan("tiny"));
app.use((req, res, next) => {
  console.log();
  ["query", "params", "body"].forEach(key => {
    if (req[key]) {
      var capKey = key[0].toUpperCase() + key.substr(1);
      var value = JSON.stringify(req[key], null, 2);
      console.log(`${capKey}: ${value}`);
    }
  });
  next();
});

var mongoose = require("mongoose");
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo")(req).then(() => next());
  }
});

var sessionsRouter = require("./routers/sessions")(app);
app.use("/", sessionsRouter);

var usersRouter = require("./routers/users");
app.use("/users", usersRouter);

var postsRouter = require("./routers/posts");
app.use("/posts", postsRouter);

var commentRouter = require("./routers/comments");
app.use("/comments", commentRouter);

var expressHandlebars = require("express-handlebars");

var hbs = expressHandlebars.create({
  partialsDir: "views/",
  defaultLayout: "application"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

var port = process.env.PORT || process.argv[2] || 3000;
var host = "localhost";

var args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen.apply(app, args);

module.exports = app;
