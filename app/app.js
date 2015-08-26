'use strict'

var vizuiApp = angular.module('vizuiApp', [
    'ngRoute',
    'runs'
]);

vizuiApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/runs', {
      templateUrl: 'runs/runsView.html',
      controller: 'RunController'
    })
    .otherwise({
      redirectTo: '/runs'
    });
}]);
