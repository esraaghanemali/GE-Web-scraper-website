const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {


    saveModelFiles : function (req, res, next) {
        console.log("im in save")
        console.log(req)
        res.json({r:5});
    },
    getModelFiles: function (req, res, next) {


        var limit = Number(req.query.limit);
        limit = isNaN(limit) ? 10 : limit;
        var offset = Number(req.query.skip);
        offset = isNaN(offset) ? 0 : offset;
        models.model.getList({
            skip: offset,
            limit: limit,
            populate: [
                {
                    path: 'user'
                }
            ],
            projection: constants.model.defaultFields
        }).then(function(modelFiles){
            res.json(modelFiles);
        }).catch(next);
    },
    getModelFileById: function (req, res, next) {
        models.modelFiles.getModelFileById(req.params.modelFileId)
            .then(function (modelFile) {
                console.log(modelFile);
                res.json(modelFile);
            }).catch(next);
    },
    createModelFile: function (req, res, next) {
        console.log("i am in crea")
        console.log(req.body.file)
        // models.model.createModel({
        //     modelId:new Date().getTime(),
        //     fileName: req.body.fileName,
        //     user:req.registeredUser.id,
        // }).then(function (modelFile) {
        //         res.json(modelFile);
        //     }
        // ).catch(next);
    },
    getModelFilesByUsername: function (req, res, next) {
        models.user.find({username: req.params.username})
                .populate('username', constants.modelFiles.defaultFields)
                .then(function (modelFiles) {
                    res.json(modelFiles);
                }).catch(next);

    }
    ,
    removeModeleById: function (req, res, next){
    // console.log("in remove "+req.params.packageId)

    models.model.removePackageById(req.params.modelId).then(function (data) {
            // console.log("the id "+req.params.packageId)
            res.json(data);
        }
    ).catch(next);
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