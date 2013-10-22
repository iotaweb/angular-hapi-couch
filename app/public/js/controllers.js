'use strict';

angular.module('myApp.controllers', [])

    //! IndexCtrl
    .controller('IndexCtrl', function($scope, crResources) {
    
        $scope.type = 'User';
        
        var resource = crResources.get($scope.type);
            
        resource
            .view('names', { limit: 50 })
            .then(function success(result) {
    
                if (result.total_rows === 0) {
                    $scope.users = false;
                    return;                
                }   else {
                    $scope.users = true;
                    $scope.names = result.rows;             
                }           
        });                       
    })
    
    
    //! UserCtrl
    .controller('UserCtrl', function($scope, $routeParams, crResources) {  
        
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
        $scope.limit = 10;          
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
    })
    
    //! UsersCtrl
    .controller('UsersCtrl', function($scope, $routeParams) {  
        
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
        $scope.limit = 10;          
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
    })    
    
    
    //! 404Ctrl
    .controller('404Ctrl', function ($scope, $location) {
         
        $scope.url = $location.path();
    });
