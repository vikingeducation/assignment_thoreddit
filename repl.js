// Require mongoose and start up the REPL
// Also require our models
var mongoose = require("mongoose");
var repl = require("repl").start({});
var models = require("./models");

// Use our promise based connection
// file to wrap our REPL and execute
// only once we've connected to MongoDB
require("./mongo")().then(() => {
  // Set `models` to be available in
  // the REPL by name
  repl.context.models = models;

  // Set each model to be available in the REPL
  // by name
  Object.keys(models).forEach(modelName => {
    repl.context[modelName] = mongoose.model(modelName);
  });

  // Helper function to output the result of
  // a query
  repl.context.lg = data => console.log(data);
});
