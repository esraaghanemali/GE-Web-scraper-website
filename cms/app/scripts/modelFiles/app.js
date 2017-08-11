'use strict';


angular.module('webScraperCMS.modelFiles', [])
    .config(function ($stateProvider) {
        $stateProvider.state('app.modelFiles', {
            url: '/modelFiles?page&count',
            templateUrl: 'views/modelFiles/modelFiles-page.html',
            controller: 'ModelFilesCtrl',
            data: {
                requiredPermission: 'modelFiles.list'
            }
            ,
            resolve: {
                authorize: function (authorization) {
                    return authorization.authorize();
                }
            }
        }).state('app.modelFile', {
            url: '/modelFile/:modelFileId',
            templateUrl: 'views/modelFiles/modelFile-page.html',
            controller: 'ModelFileCtrl',
            params: {
                modelFile: null
            },
            data: {
                requiredPermission: 'modelFiles.new',
                child: true
            }
            ,
            resolve: {
                modelFile: function($rootScope, $q, $state, $stateParams, authorization, models) {
                    return authorization.authorize().then(function() {
                        var deferred = $q.defer();
                     if (angular.isDefined($stateParams.modelFile) && $stateParams.modelFile !== null) {
                            deferred.resolve($stateParams.modelFile.clone ? $stateParams.modelFile.clone() : angular.copy($stateParams.modelFile));
                        }
                        else if (angular.isUndefined($stateParams.modelFileId) || $stateParams.modelFileId === '' || $stateParams.userId === null) {
                            $state.go('app.modelFiles', {}, {
                                location: 'replace'
                            });
                            deferred.reject();
                        }
                        else if ($stateParams.modelFileId === 'new') {

                            deferred.resolve(models.modelFiles.one(''));
                        }
                        else {
                            models.modelFiles.get($stateParams.modelFileId).then(function(user) {
                                deferred.resolve(user);
                            }, deferred.reject);
                        }
                        return deferred.promise;
                    });
                },
                categories: function ($q, models) {
                    var deferred = $q.defer();
                    models.categories.getAllcategories().then(function (data) {
                        deferred.resolve(data);
                    }, deferred.reject);
                    return deferred.promise;
                }
            }
        })
    });