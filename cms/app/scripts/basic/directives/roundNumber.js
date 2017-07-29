'use strict';

angular.module('webScraperCMS.basic')
.directive('roundNumber', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) {
        return;
      }
      ngModel.$formatters.push(function(value) {
        return Math.round(value);
      });
    }
  };
});