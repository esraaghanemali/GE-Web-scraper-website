const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {
    getStatus: function (req, res, next) {
        var limit = Number(req.query.limit);
        limit = isNaN(limit) ? 10 : limit;
        var offset = Number(req.query.skip);
        offset = isNaN(offset) ? 0 : offset;
        models.status.getList({
            skip: offset,
            limit: limit,
            projection: constants.status.defaultFields
        }).then(function(data){
            res.json(data);
        }).catch(next);

    },
    getStatusByName: function (name) {


        return new Promise(function (resolve, reject) {
            models.status.getStatusByName(name)
                .then(function(data){

                resolve(data)
            }).catch(function (err) {
                reject(err)
            });

        })

},
    getStatusById: function (req, res, next) {
        models.status.getStatusById(req.params.statusId)
            .then(function (data) {
                console.log(data);
                res.json(data);
            }).catch(next);
    },
    createStatus: function (req, res, next) {
        models.status.createStatus({
            statusId:new Date().getTime(),
            statusName: req.body.statusName,
            statusMessege : req.body.statusMessege

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    updateStatus: function (req, res, next) {
        models.status.updateStatus(req.body.statusId ,{
            statusName: req.body.statusName,
            statusMessege : req.body.statusMessege

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    removeStatusById: function (req, res, next){
            models.status.removeStatusById(req.body.statusId).then(function (data) {
                    res.json(data);
                }
            ).catch(next);
    }
}