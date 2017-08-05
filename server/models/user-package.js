const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')

var userPackageSchema = new mongoose.Schema({

    packageId: {
        type: Number,
        required: true,
        unique: true
    },
packageName:{
    type: String,
    defautl: 'default user'
},
    maxPagesNumber: {
        type: Number,
        defautl: 5
    },
    maxItemsPerPageNumber: {
        type: Number,
        defautl: 20
    }
});
userPackageSchema.statics.createUserPackage = function (userPackage) {
    var package = this;
    return new Promise(function (resolve, reject) {
        package.create(userPackage).then(function () {
            // console.log('created pac')
            resolve();
        })
                 .catch(function (err) {
                     // console.log('from catch')
                     reject(errors.userPackage.create)
                 });

    })
};
userPackageSchema.statics.getPackageById = function (packageId) {
    if(! packageId || packageId === '')
        return Promise.reject(errors.missingData)
    console.log("pacid : "+packageId)
    return this.findOne({_id: packageId})
        .then(function(package){
            if(! package)
            {
                // console.log('not found')
                return Promise.reject(errors.userPackage.notFound);
            }
            package = package.toObject();
            delete package.packageId;
             console.log(package)
            return package;
        }).catch(function (err) {
            return Promise.reject(err)
        });
};


userPackageSchema.statics.updatePackage = function (packageId, package) {

    if(!packageId || packageId==''|| !package )
    {
        return Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.getPackageById(packageId).then(function (package2) {
            console.log("findd package "+ package2)
            thisModel.update({packageId: packageId}, {packageName: package.packageName, maxPagesNumber: package.maxPagesNumber, maxItemsPerPageNumber: package.maxItemsPerPageNumber})
                .catch(reject);
            console.log('updated')
            resolve();
        }).catch(function (err) {
            return  reject(err)
        })

    })


}
userPackageSchema.statics.removePackageById = function (packageId) {

        if(!packageId || packageId=='' )
        {
            console.log('error remove')
            return  Promise.reject(errors.missingData)

        }
        var thisModel = this;
    return new Promise(function (resolve, reject) {
            // console.log("findd package "+ package)
            thisModel.remove({ _id: packageId}).then(function (data) {
                console.log(data)
                console.log('removed')
                resolve();
            })
                .catch(function (err) {
                    return  reject(err)
                })

        }).catch(function (err) {
            return  reject(err)
   })
    }


module.exports = mongoose.model('userPackage', userPackageSchema, 'userPackage');
