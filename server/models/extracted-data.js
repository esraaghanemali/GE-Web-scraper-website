const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')

var extractedDataSchema = new mongoose.Schema({

    extractedDataId: {
        type: Number,
        required: true,
        unique: true
    },
    maxPages: {
        type: Number,
    },
    url: {
        type: String
    },
    scrapeRequest : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'scrapeRequest'
    }
});
extractedDataSchema.statics.createExtractedData = function (extractedData) {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.create(extractedData).then(function () {
            resolve();
        })
            .catch(function (err) {
                reject(errors.extractedData.create)
            });

    })
};
extractedDataSchema.statics.getExtractedDataById = function (extractedDataId) {
    if(! extractedDataId || extractedDataId === '')
        return Promise.reject(errors.missingData)
    return this.findOne({extractedDataId: extractedDataId})
        .then(function(extractedData){
            if(! extractedData)
            {
                // console.log('not found')
                return Promise.reject(errors.extractedData.notFound);
            }
            extractedData = extractedData.toObject();
            delete extractedData.extractedDataId;
            console.log(extractedData)
            return extractedData;
        });
};

extractedDataSchema.statics.removeExtractedDataById = function (extractedDataId) {

    if(!extractedDataId || extractedDataId=='' )
    {
        console.log('error remove')
        return  promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.getExtractedDataById(extractedDataId).then(function (extractedData) {
            console.log("findd "+ extractedData)
            thisModel.remove({extractedDataId: extractedDataId})
                .catch(reject);
            console.log('removed')
            resolve();
        }).catch(function (err) {
            return  reject(err)
        })

    })



}


module.exports = mongoose.model('extractedData', extractedDataSchema, 'extractedData');
