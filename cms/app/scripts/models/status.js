'use strict';

angular.module('webScraperCMS.models')
    .factory('status', function(Restangular) {
        var route = 'status';
        var status = Restangular.all(route);


        status.getStatus = function () {
            return Restangular.one(route).get();
        };

        status.getStatusById = function (id) {
            return Restangular.one(route).customGET(id);
        };
        status.create = function (statusName, statusMessage) {
            return Restangular.one(route).customPOST(
                {
                    statusName : statusName,
                    statusMessage : statusMessage
                }
            );
        };


        status.update = function (id ,statusName, statusMessage) {
            return Restangular.one(route).one('update').customPOST(
                {
                    statusId:id,
                    statusName : statusName,
                    statusMessage : statusMessage
                }
            );
        };

        status.remove = function (id) {
            return Restangular.one(route).one(id).remove();
        };

        status.updateInfo = function(field, value, status) {
            return Restangular.one(route).one('updateInfo').customPOST({
                field: field,
                value: value,
                status: status
            });
        };

        return status;
    });