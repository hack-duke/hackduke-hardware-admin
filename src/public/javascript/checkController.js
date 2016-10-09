var checkController = angular.module('checkController',[]);
checkController.controller('checkController',['$scope','$http',function($scope,$http) {
  $scope.loaded = false;
  $scope.editEnabled = false;
  $scope.hardware = null;
  $scope.allowEdit = function() {
    $scope.editEnabled = !$scope.editEnabled;
  };
  $scope.update = function() {

  };
  $scope.findHardware = function() {
    if($scope.hardware.id==="") {
      return;
    }
    $http({
      method:'GET',
      url:'/api/hardware/'+$scope.hardware.id
    }).then(function success(res) {
      $scope.hardware = res.data;
      $scope.loaded = true;
    },function error(err) {
      alert('error loading hardware');
    });
  };
}]);