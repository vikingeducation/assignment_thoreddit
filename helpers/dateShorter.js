var dateShorter = function(dateData, options) {
  dateData =
    dateData.getMonth() +
    "/" +
    dateData.getDay() +
    "/" +
    dateData.getFullYear();
  return dateData;
};

module.exports = dateShorter;
