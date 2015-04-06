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

  $scope.myOutput;

  $scope.config = {
      options : {
        allowMonth : false,
        allowYear : false
      }
  }

  $scope.serverData = "40 5 3 5 *";

  $scope.mySecondOutput;

})



