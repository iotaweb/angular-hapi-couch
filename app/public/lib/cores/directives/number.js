(function() {

  var module = angular.module('cores.directives');


  module.directive('crNumber', function(crFieldLink, crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-number.html',

      link: crFieldLink(function(scope, elem, attrs) {

        var validation = crValidation(scope);

        if (scope.options.isInteger) {
          validation.addConstraint(
            'integer',
            'Value is not an integer',
            function(value) {
              return Math.floor(value) === value;
            }, true);
        }
        else {
          elem.find('input[type="number"]').attr('step', 'any');
        }

        validation.addConstraint(
          'multipleOf',
          'Value is not a multiple of ' + scope.schema.multipleOf,
          function(value) {
            return (value % scope.schema.multipleOf) === 0;
          });

        validation.addConstraint(
          'minimum',
          'Value is less than ' + scope.schema.minimum,
          function(value) {
            return value >= scope.schema.minimum;
          });

        validation.addConstraint(
          'maximum',
          'Value is greater than ' + scope.schema.maximum,
          function(value) {
            return value <= scope.schema.maximum;
          });


        if (scope.options.isRequired) {
          validation.addConstraint('required', 'Required', function(value) {
            return angular.isNumber(value);
          }, true);
        }
      })
    };
  });
})();