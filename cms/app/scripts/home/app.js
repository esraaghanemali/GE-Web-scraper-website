'use strict';


angular.module('webScraperCMS.home', [])
    .config(function ($stateProvider) {
        $stateProvider.state('app.home', {
            url: '/home',
            templateUrl: 'views/home/home-page.html',
             controller: 'ChartCtrl',
            data: {
                requiredPermission: true,
                title :'Home'
            }
            ,
            resolve: {
                authorize: function (authorization) {
                    return authorization.authorize();
                },
                categories: function ($q, models) {
                    var deferred = $q.defer();
                    models.modelFiles.getAnalyticCategories()
                        .then(function (data) {
                        deferred.resolve(data);
                    }, deferred.reject);
                    return deferred.promise;
                },
                packages: function ($q, models) {
                    var deferred = $q.defer();
                    models.user.getAnalyticCategories()
                        .then(function (data) {
                            deferred.resolve(data);
                        }, deferred.reject);
                    return deferred.promise;
                },
                users: function ($q, models) {
                    var deferred = $q.defer();
                    models.user.getAnalyticUsers()
                        .then(function (data) {
                            deferred.resolve(data);
                        }, deferred.reject);
                    return deferred.promise;
                },
                extractedDataTypes:function ($q, models) {
                    var deferred = $q.defer();
                    models.extractedDataTypes.getAnalyticCategories()
                        .then(function (data) {
                            deferred.resolve(data);
                        }, deferred.reject);
                    return deferred.promise;
                }
            }
        })
    });