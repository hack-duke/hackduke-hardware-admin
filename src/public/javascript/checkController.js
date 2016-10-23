var checkController = angular.module('checkController',[]);
checkController.controller('checkController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog) {
  $scope.id = null;
  $scope.loaded = false;
  $scope.editEnabled = false;
  $scope.hardware = null
  $scope.checkedout = false;
  $scope.checkedin = false;

  $scope.query = {
    order:'checkout_time',
    limit: 3,
    page: 1
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
      $scope.loaded = false;
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
      $scope.checkedout = $scope.hardware.checked_out;
      $scope.checkedin = !$scope.checkedout;
    },function error(err) {
      alert('error loading hardware');
    });
  };

  $scope.showCheckoutPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('Hardware Checkout')
      // .textContent('Enter User ID:')
      .placeholder('User ID')
      .targetEvent(ev)
      .ok('Check out')
      .cancel('cancel');

    $mdDialog.show(confirm).then(function(result) {
      var userId = result;
      var date = new Date();
      $http({
        method:'POST',
        url:'/api/hardware/'+$scope.id+'/checkout',
        data: {
          "checkout_time": date,
          "userId":userId
        }
      }).then(function success(res) {
        $scope.checkedout = true;
        $scope.checkedin = false;
        $scope.findHardware();
        alert("checked out successfully");
      }, function error(err) {
        alert('Error checking out hardware');
      });
      
    }, function cancel() {
      
    });
    
  };

  $scope.showCheckinPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    $http({
      method:'POST',
      url:'/api/hardware/'+$scope.id+'/checkin'  ,
      data:{
        'checkin_time': new Date()
      }
    }).then(function success(res) {
      $scope.checkedout = false;
      $scope.checkedin = true;
      $scope.findHardware();
      alert('Hardware checkedin');
    }, function error(err) {
      alert('checkin failed');
    });
  };


}]);