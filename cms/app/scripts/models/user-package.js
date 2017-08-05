'use strict';

angular.module('webScraperCMS.models')
    .factory('UserPackage', function(Restangular) {
        var route = 'userPackage';
        var UserPackage = Restangular.all(route);
        UserPackage.getAllPackages = function () {
            return Restangular.one(route).get();
        };

        // userPackage.getPackageById = function (id) {
        //     return Restangular.one(route).customGET(id);
        // };
        //
        // userPackage.create = function (packageName, maxPagesNumber,maxItemsPerPageNumber) {
        //     return Restangular.one(route).customPOST(
        //         {
        //             packageName : packageName,
        //             maxPagesNumber : maxPagesNumber,
        //             maxItemsPerPageNumber:maxItemsPerPageNumber
        //         }
        //     );
        // };
        //
        //
        // userPackage.update = function (id , packageName, maxPagesNumber,maxItemsPerPageNumber) {
        //     return Restangular.one(route).customPUT(
        //         {
        //             packageId:id,
        //             packageName : packageName,
        //             maxPagesNumber : maxPagesNumber,
        //             maxItemsPerPageNumber:maxItemsPerPageNumber
        //         }
        //     );
        // };

        //
        // userPackage.remove = function (packageId) {
        //     // console.log("pack id "+packageId)
        //     return Restangular.one(route + '/' + packageId).remove();
        // };

        return UserPackage;
    });