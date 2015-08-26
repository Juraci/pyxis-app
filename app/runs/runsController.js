'use strict'

var runController = angular.module('runs', []);

runController.controller('RunController', ['$scope', function($scope) {
  $scope.runs = [
    {'id': '1', 'success_percentage': 90},
    {'id': '2', 'success_percentage': 92}
  ];
}]);
