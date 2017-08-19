const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')
const users = require('./user')
const requests = require('./scrape-request')

var modelSchema = new mongoose.Schema({

    modelId: {
        type: Number,
        unique: true
    },
    fileName: {
        type: String,
        required: true,
        default: 'default'
    },
        deleted: {
            type: String,
            default: 'No'
        }
        ,
    fileLocation: {
        type: String,
        required: true,
        default: 'default'
    } ,
    url: {
        type: String,
        // required: true,
    },
    desc: {
        type: String,
        // required: true,
        default: 'Model filedescription.'
    }
    ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    } ,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
});
modelSchema.statics.createModel = function (model) {

    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.create(model).then(function (modelF) {
             console.log('created pac')
            console.log(modelF)
            console.log("in creaed")
            resolve(modelF);
        })
            .catch(function (err) {
                console.log("in erroe")
                 console.log(err)
                reject(errors.modelFiles.create)
            });

    })
};

modelSchema.statics.getModelFilesGroupedByCategory = function () {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
            thisModel
                .aggregate(
                [

                    {
                        $group: {
                            _id:"$category",
                            files: { $push:"$fileName"}

                        }
                    }
                ]
            )
                .then(function (modelFiles) {
                    // console.log(modelFiles)
                resolve(modelFiles);
            }) .catch(function (err) {
                // console.log(err)
                reject(errors.modelFiles.create)
            });



    })
};


modelSchema.statics.getModelFilesGroupedByUser = function () {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel
            .aggregate(
                [
                    {
                        $group: {
                            _id:"$user",
                            files: { $push:"$fileName"}

                        }
                    }
                ]
            )
            .then(function (modelFiles) {
                console.log("modelfiles for user")
                console.log(modelFiles)
                resolve(modelFiles);
            }) .catch(function (err) {
            // console.log(err)
            reject(errors.modelFiles.create)
        });



    })
};
modelSchema.statics.getAdminModelFiles = function () {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        // thisModel.find({'user.role' : 'admin'}).then(function (modelFiles) {
        //      console.log('find pac')
        //     console.log(modelFiles)
        //     resolve(modelFiles);
        // })
        //     .catch(function (err) {
        //         console.log(err)
        //         reject(errors.modelFiles.create)
        //     });

        users.find({role:'admin'}).then(function (admins) {
            thisModel.find({user : {$in : admins}}).ne('deleted','Yes').then(function (modelFiles) {
                // console.log(modelFiles)
                resolve(modelFiles);
            }) .catch(function (err) {
                        // console.log(err)
                        reject(errors.modelFiles.create)
                    });

        }) .catch(function (err) {
                    console.log(err)
                    reject(errors.modelFiles.create)
                });

    })
};

modelSchema.statics.getModelFilesByUsername = function (user) {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.find({user : user}).ne('deleted','Yes').then(function (modelFiles) {
            // console.log('created pac')
            resolve(modelFiles);
        })
            .catch(function (err) {
                console.log(err)
                reject(errors.modelFiles.create)
            });

    })
};

// modelSchema.statics.create = function () {
//    console.log("created file")
//     var fileModel = this;
//     return this.findOne({
//         modelId: 1
//
//     }).then(function (model) {
//
//         if (!model) {
//             // console.log("cant find ")
//             return fileModel.createModel({
//                 modelId: 1,
//                 fileName: 'test file'
//             });
//         }
//         console.log(" find " + model)
//         return Promise.resolve();
//     });
// }

modelSchema.statics.getModelById = function (ModelId) {
    if(! ModelId || ModelId === '')
        return Promise.reject(errors.missingData);
    return this.findById(ModelId)
        .then(function(model){
            if(! model)
                return Promise.reject();
            model = model.toObject();
            delete model.modelId;
            return model;
        });
};

//
// modelFilemodelFileSchema.statics.updateModelFile = function (fileName, ModelFileId) {
//     if(!fileName || !fileName.length)
//         return Promise.reject(errors.missingData);
//     var promises = [];
//     var thisModel = this;
//
//     thisModel.update({_id: id}, {order: stop.order, lat: stop.lat, lng: stop.lng});
//
//     stops.forEach(function(stop){
//         var id = mongoose.Types.ObjectId(stop.id);
//         promises.push(thisModel.update({_id: id}, {order: stop.order, lat: stop.lat, lng: stop.lng}));
//     });
//     return Promise.all(promises).then(function(){
//         return models.find({bus: busId})
//             .populate('stop', constants.stop.defaultFields)
//             .then(function (stops) {
//                 return stops;
//             });
//     });
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

// modelSchema.statics.removeModeleById = function (id) {
//
//     if(!id || id=='' )
//     {
//         console.log('error remove')
//         return  Promise.reject(errors.missingData)
//
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

modelSchema.statics.removeModeleById = function (id) {

    if(!id || id=='' )
    {
        console.log('error remove')
        return  Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {


        thisModel.update({ _id: id},{deleted: 'Yes'}).then(function (data) {
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


module.exports = mongoose.model('model', modelSchema, 'model');
