var addNewController = angular.module('addNewController',[]);
addNewController.controller('addNewController',['$scope','$http',function($scope,$http) {
  $scope.hardware=null;
  $scope.addNew = function() {
    $scope.hardware.checked_out = false;
    $scope.hardware.user_checkout = "";
    $scope.hardware.checkout_time = "";
    $scope.hardware.record = [];
    $http({
      method:'PUT',
      url:'/api/hardware',
      data: $scope.hardware
    }).then(function success(res) {
      alert('hardware added!')
    },function error(err) {
      alert('error adding data!');
      console.log(err);
    });
  }
}]);