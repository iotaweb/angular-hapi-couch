(function() {

  var module = angular.module('cores.directives');

  module.directive('crPassword', function(crFieldLink, crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-password.html',

      link: crFieldLink(function(scope, elem, attrs) {

        var validation = crValidation(scope);

        validation.addConstraint(
          'maxLength',
          'Password is longer than ' + scope.schema.maxLength,
          function(value) {
            return value.length <= scope.schema.maxLength;
          });

        validation.addConstraint(
          'minLength',
          'Password is shorter than ' + scope.schema.minLength,
          function(value) {
            return value.length >= scope.schema.minLength;
          });

        if (scope.options.isRequired) {
          validation.addConstraint('required', 'Required', function(value) {
            return value && value !== '';
          }, true);
        }

        scope.pass1 = '';
        scope.pass2 = '';
        var oldPass = scope.model;

        var compareValue = function(v1, v2) {
          // only set model when passwords are equal and not empty
          if (v1 === v2) {
            if (v1 !== '') {
              scope.model = v1;
            }
            else {
              scope.model = oldPass;
            }
            validation.removeError('match');
          }
          else {
            scope.model = oldPass;
            validation.setError('match', 'Passwords do not match');
          }
        };

        scope.$watch('pass1', function(newValue) {
          compareValue(newValue, scope.pass2);
        });

        scope.$watch('pass2', function(newValue) {
          compareValue(newValue, scope.pass1);
        });
      })
    };
  });

})();