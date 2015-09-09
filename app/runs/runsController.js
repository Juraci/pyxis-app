'use strict'

var runController = angular.module('runsControllers', ['runsServices']);

runController.controller('RunController', ['$scope', 'Runs', '$location', '$anchorScroll', function($scope, Runs, $location, $anchorScroll) {

  var updatePagination = function(result) {
    $scope.pagination = result.meta;
    $scope.currentPage = (result.meta.offset / result.meta.limit) + 1;

    var pages = parseInt(result.meta.total_count / result.meta.limit);
    if (result.meta.total_count % result.meta.limit > 0) {
      pages += 1;
    }
    $scope.totalPages = pages;
  };

  Runs.query(function(result) {
    $scope.runs = result.runs;
    updatePagination(result);
  });

  $scope.next = function() {
    var limit = $scope.pagination.limit;
    var offset = $scope.pagination.offset + limit;
    Runs.query({limit: limit, offset: offset}, function(result) {
      $scope.runs = result.runs;
      updatePagination(result);
    });

    $location.hash('page-title');
    $anchorScroll();
  };

  $scope.prev = function() {
    var limit = $scope.pagination.limit;
    var offset = $scope.pagination.offset - limit;
    Runs.query({limit: limit, offset: offset}, function(result) {
      $scope.runs = result.runs;
      updatePagination(result);
    });

    $location.hash('page-title');
    $anchorScroll();
  };
}]);
