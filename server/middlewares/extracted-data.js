const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {
    getAllExtractedData: function (req, res, next) {
        var limit = Number(req.query.limit);
        limit = isNaN(limit) ? 10 : limit;
        var offset = Number(req.query.skip);
        offset = isNaN(offset) ? 0 : offset;
        models.extractedData.getList({
            skip: offset,
            limit: limit,
            projection: constants.extractedData.defaultFields
        }).then(function(data){
            res.json(data);
        }).catch(next);

    },
    getExtractedDataById: function (req, res, next) {
        models.status.getExtractedDataById(req.params.extractedDataId)
            .then(function (data) {
                console.log(data);
                res.json(data);
            }).catch(next);
    },
    createExtractedData: function (req, res, next) {
        models.extractedData.createExtractedData({
            extractedDataId:new Date().getTime(),
            maxPages: req.body.maxPages,
            url : req.body.url,
            //todo how send request
            scrapeRequest : req.body.scrapeRequest.id

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    removeExtractedDataById: function (req, res, next){
        models.extractedData.removeExtractedDataById(req.body.extractedDataId).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    }
}