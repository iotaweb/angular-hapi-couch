(function() {

  var module = angular.module('cores.directives');


  module.directive('crText', function(crCommon, crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-text.html',

      link: function(scope, elem, attrs) {

        var validation = crValidation(scope);

        validation.addConstraint('maxLength', function(value) {
          return value.length <= scope.schema.maxLength;
        });

        validation.addConstraint('minLength', function(value) {
          return value.length >= scope.schema.minLength;
        });

        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return !!value && value !== '';
          }, true);
        }

        scope.$emit('ready');
      }
    };
  });

})();