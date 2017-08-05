'use strict';

angular.module('webScraperCMS.userW', [])
.config(function($stateProvider) {
  $stateProvider.state('app.Index', {
    url: '/GEWebScraper/index',
    templateUrl: 'views/userTemplates/index.html',
    controller: 'IndexCtrl',
    data: {
      requiredPermission: true
    }
  }).state('app.About', {
    url: '/GEWebScraper/about',
    templateUrl: 'views/userTemplates/about.html',
    controller: 'AboutCtrl',
    data: {
      requiredPermission: true
    }
  }).state('app.Services', {
      url: '/GEWebScraper/Services',
      templateUrl: 'views/userTemplates/services.html',
      controller: 'ServiceCtrl',
      data: {
          requiredPermission: true
      }
  }).state('app.Contact', {
      url: '/GEWebScraper/Contact',
      templateUrl: 'views/userTemplates/contact.html',
      controller: 'ContactCtrl',
      data: {
          requiredPermission: true
      }
      }).state('app.Start', {
      url: '/GEWebScraper/Start',
      templateUrl: 'views/userTemplates/startScraping.html',
      controller: 'StartCtrl',
      data: {
          requiredPermission: true
      }
  }).state('app.Models', {
      url: '/GEWebScraper/Models',
      templateUrl: 'views/userTemplates/userModels.html',
      controller: 'UserModelsCtrl',
      data: {
          requiredPermission: true
      }
  }).state('app.Request', {
      url: '/GEWebScraper/Request',
      templateUrl: 'views/userTemplates/request.html',
      controller: 'RequestCtrl',
      data: {
          requiredPermission: true
      }
  })
});