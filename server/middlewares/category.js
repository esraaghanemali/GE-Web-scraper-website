const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');


module.exports = {
    getCategories: function (req, res, next) {
        var limit = Number(req.query.limit);
        limit = isNaN(limit) ? 10 : limit;
        var offset = Number(req.query.skip);
        offset = isNaN(offset) ? 0 : offset;
        models.category.getList({
            skip: offset,
            limit: limit,
            projection: constants.category.defaultFields
        }).then(function(data){
            res.json(data);
        }).catch(next);

    },

    getCategoryById: function (req, res, next) {
        models.category.getCategoryById(req.params.categoryId)
            .then(function (data) {
                res.json(data);
            }).catch(next);
    },
    createCategory: function (req, res, next) {
        models.category.createCategory({
            categoryName: req.body.categoryName,

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    updateCategory: function (req, res, next) {
        models.category.updateCategory(req.body.categoryId ,{
           categoryName: req.body.categoryName,

        }).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    },
    removeCategoryById: function (req, res, next){
        models.category.removeCategoryById(req.params.categoryId).then(function (data) {
                res.json(data);
            }
        ).catch(next);
    }
 
}