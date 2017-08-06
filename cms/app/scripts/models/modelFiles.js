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
        ModelFiles.getUserModelFiles = function () {
            return Restangular.one(route).one('/User').get();
        };
        return ModelFiles;
    });