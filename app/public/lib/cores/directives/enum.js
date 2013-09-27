(function() {

  var module = angular.module('cores.directives');


  module.directive('crEnum', function() {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-enum.html',

      link: function(scope) {
        scope.$emit('ready');
      }
    };
  });

})();