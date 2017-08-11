var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var models = require('./models/index');
var utils = require('./utils');

//defines models routes
var usersRoutes = require('./routes/users');
var extractedDataRoutes = require('./routes/extracted-data');
var scrapeRequestRoutes = require('./routes/scrape-request');
var statusRoutes = require('./routes/status');
var userPackageRoutes = require('./routes/user-package');
var webScraperConstantsRoutes = require('./routes/webScraper-constants');
var modelFilesRoutes = require('./routes/modelFiles');
var categoriesRoutes = require('./routes/category');
var extractedDataTypeRoutes = require('./routes/extractedDataType');


var app = express();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('cors')());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRoutes);
app.use('/modelFiles', modelFilesRoutes);
app.use('/status', statusRoutes);
app.use('/webScraperConstants', webScraperConstantsRoutes);
app.use('/userPackage', userPackageRoutes);
app.use('/scrapeRequest', scrapeRequestRoutes);
app.use('/extractedData', extractedDataRoutes);
app.use('/categories', categoriesRoutes);
app.use('/extractedDataTypes', extractedDataTypeRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = {};
  err.status = 404;
  next(err);
});

app.use(utils.errorHandler);

// first run this
// parseFile.clearTables()
//     .then(function () {
//   parseFile.parseExcel().then(function () {
//   });
// });

// then uncomment this
// parseFile.insertKsr();

// parseFile.countStops();

// parseFile.setDefaultStopsOrder();

// graphModule.initGraph();

// graphModule.test();

// graphModule.writeGraphFile();

// graphModule.testJar().then(function (result) {
//
// });

// graphModule.fixMissingDriving();

// parseFile.fixMissingStops();

module.exports = app;
