'use strict';

angular.module('webScraperCMS.status')
    .controller('EditStatusCtrl', function ($rootScope, $scope, $filter, $state, $stateParams, models, utils, notifyService, editableThemes, editableOptions) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';

        $scope.status = $stateParams.status;

        $scope.updateStatusName = function (data) {
            models.status.updateInfo('statusName', data, $stateParams.status)
        };

        $scope.updateStatusMessage = function (data) {
            models.status.updateInfo('statusMessage', data, $stateParams.status)
        };

    });



