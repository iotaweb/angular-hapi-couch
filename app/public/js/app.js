'use strict';

// Main app config and initialisation

//! app
var app = angular.module('myApp', [
    'ng',
    'ngRoute',
    'cores',
    'myApp.controllers',
    'myApp.directives',
    'myApp.filters',
    'myApp.services'
]);

//! config
app.config(function($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
        .when('/',                  { templateUrl: 'partials/index',        controller: 'IndexController' })
        .when('/users',             { templateUrl: 'partials/users',        controller: 'UserController' })
        .when('/user/create',       { templateUrl: 'partials/user-create',  controller: 'UserController' })
        .when('/user/view/:id',     { templateUrl: 'partials/user-view',    controller: 'UserController' })
        .when('/user/edit/:id',     { templateUrl: 'partials/user-edit',    controller: 'UserController' })
        .when('/user/delete/:id',   { templateUrl: 'partials/users',        controller: 'UserController' })        
        .otherwise(                 { templateUrl: 'partials/404',          controller: '404Controller', title: '404'});
        
    // Removes the # in urls
    $locationProvider.html5Mode(true);   
    
    // Intercept responses with a handler service
    $httpProvider.responseInterceptors.push('responseHandler');         
    
});


//! run
app.run(function($rootScope, crResources) {
   
    $rootScope.options = {
        path: '/cores'
    };
    
    crResources.init($rootScope.options).then(function() {
    
        //console.log('cores initialized');                   
    });     
});