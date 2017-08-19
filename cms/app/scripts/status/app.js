'use strict';


angular.module('webScraperCMS.status', [])
    .config(function ($stateProvider) {
        $stateProvider.state('app.statuses', {
            url: '/status',
            templateUrl: 'views/status/statuses-page.html',
            controller: 'StatusesCtrl',
            data: {
                requiredPermission: 'status.list'
            },
            resolve: {
                authorize: function (authorization) {
                    return authorization.authorize();
                }
            }
        }).state('app.status', {
            url: '/status/:statusId',
            templateUrl: 'views/status/status-page.html',
            controller: 'StatusCtrl',
            params: {
                status: null
            },
            data: {
                requiredPermission: 'status.new',
                child: true
            }
            ,
            resolve: {
                status: function($rootScope, $q, $state, $stateParams, authorization, models) {
                    return authorization.authorize().then(function() {
                        var deferred = $q.defer();
                     if (angular.isDefined($stateParams.status) && $stateParams.status !== null) {
                            deferred.resolve($stateParams.status.clone ? $stateParams.status.clone() : angular.copy($stateParams.status));
                        }
                        else if (angular.isUndefined($stateParams.statusId) || $stateParams.statusId === '' || $stateParams.statusId === null) {
                            $state.go('app.status', {}, {
                                location: 'replace'
                            });
                            deferred.reject();
                        }
                        else if ($stateParams.statusId === 'new') {

                            deferred.resolve(models.status.one(''));
                        }
                        else {
                            models.status.get($stateParams.statusId).then(function(user) {
                                deferred.resolve(user);
                            }, deferred.reject);
                        }
                        return deferred.promise;
                    });
                }
            }
        }).state('app.editStatus', {
            url: '/status/editStatus/',
            templateUrl: '../../views/status/editStatus-page.html',
            controller: 'EditStatusCtrl',
            params: {
                status: null
            },
            data: {
                requiredPermission: true,
                child: true
            },
            resolve: {
                status: function($rootScope, authorization, $stateParams) {
                    // calling authorize() here to make sure that the user is resolved after the authorization
                    return authorization.authorize().then(function() {
                        return $stateParams.status;
                    });
                }
            }
        });
    });