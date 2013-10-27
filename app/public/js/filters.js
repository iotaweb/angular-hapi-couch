'use strict';

angular.module('myApp.filters', [])

    //! title
    // Format the page title using values defined in services
    .filter('title', function(appName, separator) {
    
        return function(text) {
    
            return appName + separator + text;
        };
    });
