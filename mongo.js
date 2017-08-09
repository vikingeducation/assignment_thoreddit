const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(require("./config/mongoUrl"));
};
