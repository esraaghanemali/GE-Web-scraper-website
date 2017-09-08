'use strict';

angular.module('webScraperCMS.users')
    .controller('ProfileCtrl', function($rootScope, $scope, $filter, $state, $stateParams, models, utils, notifyService) {
// console.log($scope.currentUser.userPackage.packageName)

        models.modelFiles.getUserModelFiles(
        ).then(function(modelFiles) {

            $scope.allModels=modelFiles.length
        }, function(err) {
            console.log(err)
            $scope.allModels='error'
        });


        models.scrapeRequest.getScrapeRequestByUser(
        ).then(function(modelFiles) {

            $scope.requested=modelFiles.length
        }, function(err) {
            $scope.requested='error'
        });


        models.extractedData.getExtractedDataByUser()
            .then(function(modelFiles) {
                $scope.extracted=modelFiles.length
            }, function(err) {
                $scope.extracted='error'
            });

    });



