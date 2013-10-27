'use strict';

angular.module('myApp.controllers', [])

    //! IndexCtrl
    .controller('IndexCtrl', function($scope, crResources, $route) {
    
        var target = $route.current.templateUrl;
        
        // only get names if on home page
        if (target === 'partials/index') {
    
            $scope.type = 'User';
                
            crResources
                .get($scope.type)
                .view('names', {
                    limit: 50
                })
                .then(
                    function success(result) {
            
                        if (result.total_rows === 0) {
                            $scope.users = false;
                            return;                
                        }   else {
                            $scope.users = true;
                            $scope.names = result.rows;             
                        }           
                    },
                    function(error) {
        
                        // api server unavailable
                        console.log(error);
                    }                    
                );
        }            
    })
    
    
    //! UserCtrl - Create, Read, Update, Delete
    .controller('UserCtrl', function($scope, $routeParams, crResources) {  
        
        $scope.type = 'User';
        $scope.modelId = $routeParams.id;
        $scope.headers = [
            { title: 'firstname', path: '/firstname' },
            { title: 'lastname', path: '/lastname' },
            { title: 'email', path: '/email' },
            { title: 'age', path: '/age' },
            { title: 'password', path: '/password' }
        ];
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
        $scope.views = [];
        $scope.modelOptions = {};
        $scope.listOptions = {};                                   

        crResources
            .get($scope.type)
            .load($scope.modelId)
            .then(
                function (doc) {             
                    $scope.user = doc;
                },
                function(error) {
    
                    // api server unavailable
                    console.log(error);
                }                          
            );                                  
    })
    
    //! UsersCtrl - Read, Delete
    .controller('UsersCtrl', function($scope) {  
        
        $scope.type = 'User';
        $scope.headers = [
            { title: 'firstname', path: '/firstname' },
            { title: 'lastname', path: '/lastname' },
            { title: 'email', path: '/email' },
            { title: 'age', path: '/age' },
            { title: 'password', path: '/password' }
        ];
        $scope.order = [
            'firstname',
            'lastname',
            'email',
            'age',
            'password'
        ];         
        $scope.views = [];
        $scope.modelOptions = {};
        $scope.listOptions = {};   
        $scope.limit = 10;   
                                
    })    
    
    
    //! 404Ctrl
    .controller('404Ctrl', function ($scope, $location) {
         
        $scope.url = $location.path();
    });
