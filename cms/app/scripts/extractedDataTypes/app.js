'use strict';


angular.module('webScraperCMS.extractedDataTypes', [])
    .config(function ($stateProvider) {
        $stateProvider.state('app.extractedDataTypes', {
            url: '/extractedDataTypes',
            templateUrl: 'views/extractedDataTypes/extractedDataTypes-page.html',
            controller: 'ExtractedDataTypesCtrl',
            data: {
                requiredPermission: 'extractedDataTypes.list'
            },
            resolve: {
                authorize: function (authorization) {
                    return authorization.authorize();
                }
            }
        }).state('app.extractedDataType', {
            url: '/extractedDataTypes/:extractedDataTypeId',
            templateUrl: 'views/extractedDataTypes/extractedDataType-page.html',
            controller: 'ExtractedDataTypeCtrl',
            params: {
                extractedDataType: null
            },
            data: {
                requiredPermission: 'extractedDataTypes.new',
                child: true
            }
            ,
            resolve: {
                extractedDataType: function ($rootScope, $q, $state, $stateParams, authorization, models) {
                    return authorization.authorize().then(function () {
                        var deferred = $q.defer();
                        if (angular.isDefined($stateParams.extractedDataType) && $stateParams.extractedDataType !== null) {
                            deferred.resolve($stateParams.extractedDataType.clone ? $stateParams.extractedDataType.clone() : angular.copy($stateParams.extractedDataType));
                        }
                        else if (angular.isUndefined($stateParams.extractedDataTypeId) || $stateParams.extractedDataTypeId === '' || $stateParams.extractedDataTypeId === null) {
                            // $state.go('app.extractedDataType', {}, {
                            //     location: 'replace'
                            // });
                            deferred.reject();
                        }
                        else if ($stateParams.extractedDataTypeId === 'new') {
                            deferred.resolve(models.extractedDataType.one(''));
                        }
                        else {
                            models.extractedDataType.get($stateParams.extractedDataTypeId).then(function (user) {
                                deferred.resolve(user);
                            }, deferred.reject);
                        }
                        return deferred.promise;
                    });
                }
            }
        })
    });