'use strict'

var runServices = angular.module('runsServices', ['ngResource']);

runServices.factory('Runs', ['$resource', function($resource) {
  return $resource(
    'http://localhost:5000/runs',
    {},
    {query: {method: 'GET', headers: {"Access-Control-Allow-Origin": "*"}}}
  );
}]);
