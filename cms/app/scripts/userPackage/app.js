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
                userPackage: function($rootScope, $q, $state, $stateParams, authorization, models) {
                    console.log("in resolve ")

                    return authorization.authorize().then(function() {
                        var deferred = $q.defer();
                        if (angular.isDefined($stateParams.userPackage) && $stateParams.userPackage !== null) {
                            console.log("in first if ")

                            deferred.resolve($stateParams.userPackage.clone ? $stateParams.userPackage.clone() : angular.copy($stateParams.userPackage));
                        }
                        else if (angular.isUndefined($stateParams.PackageId) || $stateParams.PackageId === '' || $stateParams.PackageId === null) {
                            console.log("in sec if ")
                            console.log($stateParams)

                            $state.go('app.userPackages', {}, {
                                location: 'replace'
                            });
                            deferred.reject();
                        }
                        else if ($stateParams.PackageId === 'new') {
                            console.log("in new userPackage")
                            console.log(models.userPackage)
                                                        console.log(models.user)

                            deferred.resolve(models.userPackage.one(''));
                              console.log(deferred.resolve(models.userPackage.one('')))
                        }
                        else {
                            console.log("in last if ")

                            models.userPackage.get($stateParams.PackageId).then(function(userPackage) {
                                deferred.resolve(userPackage);
                            }, deferred.reject);
                        }
                        return deferred.promise;
                    });
                }
            }
        })
    });