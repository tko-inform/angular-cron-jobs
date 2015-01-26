var boilerPlateApp = angular.module('boilerPlateApp', ['ui.router', 'angular-cron-jobs'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider) {


    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('main', {
        url : "/",
        templateUrl: 'partials/main.html',
        controller: 'mainController'
      })
      ;
	}
])
.controller('mainController', function($scope) {

  $scope.mainMessage = "Main Controller Loaded";

  $scope.output;

})



