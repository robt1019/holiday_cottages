angular.module('hfc').config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'components/homePage/homePageView.html',
            controller: 'HomePageCtrl'
        });        
}]);