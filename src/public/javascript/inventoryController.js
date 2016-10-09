var inventoryController = angular.module('inventoryController',[]);
inventoryController.controller('inventoryController',['$scope','$http',function($scope,$http) {
  console.log('inventory');
  $scope.hardware=[{
    "id":"1",
  "name":"hardware 1",
  "checked_out":false,
  "user_checkout":"",
  "checkout_time":"",
  "record":[]
  },{
    "id":"2",
  "name":"hardware 2",
  "checked_out":true,
  "user_checkout":"Amy",
  "checkout_time":"Sat Oct 8 16.48PM EST",
  "record":[{
    "user_id":"Amy",
    "checkout_time":"Sat Oct 8 16.48PM EST",
    "checkin_time":""
  }]
  }];
}]);