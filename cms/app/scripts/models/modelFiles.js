'use strict';

angular.module('webScraperCMS.models')
    .factory('ModelFiles', function(Restangular) {
        var route = 'modelFiles';
        var ModelFiles = Restangular.all(route);
        ModelFiles.getAllModelFiles = function () {
            return Restangular.one(route).get();
        };
        return ModelFiles;
    });