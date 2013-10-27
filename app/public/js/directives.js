'use strict';

angular.module('myApp.directives', [])

    //! sitename
    .directive('sitename', function(appName) {
    
        return function(scope, elm, attrs) {
    
            elm.append(appName);
        };
    })
    
    //! copyright
    .directive('copyright', function() {
    
        return function(scope, element, attrs) {
    
            var year = new Date().getFullYear();
            element.prepend('&copy; ' + year + ' ');
        };
    })
    
    //! historyBack
    .directive('historyBack', function($window) {
    
        return function(scope, element, attrs) {
    
            element.on('click', function() {
    
                $window.history.back();
            });
        };
    })
    
    //! bsNavbar
    .directive('bsNavbar', function($location) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs, controller) {
    
                // Watch for the $location
                scope.$watch(function() {
    
                    return $location.path();
                }, function(newValue, oldValue) {
    
                    $('li[data-match-route]', element).each(function(k, li) {
    
                        // data('match-route') does not 
                        // work with dynamic attributes
                        var $li = angular.element(li);
                        var pattern = $li.attr('data-match-route');
                        var regexp = new RegExp('^' + pattern + '$', [
                            'i'
                        ]);
    
                        if (regexp.test(newValue)) {
                            $li.addClass('active');
                        } else {
                            $li.removeClass('active');
                        }
                    });
                });
            }
        };
    });
