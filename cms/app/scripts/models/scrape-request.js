'use strict';

angular.module('webScraperCMS.models')
    .factory('scrapeRequest', function(Restangular) {
        var route = 'scrapeRequest';
        var scrapeRequest = Restangular.all(route);


        scrapeRequest.getAllScrapeRequest = function () {
            return Restangular.one(route).get();
        };

        scrapeRequest.getScrapeRequestByUser = function () {
            return Restangular.one(route).one('/User').get();
        };

        scrapeRequest.removeModelRequest = function (Id) {

            return Restangular.one(route).one(Id).remove();
        };

        scrapeRequest.new= function (model,maxRecords) {
            return Restangular.one(route).one('Request').customPOST({
                model: model,
                maxRecords:maxRecords,

            });
        };
        return scrapeRequest;
    });