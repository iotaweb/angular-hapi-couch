(function() {

  var module = angular.module('cores.directives');


  module.directive('crArrayItem', function($compile, crBuild) {
    return {
      scope: {
        model: '=',
        schema: '=',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-array-item.html',

      controller: 'crArrayItemCtrl',

      link: function(scope, elem, attrs) {

        var tmpl = crBuild.buildTemplate(scope.schema, scope.model, 'schema', 'model', scope.path,
                                         { showLabel: false, indentProperties: false });

        var link = $compile(tmpl);
        var e = link(scope);
        elem.append(e);
      }
    };
  });


  module.directive('crArray', function(crSchema, crFieldLink) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-array.html',

      controller: 'crArrayCtrl',

      link: crFieldLink(function(scope, elem, attrs) {
        // ngrepeat can only bind to references when it comes to form fields
        // thats why we can only work with items of type object not primitives
        // this may change in a feature release
        if (!crSchema.isObjectSchema(scope.schema.items) &&
            !crSchema.isRefSchema(scope.schema.items)) {
          throw new Error('Array items schema is not of type object: ' + JSON.stringify(scope.schema.items));
        }
      })
    };
  });
})();