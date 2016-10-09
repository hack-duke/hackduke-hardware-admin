var app = angular.module('app',['ngRoute','ngMaterial','inventoryController']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '../pages/inventory.html',
    controller: 'inventoryController'
  });
});