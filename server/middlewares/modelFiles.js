const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {
    getModelFiles: function (req, res, next) {


        var limit = Number(req.query.limit);
        limit = isNaN(limit) ? 10 : limit;
        var offset = Number(req.query.skip);
        offset = isNaN(offset) ? 0 : offset;
        models.modelFiles.getList({
            skip: offset,
            limit: limit,
            projection: constants.modelFiles.defaultFields
        }).then(function(modelFiles){
            res.json(modelFiles);
        }).catch(next);



        // var limit = Number(req.query.limit);
        // limit = isNaN(limit) ? 10 : limit;
        // var offset = Number(req.query.offset);
        // offset = isNaN(offset) ? 0 : offset;
        // models.modelFiles.getList({
        //     skip: offset,
        //     limit: limit,
        //     projection: constants.modelFiles.defaultFields
        // }).then(function (modelFiles) {
        //     res.json(modelFiles);
        // }).catch(next);
    },
    getModelFileById: function (req, res, next) {
        models.modelFiles.getModelFileById(req.params.modelFileId)
            .then(function (modelFile) {
                console.log(modelFile);
                res.json(modelFile);
            }).catch(next);
    },
    createModelFile: function (req, res, next) {
        models.modelFiles.createModelFile({
            modelFileId:req.body.modelFileId,
            fileName: req.body.fileName

        }).then(function (modelFile) {
                res.json(modelFile);
            }
        ).catch(next);
    },
    getModelFilesByUsername: function (req, res, next) {
        models.user.find({username: req.params.username})
                .populate('username', constants.modelFiles.defaultFields)
                .then(function (modelFiles) {
                    res.json(modelFiles);
                }).catch(next);

    }
    //,
    // getBusesByStopId: function (req, res, next) {
    //     models.busStop.find({stopId: req.params.stopId})
    //         .populate('busId', constants.bus.defaultFields)
    //         .then(function (buses) {
    //             res.json(buses);
    //         }).catch(next);
    // }
    // ,
    // updateStops: function (req, res, next) {
    //     models.stop.updateStops(req.body.stops, req.params.busId)
    //         .then(function (stops) {
    //             res.json(stops);
    //         }).catch(next);
    // }
}