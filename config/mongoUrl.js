const env = process.env.NODE_ENV || "development";
const config = require("./mongo.json")[env];
module.exports =
  process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;
