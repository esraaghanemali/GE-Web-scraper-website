'use strict';

angular.module('webScraperCMS.userPackage')
    .controller('UserPackagesCtrl', function ($scope,  $mdToast,$filter, $mdDialog, $state, $stateParams, NgTableParams, models) {
        $scope.userPackageTable = new NgTableParams({
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
                var offset = (params.page() - 1) * params.count();
                return models.userPackage.getList({
                    offset: offset,
                    limit: params.count()
                }).then(function(data) {
                    $scope.isLoading = false;
                    params.total(data.count);
                    return data;
                }, function(err) {
                    $scope.isLoading = false;
                    $scope.isError = true;
                });
            }
        });

        $scope.remove = function (row) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure')
                .textContent('Are you sure to delete the bus: ' + row.packageName + ' ?')
                .ok('Delete it!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                models.userPackage.remove(row.id)
                    .then(function () {
                        $scope.userPackage = _.filter($scope.userPackage, function (userPackage) {
                            return userPackage.id != row.id;
                        })
                        // $scope.stops.splice(index, index + 1);
                        $scope.userPackageTable.reload();
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('package has been removed!')
                                .position('bottom right')
                                .hideDelay(3000)
                                .theme("success-toast")
                        );
                    }).catch(function (err) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('error!')
                            .position('bottom right')
                            .hideDelay(3000)
                            .theme("success-toast")
                    );
                });
            });
        };
        $scope.newUserPackage = function (event) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure')
                .textContent('Are you sure to delete the bus: ' + row.packageName + ' ?')
                .ok('Delete it!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                models.userPackage.remove(row.id)
                    .then(function () {
                        $scope.userPackage = _.filter($scope.userPackage, function (userPackage) {
                            return userPackage.id != row.id;
                        })
                        // $scope.stops.splice(index, index + 1);
                        $scope.userPackageTable.reload();
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('package has been removed!')
                                .position('bottom right')
                                .hideDelay(3000)
                                .theme("success-toast")
                        );
                    }).catch(function (err) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('error!')
                            .position('bottom right')
                            .hideDelay(3000)
                            .theme("success-toast")
                    );
                });
            });
        };
    })