const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');
var multer = require('multer')
var path = require('path')
var storage = multer.diskStorage({

    destination : function (req , file , cb) {
        console.log(path.join(__dirname) +'/uploads')
        cb (null ,path.join(__dirname) +'/uploads')
    }, filename : function (req , file , cb) {
        // console.log(file)
        var id = new Date().getTime()
        cb(null, file.fileName+'-'+ id+path.extname(file.originalname))
    }
})
module.exports = {


    saveModelFiles : function (req, res, next) {
        console.log("im in save")

        var upload = multer ({
            storage : storage,

        }).any()


        upload(req,res,function(err) {
            if(err) {
                console.log(err);
                return res.end("Error uploading file.");
            } else {
                console.log("body");

                console.log(req.body);
                console.log("files");

                console.log(req.files);
                // console.log(req.data);
                req.files.forEach( function(f) {
                    console.log(f);
                    // and move file to final destination...
                });
                res.end("File has been uploaded");
            }
        });

        // console.log("im in fileName")
        // console.log(req.body.fileName)

// console.log(req.body.fileName)
//         models.model.createModel({
//             modelId:new Date().getTime(),
//             fileName: req.body.fileName,
//             user:req.registeredUser.id,
//             desc : req.body.desc
//
//         }).then(function (modelFile) {
//                 res.json(modelFile);
//             }
//         ).catch(next);


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
//     makeRequest : function (req, res, next) {
//     console.log(req.body.maxPages)
//         console.log(req.body.model)
//     // models.model.makeRequest({
//     //     // modelId:new Date().getTime(),
//     //     // modelFile: req.body.model,
//     //     user:req.registeredUser.id,
//     //     modelId:req.body.modelId,
//     //     maxPages : req.body.maxPages,
//     //     maxItemsPerPage : req.body.maxItemsPerPage
//     // }).then(function (modelFile) {
//     //         res.json(modelFile);
//     //     }
//     // ).catch(next);
// },
    createModelFile: function (req, res, next) {
        // console.log("i am in crea")
        //  console.log(req.body.files)
        // var upload = multer ({
        //     storage : storage,
        //
        // }).single('file')
        //
        //
        // upload(req,res,function (err) {
        //     console.log((err))
        // })
        models.model.createModel({
            modelId:new Date().getTime(),
            fileName: req.body.fileName,
            user:req.registeredUser.id,
            desc : req.body.desc
        }).then(function (modelFile) {
                res.json(modelFile);
            }
        ).catch(next);
    },
    getModelFilesByUsername: function (req, res, next) {
        models.model.getModelFilesByUsername(req.registeredUser)
            .then(function (modelFiles) {
                res.json(modelFiles);
            }).catch(next);

    }
    ,
    getAdminModelFiles: function (req, res, next) {
        console.log("im in admin")
    models.model.getAdminModelFiles()
        .then(function (modelFiles) {
            console.log(modelFiles)

            res.json(modelFiles);
        }).catch(next);

},
    removeModeleById: function (req, res, next){
        console.log("the id "+req.params.modelId)

        console.log("in remove "+req.params.modelId)

    models.model.removeModeleById(req.params.modelId).then(function (data) {

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