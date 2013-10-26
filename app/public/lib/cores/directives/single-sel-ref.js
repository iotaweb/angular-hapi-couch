(function() {

  var module = angular.module('cores.directives');


  module.directive('crSingleSelectRef', function(
    crFieldLink,
    crValidation,
    crResources,
    crCommon,
    crJSONPointer
  ) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-single-select-ref.html',

      link: crFieldLink(function(scope, elem, attrs) {

        scope.rows = [];

        // validation
        var validation = crValidation(scope, 'model.id_');
        if (scope.options.isRequired) {
          validation.addConstraint('required', 'Required', function(value) {
            return !!scope.model.id_;
          }, true);
        }

        // load docs
        var unwatch = scope.$watch('schema.$ref', function() {
          if (!scope.schema.$ref) return;
          unwatch();

          crResources.get(scope.schema.$ref).view('all', { include_docs: true }).then(function(result) {

            scope.rows = result.rows.map(function(row) {
              var r = {
                id: row.id,
                name: crJSONPointer.get(row.doc, scope.options.previewPath)
              };
              if (scope.model.id_ && r.id === scope.model.id_) {
                scope.selectedRow = r;
              }
              return r;
            });
          });
        });

        // watch for selection changes
        scope.$watch('selectedRow', function(newValue, oldValue) {
          if (newValue === oldValue) return;
          if (!newValue) {
            delete scope.model.id_;
          }
          else {
            scope.model.id_ = newValue.id;
          }
        });
      })
    };
  });
})();