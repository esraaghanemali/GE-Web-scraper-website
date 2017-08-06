'use strict';

angular.module('webScraperCMS.models')
    .factory('scrapeRequest', function(Restangular) {
        var route = 'scrapeRequest';
        var userPackage = Restangular.all(route);


        userPackage.getAllScrapeRequest = function () {
            return Restangular.one(route).get();
        };

        userPackage.getScrapeRequestByUser = function () {
            return Restangular.one(route).one('/User').get();
        };


        return userPackage;
    });