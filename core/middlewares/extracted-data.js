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

    },getExtractedDataByUser: function (req, res, next) {
        console.log("i am in extracted data get")
        models.extractedData.getExtractedDataByUser(req.registeredUser)
            .then(function (data) {
                console.log(data);
                res.json(data);
            }).catch(next);
    },

    getExtractedDataById: function (req, res, next) {
        models.extractedData.getExtractedDataById(req.params.extractedDataId)
            .then(function (data) {
                console.log(data);
                res.json(data);
            }).catch(next);
    },

    createExtractedData: function (extractedData) {
        return new Promise(function (resolve, reject) {
                models.extractedData.createExtractedData(extractedData)
                    .then(function (data) {
                        resolve(data)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            })

    },

    removeExtractedDataById: function (req, res, next){
        models.extractedData.removeExtractedDataById(req.params.extractedDataId).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    }
}