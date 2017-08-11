'use strict';


angular.module('webScraperCMS.home', [])
    .config(function ($stateProvider) {
        $stateProvider.state('app.home', {
            url: '/home',
            templateUrl: 'views/home/home-page.html',
             controller: 'ChartCtrl',
            data: {
                requiredPermission: true
            }
            ,
            resolve: {
                authorize: function (authorization) {
                    return authorization.authorize();
                }
            }
        })
    });