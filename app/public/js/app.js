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
            .when('/',                  { templateUrl: 'partials/index',        controller: 'IndexCtrl' })
            .when('/api',               { templateUrl: 'partials/api',          controller: 'IndexCtrl' })
            .when('/users',             { templateUrl: 'partials/users',        controller: 'UsersCtrl' })
            .when('/user/create',       { templateUrl: 'partials/user-create',  controller: 'UserCtrl' })
            .when('/user/view/:id',     { templateUrl: 'partials/user-view',    controller: 'UserCtrl' })
            .when('/user/edit/:id',     { templateUrl: 'partials/user-edit',    controller: 'UserCtrl' })
            .when('/user/delete/:id',   { templateUrl: 'partials/users',        controller: 'UsersCtrl' })        
            .otherwise(                 { templateUrl: 'partials/404',          controller: '404Ctrl', title: '404'});
            
        // Removes the # in urls
        $locationProvider.html5Mode(true);   
        
        // Intercept responses with a handler service
        $httpProvider.responseInterceptors.push('responseHandler');     
    })


    //! run
    .run(function(crResources) {
           
        var options = { path: '/api' };
        
        crResources.init(options).then(function() {
        
            //console.log('cores initialized');                   
        });     
    });