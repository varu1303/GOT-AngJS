angular
    .module('route', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'mainCtrl',
                controllerAs: 'main'
                })
            .when('/view1', {
                templateUrl: 'templates/view1.html',
                controller: 'v1Ctrl',
                controllerAs: 'v1'
                })
            .when('/view2/:t/:id', {
                templateUrl: 'templates/view2.html',
                controller: 'v2Ctrl',
                controllerAs: 'v2'
                })
            .otherwise({
                redirectTo: '/'
                });
})
;