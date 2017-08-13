const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {
    getAllScrapeRequest: function () {

        return new Promise(function (resolve, reject) {
            models.scraperRequest.getList({
                populate: [
                    {
                        path: 'user',
                        path : 'model',
                        path: 'status'
                    }
                ],
                projection: constants.scrapeRequest.defaultFields
            }).then(function(data){

                resolve(data)
            }).catch(function (err) {
                reject(err)
            });

        })


    },
    getPendingScrapeRequest: function () {

        return new Promise(function (resolve, reject) {
            models.scraperRequest.getPendingScrapeRequest().then(function(data){

                resolve(data)
            }).catch(function (err) {
                reject(err)
            });

        })
    },
    updateScrapeRequest : function (id,key,value) {

        return new Promise(function (resolve, reject) {
            models.scraperRequest.updateScrapeRequest(id,key,value).then(function(data){

                resolve(data)
            }).catch(function (err) {
                reject(err)
            });

        })
    }
    ,
    changeScrapeRequestStatus : function (id,status) {

        return new Promise(function (resolve, reject) {
            models.scraperRequest.changeScrapeRequestStatus(id,status)
                .then(function(data){

                resolve(data)
            }).catch(function (err) {
                reject(err)
            });

        })
    },
    getExtractedDataTypes : function (id) {

        return new Promise(function (resolve, reject) {
            models.scraperRequest.getExtractedDataTypes(id)
                .then(function(data){

                    resolve(data)
                }).catch(function (err) {
                reject(err)
            });

        })
    }


    // getScrapeRequestById: function (req, res, next) {
    //     models.scraperRequest.getScrapeRequestById(req.params.scrapeRequestId)
    //         .then(function (data) {
    //             console.log(data);
    //             res.json(data);
    //         }).catch(next);
    // },
    // createScrapeRequest: function (req, res, next) {
    //     if( req.body.temptModel)
    //     {
    //         // console.log("in admin")
    //         models.scraperRequest.createScrapeRequest({
    //             scrapeRequestId:new Date().getTime(),
    //             maxPages: req.body.maxPages,
    //             maxItemsPerPage : req.body.maxItemsPerPage,
    //             model : req.body.temptModel,
    //             user:req.registeredUser,
    //             date : new Date().getTime(),
    //             extractedDataTypes :req.body.extractedDataType
    //
    //         }).then(function (data) {
    //
    //                 res.json(data);
    //             }
    //         ).catch(next);
    //     }
    //         else
    //     {
    //         // console.log("in user")
    //
    //         models.scraperRequest.createScrapeRequest({
    //             scrapeRequestId:new Date().getTime(),
    //             maxPages: req.body.maxPages,
    //             maxItemsPerPage : req.body.maxItemsPerPage,
    //             model : req.body.requestModel,
    //             user:req.registeredUser,
    //             date : new Date().getTime(),
    //             extractedDataTypes :req.body.extractedDataType
    //
    //
    //         }).then(function (data) {
    //
    //                 res.json(data);
    //             }
    //         ).catch(next);
    //     }
    //
    // },
    // makeRequest : function (req, res, next) {
    //     // console.log("in req make heeeeeeeeeeee")
    //     // console.log(req.body.maxPages)
    //     // console.log(req.body.model)
    //     models.scraperRequest.createScrapeRequest({
    //         scrapeRequestId:new Date().getTime(),
    //         maxPages: req.body.maxPages,
    //         maxItemsPerPage : req.body.maxItemsPerPage,
    //         model : req.body.model,
    //         user:req.registeredUser,
    //         date : new Date().getTime(),
    //
    //     }).then(function (data) {
    //
    //             res.json(data);
    //         }
    //     ).catch(next);
    // },
    // getScrapeRequestByUser: function (req, res, next) {
    //     // console.log(req.registeredUser)
    //     models.scraperRequest.getScrapeRequestByUser(req.registeredUser)
    //         .then(function (data) {
    //
    //             res.json(data);
    //         }).catch(next);
    // },
    // updateScrapeRequest: function (req, res, next) {
    //     models.scraperRequest.updateScrapeRequest(req.body.scrapeRequestId ,{
    //         // maxPages: req.body.maxPages,
    //         maxRecords : req.body.maxRecords,
    //         model: req.body.model
    //
    //     }).then(function (data) {
    //             res.json(data);
    //         }
    //     ).catch(next);
    // },
    // removeScrapeRequestById: function (req, res, next){
    //     // console.log("i am in remove request")
    //     // console.log(req.params.scrapeRequestId)
    //
    //     models.scraperRequest.removeScrapeRequestById(req.params.scrapeRequestId).then(function (data) {
    //             res.json(data);
    //         }
    //     ).catch(next);
    // }
}