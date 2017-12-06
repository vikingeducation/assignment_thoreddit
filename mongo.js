let mongoose = require('mongoose');
let env = process.env.NODE_ENV || 'development';
let config = require('./config/mongo')[env];

module.exports = () => {
  let envUrl = process.env[config.use_env_variable];
  let localUrl = `mongodb://${config.host}/${config.database}`;
  let mongoUrl = envUrl ? envUrl : localUrl;
  return mongoose.connect(mongoUrl);
};
