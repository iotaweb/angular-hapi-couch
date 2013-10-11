(function() {

  var module = angular.module('cores.directives');


  module.directive('crReadonly', function(crFieldLink) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-readonly.html',

      link: crFieldLink(function(scope, elem, attrs) {
      })
    };
  });
})();