'use strict';

angular.module('webScraperCMS.users')
    .controller('EditUserCtrl', function($rootScope, $scope, $filter, $state, $stateParams, models, utils, notifyService,editableThemes,editableOptions) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';

console.log("addddddmoiib")
        console.log($scope.currentUser)

        $scope.user = $scope.currentUser


        $scope.loadPackages = function() {
            return models.userPackage.getAllPackages().then(function(data) {
                    // console.log(data)
                $scope.packages = data;
            });
        };
        $scope.showPackage = function() {
         return $scope.currentUser.userPackage.packageName
        };





        $scope.updateUsername = function (data) {
            models.user.updateInfo('username',data).then(function (data) {

            })

    }
        $scope.updatefirstName = function (data) {
            models.user.updateInfo('firstName',data).then(function (data) {
                console.log($scope.currentUser.userPackage)
            })

        }

        $scope.updatelastName = function (data) {
            models.user.updateInfo('lastName',data).then(function (data) {
                console.log($scope.currentUser.userPackage)
            })

        }
        $scope.updatephone = function (data) {
            models.user.updateInfo('phone',data).then(function (data) {
                console.log($scope.currentUser.userPackage)
            })

        }
        $scope.updateemail = function (data) {
            models.user.updateInfo('email',data).then(function (data) {
                console.log($scope.currentUser.userPackage)
            })

        }


        $scope.requestPackage = function (data) {
            models.user.changePackage(data).then(function (data) {
              
                console.log($scope.currentUser.userPackage)

            })

        }


    });



