'use strict';

angular.module('webScraperCMS.models')
    .factory('status', function(Restangular) {
        var route = 'status';
        var userPackage = Restangular.all(route);


        userPackage.getStatus = function () {
            return Restangular.one(route).get();
        };

        userPackage.getStatusById = function (id) {
            return Restangular.one(route).customGET(id);
        };
        userPackage.create = function (statusName, statusMessege) {
            return Restangular.one(route).customPOST(
                {
                    statusName : statusName,
                    statusMessege : statusMessege
                }
            );
        };


        userPackage.update = function (id ,statusName, statusMessege) {
            return Restangular.one(route).customPUT(
                {
                    statusId:id,
                    statusName : statusName,
                    statusMessege : statusMessege
                }
            );
        };


        userPackage.remove = function (id) {
            return Restangular.one(route).one(id).remove();
        };

        return userPackage;
    });