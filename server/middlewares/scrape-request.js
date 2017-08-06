const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {
    getAllScrapeRequest: function (req, res, next) {
        var limit = Number(req.query.limit);
        limit = isNaN(limit) ? 10 : limit;
        var offset = Number(req.query.skip);
        offset = isNaN(offset) ? 0 : offset;
        models.scraperRequest.getList({
            skip: offset,
            limit: limit,
            populate: [
                {
                    path: 'user',
                    path : 'model',
                    path: 'status'
                }
            ],
            projection: constants.scrapeRequest.defaultFields
        }).then(function(data){
            res.json(data);
        }).catch(next);

    },
    getScrapeRequestById: function (req, res, next) {
        models.scraperRequest.getScrapeRequestById(req.params.scrapeRequestId)
            .then(function (data) {
                console.log(data);
                res.json(data);
            }).catch(next);
    },
    createScrapeRequest: function (req, res, next) {

        if( req.body.temptModel)
        {
            console.log("in admin")
            models.scraperRequest.createScrapeRequest({
                scrapeRequestId:new Date().getTime(),
                maxPages: req.body.maxPages,
                maxItemsPerPage : req.body.maxItemsPerPage,
                model : req.body.requestModel,
                user:req.registeredUser

            }).then(function (data) {
                    models.scraperRequest.createScrapeRequest({
                        scrapeRequestId:new Date().getTime(),
                        maxPages: req.body.maxPages,
                        maxItemsPerPage : req.body.maxItemsPerPage,
                        model : req.body.temptModel,
                        user:req.registeredUser

                    })
                    res.json(data);
                }
            ).catch(next);
        }
            else
        {
            console.log("in user")

            models.scraperRequest.createScrapeRequest({
                scrapeRequestId:new Date().getTime(),
                maxPages: req.body.maxPages,
                maxItemsPerPage : req.body.maxItemsPerPage,
                model : req.body.requestModel,
                user:req.registeredUser

            }).then(function (data) {
                    models.scraperRequest.createScrapeRequest({
                        scrapeRequestId:new Date().getTime(),
                        maxPages: req.body.maxPages,
                        maxItemsPerPage : req.body.maxItemsPerPage,
                        model : req.body.requestModel,
                        user:req.registeredUser

                    })
                    res.json(data);
                }
            ).catch(next);
        }

    },
    getScrapeRequestByUser: function (req, res, next) {
        console.log(req.registeredUser)
        models.scraperRequest.getScrapeRequestByUser(req.registeredUser)
            .then(function (data) {

                res.json(data);
            }).catch(next);
    },
    updateScrapeRequest: function (req, res, next) {
        models.scraperRequest.updateScrapeRequest(req.body.scrapeRequestId ,{
            maxPages: req.body.maxPages,
            maxItemsPerPage : req.body.maxItemsPerPage,
            model: req.body.model

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    removeScrapeRequestById: function (req, res, next){
        models.scraperRequest.removeScrapeRequestById(req.body.scrapeRequestId).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    }
}