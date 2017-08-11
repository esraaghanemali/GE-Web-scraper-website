const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {
    getAllExtractedDataType: function (req, res, next) {
        var limit = Number(req.query.limit);
        limit = isNaN(limit) ? 10 : limit;
        var offset = Number(req.query.skip);
        offset = isNaN(offset) ? 0 : offset;
        models.extractedDataType.getList({
            skip: offset,
            limit: limit,
            projection: constants.extractedDataType.defaultFields
        }).then(function(data){
            // console.log(data)
            res.json(data);
        }).catch(next);

    },
    // getExtractedDataTypeById: function (req, res, next) {
    //     models.extractedDataType.getExtractedDataTypeById(req.params.extractedDataTypeId)
    //         .then(function (data) {
    //             console.log(data);
    //             res.json(data);
    //         }).catch(next);
    // },
    createExtractedDataType: function (req, res, next) {
        models.extractedDataType.createExtractedDataType({
            type: req.body.type,
        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    updateExtractedDataType: function (req, res, next) {
        models.extractedDataType.updateExtractedDataType(req.body.extractedDataTypeId ,{
            type: req.body.type,

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    }
    // ,
    // removeExtractedDataTypeById: function (req, res, next){
    //     // console.log("in remove "+req.params.packageId)
    //
    //     models.userPackage.removePackageById(req.params.packageId).then(function (data) {
    //         // console.log("the id "+req.params.packageId)
    //             res.json(data);
    //         }
    //     ).catch(next);
    // }
}