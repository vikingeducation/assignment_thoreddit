module.exports = function() {
  return require("mongoose").connect(process.env.DB_URL);
};
