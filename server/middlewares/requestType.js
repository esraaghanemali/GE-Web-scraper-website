const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {

    // createRequestType: function (req, res, next) {
    //     models.requestType.createRequestType({
    //         scrapeRequest: req.body.scrapeRequest,
    //         extractedDataType: req.body.extractedDataType,
    //
    //     }).then(function (data) {
    //             res.json(data);
    //         }
    //     ).catch(next);
    // },
    createRequestType: function (scrapeRequest,extractedDataType) {
        models.requestType.createRequestType({
            scrapeRequest: scrapeRequest,
            extractedDataType: extractedDataType,

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    }

}