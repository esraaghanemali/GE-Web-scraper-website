'use strict';

angular.module('webScraperCMS.models')
    .factory('ExtractedDataTypes', function(Restangular) {
        var route = 'extractedDataTypes';
        var extractedDataTypes = Restangular.all(route);
        extractedDataTypes.getAllExtractedDataTypes = function () {
            return Restangular.one(route).get();
        };
        extractedDataTypes.getAnalyticCategories = function () {
            return Restangular.one(route).one('analytic').get();
        };
        extractedDataTypes.remove = function (id) {
            return Restangular.one(route).one(id).remove();
        };

        return extractedDataTypes;
    });