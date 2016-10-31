var inventoryController = angular.module('inventoryController',[]);
inventoryController.controller('inventoryController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog) {
  $scope.select=[];
  $scope.hardware=[];
  $scope.allHardware=[];
  $scope.filter=false;
  $scope.filterBySet = false;
  $scope.hardwareSets=[];
  $scope.allHardwareSets=[];
  $scope.query = {
    order:'id',
    limit: 10,
    page: 1
  };
  $scope.getData = function(page, limit) {
    $scope.hardware = $scope.allHardware.slice((page-1)*limit,Math.min(page*limit,$scope.allHardware.length));
  };
  $scope.getDataBySet = function(page, limit) {
    $scope.hardwareSets = $scope.allHardwareSets.slice((page-1)*limit,Math.min(page*limit,$scope.allHardwareSets.length));
  }
  $scope.loadAll = function() {
    $http({
      method:'GET',
      url:'/api/hardware'
    }).then(function success(res) {
      $scope.allHardware = res.data;
      $scope.filter = false;
      $scope.filterBySet = false;
    },function error(err) {
      alert('error loading data.');
    });
  };
  $scope.bySet = function() {
    $http({
      method:'GET',
      url:'/api/hardware/byset'
    }).then(function success(res) {
      $scope.allHardwareSets = res.data;
      $scope.filterBySet = true;
    },function error(err) {
      alert('error loading data.');
    })
  }
  $scope.loadCheckout = function() {
    $http({
      method:'GET',
      url:'/api/hardware/checkedout'
    }).then(function success(res) {
      $scope.allHardware = res.data;
      // $scope.total = res.data.length;
      console.log(res);
      $scope.filter = true;
      $scope.filterBySet = false;
    },function error(err) {
      alert('error loading data.');
    });
  };
  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Delete Hardware Record.')
          .textContent('Are you sure to delete all selected record?')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      deleteSelect();
    }, function() {});
  };

  var deleteSelect = function() {
    for (hardware of $scope.select) {
      $http({
        method: 'DELETE',
        url:'/api/hardware/'+hardware.id
      }).then(function success(res){},
      function error(err) {
        alert('Error deleting hardware.');
      });
    }
    $scope.select=[];
    $scope.loadAll();
  };

  $scope.loadAll();
}]);