const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const morgan = require("morgan");
app.use(morgan("tiny"));

app.use((req, res, next) => {
  ["query", "params", "body"].forEach(key => {
    if (req[key]) {
      var capKey = key[0].toUpperCase() + key.substr(1);
      var value = JSON.stringify(req[key], null, 2);
      console.log(`${capKey}: ${value}`);
    }
  });
  next();
});

app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo").then(next);
  }
});

const expressHandlebars = require("express-handlebars");
const hbs = expressHandlebars.create({
  defaultLayout: "application"
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// var loginRoutes = require('./routes/login');
// app.use('/', loginRoutes);

var usersRoutes = require("./routes/users");
var postsRoutes = require("./routes/posts");

app.use("/", usersRoutes);
app.use("/", postsRoutes);

app.listen(3000, () => {
  console.log("Listening...");
});
