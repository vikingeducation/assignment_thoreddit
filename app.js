const express = require("express");
const app = express();

// Setting up Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up Cookie session
var cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["asdf1234567890qwer"]
  })
);

//METHOD OVERRIDING
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");

app.use(
  methodOverride(
    getPostSupport.callback,
    getPostSupport.options // { methods: ['POST', 'GET'] }
  )
);
//METHOD OVERRIDING

//sessions?
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.currentUser = req.session.currentUser;
  next();
});

// Setting up Handlebars
const expressHandlebars = require("express-handlebars");
const hbs = expressHandlebars.create({
  partialsDir: "views/",
  defaultLayout: "main"
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//start the mongoose connection
const mongoose = require("mongoose");
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo")().then(() => next());
  }
});

//later figure out the main page
app.get("/", (req, res) => {
  res.redirect("/users");
});

// Import our routers
const usersRoutes = require("./routers/users");
const postsRoutes = require("./routers/posts");
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);


const port = process.env.PORT || 3000;
const host = "localhost";

app.listen(port, host, () => {
  console.log("I'm listening here");
});
