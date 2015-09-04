'use strict'

var runController = angular.module('runsControllers', ['runsServices']);

runController.controller('RunController', ['$scope', 'Runs', '$location', '$anchorScroll', function($scope, Runs, $location, $anchorScroll) {
  Runs.query(function(result) {
    $scope.runs = result.runs;
    $scope.pagination = result.meta;
    $scope.currentPage = (result.meta.offset / result.meta.limit) + 1;
  });

  $scope.next = function() {
    var limit = $scope.pagination.limit;
    var offset = $scope.pagination.offset + limit;
    Runs.query({limit: limit, offset: offset}, function(result) {
      $scope.runs = result.runs;
      $scope.pagination = result.meta;
    });

    $location.hash('page-title');
    $anchorScroll();
  };
}]);
