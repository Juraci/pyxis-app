'use strict'

var runController = angular.module('runsControllers', ['runsServices']);

runController.controller('RunController', ['$scope', 'Runs', function($scope, Runs) {
  Runs.query(function(result) {
    $scope.runs = result.runs;
    $scope.pagination = result.meta;
  });

  $scope.next = function() {
    var limit = $scope.pagination.limit;
    var offset = $scope.pagination.offset + limit;
    Runs.query({limit: limit, offset: offset}, function(result) {
      $scope.runs = result.runs;
      $scope.pagination = result.meta;
    });
  }
}]);
