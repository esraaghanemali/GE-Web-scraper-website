'use strict';

angular.module('webScraperCMS.categories')
    .controller('CategoriesCtrl', function ($scope, $filter, $mdDialog, $state, $stateParams, notifyService,NgTableParams, models) {
        $scope.categoriesTable = new NgTableParams({
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
                return models.category.getList({
                    offset: offset,
                    limit: params.count()
                }).then(function(categories) {
                    $scope.isLoading = false;
                    params.total(categories.count);
                    return categories;
                }, function(err) {
                    $scope.isLoading = false;
                    $scope.isError = true;
                });
            }
        });

        $scope.remove = function (row) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure')
                .textContent('Are you sure to delete the category: ' + row.categoryName + ' ?')
                .ok('Delete it!')
                .cancel('Cancel');


            $mdDialog.show(confirm).then(function () {
                models.category.removeCategory(row.id)
                    .then(function () {

                        $scope.isLoading = false;
                        notifyService.notify($filter('translate')('category.actions.remove.success'));

                        $scope.category = _.filter($scope.category, function (category) {
                            return category.id != row.id;
                        })
                        // $scope.stops.splice(index, index + 1);
                        $scope.categoriesTable.reload();
                    });
            }, function (err) {
                $scope.isLoading = false;
                var msg = 'category.errors.remove';
                if (err.data && err.data.code === 202) {
                    msg = 'category.errors.nameFound';
                }
                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };
    })