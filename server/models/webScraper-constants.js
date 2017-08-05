const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')

var webScraperConstantsSchema = new mongoose.Schema({

    webScraperConstantsId: {
        type: Number,
        required: true,
        unique: true
    },
    pagePrice: {
        type: Number,
    },
    itemPerPagePrice: {
        type: Number,
    }
});
webScraperConstantsSchema.statics.createWebScraperConstants = function (Request) {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.create(Request).then(function () {
            resolve();
        })
            .catch(function (err) {
                reject(errors.scrapeRequest.create)
            });

    })
};
webScraperConstantsSchema.statics.getWebScraperConstantsById = function (id) {
    if(! id || id === '')
        return Promise.reject(errors.missingData)
    return this.findOne({webScraperConstantsId: id})
        .then(function(data){
            if(! data)
            {
                // console.log('not found')
                return Promise.reject(errors.webScraperConstants.notFound);
            }
            data = data.toObject();
            delete data.webScraperConstantsId;
            console.log(data)
            return data;
        });
};


webScraperConstantsSchema.statics.updateWebScraperConstants = function (id, request) {

    if(!id || id==''|| !request )
    {
        return Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.getWebScraperConstantsById(id).then(function (request2) {
            console.log("findd package "+ request2)
            thisModel.update({webScraperConstantsId: id}, {pagePrice: request.pagePrice, itemPerPagePrice: request.itemPerPagePrice})
                .catch(reject);
            console.log('updated')
            resolve();
        }).catch(function (err) {
            return  reject(err)
        })

    })


}

webScraperConstantsSchema.statics.removeWebScraperConstantsById = function (id) {

    if(!id || id=='' )
    {
        console.log('error remove')
        return  promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.getWebScraperConstantsById(id).then(function (data) {
            console.log("findd "+ data)
            thisModel.remove({webScraperConstantsId: id})
                .catch(reject);
            console.log('removed')
            resolve();
        }).catch(function (err) {
            return  reject(err)
        })

    })



}


module.exports = mongoose.model('webScraperConstants', webScraperConstantsSchema, 'webScraperConstants');
