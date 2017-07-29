'use strict';

angular.module('webScraperCMS.login')
.factory('authorizationInterceptor', function($localStorage) {
  return {
    request: function(config) {
      if (config.noToken !== true) {
        config.headers['X-Access-Token'] = $localStorage.token;
      }
      return config;
    }
  };
});