var app = angular.module('ambulatorio', ['ngRoute', 'servicos', 'ui.materialize', 'ngMask', 'ui.select', 'ngSanitize',
    'ngAnimate'])
    .config(function($routeProvider, $httpProvider){
        $routeProvider.when('/atendimento', {
            templateUrl: '/views/atendimento.html',
            controller: 'AtendimentoController'
        });

        $routeProvider.when('/atestado', {
            templateUrl: '/views/atestado.html',
            controller: 'AtestadoController'
        });
        $routeProvider.when('/home', {
            templateUrl: '/views/home.html',
            controller: 'HomeController'
        });

        $routeProvider.otherwise({redirectTo: '/home'});

        $httpProvider.interceptors.push('tokenInterceptor');
    });