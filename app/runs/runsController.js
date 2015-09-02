'use strict'

var runController = angular.module('runsControllers', ['runsServices']);

runController.controller('RunController', ['$scope', 'Runs', function($scope, Runs) {
  Runs.query(function(result) {
    $scope.runs = result.runs;
    $scope.pagination = result.meta;
  });
}]);
