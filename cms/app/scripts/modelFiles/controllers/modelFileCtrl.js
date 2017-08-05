'use strict';

angular.module('webScraperCMS.modelFiles')
    .controller('ModelFileCtrl', function($rootScope, $scope, $filter, $state,API, models, notifyService,Upload, modelFile) {
        $scope.modelFile = modelFile;
        $scope.isNew = angular.isUndefined($scope.modelFile.id) || $scope.modelFile.id === '';



        $scope.uploadFiles = function(files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function(file) {
                console.log("file")
                console.log(file)

                file.upload = Upload.upload({
                     url : API.apiHost +  '/modelFiles/save',

                    // url : '/cms/app/scripts/modelFiles/controllers/upload.php',

                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            });
        }
     
        // $scope.uploadFiles = function (files) {
        //     $scope.files = files;
        //     if (files && files.length) {
        //         Upload.upload({
        //             url: './uploads',
        //
        //             // url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        //             data: {
        //                 files: files
        //             }
        //         }).then(function (response) {
        //             $timeout(function () {
        //                 $scope.result = response.data;
        //             });
        //         }, function (response) {
        //             if (response.status > 0) {
        //                 $scope.errorMsg = response.status + ': ' + response.data;
        //             }
        //         }, function (evt) {
        //             $scope.progress =
        //                 Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        //         });
        //     }
        // };
        $scope.saveModelFile = function() {
            if ($scope.isLoading) {
                return;
            }


            $scope.isLoading = true;
            console.log( $scope.modelFile)
            return $scope.modelFile.save().then(function(newmodelFile) {
                console.log("i am in save "+ modelFile )
                console.log( modelFile )

                $scope.isLoading = false;
                notifyService.notify($filter('translate')('user.save.success'));
                $state.go('app.modelFiles', {}, {
                    location: 'replace'
                });
            }, function(err) {
                $scope.isLoading = false;
                var msg = 'user.errors.saveError';
                if (err.data && err.data.code === 202) {
                    msg = 'user.errors.nameFound';
                }
                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };

    });