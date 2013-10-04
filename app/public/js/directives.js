'use strict';

var directives = angular.module('myApp.directives', []);


//! currentYear     element(current-year)
directives.directive('currentYear', function() {
    
    return function(scope, element, attrs) {
    
        var year = new Date().getFullYear();        
        element.append(year);
    };
});

//! go back in history
directives.directive('historyBack', function($window) {
    
    return function(scope, element, attrs) {
        
        element.on('click', function() {
        
            $window.history.back();
        });
    };
});