const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')
const  status = require('./status')
const requestType = require('./requestType')
const extractedDataType = require('./extractedDataType')

var scrapeRequestSchema = new mongoose.Schema({

    scrapeRequestId: {
        type: Number,
        required: true,
        unique: true
    },
    maxRecords: {
        type: Number,
        defautl: 20
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

    },
    message:
        {
        type:String,
            defautl: 'Request submited successfully.'
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
scrapeRequestSchema.statics.updateScrapeRequest = function (id, key,value) {

    if(!id || id===''|| !key || key ===''|| !value ||value ==='' )
    {
        return Promise.reject(errors.missingData)

    }


    var thisModel = this;
    return new Promise(function (resolve, reject) {
        switch (key){
            case'message': {

                thisModel.update({
                    _id: id}, {
                    message:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                });
                break
            }

        }

    })


}

scrapeRequestSchema.statics.changeScrapeRequestStatus = function (id, status) {

    if(!id || id===''|| !status || status =='' )
    {
        return Promise.reject(errors.missingData)

    }

    var thisModel = this;
    return new Promise(function (resolve, reject) {



                thisModel.update({
                    _id: id}, {
                    status:status
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                });

    })


}

scrapeRequestSchema.statics.getExtractedDataTypes = function (id) {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        requestType.find({scrapeRequest:id})
            .then(function (RequestTypes)
        {
            var typesIds = RequestTypes.map(function (x) {
                return x.extractedDataType
            })
            // console.log('found req type '+RequestTypes)
            extractedDataType.find({_id : {$in : typesIds}})
               .then(function (extractedDataTypes) {
                   // console.log('found extractedDataTypes '+extractedDataTypes.length)
                resolve(extractedDataTypes);
            }) .catch(function (err) {
                // console.log(err)
                reject(errors.scrapeRequest.types)
            });

        }) .catch(function (err) {
            // console.log(err)
            reject(errors.modelFiles.create)
        });
    })
};


scrapeRequestSchema.statics.getPendingScrapeRequest = function () {
    var thisModel = this;
    return new Promise(function (resolve, reject) {

        status.find({statusName:'Pending'}).then(function (status)
        {
            thisModel.find({status : {$in : status}}).populate('status')
                .populate('user')
                .populate('model')
               .then(function (ScrapeReques) {
                // console.log(modelFiles)
                resolve(ScrapeReques);
            }) .catch(function (err) {
                // console.log(err)
                reject(errors.modelFiles.create)
            });

        }) .catch(function (err) {
            console.log(err)
            reject(errors.modelFiles.create)
        });

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
