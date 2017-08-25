'use strict';

angular.module('webScraperCMS.extractedDataTypes')
    .controller('ExtractedDataTypesCtrl', function ($scope, $filter, $mdDialog, $state, $stateParams, notifyService,NgTableParams, models) {
        $scope.extractedDataTypesTable = new NgTableParams({
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
                return models.extractedDataType.getList({
                    offset: offset,
                    limit: params.count()
                }).then(function(extractedDataTypes) {
                    $scope.isLoading = false;
                    params.total(extractedDataTypes.count);
                    return extractedDataTypes;
                }, function(err) {
                    $scope.isLoading = false;
                    $scope.isError = true;
                });
            }
        });

        $scope.remove = function (row) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure')
                .textContent('Are you sure to delete the data type: ' + row.type + ' ?')
                .ok('Delete it!')
                .cancel('Cancel');


            $mdDialog.show(confirm).then(function () {
                models.extractedDataType.remove(row.id)
                    .then(function () {

                        $scope.isLoading = false;
                        notifyService.notify($filter('translate')('extractedDataTypes.actions.remove.success'));

                        $scope.extractedDataType = _.filter($scope.extractedDataType, function (extractedDataType) {
                            return extractedDataType.id != row.id;
                        })
                        // $scope.stops.splice(index, index + 1);
                        $scope.extractedDataTypesTable.reload();
                    });
            }, function (err) {
                $scope.isLoading = false;
                var msg = 'extractedDataTypes.errors.remove';
                if (err.data && err.data.code === 202) {
                    msg = 'extractedDataTypes.errors.nameFound';
                }
                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };
    })