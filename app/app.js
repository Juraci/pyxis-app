'use strict'

var pyxisApp = angular.module('pyxisApp', [
    'ngRoute',
    'runs'
]);

pyxisApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/runs', {
      templateUrl: 'runs/runsView.html',
      controller: 'RunController'
    })
    .otherwise({
      redirectTo: '/runs'
    });
}]);
