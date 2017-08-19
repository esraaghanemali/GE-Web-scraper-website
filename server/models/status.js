const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')

var statusSchema = new mongoose.Schema({

    statusId: {
        type: Number,
        required: true,
        unique: true
    },
    statusName:{
        type: String,
        default: 'pending'
    }
    ,
    statusMessage:{
        type: String,
        default: 'the file is pending'
    }
});
statusSchema.statics.createStatus = function (status) {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.create(status).then(function () {
            // console.log('created pac')
            resolve(status);
        })
            .catch(function (err) {
                 // console.log(err)
                reject(errors.status.create)
            });

})
};

statusSchema.statics.createDefaultStatus = function () {
    console.log("default request status")
    console.log('-------------------')
    var thisModel = this;
    return this.findOne({
        statusName: 'Pending'
    }).then(function (status) {
        if (!status) {

            return thisModel.createStatus({
                statusId: new Date().getTime(),
                statusName: 'Pending',
                statusMessage: 'The request is pending, wait till the process end.'

            });
        }
        return Promise.resolve(status);
    }).catch(function (err) {
        return Promise.reject(err)
    });
};
statusSchema.statics.getStatusById = function (statusId) {
    if(! statusId || statusId === '')
        return Promise.reject(errors.missingData)
    return this.findOne({statusId: statusId})
        .then(function(status){
            if(! status)
            {
                // console.log('not found')
                return Promise.reject(errors.status.notFound);
            }
            status = status.toObject();
            delete status.statusId;
            console.log(status)
            return status;
        });
};

statusSchema.statics.getDefaultStatus = function () {
     this.findOne({statusName: 'Pending'})
        .then(function(status){
            if(! status)
            {
                // console.log('not found')
                return Promise.reject(errors.status.notFound);
            }
            status = status.toObject();
            delete status.statusId;
            // console.log(status)
            return status;
        });


};

statusSchema.statics.updateStatus = function (statusId, status) {

    if(!statusId || statusId==''|| !status )
    {
        return Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.getStatusById(statusId).then(function (status2) {
            thisModel.update({statusId: statusId}, {statusName: status.statusName, statusMessage: status.statusMessage})
                .catch(reject);
            console.log('updated')
            resolve();
        }).catch(function (err) {
            return  reject(err)
        })

    })


}
statusSchema.statics.removeStatusById = function (id) {

    // if(!statusId || statusId=='' )
    // {
    //     console.log('error remove');
    //     return Promise.reject(errors.missingData)
    //
    // }
    // var thisModel = this;
    // return new Promise(function (resolve, reject) {
    //     thisModel.getStatusById(statusId).then(function (status) {
    //         console.log("findd "+ status)
    //         thisModel.remove({statusId: statusId})
    //             .catch(reject);
    //         console.log('removed')
    //         resolve();
    //     }).catch(function (err) {
    //         return  reject(err)
    //     })
    //
    // })


    if(!id || id=='' )
    {
        console.log('error remove')
        return Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        // console.log("findd package "+ package)
        thisModel.remove({ _id: id}).then(function (data) {
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


},
statusSchema.statics.updateInfo = function (status, field, value) {
    var thisModel = this;

    console.log("ID ", status._id);
    return new Promise(function (resolve, reject) {
        switch (field){
            case'statusName': {

                thisModel.update({
                    _id: status._id}, {
                    statusName:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                }).then(function(){
                    console.log("Status Name Updated")
                });
                break
            }
            case'statusMessage': {

                thisModel.update({
                    _id: status._id}, {
                    statusMessage:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                }).then(function(){
                    console.log("Status Message Updated")
                });;
                break
            }
        }

    })

}


module.exports = mongoose.model('status', statusSchema, 'status');
