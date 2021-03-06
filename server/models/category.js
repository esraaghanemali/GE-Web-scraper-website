const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors')
const modelFiles = require('./modelFiles')
var categorySchema = new mongoose.Schema({


    categoryName:{
        type: String,
        default: 'Others'
    }

});
categorySchema.statics.createCategory = function (category) {
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.create(category).then(function () {
            // console.log('created pac')
            resolve(category);
        })
            .catch(function (err) {
                // console.log(err)
                reject(errors.category.create)
            });

    })
};

categorySchema.statics.createDefaultCategory = function () {
    console.log("default category")
    console.log('-------------------')
    var thisModel = this;
    return this.findOne({
       categoryName: 'Others'
    }).then(function (category) {
        if (!category) {

            return thisModel.createCategory({
                categoryName: 'Others',

            });
        }
        return Promise.resolve(category);
    }).catch(function (err) {
        return Promise.reject(err)
    });
};
categorySchema.statics.getCategoryById = function (id) {
    if(! id || id === '')
        return Promise.reject(errors.missingData)
    return this.findOne({_id: id})
        .then(function(category){
            if(! category)
            {
                // console.log('not found')
                return Promise.reject(errors.category.notFound);
            }
            category = category.toObject();
            delete category._id;
            console.log(category)
            return category;
        });
};

categorySchema.statics.getDefaultCategory = function () {
    this.findOne({categoryName: 'Others'})
        .then(function(category){
            if(! category)
            {
                // console.log('not found')
                return Promise.reject(errors.category.notFound);
            }
            category = category.toObject();
            delete category._id;
            // console.log(status)
            return category;
        });


};
categorySchema.statics.updateCategory = function (id, value) {

    if(!id || id==''|| !value || value=='' )
    {
        return Promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {

            thisModel.update({_id: id}, {categoryName: value}).then(function (data) {
                resolve(data);
            })
                .catch(reject);

        }).catch(function (err) {
            return  reject(err)


    })


}
categorySchema.statics.getAnalyticCategories = function () {
var result = {
    name:[],
    usage : []
}
    var thisModel = this;
    return new Promise(function (resolve, reject) {

        thisModel.find({}).then(function (data) {
            for (var i=0 ; i<data.length;i++)
            {
                result.name.push(data[i].categoryName)
                modelFiles.find({category:data[i]})
                    .then(function (modelFile) {

                        console.log('models found '+modelFile.length )
                    result.usage.push(modelFile.length)
                })
            }


            resolve(result);
        })
            .catch(reject);

    }).catch(function (err) {
        return  reject(err)


    })


}
categorySchema.statics.removeCategoryById = function (categoryId) {

    if(!categoryId || categoryId=='' )
    {
        console.log('error remove')
        return  promise.reject(errors.missingData)

    }
    var thisModel = this;
    return new Promise(function (resolve, reject) {
        thisModel.getCategoryById(categoryId).then(function (status) {
            thisModel.remove({_id: categoryId})
                .catch(reject);
            console.log('removed')
            resolve();
        }).catch(function (err) {
            return  reject(err)
        })

    })



}


module.exports = mongoose.model('category', categorySchema, 'category');
