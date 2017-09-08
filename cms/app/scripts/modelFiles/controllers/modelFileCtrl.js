'use strict';

angular.module('webScraperCMS.modelFiles')
    .controller('ModelFileCtrl', function($rootScope, $scope, $filter, $state,API, models, notifyService,Upload, modelFile,categories) {
        $scope.modelFile = modelFile;
        $scope.isNew = angular.isUndefined($scope.modelFile.id) || $scope.modelFile.id === '';

      var d =  $scope.uploadFiles = function(files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;

            angular.forEach(files, function(file) {

            });
        }
        $scope.categories = categories

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
                data: {file: $scope.files , fileName : $scope.modelFile.fileName ,
                     desc: $scope.modelFile.desc, category: $scope.modelFile.category,
                     url:$scope.modelFile.url
                    
                    }
            })

            .then(function (response) {
                    $scope.isLoading = false;
                    notifyService.notify($filter('translate')('modelFiles.save.success'));

    $state.go('app.myModels', {}, {
        location: 'replace'
    });

// if($scope.currentUser.isAdmin)
// {

//     $state.go('app.modelFiles', {}, {
//         location: 'replace'
//     });
// }
// else
// {
//     $state.go('app.myModels', {}, {
//         location: 'replace'
//     });
// }


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
          
            );

            $scope.isLoading = true;
      
        };

    });