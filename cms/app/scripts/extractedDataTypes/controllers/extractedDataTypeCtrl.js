'use strict';

angular.module('webScraperCMS.extractedDataTypes')
    .controller('ExtractedDataTypeCtrl', function($rootScope, $state, notifyService, $scope, $filter, extractedDataType) {
        $scope.extractedDataType = extractedDataType;
        $scope.isNew = angular.isUndefined($scope.extractedDataType.id) || $scope.extractedDataType.id === '';


        $scope.saveExtractedDataType = function() {
            if ($scope.isLoading) {
                return;
            }
            if (!$scope.extractedDataType.dataType) {
                var msg = 'user.errors.formNotValid';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
                return;
            }

            $scope.isLoading = true;
            return $scope.extractedDataType.save().then(function(newExtractedDataType) {

                $scope.isLoading = false;
                notifyService.notify($filter('translate')('extractedDataTypes.save.success'));
                $state.go('app.extractedDataTypes', {}, {
                    location: 'replace'
                });
            }, function(err) {
                $scope.isLoading = false;
                var msg = 'extractedDataTypes.errors.saveError';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };

    });