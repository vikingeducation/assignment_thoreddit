const { User } = require("../models");

module.exports = {
  getAll: () => {
    return User.find({}, {}, { sort: { createdAt: -1 } }).populate(
      "comment post"
    );
  }
};
