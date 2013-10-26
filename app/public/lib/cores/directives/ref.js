(function() {

  var module = angular.module('cores.directives');


  module.directive('crRef', function(
    $compile,
    $timeout,
    crCommon,
    crFieldLink,
    crValidation
  ) {
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

        $scope.$on('cr:model:saved', function(e, model) {
          e.stopPropagation();
          $scope.model.id_ = model._id;
          $scope.$broadcast('cr:update:preview');
        });

        $scope.$on('cr:list:select', function(e, id) {
          e.stopPropagation();
          $scope.model.id_ = id;
          $scope.$broadcast('cr:update:preview');
        });
      },


      link: crFieldLink({
        showLabel: true, preview: 'cr-ref-preview'
      }, function(scope, elem, attrs) {

        scope.editModalId = crCommon.createModalId();
        scope.selectModalId = crCommon.createModalId();

        // scope methods
        scope.newModel = function() {
          scope.$broadcast('cr:showModal:model', scope.editModalId, null);
        };

        scope.updateModel = function() {
          scope.$broadcast('cr:showModal:model', scope.editModalId, scope.model.id_);
        };

        scope.selectModel = function() {
          scope.$broadcast('cr:showModal:list', scope.selectModalId, true);
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

        // create preview
        var tmpl = '<div ' + scope.options.preview +
              ' type="{{schema.$ref}}"' +
              ' id="model.id_"' +
              ' options="options">' +
              '</div>';

        var link = $compile(tmpl);
        var content = link(scope);
        elem.find('.cr-preview').html(content);
      })
    };
  });




  var previewLink = function(crResources) {
    return function(scope, elem, attrs) {

      var update = function(id) {
        if (id) {
          crResources.get(scope.type).load(id).then(function(doc) {
            scope.model = doc;
          });
        }
      };

      scope.$watch('id', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          update(newValue);
        }
      });

      scope.$on('cr:update:preview', function(e) {
        update(scope.id);
      });
      update(scope.id);
    };
  };


  module.directive('crRefPreview', function(crResources) {
    return {
      scope: {
        type: '@',
        id: '=',
        options: '='
      },

      replace: true,
      templateUrl: 'cr-ref-preview.html',

      link: previewLink(crResources)
    };
  });


  module.directive('crImagePreview', function(crResources) {
    return {
      scope: {
        type: '@',
        id: '=',
        options: '='
      },

      replace: true,
      templateUrl: 'cr-image-preview.html',

      link: previewLink(crResources)
    };
  });
})();