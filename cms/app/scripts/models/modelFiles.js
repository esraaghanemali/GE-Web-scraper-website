'use strict';

angular.module('webScraperCMS.models')
    .factory('ModelFiles', function(Restangular) {
        var route = 'modelFiles';
        var ModelFiles = Restangular.all(route);
        ModelFiles.getAllModelFiles = function () {
            return Restangular.one(route).get();
        };
        ModelFiles.getAdminModelFiles = function () {
            return Restangular.one(route).one('/Admin').get();
        };
        // ModelFiles.getUserModelFiles = function (query) {
        //     console.log(query)
        //     return Restangular.one(route).one('/User').one(query.offset).one(query.limit).get();
        // };
        
         ModelFiles.getUserModelFiles = function (query) {
            console.log(query)
            return Restangular.one(route).one('/User').get();
        };
        
        ModelFiles.getMyModels = function (query) {
            return Restangular.one(route).one('/User').one(query).get();
        };

        ModelFiles.removeModelFile = function (Id) {
            return Restangular.one(route).one(Id).remove();
        };
        ModelFiles.getAnalyticCategories = function () {
            return Restangular.one(route).one('analytic').get();
        };

        // ModelFiles.new= function (model,maxPages,maxItemsPerPage) {
        //     return Restangular.one(route).one('Request').customPOST({
        //         model: model,
        //         maxPages:maxPages,
        //         maxItemsPerPage:maxItemsPerPage
        //     });
        // };
        return ModelFiles;
    });