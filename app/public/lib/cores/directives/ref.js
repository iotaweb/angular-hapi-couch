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


  module.directive('crMultiSelectRef', function(
    crFieldLink,
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
      templateUrl: 'cr-multi-select-ref.html',

      link: crFieldLink(function(scope, elem, attrs) {

        scope.rows = [];

        // load docs
        var unwatch = scope.$watch('schema.items.$ref', function(newValue) {
          if (!scope.schema.items.$ref) return;
          unwatch();

          crResources.get(scope.schema.items.$ref).view(
            'all', { include_docs: true }
          ).then(function(result) {
            // create rows
            scope.rows = result.rows.map(function(row) {
              var r = {
                id: row.id,
                selected: false,
                name: crJSONPointer.get(row.doc, scope.options.previewPath)
              };
              return r;
            });
            // select rows when id is in model
            scope.model.forEach(function(ref) {
              scope.rows.forEach(function(row) {
                if (row.id == ref.id_) { row.selected = true; }
              });
            });
          });
        });

        // watch for selection changes
        scope.$watch('rows', function(newValue, oldValue) {
          if (!newValue || (newValue && newValue.length === 0)) return;
          // sync selected rows with model
          scope.model = scope.rows.filter(function(row) {
            return row.selected;
          }).map(function(row) {
            return { id_: row.id };
          });
        }, true);
      })
    };
  });


  module.directive('crRef', function($timeout, crCommon, crFieldLink, crValidation) {
    return {
      scope: {
        model: '=',
        schema: '=',
        name: '@',
        path: '@'
      },

      replace: true,
      templateUrl: 'cr-ref.html',

      controller: function($scope) {

        $scope.$on('model:saved', function(e, model) {
          e.stopPropagation();
          $scope.model.id_ = model._id;
          $scope.$broadcast('update:preview', model._id);
        });

        $scope.$on('list:select', function(e, id) {
          e.stopPropagation();
          $scope.model.id_ = id;
          $scope.$broadcast('update:preview', id);
        });
      },


      link: crFieldLink(function(scope, elem, attrs) {

        scope.editModalId = crCommon.createModalId();
        scope.selectModalId = crCommon.createModalId();

        // scope methods
        scope.newModel = function() {
          scope.$broadcast('showModal:model', scope.editModalId, null);
        };

        scope.updateModel = function() {
          scope.$broadcast('showModal:model', scope.editModalId, scope.model.id_);
        };

        scope.selectModel = function() {
          scope.$broadcast('showModal:list', scope.selectModalId, true);
        };

        scope.hasModel = function() {
          return !!scope.model.id_;
        };

        // validation
        var validation = crValidation(scope, 'model.id_');
        if (scope.options.isRequired) {
          validation.addConstraint('required', 'Required', function(value) {
            return !!scope.model.id_;
          }, true);
        }

        // delay to give the preview time to initialize
        $timeout(function() {
          scope.$broadcast('update:preview', scope.model.id_);
        });
      })
    };
  });


  module.directive('crRefPreview', function(crResources) {
    return {
      scope: {
        type: '@',
        options: '='
      },

      replace: true,
      templateUrl: 'cr-ref-preview.html',

      link: function(scope, elem, attrs) {

        scope.$on('update:preview', function(e, id) {
          e.preventDefault();
          if (id) {
            crResources.get(scope.type).load(id).then(function(doc) {
              scope.model = doc;
            });
          }
        });
      }
    };
  });
})();