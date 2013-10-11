(function() {

  var module = angular.module('cores.directives');


  module.directive('crObject', function(
    $compile,
    crBuild,
    crOptions,
    crCommon,
    crSchema
  ) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      templateUrl: 'cr-object.html',

      link: function(scope, elem, attrs) {
        var defaults = {
          showLabel: true,
          indentProperties: true
        };
        scope.options = crCommon.merge(defaults, crOptions.parse(attrs.options));

        var isRequired = function (name) {
          var req = scope.schema.required || [];
          return req.indexOf(name) !== -1;
        };

        var tmpl = '';
        angular.forEach(scope.schema.properties, function(subSchema, key) {

          // ignore some keys
          if (crSchema.isPrivateProperty(key)) return;

          if (!scope.model.hasOwnProperty(key)) {
            scope.model[key] = crSchema.createValue(subSchema);
          }

          tmpl += crBuild.buildTemplate(subSchema, scope.model[key],
                                        'schema.properties.' + key, 'model.' + key,
                                        (scope.path ? scope.path : '')  + '/' + key,
                                        { isRequired: isRequired(key) });
        });
        // compile and link template
        var link = $compile(tmpl);
        var content = link(scope);
        elem.find('.properties').append(content);
      }
    };
  });

})();