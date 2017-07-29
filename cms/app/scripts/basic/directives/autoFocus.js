'use strict';

angular.module('webScraperCMS.basic')
.directive('autoFocus', function($timeout) {
  return {
    restrict: 'A',
    link: function($scope, element) {
      $timeout(function() {
        element[0].focus();
      });
    }
  };
});