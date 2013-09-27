(function() {

  var module = angular.module('cores.directives');


  module.directive('crBoolean', function() {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-boolean.html',

      link: function(scope) {

        scope.$emit('ready');
      }
    };
  });
})();