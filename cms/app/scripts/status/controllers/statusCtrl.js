'use strict';

angular.module('webScraperCMS.status')
    .controller('StatusCtrl', function($rootScope, $state, notifyService, $scope, $filter, status) {
        $scope.status = status;
        $scope.isNew = angular.isUndefined($scope.status.id) || $scope.status.id === '';


        $scope.saveStatus = function() {
            if ($scope.isLoading) {
                return;
            }
            if (!$scope.status.statusName || $scope.status.statusMessage == '') {
                var msg = 'user.errors.formNotValid';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
                return;
            }

            $scope.isLoading = true;
            return $scope.status.save().then(function(newStatus) {

                $scope.isLoading = false;
                notifyService.notify($filter('translate')('status.save.success'));
                $state.go('app.statuses', {}, {
                    location: 'replace'
                });
            }, function(err) {
                $scope.isLoading = false;
                var msg = 'status.errors.saveError';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };

    });