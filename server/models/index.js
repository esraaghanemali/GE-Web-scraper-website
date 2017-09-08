const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('../config/config');


mongoose.plugin(require('./getListPlugin'));

var models = {
    user: require('./user'),
    model: require('./modelFiles'),
    userPackage : require('./user-package'),
    status : require('./status'),
    scraperRequest : require('./scrape-request'),
    extractedData : require('./extracted-data'),
    category:require('./category'),
    extractedDataType : require('./extractedDataType'),
    requestType:require('./requestType'),
    webScraperConstants : require('./webScraper-constants')
};

var schemas = Object.keys(models).map(function (key) {
  return models[key].schema;
});

mongoose.Promise = Promise;
mongoose.set('debug', process.env.LOCAL_DEV === '1');

schemas.forEach(function (schema) {
  schema.set('toJSON', {
    virtuals: true,
    getters: true
  });
  schema.set('toObject', {
    virtuals: true,
    getters: true
  });
});

models.connect = function () {
  return new Promise(function (resolve, reject) {
    mongoose.connect(config.mongo.connectionString, function (err) {
      if (err) {
        return reject(err);
      }
      resolve();
    })
  })
};

module.exports = models;


