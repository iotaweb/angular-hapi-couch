(function() {

  var module = angular.module('cores.directives');

  module.directive('crModelModal', function() {
    return {
      scope: {
        type: '@',
        path: '@',
        modalId: '@'
      },

      replace: true,
      templateUrl: 'cr-model-modal.html',

      controller: 'crModelCtrl',

      link: function(scope, elem) {

        scope.$on('model:saved', function() {
          // close on save
          elem.modal('hide');
        });

        scope.$on('showModal:model', function(e, modalId, modelId) {
          if (modalId === scope.modalId) {
            e.preventDefault();
            scope.modelId = modelId;
            elem.modal('show');
          }
        });
      }
    };
  });
})();