const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')

var webScraperConstantsSchema = new mongoose.Schema({

    webScraperConstantsId: {
        type: Number,
        // required: true,
        // unique: true
    },
    pagePrice: {
        type: Number,
    },
    defaultRecordPrice: {
        type: Number,
    },
    defaultMaxRecords:{
        type: Number,
    }
});
webScraperConstantsSchema.statics.createDefaultWebScraperConstants = function () {

    console.log("webscraperConstants")
    var thisModel = this;
    return this.findOne({
        webScraperConstantsId: 1
    }).then(function (webScraperConstants) {
        if (!webScraperConstants) {

            return thisModel.createWebScraperConstants({
                webScraperConstantsId: 1,
                pagePrice: 1,
                defaultRecordPrice: 5,
                defaultMaxRecords:1000
            });
        }
        return Promise.resolve();
    });

};

//Todo check if this work
webScraperConstantsSchema.statics.updateWebScraperConstants =
    function (id, key,value) {

    if(!id || id=='')
    {
        return Promise.reject(errors.missingData)

    }
        var thisModel = this;
        return new Promise(function (resolve, reject) {
            thisModel.getWebScraperConstantsById(id).then(function (request2) {
                console.log("findd package "+ request2)
                thisModel.update({webScraperConstantsId: id}, {key: value})
                    .catch(reject);
                console.log('updated')
                resolve();
            }).catch(function (err) {
                return  reject(err)
            })

        })


}
webScraperConstantsSchema.statics.createWebScraperConstants = function (Request) {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.create(Request).then(function (createWebScraperConstants) {
            resolve(createWebScraperConstants);
        })
            .catch(function (err) {
                reject(errors.scrapeRequest.create)
            });

    })
};

// webScraperConstantsSchema.statics.getWebScraperConstantsById = function (id) {
//     if(! id || id === '')
//         return Promise.reject(errors.missingData)
//     return this.findOne({_id: id})
//         .then(function(data){
//             if(! data)
//             {
//                 // console.log('not found')
//                 return Promise.reject(errors.webScraperConstants.notFound);
//             }
//             data = data.toObject();
//             delete data.webScraperConstantsId;
//             console.log(data)
//             return data;
//         });
// };
//


//
// webScraperConstantsSchema.statics.removeWebScraperConstantsById = function (id) {
//
//     if(!id || id=='' )
//     {
//         console.log('error remove')
//         return  promise.reject(errors.missingData)
//
//     }
//     var thisModel = this;
//     return new Promise(function (resolve, reject) {
//         thisModel.getWebScraperConstantsById(id).then(function (data) {
//             console.log("findd "+ data)
//             thisModel.remove({webScraperConstantsId: id})
//                 .catch(reject);
//             console.log('removed')
//             resolve();
//         }).catch(function (err) {
//             return  reject(err)
//         })
//
//     })
//
//
//
// }


module.exports = mongoose.model('webScraperConstants', webScraperConstantsSchema, 'webScraperConstants');
