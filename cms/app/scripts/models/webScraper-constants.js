'use strict';

angular.module('webScraperCMS.models')
    .factory('webScraperConstant', function(Restangular) {
        var route = 'webScraperConstants';
        var webScraperConstants = Restangular.all(route);


        webScraperConstants.getAllWebScraperConstants = function () {
            return Restangular.one(route).get();
        };

        webScraperConstants.getById = function (id) {
            return Restangular.one(route).customGET(id);
        };

        webScraperConstants.create = function (pagePrice, itemPerPagePrice) {
            return Restangular.one(route).customPOST(
                {
                    pagePrice : pagePrice,
                    itemPerPagePrice : itemPerPagePrice
                }
            );
        };


        webScraperConstants.update = function (webScraperConstantsId , pagePrice, itemPerPagePrice) {
            return Restangular.one(route).customPUT(
                {
                    webScraperConstantsId:webScraperConstantsId,
                    pagePrice : pagePrice,
                    itemPerPagePrice : itemPerPagePrice
                }
            );
        };


        webScraperConstants.remove = function (webScraperConstantsId) {
            return Restangular.one(route).one(webScraperConstantsId).remove();
        };

        return webScraperConstants;
    });