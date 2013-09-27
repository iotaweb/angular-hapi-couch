(function() {

  var module = angular.module('cores.directives');


  module.directive('crNumber', function(crValidation) {
    return {

      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-number.html',

      link: function(scope, elem, attrs) {

        var validation = crValidation(scope);

        if (attrs.hasOwnProperty('isInteger')) {
          validation.addConstraint('integer', function(value) {
            return Math.floor(value) === value;
          }, true);
        }
        else {
          elem.find('input[type="number"]').attr('step', 'any');
        }

        validation.addConstraint('multipleOf', function(value) {
          return (value % scope.schema.multipleOf) === 0;
        });

        validation.addConstraint('minimum', function(value) {
          return value >= scope.schema.minimum;
        });

        validation.addConstraint('maximum', function(value) {
          return value <= scope.schema.maximum;
        });

        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return angular.isNumber(value);
          }, true);
        }

        scope.$emit('ready');
      }
    };
  });
})();