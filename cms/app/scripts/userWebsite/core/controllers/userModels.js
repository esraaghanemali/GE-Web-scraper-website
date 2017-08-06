'use strict';

angular.module('webScraperCMS.userW')
    .controller('UserModelsCtrl', function($scope, $filter, $mdDialog, $state, $stateParams, NgTableParams, models) {


        $scope.modelFilesTable = new NgTableParams({
            page: $stateParams.page || 1,
            count: $stateParams.count || 10,
        }, {
            getData: function(params) {
                $scope.isLoading = true;
                $scope.isError = false;
                if (!$state.is($state.current, {
                        page: params.page(),
                        count: params.count()
                    })) {
                    $state.go($state.current.name, {
                        page: params.page(),
                        count: params.count()
                    }, {
                        notify: false
                    });
                }
                console.log("in ctrl model ")
                console.log(models.modelFiles)

                var offset = (params.page() - 1) * params.count();
                return models.modelFiles.getUserModelFiles(
                ).then(function(modelFiles) {
                    $scope.isLoading = false;
                    params.total(modelFiles.count);
                    return modelFiles;
                }, function(err) {
                    $scope.isLoading = false;
                    $scope.isError = true;
                });
            }
        });

        $scope.requestedFilesTable = new NgTableParams({
            page: $stateParams.page || 1,
            count: $stateParams.count || 10,
        }, {
            getData: function(params) {
                $scope.isLoading = true;
                $scope.isError = false;
                if (!$state.is($state.current, {
                        page: params.page(),
                        count: params.count()
                    })) {
                    $state.go($state.current.name, {
                        page: params.page(),
                        count: params.count()
                    }, {
                        notify: false
                    });
                }
                console.log("in ctrl model ")
                console.log(models.modelFiles)

                var offset = (params.page() - 1) * params.count();
                return models.scrapeRequest.getScrapeRequestByUser(
                ).then(function(modelFiles) {
                    $scope.isLoading = false;
                    params.total(modelFiles.count);
                    return modelFiles;
                }, function(err) {
                    $scope.isLoading = false;
                    $scope.isError = true;
                });
            }
        });

        $scope.extractedDataTable = new NgTableParams({
            page: $stateParams.page || 1,
            count: $stateParams.count || 10,
        }, {
            getData: function(params) {
                $scope.isLoading = true;
                $scope.isError = false;
                if (!$state.is($state.current, {
                        page: params.page(),
                        count: params.count()
                    })) {
                    $state.go($state.current.name, {
                        page: params.page(),
                        count: params.count()
                    }, {
                        notify: false
                    });
                }
                console.log("models")
                console.log(models)

                var offset = (params.page() - 1) * params.count();
                console.log('models . extracted')

                console.log( models.extractedData)

                return models.extractedData.getExtractedDataByUser()
                .then(function(modelFiles) {
                    $scope.isLoading = false;
                    params.total(modelFiles.count);
                    return modelFiles;
                }, function(err) {
                    $scope.isLoading = false;
                    $scope.isError = true;
                });
            }
        });

    });