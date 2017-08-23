const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {
    getAllPackages: function (req, res, next) {
        var limit = Number(req.query.limit);
        limit = isNaN(limit) ? 10 : limit;
        var offset = Number(req.query.skip);
        offset = isNaN(offset) ? 0 : offset;
        models.userPackage.getList({
            skip: offset,
            limit: limit,
            projection: constants.userPackage.defaultFields
        }).then(function(data){
            // console.log(data)
            res.json(data);
        }).catch(next);

    },
    getPackageById: function (req, res, next) {
        models.userPackage.getPackageById(req.params.packageId)
            .then(function (data) {
                console.log(data);
                res.json(data);
            }).catch(next);
    },
    createPackage: function (req, res, next) {
        models.userPackage.createUserPackage({
            packageId:new Date().getTime(),
            packageName: req.body.packageName,
            maxRecords : req.body.maxRecords,
            totalPrice: req.body.totalPrice
        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    updatePackage: function (req, res, next) {
        models.userPackage.updatePackage(req.body.packageId ,{
            packageName: req.body.packageName,
            maxPagesNumber : req.body.maxPagesNumber,
            maxItemsPerPageNumber : req.body.maxItemsPerPageNumber

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    removePackageById: function (req, res, next){
        // console.log("in remove "+req.params.packageId)

        models.userPackage.removePackageById(req.params.packageId).then(function (data) {
            // console.log("the id "+req.params.packageId)
                res.json(data);
            }
        ).catch(next);
    },
    updateInfo: function (req, res, next) {
        models.userPackage.updateInfo(req.body.userPackage, req.body.field, req.body.value)
            .then(function (userPackage) {

                    res.json(userPackage);
                }
            ).catch(next);
    }
}