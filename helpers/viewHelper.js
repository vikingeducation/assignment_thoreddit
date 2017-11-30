var ViewHelper = {};

ViewHelper.formatDate = (date) => {
  date = new Date(date);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

ViewHelper.voteScore = doc => {
  return doc.totalScore();
};

module.exports = ViewHelper;
