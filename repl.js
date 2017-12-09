const mongoose = require('mongoose');
const repl = require('repl').start({});
const models = require('./models');

require('./mongo')().then(() => {
  repl.context.models = models;

  Object.keys(models).forEach(modelName => {
    repl.context[modelName] = mongoose.model(modelName);
  });

  repl.context.lg = data => console.log(data);
});
