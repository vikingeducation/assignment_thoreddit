const mongoose = require('mongoose');


module.exports = () => {
  const collections = mongoose
    .connection
    .collections;

  const collectionKeys = Object.keys(collections);

  let promises = [];

  collectionKeys.forEach((key) => {
    let promise = collections[key].remove();
    promises.push(promise);
  });

  return Promise.all(promises);
};











