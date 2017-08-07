'use strict';

angular.module('webScraperCMS.modelFiles')
    .controller('ModelFileCtrl', function($rootScope, $scope, $filter, $state,API, models, notifyService,Upload, modelFile) {
        $scope.modelFile = modelFile;
        $scope.isNew = angular.isUndefined($scope.modelFile.id) || $scope.modelFile.id === '';

      var d =  $scope.uploadFiles = function(files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;

            angular.forEach(files, function(file) {

                // file.upload = Upload.upload({
                //     url : API.apiHost +  '/modelFiles/save',
                //
                //     // url : '/cms/app/scripts/modelFiles/controllers/upload.php',
                //
                //     data: {file: file}
                // });
                //
                // file.upload.then(function (response) {
                //     // $timeout(function () {
                //     //     file.result = response.data;
                //     // });
                // }, function (response) {
                //     if (response.status > 0)
                //         $scope.errorMsg = response.status + ': ' + response.data;
                // }, function (evt) {
                //     file.progress = Math.min(100, parseInt(100.0 *
                //         evt.loaded / evt.total));
                // });
            });
        }

        console.log(d)
        $scope.saveModelFile = function() {
          console.log("file name")
          console.log( $scope.modelFile.fileName)
            if ($scope.isLoading) {
                return;
            }
            if(!$scope.files || $scope.files===null || !$scope.modelFile.fileName || $scope.modelFile.fileName=='')
            {
                var msg = 'modelFiles.errors.required';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
                return;
            }

            Upload.upload({
                url : API.apiHost +  '/modelFiles/save',
                // method:'POST',
                data: {file: $scope.files , fileName : $scope.modelFile.fileName , desc: $scope.modelFile.desc}
            })

            .then(function (response) {
                    $scope.isLoading = false;
                    notifyService.notify($filter('translate')('modelFiles.save.success'));
// //
if($scope.currentUser.isAdmin)
{

    $state.go('app.modelFiles', {}, {
        location: 'replace'
    });
}
else
{
    $state.go('app.Models', {}, {
        location: 'replace'
    });
}
//                     console.log($scope.currentUser.isAdmin)
//                     console.log('---------------------------------------------')
//
//                     $state.go('app.modelFiles', {}, {
//         location: 'replace'
//     });

            }, function (response) {
                if (response.status > 0)

                    $scope.errorMsg = response.status + ': ' + response.data;
                    console.log("in error")

                console.log(response)
                    $scope.isLoading = false;
                        var msg = 'modelFiles.errors.saveError';

                        notifyService.notify($filter('translate')(msg), {
                            type: 'danger'
                        });
            }
            // , function (evt) {
            //     // file.progress = Math.min(100, parseInt(100.0 *
            //     //     evt.loaded / evt.total));
            // }

            );

            $scope.isLoading = true;
            // console.log( $scope.modelFile)
            // return $scope.modelFile.save().then(function(newmodelFile) {
            //     console.log("i am in save "+ modelFile )
            //     console.log( modelFile )
            //
            //     $scope.isLoading = false;
            //     notifyService.notify($filter('translate')('user.save.success'));
            //     $state.go('app.modelFiles', {}, {
            //         location: 'replace'
            //     });
            // }, function(err) {
            //     $scope.isLoading = false;
            //     var msg = 'user.errors.saveError';
            //     if (err.data && err.data.code === 202) {
            //         msg = 'user.errors.nameFound';
            //     }
            //     notifyService.notify($filter('translate')(msg), {
            //         type: 'danger'
            //     });
            // });
        };

    });