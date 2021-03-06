const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')
const  status = require('./status')
const requestType = require('./requestType')
var scrapeRequestSchema = new mongoose.Schema({

    scrapeRequestId: {
        type: Number,
        required: true,
        unique: true
    },
    // maxPages: {
    //     type: Number,
    // },
    // maxItemsPerPage: {
    //     type: Number,
    // },
    maxRecords: {
        type: Number,
        default: 20
    },
    model : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'model'
    },
    user : {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
},
    status : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'status'
    },
    date :{
        type:Date,
        default : Date.now()

    }
});
scrapeRequestSchema.statics.createScrapeRequest = function (Request) {
    var thisModel = this;



    return new Promise(function (resolve, reject) {
        status.findOne({statusName: 'Pending'})
            .then(function(status){
                if(! status)
                {
                    return Promise.reject(errors.status.notFound);
                }
                status = status.toObject();
                delete status.statusId;
                // console.log(status)
                Request.status=status
                thisModel.create(Request).then(function (data) {

                        for(var  i =0 ; i< Request.extractedDataTypes.length;i++)
                        {
                            requestType.createRequestType(
                                {
                                    scrapeRequest: data,
                                    extractedDataType: Request.extractedDataTypes[i]
                                }
                            ).catch(function (err) {
                                console.log(err)
                            })
                        }



                    resolve(data);
                })
                    .catch(function (err) {
                        console.log(err)
                        reject(errors.scrapeRequest.create)
                    });
                // console.log( Request.status)
            });



    })
};
scrapeRequestSchema.statics.getScrapeRequestById = function (id) {
    if(! id || id === '')
        return Promise.reject(errors.missingData)
    return this.findOne({scrapeRequestId: id})
        .then(function(data){
            if(! data)
            {
                // console.log('not found')
                return Promise.reject(errors.scrapeRequest.notFound);
            }
            data = data.toObject();
            delete data.scrapeRequestId;
            // console.log(data)
            return data;
        });
};

scrapeRequestSchema.statics.getRequestsGroupedByUser = function () {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel
            .aggregate(
                [

                    {
                        $group: {
                            _id:"$user",
                            requests: { $push:"$_id"}

                        }
                    }
                ]
            )
            .then(function (request) {
                // console.log("user Requets")
                //
                // console.log(request)
                resolve(request);
            }) .catch(function (err) {
            // console.log(err)
            reject(errors.modelFiles.create)
        });



    })
};
scrapeRequestSchema.statics.updateScrapeRequest = function (id, request) {

    if(!id || id==''|| !request )
    {
        return Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.getScrapeRequestById(id).then(function (request2) {
            // console.log("findd package "+ request2)
            thisModel.update(
                {scrapeRequestId: id},
                {maxRecords: request.maxRecords,
                   model: request.model.modelId,
                    status:request.status
                })
                .catch(reject);
            // console.log('updated')
            resolve();
        }).catch(function (err) {
            return  reject(err)
        })

    })


}

scrapeRequestSchema.statics.getScrapeRequestByUser = function (user) {
    if(!user || user=='' )
    {

        return  promise.reject(errors.missingData)

    }
    var thisModel = this

    return new Promise(function (resolve, reject) {
        status.findOne({statusName: 'Pending'})
            .then(function(status){
                if(! status)
                {
                    return Promise.reject(errors.status.notFound);
                }
                status = status.toObject();
                delete status.statusId;

                thisModel.find({user : user})
                    .populate('model')
                    .populate('user')
                    .populate('status')
                    .then(function (scrapeRequests) {

                    resolve(scrapeRequests);
                }) .catch(function (err) {
                    console.log(err)
                    reject(errors.scrapeRequest.create)
                });
            });




    })

}


scrapeRequestSchema.statics.removeScrapeRequestById = function (id) {

    if(!id || id=='' )
    {
        // console.log('error remove')
        return  Promise.reject(errors.missingData)

    }
    var thisModel = this;


    return new Promise(function (resolve, reject) {

        status.findOne({statusName: 'Removed'})
            .then(function(status){
                if(! status)
                {
                    return Promise.reject(errors.status.notFound);
                }
                status = status.toObject();
                delete status.statusId;
                // console.log(status)


                thisModel.update({ _id: id},{status : status}).then(function (data) {
                    // console.log(data)
                    // console.log('removed')
                    resolve(data);
                })
                    .catch(function (err) {
                        return  reject(err)
                    })

                // console.log( Request.status)
            });

    }).catch(function (err) {
        return  reject(err)
    })



}



// scrapeRequestSchema.statics.removeScrapeRequestById = function (id) {
//
//     if(!id || id=='' )
//     {
//         // console.log('error remove')
//         return  Promise.reject(errors.missingData)
//
//     }
//     var thisModel = this;
//     return new Promise(function (resolve, reject) {
//
//
//         thisModel.remove({ _id: id}).then(function (data) {
//             // console.log(data)
//             // console.log('removed')
//             resolve(data);
//         })
//             .catch(function (err) {
//                 return  reject(err)
//             })
//
//
//     }).catch(function (err) {
//         return  reject(err)
//     })
//
//
//
// }
// modelSchema.statics.makeRequest = function (model,maxPages,maxItemsPerPage) {
//
//     if(!model )
//     {
//         console.log('error make request model')
//         return  Promise.reject(errors.missingData)
//     }
//     var thisModel = this;
//     return new Promise(function (resolve, reject) {
//         // console.log("findd package "+ package)
//         thisModel.remove({ _id: id}).then(function (data) {
//             console.log(data)
//             console.log('removed')
//             resolve(data);
//         })
//             .catch(function (err) {
//                 return  reject(err)
//             })
//
//     }).catch(function (err) {
//         return  reject(err)
//     })
// }

module.exports = mongoose.model('scrapeRequest', scrapeRequestSchema, 'scrapeRequest');
