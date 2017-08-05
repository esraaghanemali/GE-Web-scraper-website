'use strict';

angular.module('webScraperCMS.models')
    .factory('extractedData', function(Restangular) {
        var route = 'extractedData';
        var userPackage = Restangular.all(route);


        userPackage.getAllExtractedData = function () {
            return Restangular.one(route).get();
        };

        userPackage.getExtractedDataById = function (id) {
            return Restangular.one(route).customGET(id);
        };

        userPackage.create = function (maxPages, url,scrapeRequest) {
            return Restangular.one(route).customPOST(
                {
                    maxPages : maxPages,
                    url : url,
                    scrapeRequest:scrapeRequest
                }
            );
        };


        userPackage.update = function (id ,maxPages, url,scrapeRequest) {
            return Restangular.one(route).customPUT(
                {
                    statusId:id,
                    maxPages : maxPages,
                    url : url,
                    scrapeRequest:scrapeRequest
                }
            );
        };


        userPackage.remove = function (id) {
            return Restangular.one(route).one(id).remove();
        };

        return userPackage;
    });