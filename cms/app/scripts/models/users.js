'use strict';

angular.module('webScraperCMS.models')
.factory('User', function(Restangular) {
  var route = 'users';
  var User = Restangular.all(route);
  User.getCurrentUser = function() {
    return Restangular.one(route).customGET('me');
  };
  User.deactivateUser = function(user) {
    return Restangular.one(route).customPUT(undefined, user.id + '/activate');
  };
  User.changePassword = function(oldPass, newPass) {
    return Restangular.one(route).customPUT({
      oldPassword: oldPass,
      newPassword: newPass
    }, '/change_password');
  };
    User.changePackage = function(id) {
        return Restangular.one(route).one('Package').customPOST({
            packageId: id,
        });
    };
    User.updateInfo = function(filed,value) {
        return Restangular.one(route).one('UpdateInfo').customPOST({
            filed: filed,
            value:value
        });
    };

    User.getAnalyticCategories = function () {
        return Restangular.one(route).one('analytic').get();
    };
    User.getAnalyticUsers = function () {
        return Restangular.one(route).one('UserAnalytic').get();
    };

  return User;
});