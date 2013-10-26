(function() {

  var module = angular.module('cores.directives');


  module.directive('crModel', function() {
    return {
      scope: {
        type: '@',
        modelId: '=',
        defaults: '=?',
        options: '=?'
      },

      replace: true,
      templateUrl: 'cr-model.html',

      controller: 'crModelCtrl'
    };
  });
})();