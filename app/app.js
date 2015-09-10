'use strict'

var angular = require('angular');
require('angular-route');
require('angular-resource');

require('./runs/runsService.js');
require('./runs/runsController.js');

var pyxisApp = angular.module('pyxisApp', [
    'ngRoute',
    'ngResource',
    'runsServices',
    'runsControllers'
]);

pyxisApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/runs'
    })
    .when('/runs', {
      templateUrl: 'runs/runsView.html',
      controller: 'RunController'
    });
}]);
