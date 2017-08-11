const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')
const requests = require('./scrape-request')
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
    date :{
        type:Date,
        default : Date.now()

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
extractedDataSchema.statics.getExtractedDataByUser = function (user) {
    if(! user || user === '')
        return Promise.reject(errors.missingData)
        var thisModel = this;
    return new Promise(function (resolve, reject) {
// console.log("i am in models>>>>>>>>>>>>>>>>>>>>>>>>" + user.firstName)

        requests.find({user:user}).then(function (scrapeRequests) {
            thisModel.find({scrapeRequest : {$in : scrapeRequests}}).populate({path:'scrapeRequest', populate: {path : 'model'}}).then(function (requests) {
                // console.log(requests)
                resolve(requests);
            }) .catch(function (err) {
                console.log(err)
                reject(errors.extractedData.create)
            });

        }) .catch(function (err) {
            console.log(err)
            reject(errors.extractedData.create)
        });

    })

};

extractedDataSchema.statics.removeExtractedDataById = function (extractedDataId) {

    if(!extractedDataId || extractedDataId=='' )
    {
        console.log('error remove')
        return  Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        // console.log("findd package "+ package)
        thisModel.remove({ _id: extractedDataId}).then(function (data) {
            console.log(data)
            console.log('removed')
            resolve(data);
        })
            .catch(function (err) {
                return  reject(err)
            })

    }).catch(function (err) {
        return  reject(err)
    })

}


module.exports = mongoose.model('extractedData', extractedDataSchema, 'extractedData');
