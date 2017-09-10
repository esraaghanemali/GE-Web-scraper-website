'use strict';


angular.module('webScraperCMS.categories', [])
    .config(function ($stateProvider) {
        $stateProvider.state('app.categories', {
            url: '/categories',
            templateUrl: 'views/categories/categories-page.html',
            controller: 'CategoriesCtrl',
            data: {
                requiredPermission: 'categories.list'
            },
            resolve: {
                authorize: function (authorization) {
                    return authorization.authorize();
                }
            }
        }).state('app.category', {
            url: '/categories/:categoryId',
            templateUrl: 'views/categories/category-page.html',
            controller: 'CategoryCtrl',
            params: {
                category: null
            },
            data: {
                requiredPermission: 'categories.new',
                child: true
            }
            ,
            resolve: {
                category: function ($rootScope, $q, $state, $stateParams, authorization, models) {
                    return authorization.authorize().then(function () {
                        var deferred = $q.defer();
                        if (angular.isDefined($stateParams.category) && $stateParams.category !== null) {
                            deferred.resolve($stateParams.category.clone ? $stateParams.category.clone() : angular.copy($stateParams.category));
                        }
                        else if (angular.isUndefined($stateParams.categoryId) || $stateParams.categoryId === '' || $stateParams.categoryId === null) {
                            // $state.go('app.extractedDataType', {}, {
                            //     location: 'replace'
                            // });
                            deferred.reject();
                        }
                        else if ($stateParams.categoryId === 'new') {
                            deferred.resolve(models.category.one(''));
                        }
                        else {
                            models.category.get($stateParams.categoryId).then(function (user) {
                                deferred.resolve(user);
                            }, deferred.reject);
                        }
                        return deferred.promise;
                    });
                }
            }
        })
    });