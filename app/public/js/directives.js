'use strict';

// Directives

var app = angular.module('myApp.directives', []);


//! currentYear     elem(current-year)
app.directive('currentYear', function() {
    
    return function(scope, elm, attrs) {
    
        var year = new Date().getFullYear();        
        elm.append(year);
    };
});