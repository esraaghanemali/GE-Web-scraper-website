'use strict';

angular.module('webScraperCMS.users')
    .controller('IndexCtrl', function($rootScope, $scope, $filter, $state, models,userPackages, notifyService, user) {
        $scope.user = user;
        $scope.isNew = angular.isUndefined($scope.user.id) || $scope.user.id === '';
        $scope.password = '';
        $scope.rePassword = '';
        $scope.userPackages = userPackages;
        if(!$scope.isNew){
            console.log('user')
            console.log($scope.user)
            console.log('user pac')
            console.log($scope.user.userPackage)
            $scope.user.userPackage = _.find($scope.userPackages, {id: $scope.user.userPackage.id});

        }

        $scope.saveUser = function() {
            if ($scope.isLoading) {
                return;
            }
            if (!$scope.userForm.$valid) {
                return notifyService.notify($filter('translate')('user.errors.formNotValid'), {
                    type: 'danger'
                });
            }
            if ($scope.password !== '') {
                $scope.user.password = $scope.password;
            }
            $scope.isLoading = true;
            // console.log( $scope.user)
            //   console.log('packagee')
            //   console.log($scope.user.userPackage)
            //   $scope.user.userPackage = _.find($scope.userPackages, {id: $scope.user.userPackage.id});
            //   console.log('packagee22222')
            //   console.log($scope.user.userPackage)
            return $scope.user.save().then(function(newUser) {
                console.log("i am in save "+ newUser )
                console.log( newUser )
                console.log(" save use"+ $scope.user )
                console.log( $scope.user )

                $scope.isLoading = false;
                notifyService.notify($filter('translate')('user.save.success'));
                $state.go('app.users', {}, {
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

        $scope.changePassword = function() {
            if ($scope.isLoading) {
                return;
            }
            if (!$scope.oldPassword || !$scope.newPassword || !$scope.rePassword) {
                return notifyService.notify($filter('translate')('user.errors.oldNewPassReq'), {
                    type: 'danger'
                });
            }
            if ($scope.newPassword !== $scope.rePassword) {
                return notifyService.notify($filter('translate')('user.errors.noMatch'), {
                    type: 'danger'
                });
            }
            $scope.isLoading = true;
            models.user.changePassword($scope.oldPassword, $scope.newPassword).then(function(user) {
                $scope.isLoading = false;
                notifyService.notify($filter('translate')('user.changePassword.success'));
            }, function(err) {
                $scope.isLoading = false;
                var msg = 'user.errors.changePassword';
                if (err.data && err.data.code === 105) {
                    msg = 'user.errors.oldPassWrong';
                }
                notifyService.notify($filter('translate')(msg), {
                    type: 'danger'
                });
            });
        };
    });