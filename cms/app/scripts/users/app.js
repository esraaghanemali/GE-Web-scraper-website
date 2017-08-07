'use strict';

angular.module('webScraperCMS.users', [])
.config(function($stateProvider) {
  $stateProvider.state('app.users', {
    url: '/users?page&count',
    templateUrl: 'views/users/users-page.html',
    controller: 'UsersCtrl',
    data: {
      requiredPermission: 'users.list'
    }
    ,
    resolve: {
      authorize: function (authorization) {
        return authorization.authorize();
      }
    }
  }).state('app.profile', {
    url: '/users/profile',
    templateUrl: 'views/users/profile.html',
    controller: 'ProfileCtrl',
    data: {
      requiredPermission: true
    },
    resolve: {
      user: function($rootScope, authorization) {
        // calling authorize() here to make sure that the user is resolved after the authorization
        return authorization.authorize().then(function() {
          return $rootScope.currentUser;
        });
      }
    }
  }).state('app.user', {
    url: '/users/:userId',
    templateUrl: 'views/users/user-page.html',
    controller: 'UserCtrl',
    params: {
      user: null,
        userPackages:null
    },
    data: {
      requiredPermission: 'users.edit',
      child: true
    },
    resolve: {
      user: function($rootScope, $q, $state, $stateParams, authorization, models) {
        return authorization.authorize().then(function() {
          var deferred = $q.defer();
          if ($stateParams.userId === $rootScope.currentUser.id) {
            deferred.reject();
            $state.go('app.profile', {}, {
              location: 'replace'
            });
          }
          else
            if (angular.isDefined($stateParams.user) && $stateParams.user !== null) {
            deferred.resolve($stateParams.user.clone ? $stateParams.user.clone() : angular.copy($stateParams.user));
          }
          else if (angular.isUndefined($stateParams.userId) || $stateParams.userId === '' || $stateParams.userId === null) {
            $state.go('app.users', {}, {
              location: 'replace'
            });
            deferred.reject();
          }
          else if ($stateParams.userId === 'new') {
            console.log("in new user")
              console.log(models.user)

              deferred.resolve(models.user.one(''));
          }
          else {
            models.user.get($stateParams.userId).then(function(user) {
              deferred.resolve(user);
            }, deferred.reject);
          }
          return deferred.promise;
        });
      },
        userPackages:  function ($q, models) {
            var deferred = $q.defer();
            models.userPackage.getAllPackages().then(function (userPackages) {
                deferred.resolve(userPackages);
            }, deferred.reject);
            return deferred.promise;
        }
    }
  }).state('app.editUser', {
      url: '/users/editUser/',
      templateUrl: '../../views/users/editUser-page.html',
      controller: 'EditUserCtrl',
      params: {
          user: null,
          userPackages:null
      },
      data: {
          requiredPermission: true,
          child: true
      },
      resolve: {
          // user: function($rootScope, $q, $state, $stateParams, authorization, models) {
          //     return authorization.authorize().then(function() {
          //         var deferred = $q.defer();
          //         if ($stateParams.userId === $rootScope.currentUser.id) {
          //             deferred.reject();
          //             $state.go('app.profile', {}, {
          //                 location: 'replace'
          //             });
          //         }
          //         else
          //         if (angular.isDefined($stateParams.user) && $stateParams.user !== null) {
          //             deferred.resolve($stateParams.user.clone ? $stateParams.user.clone() : angular.copy($stateParams.user));
          //         }
          //         else if (angular.isUndefined($stateParams.userId) || $stateParams.userId === '' || $stateParams.userId === null) {
          //             $state.go('app.users', {}, {
          //                 location: 'replace'
          //             });
          //             deferred.reject();
          //         }
          //         else if ($stateParams.userId === 'new') {
          //             console.log("in new user")
          //             console.log(models.user)
          //
          //             deferred.resolve(models.user.one(''));
          //         }
          //         else {
          //             models.user.get($stateParams.userId).then(function(user) {
          //                 deferred.resolve(user);
          //             }, deferred.reject);
          //         }
          //         return deferred.promise;
          //     });
          // },
          // userPackages:  function ($q, models) {
          //     var deferred = $q.defer();
          //     models.userPackage.getAllPackages().then(function (userPackages) {
          //         deferred.resolve(userPackages);
          //     }, deferred.reject);
          //     return deferred.promise;
          // }
      }
  });;
});