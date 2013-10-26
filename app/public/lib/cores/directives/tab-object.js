(function() {

  var module = angular.module('cores.directives');


  module.directive('crTabObject', function(
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

      templateUrl: 'cr-tab-object.html',

      link: function(scope, elem, attrs) {
        var defaults = {
          showLabel: true,
          indent: false
        };
        scope.options = crCommon.merge(defaults, crOptions.parse(attrs.options));

        var objId = crCommon.createObjectId();

        var isRequired = function (name) {
          var req = scope.schema.required || [];
          return req.indexOf(name) !== -1;
        };

        var navTmpl = '<ul class="nav nav-tabs">';
        var contentTmpl = '<div class="tab-content">';
        var isFirst = true;
        angular.forEach(scope.schema.properties, function(subSchema, key) {

          // ignore some keys
          if (crSchema.isPrivateProperty(key)) return;

          if (!scope.model.hasOwnProperty(key)) {
            scope.model[key] = crSchema.createValue(subSchema);
          }
          var id = key + '-' + objId;

          navTmpl += '<li' + (isFirst ? ' class="active"' : '') + '>' +
            '<a href="#' + id + '">' + crBuild.getModelTitle(subSchema, key) + '</a></li>';

          contentTmpl += '<div' +
            ' ng-class="{ \'cr-indent\': options.indent }"' +
            ' class="tab-pane' + (isFirst ? ' active' : '') + '"' +
            ' id="' + id + '">';

          contentTmpl += crBuild.buildTemplate(subSchema, scope.model[key],
                                               'schema.properties.' + key, 'model.' + key,
                                               (scope.path ? scope.path : '')  + '/' + key,
                                               { isRequired: isRequired(key), showLabel: false });
          contentTmpl += '</div>';
          isFirst = false;
        });
        navTmpl += '</ul>';
        contentTmpl += '</div>';

        // compile and link template
        var link = $compile(navTmpl + contentTmpl);
        var content = link(scope);
        elem.find('.properties').append(content);

        elem.find('.nav-tabs a').on('click', function(e) {
          e.preventDefault();
          $(this).tab('show');
        });
      }
    };
  });

})();