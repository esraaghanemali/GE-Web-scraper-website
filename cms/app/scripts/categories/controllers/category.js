'use strict';

angular.module('webScraperCMS.categories')
    .controller('CategoryCtrl', function($rootScope, $state, notifyService, $scope, $filter, category) {
        $scope.category = category;
        $scope.isNew = angular.isUndefined($scope.category.id) || $scope.category.id === '';


        $scope.saveCategory = function() {
            if ($scope.isLoading) {
                return;
            }
            if (!$scope.category.categoryName) {
                var msg = 'user.errors.formNotValid';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
                return;
            }

            $scope.isLoading = true;
            return $scope.category.save().then(function(newCategory) {

                $scope.isLoading = false;
                notifyService.notify($filter('translate')('category.save.success'));
                $state.go('app.categories', {}, {
                    location: 'replace'
                });
            }, function(err) {
                $scope.isLoading = false;
                var msg = 'category.errors.saveError';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };

    });