var checkController = angular.module('checkController',[]);
checkController.controller('checkController',['$scope','$http',function($scope,$http) {
  $scope.id = null;
  $scope.loaded = false;
  $scope.editEnabled = false;
  $scope.hardware = null

  $scope.query = {
    order:'checkout_time',
    limit: 3,
    page: 1
  };
  $scope.getData = function(a,b){

  };

  $scope.toggleEdit = function() {
    $scope.editEnabled = !$scope.editEnabled;
  };
  $scope.update = function() {
    $http({
      method:'POST',
      url:'/api/hardware/'+$scope.hardware.id,
      data: $scope.hardware
    }).then(function success(res) {
      console.log('success update');
      $scope.loaded = true;
      $scope.editEnabled = false;
    }, function error(err) {
      alert('error updating data.');
    });
  };
  $scope.findHardware = function() {
    if($scope.id==="") {
      return;
    }
    $http({
      method:'GET',
      url:'/api/hardware/'+$scope.id
    }).then(function success(res) {
      $scope.hardware = res.data;
      $scope.loaded = true;
    },function error(err) {
      alert('error loading hardware');
    });
  };
}]);