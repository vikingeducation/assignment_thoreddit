const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(getPostSupport.callback, getPostSupport.options));

const hbs = exphbs.create({
	partialsDir: "views/partials",
	defaultLayout: "main"
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

var port = process.env.PORT || process.argv[2] || 3000;
var host = "localhost";

var args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);
var sessionsRouter = require("./routers/sessions")(app);

app.use((req, res, next) => {
	if (mongoose.connection.readyState) {
		next();
	} else {
		require("./mongo")().then(() => next());
	}
});

app.use("/", sessionsRouter);

var usersRouter = require("./routers/users");
app.use("/users", usersRouter);
var postsRouter = require("./routers/posts");
app.use("/posts", postsRouter);
args.push(() => {
	console.log(`Listening: http://${host}:${port}`);
});

app.get("/", (req, res) => {
	res.redirect("/users");
});

app.listen.apply(app, args);
