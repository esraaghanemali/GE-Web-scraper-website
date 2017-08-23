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

    .factory('models', function(User,ModelFiles,userPackage,scrapeRequest,extractedData,Categories,ExtractedDataTypes, status) {
        return {
            user: User,
            modelFiles: ModelFiles,
            userPackage:userPackage,
            scrapeRequest:scrapeRequest,
            categories : Categories,
            extractedDataTypes: ExtractedDataTypes,
            extractedData:extractedData,
            status:status
        };
    });
    // .factory('models', function(userPackage,User,ModelFiles,scrapeRequest,status,extractedData,webScraperConstant) {
    //     return {
    //         userPackage:userPackage,
    //         user: User,
    //         modelFiles: ModelFiles,
    //         scrapeRequest:scrapeRequest,
    //         status:status,
    //         extractedData:extractedData,
    //         webScraperConstant:webScraperConstant
    //
    //     };
    // });