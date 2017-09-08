const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {

    getExtractedDataTypeByRequest : function (id) {

        return new Promise(function (resolve, reject)
        {
            models.requestType.getExtractedDataTypeByRequest(id)
                .then(function(data){

                    resolve(data)
                }).catch(function (err) {
                reject(err)
            });

        })
    },
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