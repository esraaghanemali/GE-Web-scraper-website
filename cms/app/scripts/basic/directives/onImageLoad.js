'use strict';

angular.module('webScraperCMS.basic')
.directive('onImageLoad', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('load', function() {
        //call the function that was passed
        scope.$apply(attrs.onImageLoad)(element[0]);
      });
    }
  };
});