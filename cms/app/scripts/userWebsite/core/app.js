'use strict';

angular.module('webScraperCMS.userW', [])
.config(function($stateProvider) {
  $stateProvider.state('app.Index', {
    url: '/GEWebScraper/index',
    templateUrl: 'views/userTemplates/index.html',
    controller: 'IndexCtrl',
    data: {
        title :'Home',
      requiredPermission: true
    },

      resolve : {
          authorize: function (authorization) {
              return authorization.authorize();
          }
      }
  }).state('app.About', {
    url: '/GEWebScraper/about',
    templateUrl: 'views/userTemplates/about.html',
    controller: 'AboutCtrl',
    data: {
        title :'About',
      requiredPermission: true
    }
      ,
      resolve: {
          authorize: function (authorization) {
              return authorization.authorize();
          }}
  }).state('app.Services', {
      url: '/GEWebScraper/Services',
      templateUrl: 'views/userTemplates/services.html',
      controller: 'ServiceCtrl',
      data: {
          title :'Service',

          requiredPermission: true
      }
      ,
      resolve: {
          authorize: function (authorization) {
              return authorization.authorize();
          }}
  }).state('app.Contact', {
      url: '/GEWebScraper/Contact',
      templateUrl: 'views/userTemplates/contact.html',
      controller: 'ContactCtrl',
      data: {
          title :'Contact',

          requiredPermission: true
      },
      resolve: {
          authorize: function (authorization) {
              return authorization.authorize();
          }}
      }).state('app.Start', {
      url: '/GEWebScraper/Start',
      templateUrl: 'views/userTemplates/startScraping.html',
      controller: 'StartCtrl',
      data: {
          title :'Start',

          requiredPermission: true
      },
      resolve: {
          authorize: function (authorization) {
              return authorization.authorize();
          }}
  })
      .state('app.Models', {
      url: '/GEWebScraper/Models',
      templateUrl: 'views/userTemplates/userModels.html',
      controller: 'UserModelsCtrl',
      data: {
          title :'Models',

          requiredPermission: 'models.list',
        //   child: true
      }
      ,
      resolve: {
          authorize: function (authorization) {
              return authorization.authorize();
          }}
  })

      .state('app.myModels', {
          url: '/GEWebScraper/myModels?page&count',
          templateUrl: 'views/userTemplates/myModels.html',
          controller: 'UserModelsCtrl',
          data: {
              title :'My Models',

              requiredPermission: 'models.list',
            //   child: true
          }
          ,
          resolve: {
              authorize: function (authorization) {
                  return authorization.authorize();
              }}
      })
      .state('app.myData', {
          url: '/GEWebScraper/myData',
          templateUrl: 'views/userTemplates/myData.html',
          controller: 'UserModelsCtrl',
          data: {
              title :'My Data',

              requiredPermission: 'models.list',
            //   child: true
          }
          ,
          resolve: {
              authorize: function (authorization) {
                  return authorization.authorize();
              }}
      })
         .state('app.Tutorial', {
          url: '/GEWebScraper/Tutorial',
          templateUrl: 'views/userTemplates/tutorial.html',
        //   controller: 'UserModelsCtrl',
          data: {
              title :'Tutorials',

        requiredPermission:true,
            //   child: true
          }
          ,
          resolve: {
              authorize: function (authorization) {
                  return authorization.authorize();
              }}
      })
      .state('app.myRequests', {
          url: '/GEWebScraper/myRequests',
          templateUrl: 'views/userTemplates/myRequests.html',
          controller: 'UserModelsCtrl',
          data: {
              title :'My Requests',

              requiredPermission: 'models.list',
            //   child: true
          }
          ,
          resolve: {
              authorize: function (authorization) {
                  return authorization.authorize();
              }}
      })
      .state('app.Request', {
      url: '/GEWebScraper/Request',
      templateUrl: 'views/userTemplates/request.html',
      controller: 'RequestCtrl',
      data: {
          title :'Request',

          requiredPermission: true,
          child: true
      },
      params: {
          request: null,
          modelFiles:null,
          temptModels:null
      },
      resolve:{
          request: function($rootScope, $q, $state, $stateParams, authorization, models) {
                  return authorization.authorize().then(function() {
                      var deferred = $q.defer();
                      console.log(models.scrapeRequest)
                      deferred.resolve(models.scrapeRequest.one(''));

                      return deferred.promise;
                  });

          },
          modelFiles:  function ($q, models) {
              var deferred = $q.defer();
              models.modelFiles.getUserModelFiles().then(function (modelFiles) {
                  deferred.resolve(modelFiles);
              }, deferred.reject);
              return deferred.promise;
          }
          ,
          temptModels:  function ($q, models) {
              var deferred = $q.defer();
              models.modelFiles.getAdminModelFiles().then(function (modelFiles) {
                  deferred.resolve(modelFiles);
              }, deferred.reject);
              return deferred.promise;
          },
          extractedDataTypes:function ($q, models) {
              console.log('in extracted data type')
              var deferred = $q.defer();
              models.extractedDataType.getAllExtractedDataTypes()
                  .then(function (extractedDataTypes) {
                  deferred.resolve(extractedDataTypes);
              }, deferred.reject).catch(function (err) {
                  console.log(err)
              });
              return deferred.promise;


          }
      }
  })
});