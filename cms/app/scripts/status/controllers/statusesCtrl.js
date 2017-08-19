'use strict';

angular.module('webScraperCMS.status')
    .controller('StatusesCtrl', function ($scope, $filter, $mdDialog, $state, $stateParams, notifyService,NgTableParams, models) {
        $scope.statusesTable = new NgTableParams({
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
                console.log("in ctrl status ")
                console.log(models.status)

                var offset = (params.page() - 1) * params.count();
                return models.status.getList({
                    offset: offset,
                    limit: params.count()
                }).then(function(status) {
                    $scope.isLoading = false;
                    params.total(status.count);
                    return status;
                }, function(err) {
                    $scope.isLoading = false;
                    $scope.isError = true;
                });
            }
        });

        $scope.remove = function (row) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure')
                .textContent('Are you sure to delete the status: ' + row.statusName + ' ?')
                .ok('Delete it!')
                .cancel('Cancel');


            $mdDialog.show(confirm).then(function () {
                models.status.remove(row.id)
                    .then(function () {

                        $scope.isLoading = false;
                        notifyService.notify($filter('translate')('status.actions.remove.success'));
                        $state.go('app.statuses', {}, {
                            location: 'replace'
                        });

                        $scope.status = _.filter($scope.status, function (status) {
                            return status.id != row.id;
                        })
                        // $scope.stops.splice(index, index + 1);
                        $scope.statusesTable.reload();
                    });
            }, function (err) {
                $scope.isLoading = false;
                var msg = 'status.errors.remove';
                if (err.data && err.data.code === 202) {
                    msg = 'status.errors.nameFound';
                }
                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };
    })