const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));

const hbs = exphbs.create({
  partialsDir: "views/",
  defaultLayout: "main"
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

var port = process.env.PORT || process.argv[2] || 3000;
var host = "localhost";

var args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);
var sessionsRouter = require("./routers/sessions")(app);
app.use("/", sessionsRouter);

var usersRouter = require("./routers/users");
app.use("/users", usersRouter);

args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo")().then(() => next());
  }
});

app.listen.apply(app, args);
