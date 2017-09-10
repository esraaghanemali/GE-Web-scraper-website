'use strict';

angular.module('webScraperCMS.models')
    .factory('Categories', function(Restangular) {
        var route = 'categories';
        var categories = Restangular.all(route);
        categories.getAllcategories = function () {
            return Restangular.one(route).get();
        };

        categories.removeCategory = function (Id) {
            return Restangular.one(route).one(Id).remove();
        };

        return categories;
    });