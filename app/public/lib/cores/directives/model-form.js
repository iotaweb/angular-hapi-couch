(function() {

  var module = angular.module('cores.directives');


  module.directive('crModelForm', function($compile, crBuild, crSchema, crCommon) {
    return {
      scope: {
        model: '=',
        schema: '=',
        valid: '=',
        debug: '=',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-model-form.html',

      controller: function($scope) {

        $scope.valid = true;
        $scope.errors = {};

        $scope.$on('set:error', function(e, id) {
          e.stopPropagation();
          $scope.errors[id] = true;
          $scope.valid = false;
        });

        $scope.$on('remove:error', function(e, id) {
          e.stopPropagation();
          delete $scope.errors[id];
          $scope.valid = Object.keys($scope.errors).length === 0;
        });
      },

      link: function(scope, elem) {

        var childScope;

        scope.$watch('model', function() {
          if (!scope.schema) return;
          scope.valid = true;
          scope.errors = {};

          if (!crSchema.isObjectSchema(scope.schema)) {
            throw new Error('Top level schema has to be an object');
          }

          // cleanup dom and scope
          if (childScope) {
            elem.find('form').empty();
            childScope.$destroy();
          }
          // create markup
          var tmpl = crBuild(scope.schema, scope.model, 'schema', 'model',
                             scope.path || '', { mode: 'minimal'});

          // compile and link with new scope
          childScope = scope.$new();
          var link = $compile(tmpl);
          var content = link(childScope);
          elem.find('form').html(content);
        });
      }
    };
  });
})();