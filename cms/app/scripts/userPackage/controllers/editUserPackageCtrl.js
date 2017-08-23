'use strict';

angular.module('webScraperCMS.userPackage')
    .controller('EditUserPackageCtrl', function ($rootScope, $scope, $filter, $state, $stateParams, models, utils, notifyService, editableThemes, editableOptions) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';

        $scope.userPackage = $stateParams.userPackage;

        $scope.updatePackageName = function (data) {
            models.userPackage.updateInfo('packageName', data, $stateParams.userPackage)
        };

        $scope.updateMaxRecords = function (data) {
            models.userPackage.updateInfo('maxRecords', data, $stateParams.userPackage)
        };

        $scope.updateTotalPrice = function (data) {
            models.userPackage.updateInfo('totalPrice', data, $stateParams.userPackage)
        };

    });



