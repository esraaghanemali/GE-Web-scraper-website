'use strict';

angular.module('webScraperCMS.userW')
    .controller('UserModelsCtrl', function($scope, $filter, $mdDialog, $state, $stateParams,notifyService, NgTableParams, models) {


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
                // console.log("in ctrl model ")
                // console.log(models.modelFiles)

                var offset = (params.page() - 1) * params.count();
                return models.modelFiles.getUserModelFiles(
                    // {
                    //       offset: offset,
                    // limit: params.count()
                    // }
                ).then(function(modelFiles) {
                    $scope.isLoading = false;
                    params.total(modelFiles.length);
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
                return models.scrapeRequest.getScrapeRequestByUser(    ).then(function(modelFiles) {
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


        $scope.remove = function (row) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure')
                .textContent('Are you sure to delete the modelFile: ' + row.fileName + ' ?')
                .ok('Delete it!')
                .cancel('Cancel');


            $mdDialog.show(confirm).then(function () {
                models.modelFiles.removeModelFile(row.id)
                    .then(function () {

                        $scope.isLoading = false;
                        notifyService.notify($filter('translate')('modelFiles.remove.success'));
                        $state.go('app.myModels', {}, {
                            location: 'replace'
                        });

                        $scope.modelFile = _.filter($scope.modelFile, function (modelFile) {
                            return modelFile.id != row.id;
                        })
                        // $scope.stops.splice(index, index + 1);
                        $scope.modelFilesTable.reload();
                        $scope.extractedDataTable.reload();
                        $scope.requestedFilesTable.reload();

                    });
            }, function (err) {
                $scope.isLoading = false;
                var msg = 'modelFiles.errors.remove';
                if (err.data && err.data.code === 202) {
                    msg = 'modelFiles.errors.nameFound';
                }
                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };


        $scope.request = function (row,ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('What is the max records ?')
                .placeholder('Max records')
                .ariaLabel('Max records')
                .initialValue('')
                // .title('What is the max Items Per Page ?')
                // .placeholder('Max Items Per Page')
                // .ariaLabel('Max Items Per Page')
                // .initialValue('')
                .targetEvent(ev)
                .ok('Save')
                .cancel('cancel');

            $mdDialog.show(confirm).then(function(result) {
                if(result == '')
                    result=1


                models.scrapeRequest.new(row,result)
                        .then(function () {

                            $scope.isLoading = false;
                            notifyService.notify($filter('translate')('modelFiles.request.success'));
                            $state.go('app.Models', {}, {
                                location: 'replace'
                            });


                            $scope.requestedFilesTable.reload();
                        },function (err) {
                            var msg = 'modelFiles.errors.request';

                            notifyService.notify($filter('translate')(msg), {
                                type: 'danger'
                            });
                        });
            });
        }

        $scope.removeRequest = function (row) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure')
                .textContent('Are you sure to delete the request model file: ' + row.model.fileName + ' ?')
                .ok('Delete it!')
                .cancel('Cancel');


            $mdDialog.show(confirm).then(function () {
                models.scrapeRequest.removeModelRequest(row.id)
                    .then(function () {

                        $scope.isLoading = false;
                        notifyService.notify($filter('translate')('request.remove.success'));
                        $state.go('app.myRequests', {}, {
                            location: 'replace'
                        });

                        // $scope.modelFile = _.filter($scope.modelFile, function (modelFile) {
                        //     return modelFile.id != row.id;
                        // })
                        // $scope.stops.splice(index, index + 1);
                        $scope.requestedFilesTable.reload();
                        $scope.extractedDataTable.reload();

                    });
            }, function (err) {
                $scope.isLoading = false;
                var msg = 'modelFiles.errors.remove';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };

        $scope.removeExtractedData = function (row) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure')
                .textContent('Are you sure to delete the extracted data? ' )
                .ok('Delete it!')
                .cancel('Cancel');


            $mdDialog.show(confirm).then(function () {
                models.extractedData.removeExtractedData(row.id)
                    .then(function () {

                        $scope.isLoading = false;
                        notifyService.notify($filter('translate')('request.remove.success'));
                        $state.go('app.myData', {}, {
                            location: 'replace'
                        });

                        // $scope.modelFile = _.filter($scope.modelFile, function (modelFile) {
                        //     return modelFile.id != row.id;
                        // })
                        // $scope.stops.splice(index, index + 1);
                        $scope.extractedDataTable.reload();
                    });
            }, function (err) {
                $scope.isLoading = false;
                var msg = 'modelFiles.errors.remove';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };



    });