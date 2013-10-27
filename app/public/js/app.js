'use strict';

//! app
angular.module('myApp', [
    'ng',
    'ngRoute',
    'cores',
    'myApp.controllers',
    'myApp.directives',
    'myApp.filters',
    'myApp.services'
    ])

    //! config
    .config(function($routeProvider, $locationProvider, $httpProvider) {
        
        $routeProvider
            .when('/', {
                templateUrl: 'partials/index',
                controller: 'IndexCtrl',
                title: 'Home'
            })
            .when('/api', {
                templateUrl: 'partials/api',
                controller: 'IndexCtrl',
                title: 'API'
            })
            .when('/users', {
                templateUrl: 'partials/users',
                controller: 'UsersCtrl',
                title: 'Users'
            })
            .when('/user/create', {
                templateUrl: 'partials/user-create',
                controller: 'UserCtrl',
                title: 'Create User'
            })
            .when('/user/view/:id', {
                templateUrl: 'partials/user-view',
                controller: 'UserCtrl',
                title: 'View User'
            })
            .when('/user/edit/:id', {
                templateUrl: 'partials/user-edit',
                controller: 'UserCtrl',
                title: 'Edit User'
            })      
            .otherwise({ 
                templateUrl: 'partials/404',
                controller: '404Ctrl',
                title: '404 Page Not Found'
            });
            
        // Removes the # in urls
        $locationProvider.html5Mode(true);   
        
        // Intercept responses with a handler service
        $httpProvider.responseInterceptors.push('responseHandler');     
    })


    //! run
    .run(function($rootScope, $route, crResources) {
           
        var options = { path: '/api' };
        
        crResources.init(options).then(function() {
        
            //console.log('cores initialized');                   
        });
        
        $rootScope.$on('$routeChangeSuccess',
            function(event, current, previous) {
    
                $rootScope.title = $route.current.title;
            });             
    });