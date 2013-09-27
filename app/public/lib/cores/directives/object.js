(function() {

  var module = angular.module('cores.directives');


  module.directive('crObject', function($compile, $templateCache, crSchema, crBuild, crCommon) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@',
        template: '@'
      },

      compile: function(tElem, tAttrs) {

        var templates = {
          'default': 'cr-object.html',
          'minimal': 'cr-object-minimal.html'
        };

        var mode = tAttrs.mode || 'default';
        var template = $templateCache.get(templates[mode]);
        tElem.append(template);

        // Linking function
        return function(scope, elem, attrs) {

          var numProperties = 0;

          var isRequired = function (name) {
            var req = scope.schema.required || [];
            return req.indexOf(name) !== -1;
          };

          // listen for childs ready event and ready up when all fired
          var offready = scope.$on('ready', function(e) {

            e.stopPropagation();
            if (--numProperties === 0) {
              offready();
              scope.$emit('ready');
            }
          });

          // create templates for properties
          var tmpl = '';
          angular.forEach(scope.schema.properties, function(subSchema, key) {

            // ignore some keys
            if (crSchema.isPrivateProperty(key)) return;

            if (!scope.model.hasOwnProperty(key)) {
              scope.model[key] = crSchema.createValue(subSchema);
            }

            numProperties += 1;

            tmpl += crBuild(subSchema, scope.model[key],
                            'schema.properties.' + key, 'model.' + key,
                            (scope.path ? scope.path : '')  + '/' + key,
                            { 'is-required': isRequired(key) });
          });
          // compile and link template
          var link = $compile(tmpl);
          var content = link(scope);
          elem.find('.properties').append(content);
        };
      }
    };
  });

})();