const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')

var requestTypeSchema = new mongoose.Schema({

    scrapeRequest : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'scrapeRequest'
    }, extractedDataType : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'extractedDataType'
    }
});

requestTypeSchema.statics.createRequestType = function (Request) {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.create(Request).then(function (requestType) {
            resolve(extractedDataType);
        })
            .catch(function (err) {
                reject(errors.scrapeRequest.create)
            });

    })
};

requestTypeSchema.statics.getRequestsGroupedByType = function () {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel
            .aggregate(
                [

                    {
                        $group: {
                            _id:"$extractedDataType",
                            requests: { $push:"$scrapeRequest"}

                        }
                    }
                ]
            )
            .then(function (data) {

                resolve(data);
            }) .catch(function (err) {
            // console.log(err)
            reject(errors.modelFiles.create)
        });



    })
};
module.exports = mongoose.model('requestType', requestTypeSchema, 'requestType');
