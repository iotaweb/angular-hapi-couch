'use strict';

var controllers = angular.module('myApp.controllers', []);


//! IndexController
controllers.controller('IndexCtrl', function($scope, crResources) {

    $scope.type = 'User';
    
    var resource = crResources.get($scope.type);
        
    resource
        .view('names', { limit: 20 })
        .then(function success(result) {

            if (result.total_rows === 0) {
                $scope.users = false;
                return;                
            }   else {
                $scope.users = true;
                $scope.names = result.rows;             
            }           
    });                       
});


//! UserController
controllers.controller('UserCtrl', function($scope, $routeParams, $window, crResources) {  
    
    $scope.type = 'User';
    $scope.modelId = $routeParams.id; 
    $scope.headers = [
        'firstname',
        'lastname',
        'email',
        'age',
        'password'
    ];
    $scope.views = [];    
    $scope.limit = 5;          
    $scope.order = [
        '_id',
        '_rev',
        'firstname',
        'lastname',
        'email',
        'age',
        'password',
        'type_'
    ];
    
    var resource = crResources.get($scope.type);
    
    resource
        .load($scope.modelId)
        .then(
            function (doc) {             
                $scope.user = doc;
            }        
        );                                  
});


//! 404Controller
controllers.controller('404Ctrl', function ($scope, $location) {
     
    $scope.url = $location.path();
});
