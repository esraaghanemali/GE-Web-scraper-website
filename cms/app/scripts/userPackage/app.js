'use strict';


angular.module('webScraperCMS.userPackage', [])
    .config(function ($stateProvider) {
        $stateProvider.state('app.userPackages', {
            url: '/userPackages?page&count',
            templateUrl: 'views/userPackage/userPackages-page.html',
            controller: 'UserPackagesCtrl',
            data: {
                requiredPermission: 'userPackage.list'
            }
            ,
            resolve: {
                authorize: function (authorization) {
                    return authorization.authorize();
                }
            }
        }).state('app.userPackage', {
            url: '/userPackage/:PackageId',
            templateUrl: 'views/userPackage/userPackage-page.html',
            controller: 'UserPackageCtrl',
            params: {
                userPackage: null
            },
            data: {
                child: true,
                requiredPermission: 'userPackage.edit'
            }
            ,
            resolve: {
                userPackage: function ($rootScope, $q, $state, $stateParams, authorization, models) {
                    return authorization.authorize().then(function () {
                        var deferred = $q.defer();
                        if (angular.isDefined($stateParams.userPackage) && $stateParams.userPackage !== null) {
                            deferred.resolve($stateParams.userPackage.clone ? $stateParams.userPackage.clone() : angular.copy($stateParams.userPackage));
                        }
                        else if (angular.isUndefined($stateParams.PackageId) || $stateParams.PackageId === '' || $stateParams.PackageId === null) {
                            $state.go('app.userPackages', {}, {
                                location: 'replace'
                            });
                            deferred.reject();
                        }
                        else if ($stateParams.PackageId === 'new') {
                            console.log("in new userPackage");
                            console.log(models.userPackage);
                            deferred.resolve(models.userPackage.one(''));
                              console.log(deferred.resolve(models.userPackage.one('')))
                        }
                        else {

                            models.userPackage.get($stateParams.PackageId).then(function (userPackage) {
                                deferred.resolve(userPackage);
                            }, deferred.reject);
                        }
                        return deferred.promise;
                    });
                }
            }
        }).state('app.editPackage', {
            url: '/userPackage/editPackage/',
            templateUrl: '../../views/userPackage/editUserPackage-page.html',
            controller: 'EditUserPackageCtrl',
            params: {
                userPackage: null
            },
            data: {
                requiredPermission: true,
                child: true
            },
            resolve: {
                userPackage: function ($rootScope, authorization, $stateParams) {
                    // calling authorize() here to make sure that the user is resolved after the authorization
                    return authorization.authorize().then(function () {
                        return $stateParams.userPackage;
                    });
                }
            }
        });
    });