const mongoose = require('mongoose');
const Promise = require('bluebird');


var modelFilesSchema = new mongoose.Schema({

    modelFileId: {
        type: Number
    },
    fileName: {
        type: String,
        required: true,
        defautl: 'default'
    }
});
modelFilesSchema.statics.createModelFile = function (modelFile) {
    return this.create(modelFile);
};

modelFilesSchema.statics.createFile = function () {
   console.log("created file")
    var fileModel = this;
    return this.findOne({
        modelFileId: 1

    }).then(function (modelFile) {

        if (!modelFile) {
            // console.log("cant find ")
            return fileModel.createModelFile({
                modelFileId: 1,
                fileName: 'test file'
            });
        }
        console.log(" find " + modelFile)
        return Promise.resolve();
    });
}

modelFilesSchema.statics.getModelFileById = function (ModelFileId) {
    if(! ModelFileId || ModelFileId === '')
        return Promise.reject(errors.missingData);
    return this.findById(ModelFileId)
        .then(function(modelFile){
            if(! modelFile)
                return Promise.reject();
            modelFile = modelFile.toObject();
            delete modelFile.modelFileId;
            return modelFile;
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
//             .populate('stop', constants.stop.defautlFields)
//             .then(function (stops) {
//                 return stops;
//             });
//     });
// }


module.exports = mongoose.model('modelFiles', modelFilesSchema, 'modelFiles');
