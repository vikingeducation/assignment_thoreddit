let repl = require("repl").start({});
const mongoose = require("mongoose");
const models = require("./models");

// connect
require("./mongo")().then(() => {
  // Set `models` global
  repl.context.models = models;

  // model globals
  Object.keys(models).forEach(modelName => {
    repl.context[modelName] = mongoose.model(modelName);
  });

  // logger
  repl.context.lg = data => console.log(data);
});
