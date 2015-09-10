'use strict'

var angular = require('angular');

var runServices = angular.module('runsServices', ['ngResource']);

runServices.factory('Runs', ['$resource', function($resource) {
  return $resource(
    'http://localhost:5000/runs',
    {},
    {query: {method: 'GET'}}
  );
}]);

module.exports = runServices;
