const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')

var userPackageSchema = new mongoose.Schema({

    packageId: {
        type: Number,
        required: true,
        unique: true
    },
    packageName: {
        type: String,
        default: 'Default'
    },
    // maxPagesNumber: {
    //     type: Number,
    //     default: 20
    // },
    // maxItemsPerPageNumber: {
    //     type: Number,
    //     default: 20
    // },
    maxRecords: {
        type: Number,
        default: 20
    }
    ,
    totalPrice: {
        type: Number,
        default: 0
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

userPackageSchema.statics.createDefaultUserPackage = function () {
    console.log("default user package")
    console.log('-------------------')
    var thisModel = this;
    return this.findOne({
        packageName: 'Default'
    }).then(function (userPackage) {
        if (!userPackage) {

            return thisModel.createUserPackage({
                packageId: new Date().getTime(),
                packageName: 'Default',
                // maxPagesNumber: 50,
                // maxItemsPerPageNumber:1000,
                maxRecords: 10000,
                totalPrice: 0

            });
        }
        return Promise.resolve();
    }).catch(function (err) {
        return Promise.reject(err)
    });
};
userPackageSchema.statics.getDefaultUserPackage = function () {
    var thisModel = this;
    return this.findOne({
        packageName: 'Default'
    }).then(function (userPackage) {
// console.log('found')
// console.log(userPackage)
        return Promise.resolve(userPackage);
    }).catch(function (err) {
        console.log('not')

        return Promise.reject(err)
    });
};

userPackageSchema.statics.getPackageById = function (packageId) {
    if (!packageId || packageId === '')
        return Promise.reject(errors.missingData)
    console.log("pacid : " + packageId)
    return this.findOne({_id: packageId})
        .then(function (package) {
            if (!package) {
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

    if (!packageId || packageId == '' || !package) {
        return Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.getPackageById(packageId).then(function (package2) {
            console.log("findd package " + package2)
            thisModel.update({_id: packageId}, {
                packageName: package.packageName,
                // maxPagesNumber: package.maxPagesNumber,
                // maxItemsPerPageNumber: package.maxItemsPerPageNumber,
                maxRecords: package.maxRecords,
                totalPrice: package.totalPrice
            })
                .catch(reject);
            console.log('updated')
            resolve();
        }).catch(function (err) {
            return reject(err)
        })

    })
}
userPackageSchema.statics.removePackageById = function (packageId) {

    if (!packageId || packageId == '') {
        console.log('error remove')
        return Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        // console.log("findd package "+ package)
        thisModel.remove({_id: packageId}).then(function (data) {
            console.log(data)
            console.log('removed')
            resolve();
        })
            .catch(function (err) {
                return reject(err)
            })

    }).catch(function (err) {
        return reject(err)
    })
}
userPackageSchema.statics.updateInfo = function (userPackage, field, value) {
    var thisModel = this;

    return new Promise(function (resolve, reject) {
        switch (field){
            case'packageName': {

                thisModel.update({
                    _id: userPackage._id}, {
                    packageName:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                }).then(function(){
                    console.log("Package Name Updated")
                });
                break
            }
            case'maxRecords': {

                thisModel.update({
                    _id: userPackage._id}, {
                    maxRecords:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                }).then(function(){
                    console.log("Max Records Updated")
                });
                break
            }
            case'totalPrice': {

                thisModel.update({
                    _id: userPackage._id}, {
                    totalPrice:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                }).then(function(){
                    console.log("Total Price Updated")
                });
                break
            }

        }

    })

}


module.exports = mongoose.model('userPackage', userPackageSchema, 'userPackage');
