const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {
    getAllWebScraperConstants: function (req, res, next) {
        var limit = Number(req.query.limit);
        limit = isNaN(limit) ? 10 : limit;
        var offset = Number(req.query.skip);
        offset = isNaN(offset) ? 0 : offset;
        models.status.getList({
            skip: offset,
            limit: limit,
            projection: constants.webScraperConstants.defaultFields
        }).then(function(data){
            res.json(data);
        }).catch(next);

    },
    getWebScraperConstantsById: function (req, res, next) {
        models.webScraperConstants.getWebScraperConstantsById(req.params.webScraperConstantsId)
            .then(function (data) {
                console.log(data);
                res.json(data);
            }).catch(next);
    },
    createWebScraperConstants: function (req, res, next) {
        models.webScraperConstants.createWebScraperConstants({
            webScraperConstantsId:new Date().getTime(),
            pagePrice: req.body.pagePrice,
            itemPerPagePrice : req.body.itemPerPagePrice

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    updateWebScraperConstants: function (req, res, next) {
        models.webScraperConstants.updateWebScraperConstants(req.body.webScraperConstantsId ,{
            pagePrice: req.body.pagePrice,
            itemPerPagePrice : req.body.itemPerPagePrice

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    removeWebScraperConstantsById: function (req, res, next){
        models.webScraperConstants.removeWebScraperConstantsById(req.body.webScraperConstantsId).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    }
}