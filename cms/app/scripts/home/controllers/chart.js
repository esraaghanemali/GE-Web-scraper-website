angular.module('webScraperCMS.home')
    .controller('ChartCtrl', function($scope,models,categories,users,packages,extractedDataTypes) {

        console.log('users')

        console.log(users)
        //
        // $scope.labels = ["January", "February", "March", "April",
        //     "May", "June", "July" , "August", "September",
        //     "October" ,"November", "December"];
        // $scope.series = ['Requests', 'Extraced Data'];
        // $scope.data = [
        //     [65, 59, 80, 81, 56, 55, 40,120]
        //     ,
        //      [28, 48, 40, 19, 86, 27, 90,12]
        //
        // ];
        // $scope.onClick = function (points, evt) {
        //     console.log(points, evt);
        // };

        var categoryNames  = categories.map(function (x) {
            return x._id
        })
        var categoryData =  categories.map(function (x) {
            return x.files
        })
        //Categories precentage
        $scope.circleLabelsCategories = categoryNames
        $scope.circleDataCategories = categoryData


        //extractedDataTypes precentage

        var extractedDataTypeNames  = extractedDataTypes.map(function (x) {
            return x._id
        })
        var extractedDataTypesData =  extractedDataTypes.map(function (x) {
            return x.requests
        })

        $scope.circleLabelsTypes =extractedDataTypeNames
        $scope.circleDataTypes =extractedDataTypesData;

        //packages

        var packagesNames  = packages.map(function (x) {
            return x._id
        })
        var packagesData =  packages.map(function (x) {
            return x.username
        })
        $scope.circleLabelsPackages = packagesNames
        $scope.circleDataPackages = packagesData
var userModels = users.models
var userRequests = users.requests
      var  userNames = users.users
        var  userPackages = users.packages
        // Simulate async data update
        $scope.rectangleLabels = userNames
        $scope.rectangleData = [
            userModels,
            userRequests,
            userPackages
        ];
        $scope.series = ['Models', 'Requests','Package']



    });
