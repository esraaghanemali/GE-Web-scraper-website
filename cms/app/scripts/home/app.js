'use strict';


angular.module('webScraperCMS.modelFiles', [])
    .config(function ($stateProvider) {
        $stateProvider.state('app.modelFiles', {
            url: '/modelFiles?page&count',
            templateUrl: 'views/modelFiles/modelFiles-page.html',
            controller: 'ModelFilesCtrl',
            data: {
                requiredPermission: 'modelFiles.list'
            }
            ,
            resolve: {
                authorize: function (authorization) {
                    return authorization.authorize();
                }
            }
        })
    });