

angular.module('webScraperCMS.userPackage')
    .controller('UserPackageCtrl', function ($rootScope, $scope, $filter, $state, models, notifyService, userPackage) {
        $scope.isNew =angular.isUndefined(userPackage.id) || userPackage.id == null || userPackage.id == '';
        // $scope.userPackage = $scope.isNew ? {} : userPackage;
$scope.userPackage = userPackage
        $scope.saveUserPackage = function () {
            if ($scope.isLoading) {
                return;
            }
            // if (!$scope.userPackageForm.$valid) {
            //     return notifyService.notify($filter('translate')('user.errors.formNotValid'), {
            //         type: 'danger'
            //     });
            // }
            $scope.isLoading = true;
            console.log('user pac')

            console.log(userPackage)
          return  $scope.userPackage.save().then(function (newPackage) {
          
                $state.go('app.userPackages', {}, {
                    location: 'replace'
                });
            });
        }

    });