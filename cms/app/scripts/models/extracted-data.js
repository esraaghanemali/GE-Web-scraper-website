'use strict';

angular.module('webScraperCMS.models')
    .factory('extractedData', function(Restangular) {
        var route = 'extractedData';
        var extractedData = Restangular.all(route);


        extractedData.getAllExtractedData = function () {
            return Restangular.one(route).get();
        };
        extractedData.getExtractedDataByUser = function () {
            return Restangular.one(route).one('/User').get();;
        };


        extractedData.removeExtractedData = function (Id) {

            return Restangular.one(route).one(Id).remove();
        };
        // extractedData.getAllExtractedDataByUser = function () {
        //     return Restangular.one(route).one('User');
        // };

        // userPackage.getExtractedDataById = function (id) {
        //     return Restangular.one(route).customGET(id);
        // };
        //
        // userPackage.create = function (maxPages, url,scrapeRequest) {
        //     return Restangular.one(route).customPOST(
        //         {
        //             maxPages : maxPages,
        //             url : url,
        //             scrapeRequest:scrapeRequest
        //         }
        //     );
        // };
        //
        //
        // userPackage.update = function (id ,maxPages, url,scrapeRequest) {
        //     return Restangular.one(route).customPUT(
        //         {
        //             statusId:id,
        //             maxPages : maxPages,
        //             url : url,
        //             scrapeRequest:scrapeRequest
        //         }
        //     );
        // };
        //
        //
        // userPackage.remove = function (id) {
        //     return Restangular.one(route).one(id).remove();
        // };

        return extractedData;
    });