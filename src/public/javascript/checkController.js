var checkController = angular.module('checkController',[]);
checkController.controller('checkController',['$scope','$http','$mdDialog','$mdToast',function($scope,$http,$mdDialog,$mdToast) {
  $scope.id = null;
  $scope.loaded = false;
  $scope.editEnabled = false;
  $scope.hardware = null
  $scope.checkedout = false;
  $scope.checkedin = false;

  var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  $scope.showToast = function(content) {
    var pinTo = $scope.getToastPosition();
    var el = angular.element(document.getElementById("toast-container"));
    $mdToast.show(
      $mdToast.simple()
        .textContent(content)
        .parent(el)
        .position(pinTo )
        .hideDelay(1000)
    );
  };

  $scope.query = {
    order:'checkout_time',
    limit: 3,
    page: 1
  };

  $scope.toggleEdit = function() {
    $scope.editEnabled = !$scope.editEnabled;
  };

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Delete Hardware')
          .textContent('Are you sure to delete the hardware?')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $scope.delete();
    }, function() {});
  };

  $scope.delete = function() {
    $http({
        method: 'DELETE',
        url:'/api/hardware/'+$scope.hardware.id
      }).then(function success(res){
        $scope.showToast('Hardware deleted.');
        $scope.loaded = false;
      }, function error(err) {
        alert('Error deleting hardware.');
      });
  }

  $scope.update = function() {
    $http({
      method:'POST',
      url:'/api/hardware/'+$scope.hardware.id,
      data: $scope.hardware
    }).then(function success(res) {
      $scope.showToast('Changes saved.');
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
        $scope.showToast('Hardware checked out!');
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
      $scope.showToast('Hardware checked in!');
    }, function error(err) {
      alert('checkin failed');
    });
  };


}]);