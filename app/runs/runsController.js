'use strict'

var runController = angular.module('runsControllers', ['runsServices']);

runController.controller('RunController', ['$scope', 'Runs', function($scope, Runs) {
  $scope.runs = Runs.query();
}]);
