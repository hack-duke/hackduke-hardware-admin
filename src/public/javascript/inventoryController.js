var inventoryController = angular.module('inventoryController',[]);
inventoryController.controller('inventoryController',['$scope','$http',function($scope,$http) {
  $scope.select=[];
  $scope.hardware=[];
  $scope.allHardware=[];
  $scope.filter=false;
  $scope.query = {
    order:'id',
    limit: 5,
    page: 1
  };
  $scope.getData = function(page, limit) {
    $scope.hardware = $scope.allHardware.slice((page-1)*limit,Math.min(page*limit,$scope.allHardware.length));
  };
  $scope.loadAll = function() {
    $scope.filter = false;
    $http({
      method:'GET',
      url:'/api/hardware'
    }).then(function success(res) {
      $scope.allHardware = res.data;
      console.log(res);
    },function error(err) {
      alert('error loading data.');
      console.log('err');
    });
  };
  $scope.loadCheckout = function() {
    $scope.filter = true;
    $http({
      method:'GET',
      url:'/api/hardware/checkedout'
    }).then(function success(res) {
      $scope.allHardware = res.data;
      // $scope.total = res.data.length;
      console.log(res);
    },function error(err) {
      alert('error loading data.');
      console.log('err');
    });
  }
  $scope.loadAll();
}]);