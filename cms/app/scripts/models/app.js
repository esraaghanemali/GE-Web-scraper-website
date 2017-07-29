'use strict';

angular.module('webScraperCMS.models', [])
.config(function(RestangularProvider, API) {
  RestangularProvider.setBaseUrl(API.apiHost);
  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    var extractedData;
    // .. to look for getList operations
    if (operation === "getList") {
      // .. and handle the data and meta data
      extractedData = data.data || data;
      extractedData.count = data.count || {};
    } else {
      extractedData = data.data || data;
    }
    return extractedData;
  });
})
    .factory('models', function(User,ModelFiles) {
        return {
            user: User,
            modelFiles: ModelFiles

        };
    });

// .factory('models', function(User,ModelFiles, Bus, Stop, Issue) {
//   return {
//     user: User,
//     modelFiles: ModelFiles,
//     bus: Bus,
//     stop: Stop,
//     issue: Issue
//   };
// });
