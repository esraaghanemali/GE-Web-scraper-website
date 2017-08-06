angular.module('webScraperCMS.userW')
    .controller('RequestCtrl',function($rootScope, $scope, $filter, $state, models,temptModels,modelFiles,request, notifyService) {
        $scope.requestModels = modelFiles;
        $scope.temptModels = temptModels;

        $scope.request = request;

        $scope.saveRequest = function() {
            if ($scope.isLoading) {
                return;
            }
            // if (!$scope.userForm.$valid) {
            //     return notifyService.notify($filter('translate')('user.errors.formNotValid'), {
            //         type: 'danger'
            //     });
            // }
            if( $scope.request.requestModel )
            $scope.request.requestModel = _.find($scope.request, {id: $scope.request.requestModel.id});
            if( $scope.request.temptModel )
            $scope.request.temptModel = _.find($scope.request, {id: $scope.request.temptModel.id});

            $scope.isLoading = true;

            //   console.log('packagee')
            //   console.log($scope.user.userPackage)
            //   $scope.user.userPackage = _.find($scope.userPackages, {id: $scope.user.userPackage.id});
            //   console.log('packagee22222')
            //   console.log($scope.user.userPackage)
            return $scope.request.save().then(function(newRequest) {
                console.log("i am in save "+ newRequest )
                console.log( newRequest )

                $scope.isLoading = false;
                notifyService.notify($filter('translate')('request.save.success'));
                $state.go('app.Models', {}, {
                    location: 'replace'
                });
            }, function(err) {
                $scope.isLoading = false;
                var msg = 'request.errors.saveError';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };

    });

