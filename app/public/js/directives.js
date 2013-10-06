'use strict';

angular.module('myApp.directives', [])

    //! currentYear
    .directive('currentYear', function() {
        
        return function(scope, element, attrs) {
        
            var year = new Date().getFullYear();        
            element.append(year);
        };
    })
    
    //! historyBack
    .directive('historyBack', function($window) {
        
        return function(scope, element, attrs) {
            
            element.on('click', function() {
            
                $window.history.back();
            });
        };
    });