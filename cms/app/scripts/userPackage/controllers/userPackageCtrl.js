angular.module('webScraperCMS.userPackage')
    .controller('UserPackageCtrl', function ($rootScope, $scope, $filter, $state, models, notifyService, userPackage) {
        $scope.isNew = angular.isUndefined(userPackage.id) || userPackage.id == null || userPackage.id == '';
        //$scope.userPackage = $scope.isNew ? {} : userPackage;
        $scope.userPackage = userPackage;

        $scope.saveUserPackage = function () {
            if ($scope.isLoading) {
                return;
            }
            if (!$scope.userPackageForm.$valid) {
                return notifyService.notify($filter('translate')('user.errors.formNotValid'), {
                    type: 'danger'
                });
            }

            $scope.isLoading = true;
            console.log($scope.userPackage);
            return $scope.userPackage.save().then(function (newPackage) {
                $scope.isLoading = false;
                notifyService.notify($filter('translate')('userPackage.save.success'));
                $state.go('app.userPackages', {}, {
                    location: 'replace'
                });
            }, function(err) {
                $scope.isLoading = false;
                var msg = 'userPackage.errors.saveError';

                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                })
            });
        }

    });