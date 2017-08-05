'use strict';

angular.module('webScraperCMS.models')
    .factory('scrapeRequest', function(Restangular) {
        var route = 'scrapeRequest';
        var userPackage = Restangular.all(route);


        userPackage.getAllScrapeRequest = function () {
            return Restangular.one(route).get();
        };

        userPackage.getScrapeRequestById = function (id) {
            return Restangular.one(route).customGET(id);
        };

        userPackage.create = function (maxPages, maxItemsPerPage,model) {
            return Restangular.one(route).customPOST(
                {
                    maxPages : maxPages,
                    maxItemsPerPage : maxItemsPerPage,
                    model:model
                }
            );
        };


        userPackage.update = function (id ,maxPages, maxItemsPerPage,model) {
            return Restangular.one(route).customPUT(
                {
                    statusId:id,
                    maxPages : maxPages,
                    maxItemsPerPage : maxItemsPerPage,
                    model:model
                }
            );
        };


        userPackage.remove = function (id) {
            return Restangular.one(route).one(id).remove();
        };

        return userPackage;
    });