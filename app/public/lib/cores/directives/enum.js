(function() {

  var module = angular.module('cores.directives');


  module.directive('crEnum', function(crFieldLink) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-enum.html',

      link: crFieldLink(function(scope, elem, attrs) {
      })
    };
  });

})();