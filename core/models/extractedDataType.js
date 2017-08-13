const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')

var extractedDataTypeSchema = new mongoose.Schema({

    type:
        {
        type: String,
            default: 'XML'
        }
});
extractedDataTypeSchema.statics.createDefaultExtractedDataType = function () {

    console.log(" create default extractedDataType")
    console.log("----------------------")

    var thisModel = this;
    return this.findOne({
        type: 'XML'
    }).then(function (extractedDataType) {
        if (!extractedDataType) {

            return thisModel.createExtractedDataType({
                type: 'XML',

            });
        }
        return Promise.resolve();
    });

};



extractedDataTypeSchema.statics.createExtractedDataType = function (Request) {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.create(Request).then(function (extractedDataType) {
            resolve(extractedDataType);
        })
            .catch(function (err) {
                reject(errors.scrapeRequest.create)
            });

    })
};
extractedDataTypeSchema.statics.updateExtractedDataType = function (id, value) {

    if(!id || id==''|| !value || value=='' )
    {
        return Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {

        thisModel.update({_id: id}, {type: value}).then(function (data) {
            resolve(data);
        })
            .catch(reject);

    }).catch(function (err) {
        return  reject(err)


    })


}
module.exports = mongoose.model('extractedDataType', extractedDataTypeSchema, 'extractedDataType');
