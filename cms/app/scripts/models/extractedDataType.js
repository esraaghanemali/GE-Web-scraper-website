'use strict';

angular.module('webScraperCMS.models')
    .factory('ExtractedDataTypes', function(Restangular) {
        var route = 'extractedDataTypes';
        var extractedDataTypes = Restangular.all(route);
        extractedDataTypes.getAllExtractedDataTypes = function () {
            return Restangular.one(route).get();
        };
        // categories.getAdminModelFiles = function () {
        //     return Restangular.one(route).one('/Admin').get();
        // };
        // categories.getUserModelFiles = function () {
        //     return Restangular.one(route).one('/User').get();
        // };
        //
        // categories.removeModelFile = function (Id) {
        //     return Restangular.one(route).one(Id).remove();
        // };

        return extractedDataTypes;
    });