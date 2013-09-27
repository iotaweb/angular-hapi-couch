(function() {

  var module = angular.module('cores.directives');


  module.directive('crSlug', function(crCommon, crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@',
        source: '@'
      },

      replace: true,
      templateUrl: 'cr-slug.html',

      link: function(scope, elem, attrs) {

        var validation = crValidation(scope);

        validation.addConstraint('maxLength', function(value) {
          return value.length <= scope.schema.maxLength;
        });

        validation.addConstraint('minLength', function(value) {
          return value.length >= scope.schema.minLength;
        });

        validation.addConstraint('pattern', function(value) {
          return new RegExp(scope.schema.pattern).test(value);
        });

        // validation.addConstraint('format', function(value) {
        //   throw new Error('not implemented');
        //   return false;
        // });

        if (attrs.isRequired === 'true') {
          validation.addConstraint('required', function(value) {
            return !!value && value !== '';
          }, true);
        }


        scope.generate = function() {

          var sources = scope.source ? scope.source.split(',') : "";
          var val = '';

          angular.forEach(sources, function(src) {
            val += (val !== '' ? '-' : '') + scope.$parent.model[src];
          });
          scope.model = crCommon.createSlug(val);
        };

        scope.$emit('ready');
      }
    };
  });

})();
