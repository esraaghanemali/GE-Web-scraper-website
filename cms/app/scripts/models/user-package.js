'use strict';

angular.module('webScraperCMS.models')
    .factory('UserPackage', function(Restangular) {
        var route = 'userPackage';
        var UserPackage = Restangular.all(route);
        UserPackage.getAllPackages = function () {
            return Restangular.one(route).get();
        };

        UserPackage.update = function (id) {
            return Restangular.one(route).customPUT({
            packageId : id
            });
        };

        return UserPackage;
    });