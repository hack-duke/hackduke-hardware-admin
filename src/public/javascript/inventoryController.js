var inventoryController = angular.module('inventoryController',[]);
inventoryController.controller('inventoryController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog) {
  // $scope.select=[];

  $scope.hardwareSets=[];
  $scope.allHardwareSets=[];
  $scope.query = {
    order:'id',
    limit: 10,
    page: 1
  };
  $scope.bySet = function() {
    $http({
      method:'GET',
      url:'/api/hardware/byset'
    }).then(function success(res) {
      $scope.hardwareSets = res.data;
      // $scope.getDataBySet(1,10);
      // $scope.filterBySet = true;
    },function error(err) {
      alert('error loading data.'+err);
    });
  };
  // $scope.getDataBySet = function(page, limit) {
  //   $scope.hardwareSets = $scope.allHardwareSets.slice((page-1)*limit,Math.min(page*limit,$scope.allHardwareSets.length));
  // }

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

  $scope.bySet();
}]);
