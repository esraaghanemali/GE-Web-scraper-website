'use strict';

angular.module('webScraperCMS.models')
    .factory('userPackage', function(Restangular) {
        var route = 'userPackage';
        var userPackage = Restangular.all(route);
        userPackage.getAllPackages = function () {
            return Restangular.one(route).get();
        };

        userPackage.update = function (id) {
            return Restangular.one(route).customPUT({
            packageId : id
            });
        };

        userPackage.remove = function (id) {
            return Restangular.one(route).one(id).remove();
        };

        userPackage.updateInfo = function(field, value, userPackage) {
            console.log(userPackage);
            return Restangular.one(route).one('updateInfo').customPOST({
                field: field,
                value: value,
                userPackage: userPackage
            });
        };

        return userPackage;
    });